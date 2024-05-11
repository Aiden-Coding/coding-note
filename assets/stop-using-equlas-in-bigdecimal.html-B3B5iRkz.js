import{_ as i,o as e,c as a,e as l}from"./app-BihAYnmf.js";const c={},n=l(`<p>BigDecimal，相信对于很多人来说都不陌生，很多人都知道他的用法，这是一种java.math包中提供的一种可以用来进行精确运算的类型。</p><p>很多人都知道，在进行金额表示、金额计算等场景，不能使用double、float等类型，而是要使用对精度支持的更好的BigDecimal。</p><p>所以，很多支付、电商、金融等业务中，BigDecimal的使用非常频繁。而且不得不说这是一个非常好用的类，其内部自带了很多方法，如加，减，乘，除等运算方法都是可以直接调用的。</p><p>除了需要用BigDecimal表示数字和进行数字运算以外，代码中还经常需要对于数字进行相等判断。</p><p>关于这个知识点，在最新版的《阿里巴巴Java开发手册》中也有说明：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/09/16004945569932.jpg" alt=""></p><p>这背后的思考是什么呢？</p><p>我在之前的CodeReview中，看到过以下这样的低级错误：</p><pre><code>if(bigDecimal == bigDecimal1){
    // 两个数相等
}
</code></pre><p>这种错误，相信聪明的读者一眼就可以看出问题，<strong>因为BigDecimal是对象，所以不能用<code>==</code>来判断两个数字的值是否相等。</strong></p><p>以上这种问题，在有一定的经验之后，还是可以避免的，但是聪明的读者，看一下以下这行代码，你觉得他有问题吗：</p><pre><code>if(bigDecimal.equals(bigDecimal1)){
    // 两个数相等
}
</code></pre><p>可以明确的告诉大家，以上这种写法，可能得到的结果和你预想的不一样！</p><p>先来做个实验，运行以下代码：</p><pre><code>BigDecimal bigDecimal = new BigDecimal(1);
BigDecimal bigDecimal1 = new BigDecimal(1);
System.out.println(bigDecimal.equals(bigDecimal1));


BigDecimal bigDecimal2 = new BigDecimal(1);
BigDecimal bigDecimal3 = new BigDecimal(1.0);
System.out.println(bigDecimal2.equals(bigDecimal3));


BigDecimal bigDecimal4 = new BigDecimal(&quot;1&quot;);
BigDecimal bigDecimal5 = new BigDecimal(&quot;1.0&quot;);
System.out.println(bigDecimal4.equals(bigDecimal5));
</code></pre><p>以上代码，输出结果为：</p><pre><code>true
true
false
</code></pre><h3 id="bigdecimal的equals原理" tabindex="-1"><a class="header-anchor" href="#bigdecimal的equals原理"><span>BigDecimal的equals原理</span></a></h3><p>通过以上代码示例，我们发现，在使用BigDecimal的equals方法对1和1.0进行比较的时候，有的时候是true（当使用int、double定义BigDecimal时），有的时候是false（当使用String定义BigDecimal时）。</p><p>那么，为什么会出现这样的情况呢，我们先来看下BigDecimal的equals方法。</p><p>在BigDecimal的JavaDoc中其实已经解释了其中原因：</p><pre><code>Compares this  BigDecimal with the specified Object for equality.  Unlike compareTo, this method considers two BigDecimal objects equal only if they are equal in value and scale (thus 2.0 is not equal to 2.00 when compared by  this method)
</code></pre><p>大概意思就是，<strong>equals方法和compareTo并不一样，equals方法会比较两部分内容，分别是值（value）和标度（scale）</strong></p><p>对应的代码如下：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/09/16004955317132.jpg" alt=""></p><p>所以，我们以上代码定义出来的两个BigDecimal对象（bigDecimal4和bigDecimal5）的标度是不一样的，所以使用equals比较的结果就是false了。</p><p>尝试着对代码进行debug，在debug的过程中我们也可以看到bigDecimal4的标度时0，而bigDecimal5的标度是1。</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/09/16004956382289.jpg" alt=""></p><p>到这里，我们大概解释清楚了，之所以equals比较bigDecimal4和bigDecimal5的结果是false，是因为标度不同。</p><p>那么，为什么标度不同呢？为什么bigDecimal2和bigDecimal3的标度是一样的（当使用int、double定义BigDecimal时），而bigDecimal4和bigDecimal5却不一样（当使用String定义BigDecimal时）呢？</p><h3 id="为什么标度不同" tabindex="-1"><a class="header-anchor" href="#为什么标度不同"><span>为什么标度不同</span></a></h3><p>这个就涉及到BigDecimal的标度问题了，这个问题其实是比较复杂的，由于不是本文的重点，这里面就简单介绍一下吧。大家感兴趣的话，后面单独讲。</p><p>首先，BigDecimal一共有以下4个构造方法：</p><pre><code>BigDecimal(int)
BigDecimal(double) 
BigDecimal(long) 
BigDecimal(String)
</code></pre><p>以上四个方法，创建出来的的BigDecimal的标度是不同的。</p><h4 id="bigdecimal-long-和bigdecimal-int" tabindex="-1"><a class="header-anchor" href="#bigdecimal-long-和bigdecimal-int"><span>BigDecimal(long) 和BigDecimal(int)</span></a></h4><p>首先，最简单的就是<strong>BigDecimal(long) 和BigDecimal(int)，因为是整数，所以标度就是0</strong> ：</p><pre><code>public BigDecimal(int val) {
    this.intCompact = val;
    this.scale = 0;
    this.intVal = null;
}

public BigDecimal(long val) {
    this.intCompact = val;
    this.intVal = (val == INFLATED) ? INFLATED_BIGINT : null;
    this.scale = 0;
}
</code></pre><h4 id="bigdecimal-double" tabindex="-1"><a class="header-anchor" href="#bigdecimal-double"><span>BigDecimal(double)</span></a></h4><p>而对于BigDecimal(double) ，<strong>当我们使用new BigDecimal(0.1)创建一个BigDecimal 的时候，其实创建出来的值并不是整好等于0.1的，而是0.1000000000000000055511151231257827021181583404541015625 。这是因为doule自身表示的只是一个近似值。</strong></p><p>那么，无论我们使用new BigDecimal(0.1)还是new BigDecimal(0.10)定义，他的近似值都是0.1000000000000000055511151231257827021181583404541015625这个，那么他的标度就是这个数字的位数，即55。</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/09/16004965161081.jpg" alt=""></p><p>其他的浮点数也同样的道理。对于new BigDecimal(1.0)这样的形式来说，因为他本质上也是个整数，所以他创建出来的数字的标度就是0。</p><p>所以，因为BigDecimal(1.0)和BigDecimal(1.00)的标度是一样的，所以在使用equals方法比较的时候，得到的结果就是true。</p><h4 id="bigdecimal-string" tabindex="-1"><a class="header-anchor" href="#bigdecimal-string"><span>BigDecimal(string)</span></a></h4><p>而对于BigDecimal(double) ，<strong>当我们使用new BigDecimal(&quot;0.1&quot;)创建一个BigDecimal 的时候，其实创建出来的值正好就是等于0.1的。那么他的标度也就是1。</strong></p><p>如果使用new BigDecimal(&quot;0.10000&quot;)，那么创建出来的数就是0.10000，标度也就是5。</p><p>所以，因为BigDecimal(&quot;1.0&quot;)和BigDecimal(&quot;1.00&quot;)的标度不一样，所以在使用equals方法比较的时候，得到的结果就是false。</p><h3 id="如何比较bigdecimal" tabindex="-1"><a class="header-anchor" href="#如何比较bigdecimal"><span>如何比较BigDecimal</span></a></h3><p>前面，我们解释了BigDecimal的equals方法，其实不只是会比较数字的值，还会对其标度进行比较。</p><p>所以，当我们使用equals方法判断判断两个数是否相等的时候，是极其严格的。</p><p>那么，如果我们只想判断两个BigDecimal的值是否相等，那么该如何判断呢？</p><p><strong>BigDecimal中提供了compareTo方法，这个方法就可以只比较两个数字的值，如果两个数相等，则返回0。</strong></p><pre><code>    BigDecimal bigDecimal4 = new BigDecimal(&quot;1&quot;);
    BigDecimal bigDecimal5 = new BigDecimal(&quot;1.0000&quot;);
    System.out.println(bigDecimal4.compareTo(bigDecimal5));
</code></pre><p>以上代码，输出结果：</p><pre><code>0
</code></pre><p>其源码如下：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/09/16004972460075.jpg" alt=""></p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>BigDecimal是一个非常好用的表示高精度数字的类，其中提供了很多丰富的方法。</p><p>但是，他的equals方法使用的时候需要谨慎，因为他在比较的时候，不仅比较两个数字的值，还会比较他们的标度，只要这两个因素有一个是不相等的，那么结果也是false、</p><p>如果读者想要对两个BigDecimal的数值进行比较的话，可以使用compareTo方法。</p>`,62),p=[n];function g(t,m){return e(),a("div",null,p)}const o=i(c,[["render",g],["__file","stop-using-equlas-in-bigdecimal.html.vue"]]),d=JSON.parse('{"path":"/docs/java/java-basic/stop-using-equlas-in-bigdecimal.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"BigDecimal的equals原理","slug":"bigdecimal的equals原理","link":"#bigdecimal的equals原理","children":[]},{"level":3,"title":"为什么标度不同","slug":"为什么标度不同","link":"#为什么标度不同","children":[]},{"level":3,"title":"如何比较BigDecimal","slug":"如何比较bigdecimal","link":"#如何比较bigdecimal","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/stop-using-equlas-in-bigdecimal.md"}');export{o as comp,d as data};
