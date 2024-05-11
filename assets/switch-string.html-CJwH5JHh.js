import{_ as t,o as n,c as e,e as c}from"./app-BihAYnmf.js";const s={},i=c(`<p>Java 7中，switch的参数可以是String类型了，这对我们来说是一个很方便的改进。到目前为止switch支持这样几种数据类型：<code>byte</code> <code>short</code> <code>int</code> <code>char</code> <code>String</code> 。但是，作为一个程序员我们不仅要知道他有多么好用，还要知道它是如何实现的，switch对整型的支持是怎么实现的呢？对字符型是怎么实现的呢？String类型呢？有一点Java开发经验的人这个时候都会猜测switch对String的支持是使用equals()方法和hashcode()方法。那么到底是不是这两个方法呢？接下来我们就看一下，switch到底是如何实现的。</p><h3 id="一、switch对整型支持的实现" tabindex="-1"><a class="header-anchor" href="#一、switch对整型支持的实现"><span>一、switch对整型支持的实现</span></a></h3><p>下面是一段很简单的Java代码，定义一个int型变量a，然后使用switch语句进行判断。执行这段代码输出内容为5，那么我们将下面这段代码反编译，看看他到底是怎么实现的。</p><pre><code>public class switchDemoInt {
    public static void main(String[] args) {
        int a = 5;
        switch (a) {
        case 1:
            System.out.println(1);
            break;
        case 5:
            System.out.println(5);
            break;
        default:
            break;
        }
    }
}
//output 5
</code></pre><p>反编译后的代码如下：</p><pre><code>public class switchDemoInt
{
    public switchDemoInt()
    {
    }
    public static void main(String args[])
    {
        int a = 5;
        switch(a)
        {
        case 1: // &#39;\\001&#39;
            System.out.println(1);
            break;

        case 5: // &#39;\\005&#39;
            System.out.println(5);
            break;
        }
    }
}
</code></pre><p>我们发现，反编译后的代码和之前的代码比较除了多了两行注释以外没有任何区别，那么我们就知道，<strong>switch对int的判断是直接比较整数的值</strong>。</p><h3 id="二、switch对字符型支持的实现" tabindex="-1"><a class="header-anchor" href="#二、switch对字符型支持的实现"><span>二、switch对字符型支持的实现</span></a></h3><p>直接上代码：</p><pre><code>public class switchDemoInt {
    public static void main(String[] args) {
        char a = &#39;b&#39;;
        switch (a) {
        case &#39;a&#39;:
            System.out.println(&#39;a&#39;);
            break;
        case &#39;b&#39;:
            System.out.println(&#39;b&#39;);
            break;
        default:
            break;
        }
    }
}
</code></pre><p>编译后的代码如下：</p><pre><code>public class switchDemoChar
{
    public switchDemoChar()
    {
    }
    public static void main(String args[])
    {
        char a = &#39;b&#39;;
        switch(a)
        {
        case 97: // &#39;a&#39;
            System.out.println(&#39;a&#39;);
            break;
        case 98: // &#39;b&#39;
            System.out.println(&#39;b&#39;);
            break;
        }
  }
}
</code></pre><p>通过以上的代码作比较我们发现：对char类型进行比较的时候，实际上比较的是ascii码，编译器会把char型变量转换成对应的int型变量</p><h3 id="三、switch对字符串支持的实现" tabindex="-1"><a class="header-anchor" href="#三、switch对字符串支持的实现"><span>三、switch对字符串支持的实现</span></a></h3><p>还是先上代码：</p><pre><code>public class switchDemoString {
    public static void main(String[] args) {
        String str = &quot;world&quot;;
        switch (str) {
        case &quot;hello&quot;:
            System.out.println(&quot;hello&quot;);
            break;
        case &quot;world&quot;:
            System.out.println(&quot;world&quot;);
            break;
        default:
            break;
        }
    }
}
</code></pre><p>对代码进行反编译：</p><pre><code>public class switchDemoString
{
    public switchDemoString()
    {
    }
    public static void main(String args[])
    {
        String str = &quot;world&quot;;
        String s;
        switch((s = str).hashCode())
        {
        default:
            break;
        case 99162322:
            if(s.equals(&quot;hello&quot;))
                System.out.println(&quot;hello&quot;);
            break;
        case 113318802:
            if(s.equals(&quot;world&quot;))
                System.out.println(&quot;world&quot;);
            break;
        }
    }
}
</code></pre><p>看到这个代码，你知道原来字符串的switch是通过<code>equals()</code>和<code>hashCode()</code>方法来实现的。<strong>记住，switch中只能使用整型</strong>，比如<code>byte</code>。<code>short</code>，<code>char</code>(ackii码是整型)以及<code>int</code>。还好<code>hashCode()</code>方法返回的是<code>int</code>，而不是<code>long</code>。通过这个很容易记住<code>hashCode</code>返回的是<code>int</code>这个事实。仔细看下可以发现，进行<code>switch</code>的实际是哈希值，然后通过使用equals方法比较进行安全检查，这个检查是必要的，因为哈希可能会发生碰撞。因此它的性能是不如使用枚举进行switch或者使用纯整数常量，但这也不是很差。因为Java编译器只增加了一个<code>equals</code>方法，如果你比较的是字符串字面量的话会非常快，比如”abc” ==”abc”。如果你把<code>hashCode()</code>方法的调用也考虑进来了，那么还会再多一次的调用开销，因为字符串一旦创建了，它就会把哈希值缓存起来。因此如果这个<code>switch</code>语句是用在一个循环里的，比如逐项处理某个值，或者游戏引擎循环地渲染屏幕，这里<code>hashCode()</code>方法的调用开销其实不会很大。</p><p>好，以上就是关于switch对整型、字符型、和字符串型的支持的实现方式，总结一下我们可以发现，<strong>其实switch只支持一种数据类型，那就是整型，其他数据类型都是转换成整型之后再使用switch的。</strong></p>`,20),a=[i];function o(r,h){return n(),e("div",null,a)}const l=t(s,[["render",o],["__file","switch-string.html.vue"]]),p=JSON.parse('{"path":"/docs/java/java-basic/switch-string.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"一、switch对整型支持的实现","slug":"一、switch对整型支持的实现","link":"#一、switch对整型支持的实现","children":[]},{"level":3,"title":"二、switch对字符型支持的实现","slug":"二、switch对字符型支持的实现","link":"#二、switch对字符型支持的实现","children":[]},{"level":3,"title":"三、switch对字符串支持的实现","slug":"三、switch对字符串支持的实现","link":"#三、switch对字符串支持的实现","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/switch-string.md"}');export{l as comp,p as data};
