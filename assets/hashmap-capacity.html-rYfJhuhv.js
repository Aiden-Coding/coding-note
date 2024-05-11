import{_ as c,r as l,o as s,c as i,a as t,d as o,b as a,e as p}from"./app-BihAYnmf.js";const n={},h=t("p",null,"很多人在通过阅读源码的方式学习Java，这是个很好的方式。而JDK的源码自然是首选。在JDK的众多类中，我觉得HashMap及其相关的类是设计的比较好的。很多人读过HashMap的代码，不知道你们有没有和我一样，觉得HashMap中关于容量相关的参数定义的太多了，傻傻分不清楚。",-1),u=t("p",null,"其实，这篇文章介绍的内容比较简单，只要认真的看看HashMap的原理还是可以理解的，单独写一篇文章的原因是因为我后面还有几篇关于HashMap源码分析的文章，这些概念不熟悉的话阅读后面的文章会很吃力。",-1),r=t("p",null,"先来看一下，HashMap中都定义了哪些成员变量。",-1),d={href:"http://www.hollischuang.com/wp-content/uploads/2018/05/paramInMap.png",target:"_blank",rel:"noopener noreferrer"},q=t("img",{src:"http://www.hollischuang.com/wp-content/uploads/2018/05/paramInMap.png",alt:"paramInMap",width:"523",height:"288",class:"aligncenter size-full wp-image-2424"},null,-1),m=p(`<p>上面是一张HashMap中主要的成员变量的图，其中有一个是我们本文主要关注的： <code>size</code>、<code>loadFactor</code>、<code>threshold</code>、<code>DEFAULT_LOAD_FACTOR</code>和<code>DEFAULT_INITIAL_CAPACITY</code>。</p><p>我们先来简单解释一下这些参数的含义，然后再分析他们的作用。</p><p>HashMap类中有以下主要成员变量：</p><ul><li>transient int size; <ul><li>记录了Map中KV对的个数</li></ul></li><li>loadFactor <ul><li>装载因子，用来衡量HashMap满的程度。loadFactor的默认值为0.75f（<code>static final float DEFAULT_LOAD_FACTOR = 0.75f;</code>）。</li></ul></li><li>int threshold; <ul><li>临界值，当实际KV个数超过threshold时，HashMap会将容量扩容，threshold＝容量*装载因子</li></ul></li><li>除了以上这些重要成员变量外，HashMap中还有一个和他们紧密相关的概念：capacity <ul><li>容量，如果不指定，默认容量是16(<code>static final int DEFAULT_INITIAL_CAPACITY = 1 &lt;&lt; 4;</code>)</li></ul></li></ul><p>可能看完了你还是有点蒙，size和capacity之间有啥关系？为啥要定义这两个变量。loadFactor和threshold又是干啥的？</p><h3 id="size-和-capacity" tabindex="-1"><a class="header-anchor" href="#size-和-capacity"><span>size 和 capacity</span></a></h3><p>HashMap中的size和capacity之间的区别其实解释起来也挺简单的。我们知道，HashMap就像一个“桶”，那么capacity就是这个桶“当前”最多可以装多少元素，而size表示这个桶已经装了多少元素。来看下以下代码：</p><pre><code>    Map&lt;String, String&gt; map = new HashMap&lt;String, String&gt;();
    map.put(&quot;hollis&quot;, &quot;hollischuang&quot;);

    Class&lt;?&gt; mapType = map.getClass();
    Method capacity = mapType.getDeclaredMethod(&quot;capacity&quot;);
    capacity.setAccessible(true);
    System.out.println(&quot;capacity : &quot; + capacity.invoke(map));

    Field size = mapType.getDeclaredField(&quot;size&quot;);
    size.setAccessible(true);
    System.out.println(&quot;size : &quot; + size.get(map));
</code></pre><p>我们定义了一个新的HashMap，并想其中put了一个元素，然后通过反射的方式打印capacity和size。输出结果为：<strong>capacity : 16、size : 1</strong></p>`,9),g={href:"http://www.hollischuang.com/archives/2091",target:"_blank",rel:"noopener noreferrer"},y=p(`<p>为什么我刚刚说capacity就是这个桶“当前”最多可以装多少元素呢？当前怎么理解呢。其实，HashMap是具有扩容机制的。在一个HashMap第一次初始化的时候，默认情况下他的容量是16，当达到扩容条件的时候，就需要进行扩容了，会从16扩容成32。</p><p>我们知道，HashMap的重载的构造函数中，有一个是支持传入initialCapacity的，那么我们尝试着设置一下，看结果如何。</p><pre><code>    Map&lt;String, String&gt; map = new HashMap&lt;String, String&gt;(1);

    Class&lt;?&gt; mapType = map.getClass();
    Method capacity = mapType.getDeclaredMethod(&quot;capacity&quot;);
    capacity.setAccessible(true);
    System.out.println(&quot;capacity : &quot; + capacity.invoke(map));

    Map&lt;String, String&gt; map = new HashMap&lt;String, String&gt;(7);

    Class&lt;?&gt; mapType = map.getClass();
    Method capacity = mapType.getDeclaredMethod(&quot;capacity&quot;);
    capacity.setAccessible(true);
    System.out.println(&quot;capacity : &quot; + capacity.invoke(map));


    Map&lt;String, String&gt; map = new HashMap&lt;String, String&gt;(9);

    Class&lt;?&gt; mapType = map.getClass();
    Method capacity = mapType.getDeclaredMethod(&quot;capacity&quot;);
    capacity.setAccessible(true);
    System.out.println(&quot;capacity : &quot; + capacity.invoke(map));
</code></pre><p>分别执行以上3段代码，分别输出：<strong>capacity : 1、capacity : 8、capacity : 16</strong>。</p><p>也就是说，默认情况下HashMap的容量是16，但是，如果用户通过构造函数指定了一个数字作为容量，那么Hash会选择大于该数字的第一个2的幂作为容量。(1-&gt;1、7-&gt;8、9-&gt;16)</p><blockquote><p>这里有一个小建议：在初始化HashMap的时候，应该尽量指定其大小。尤其是当你已知map中存放的元素个数时。（《阿里巴巴Java开发规约》）</p></blockquote><h3 id="loadfactor-和-threshold" tabindex="-1"><a class="header-anchor" href="#loadfactor-和-threshold"><span>loadFactor 和 threshold</span></a></h3><p>前面我们提到过，HashMap有扩容机制，就是当达到扩容条件时会进行扩容，从16扩容到32、64、128...</p><p>那么，这个扩容条件指的是什么呢？</p><p>其实，HashMap的扩容条件就是当HashMap中的元素个数（size）超过临界值（threshold）时就会自动扩容。</p><p>在HashMap中，threshold = loadFactor * capacity。</p><p>loadFactor是装载因子，表示HashMap满的程度，默认值为0.75f，设置成0.75有一个好处，那就是0.75正好是3/4，而capacity又是2的幂。所以，两个数的乘积都是整数。</p><p>对于一个默认的HashMap来说，默认情况下，当其size大于12(16*0.75)时就会触发扩容。</p><p>验证代码如下：</p><pre><code>    Map&lt;String, String&gt; map = new HashMap&lt;&gt;();
    map.put(&quot;hollis1&quot;, &quot;hollischuang&quot;);
    map.put(&quot;hollis2&quot;, &quot;hollischuang&quot;);
    map.put(&quot;hollis3&quot;, &quot;hollischuang&quot;);
    map.put(&quot;hollis4&quot;, &quot;hollischuang&quot;);
    map.put(&quot;hollis5&quot;, &quot;hollischuang&quot;);
    map.put(&quot;hollis6&quot;, &quot;hollischuang&quot;);
    map.put(&quot;hollis7&quot;, &quot;hollischuang&quot;);
    map.put(&quot;hollis8&quot;, &quot;hollischuang&quot;);
    map.put(&quot;hollis9&quot;, &quot;hollischuang&quot;);
    map.put(&quot;hollis10&quot;, &quot;hollischuang&quot;);
    map.put(&quot;hollis11&quot;, &quot;hollischuang&quot;);
    map.put(&quot;hollis12&quot;, &quot;hollischuang&quot;);
    Class&lt;?&gt; mapType = map.getClass();

    Method capacity = mapType.getDeclaredMethod(&quot;capacity&quot;);
    capacity.setAccessible(true);
    System.out.println(&quot;capacity : &quot; + capacity.invoke(map));

    Field size = mapType.getDeclaredField(&quot;size&quot;);
    size.setAccessible(true);
    System.out.println(&quot;size : &quot; + size.get(map));

    Field threshold = mapType.getDeclaredField(&quot;threshold&quot;);
    threshold.setAccessible(true);
    System.out.println(&quot;threshold : &quot; + threshold.get(map));

    Field loadFactor = mapType.getDeclaredField(&quot;loadFactor&quot;);
    loadFactor.setAccessible(true);
    System.out.println(&quot;loadFactor : &quot; + loadFactor.get(map));

    map.put(&quot;hollis13&quot;, &quot;hollischuang&quot;);
    Method capacity = mapType.getDeclaredMethod(&quot;capacity&quot;);
    capacity.setAccessible(true);
    System.out.println(&quot;capacity : &quot; + capacity.invoke(map));

    Field size = mapType.getDeclaredField(&quot;size&quot;);
    size.setAccessible(true);
    System.out.println(&quot;size : &quot; + size.get(map));

    Field threshold = mapType.getDeclaredField(&quot;threshold&quot;);
    threshold.setAccessible(true);
    System.out.println(&quot;threshold : &quot; + threshold.get(map));

    Field loadFactor = mapType.getDeclaredField(&quot;loadFactor&quot;);
    loadFactor.setAccessible(true);
    System.out.println(&quot;loadFactor : &quot; + loadFactor.get(map));
</code></pre><p>输出结果：</p><pre><code>capacity : 16
size : 12
threshold : 12
loadFactor : 0.75

capacity : 32
size : 13
threshold : 24
loadFactor : 0.75
</code></pre><p>当HashMap中的元素个数达到13的时候，capacity就从16扩容到32了。</p><p>HashMap中还提供了一个支持传入initialCapacity,loadFactor两个参数的方法，来初始化容量和装载因子。不过，一般不建议修改loadFactor的值。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>HashMap中size表示当前共有多少个KV对，capacity表示当前HashMap的容量是多少，默认值是16，每次扩容都是成倍的。loadFactor是装载因子，当Map中元素个数超过<code>loadFactor* capacity</code>的值时，会触发扩容。<code>loadFactor* capacity</code>可以用threshold表示。</p><p>PS：文中分析基于JDK1.8.0_73</p>`,22);function M(F,_){const e=l("ExternalLinkIcon");return s(),i("div",null,[h,u,r,t("p",null,[t("a",d,[q,o(e)])]),m,t("p",null,[a("默认情况下，一个HashMap的容量（capacity）是16，设计成16的好处我在《"),t("a",g,[a("全网把Map中的hash()分析的最透彻的文章，别无二家。"),o(e)]),a("》中也简单介绍过，主要是可以使用按位与替代取模来提升hash的效率。")]),y])}const S=c(n,[["render",M],["__file","hashmap-capacity.html.vue"]]),z=JSON.parse('{"path":"/docs/java/java-basic/hashmap-capacity.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"size 和 capacity","slug":"size-和-capacity","link":"#size-和-capacity","children":[]},{"level":3,"title":"loadFactor 和 threshold","slug":"loadfactor-和-threshold","link":"#loadfactor-和-threshold","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/hashmap-capacity.md"}');export{S as comp,z as data};
