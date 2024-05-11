import{_ as t,r as o,o as a,c as l,a as n,b as e,d,e as i}from"./app-BihAYnmf.js";const p={},c=i(`<p>在上一节中，我们介绍了几种Java中字符串拼接的方式，以及优缺点。其中还有一个重要的拼接方式我没有介绍，那就是Java 8中提供的StringJoiner ，本文就来介绍一下这个字符串拼接的新兵。</p><p>如果你想知道一共有多少种方法可以进行字符串拼接，教你一个简单的办法，在Intellij IDEA中，定义一个Java Bean，然后尝试使用快捷键自动生成一个toString方法，IDEA会提示多种toString生成策略可供选择。</p><p><img src="http://www.hollischuang.com/wp-content/uploads/2019/02/15508994967943.jpg" alt="">￼</p><p>目前我使用的IDEA的toString生成策略默认的是使用JDK 1.8提供的StringJoiner。</p><h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h3><p>StringJoiner是java.util包中的一个类，用于构造一个由分隔符分隔的字符序列（可选），并且可以从提供的前缀开始并以提供的后缀结尾。虽然这也可以在StringBuilder类的帮助下在每个字符串之后附加分隔符，但StringJoiner提供了简单的方法来实现，而无需编写大量代码。</p><p>StringJoiner类共有2个构造函数，5个公有方法。其中最常用的方法就是add方法和toString方法，类似于StringBuilder中的append方法和toString方法。</p><h3 id="用法" tabindex="-1"><a class="header-anchor" href="#用法"><span>用法</span></a></h3><p>StringJoiner的用法比较简单，下面的代码中，我们使用StringJoiner进行了字符串拼接。</p><pre><code>public class StringJoinerTest {

    public static void main(String[] args) {
        StringJoiner sj = new StringJoiner(&quot;Hollis&quot;);

        sj.add(&quot;hollischuang&quot;);
        sj.add(&quot;Java干货&quot;);
        System.out.println(sj.toString());

        StringJoiner sj1 = new StringJoiner(&quot;:&quot;,&quot;[&quot;,&quot;]&quot;);

        sj1.add(&quot;Hollis&quot;).add(&quot;hollischuang&quot;).add(&quot;Java干货&quot;);
        System.out.println(sj1.toString());
    }
}
</code></pre><p>以上代码输出结果：</p><pre><code>hollischuangHollisJava干货
[Hollis:hollischuang:Java干货]
</code></pre><p>值得注意的是，当我们<code>StringJoiner(CharSequence delimiter)</code>初始化一个<code>StringJoiner</code>的时候，这个<code>delimiter</code>其实是分隔符，并不是可变字符串的初始值。</p><p><code>StringJoiner(CharSequence delimiter,CharSequence prefix,CharSequence suffix)</code>的第二个和第三个参数分别是拼接后的字符串的前缀和后缀。</p><h3 id="原理" tabindex="-1"><a class="header-anchor" href="#原理"><span>原理</span></a></h3><p>介绍了简单的用法之后，我们再来看看这个StringJoiner的原理，看看他到底是如何实现的。主要看一下add方法：</p><pre><code>public StringJoiner add(CharSequence newElement) {
    prepareBuilder().append(newElement);
    return this;
}

private StringBuilder prepareBuilder() {
    if (value != null) {
        value.append(delimiter);
    } else {
        value = new StringBuilder().append(prefix);
    }
    return value;
}
</code></pre><p>看到了一个熟悉的身影——StringBuilder ，没错，StringJoiner其实就是依赖StringBuilder实现的。</p><p>当我们发现StringJoiner其实是通过StringBuilder实现之后，我们大概就可以猜到，<strong>他的性能损耗应该和直接使用StringBuilder差不多</strong>！</p><h3 id="为什么需要stringjoiner" tabindex="-1"><a class="header-anchor" href="#为什么需要stringjoiner"><span>为什么需要StringJoiner</span></a></h3><p>在了解了StringJoiner的用法和原理后，可能很多读者就会产生一个疑问，明明已经有一个StringBuilder了，为什么Java 8中还要定义一个StringJoiner呢？到底有什么好处呢？</p><p>如果读者足够了解Java 8的话，或许可以猜出个大概，这肯定和Stream有关。</p>`,22),s={href:"https://docs.oracle.com/javase/8/docs/api/java/util/StringJoiner.html",target:"_blank",rel:"noopener noreferrer"},u=i(`<blockquote><p>A StringJoiner may be employed to create formatted output from a Stream using Collectors.joining(CharSequence)</p></blockquote><p>试想，在Java中，如果我们有这样一个List：</p><pre><code>List&lt;String&gt; list = ImmutableList.of(&quot;Hollis&quot;,&quot;hollischuang&quot;,&quot;Java干货&quot;);
</code></pre><p>如果我们想要把他拼接成一个以下形式的字符串：</p><pre><code>Hollis,hollischuang,Java干货
</code></pre><p>可以通过以下方式：</p><pre><code>StringBuilder builder = new StringBuilder();

if (!list.isEmpty()) {
    builder.append(list.get(0));
    for (int i = 1, n = list.size(); i &lt; n; i++) {
        builder.append(&quot;,&quot;).append(list.get(i));
    }
}
builder.toString();
</code></pre><p>还可以使用：</p><pre><code>list.stream().reduce(new StringBuilder(), (sb, s) -&gt; sb.append(s).append(&#39;,&#39;), StringBuilder::append).toString();
</code></pre><p>但是输出结果稍有些不同，需要进行二次处理：</p><pre><code>Hollis,hollischuang,Java干货,
</code></pre><p>还可以使用&quot;+&quot;进行拼接：</p><pre><code>list.stream().reduce((a,b)-&gt;a + &quot;,&quot; + b).toString();
</code></pre><p>以上几种方式，要么是代码复杂，要么是性能不高，或者无法直接得到想要的结果。</p><p>为了满足类似这样的需求，Java 8中提供的StringJoiner就派上用场了。以上需求只需要一行代码：</p><pre><code>list.stream().collect(Collectors.joining(&quot;:&quot;))
</code></pre><p>即可。上面用的表达式中，Collectors.joining的源代码如下：</p><pre><code>public static Collector&lt;CharSequence, ?, String&gt; joining(CharSequence delimiter,
                                                         CharSequence prefix,
                                                         CharSequence suffix) {
    return new CollectorImpl&lt;&gt;(
            () -&gt; new StringJoiner(delimiter, prefix, suffix),
            StringJoiner::add, StringJoiner::merge,
            StringJoiner::toString, CH_NOID);
}
</code></pre><p>其实现原理就是借助了StringJoiner。</p><p>当然，或许在<code>Collector</code>中直接使用<code>StringBuilder</code>似乎也可以实现类似的功能，只不过稍微麻烦一些。所以，Java 8中提供了<code>StringJoiner</code>来丰富<code>Stream</code>的用法。</p><p>而且<code>StringJoiner</code>也可以方便的增加前缀和后缀，比如我们希望得到的字符串是<code>[Hollis,hollischuang,Java干货]</code>而不是<code>Hollis,hollischuang,Java</code>干货的话，StringJoiner的优势就更加明显了。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>本文介绍了Java 8中提供的可变字符串类——StringJoiner，可以用于字符串拼接。</p><p>StringJoiner其实是通过StringBuilder实现的，所以他的性能和StringBuilder差不多，他也是非线程安全的。</p><p>如果日常开发中中，需要进行字符串拼接，如何选择？</p><p>1、如果只是简单的字符串拼接，考虑直接使用&quot;+&quot;即可。</p><p>2、如果是在for循环中进行字符串拼接，考虑使用<code>StringBuilder</code>和<code>StringBuffer</code>。</p><p>3、如果是通过一个<code>List</code>进行字符串拼接，则考虑使用<code>StringJoiner</code>。</p>`,28);function g(S,h){const r=o("ExternalLinkIcon");return a(),l("div",null,[c,n("p",null,[e("作者也在"),n("a",s,[e("Java doc"),d(r)]),e("中找到了答案：")]),u])}const m=t(p,[["render",g],["__file","stringjoiner-in-java8.html.vue"]]),q=JSON.parse('{"path":"/docs/java/java-basic/stringjoiner-in-java8.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"介绍","slug":"介绍","link":"#介绍","children":[]},{"level":3,"title":"用法","slug":"用法","link":"#用法","children":[]},{"level":3,"title":"原理","slug":"原理","link":"#原理","children":[]},{"level":3,"title":"为什么需要StringJoiner","slug":"为什么需要stringjoiner","link":"#为什么需要stringjoiner","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/stringjoiner-in-java8.md"}');export{m as comp,q as data};
