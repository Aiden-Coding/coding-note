import{_ as i,r,o,c as p,a as e,b as t,d as a,e as c}from"./app-BihAYnmf.js";const s={},l=e("p",null,"关于String有没有长度限制的问题，我之前单独写过一篇文章分析过，最近我又抽空回顾了一下这个问题，发现又有了一些新的认识。于是准备重新整理下这个内容。",-1),d=e("p",null,"这次在之前那篇文章的基础上除了增加了一些验证过程外，还有些错误内容的修正。我这次在分析过程中会尝试对Jdk的编译过程进行debug，并且会参考一些JVM规范等全方面的介绍下这个知识点。",-1),g={href:"https://www.bilibili.com/video/BV1uK4y1t7H1/",target:"_blank",rel:"noopener noreferrer"},h=c(`<h3 id="string的长度限制" tabindex="-1"><a class="header-anchor" href="#string的长度限制"><span>String的长度限制</span></a></h3><p>想要搞清楚这个问题，首先我们需要翻阅一下String的源码，看下其中是否有关于长度的限制或者定义。</p><p>String类中有很多重载的构造函数，其中有几个是支持用户传入length来执行长度的：</p><pre><code>public String(byte bytes[], int offset, int length) 
</code></pre><p>可以看到，这里面的参数length是使用int类型定义的，那么也就是说，String定义的时候，最大支持的长度就是int的最大范围值。</p><p>根据Integer类的定义，<code>java.lang.Integer#MAX_VALUE</code>的最大值是2^31 - 1;</p><p>那么，我们是不是就可以认为String能支持的最大长度就是这个值了呢？</p><p>其实并不是，这个值只是在运行期，我们构造String的时候可以支持的一个最大长度，而实际上，在编译期，定义字符串的时候也是有长度限制的。</p><p>如以下代码：</p><pre><code>String s = &quot;11111...1111&quot;;//其中有10万个字符&quot;1&quot;
</code></pre><p>当我们使用如上形式定义一个字符串的时候，当我们执行javac编译时，是会抛出异常的，提示如下：</p><pre><code>错误: 常量字符串过长
</code></pre><p>那么，明明String的构造函数指定的长度是可以支持2147483647(2^31 - 1)的，为什么像以上形式定义的时候无法编译呢？</p><p>其实，形如<code>String s = &quot;xxx&quot;;</code>定义String的时候，xxx被我们称之为字面量，这种字面量在编译之后会以常量的形式进入到Class常量池。</p><p>那么问题就来了，因为要进入常量池，就要遵守常量池的有关规定。</p><h3 id="常量池限制" tabindex="-1"><a class="header-anchor" href="#常量池限制"><span>常量池限制</span></a></h3><p>我们知道，javac是将Java文件编译成class文件的一个命令，那么在Class文件生成过程中，就需要遵守一定的格式。</p><p>根据《Java虚拟机规范》中第4.4章节常量池的定义，CONSTANT_String_info 用于表示 java.lang.String 类型的常量对象，格式如下：</p><pre><code>CONSTANT_String_info {
    u1 tag;
    u2 string_index;
}
</code></pre><p>其中，string_index 项的值必须是对常量池的有效索引， 常量池在该索引处的项必须是 CONSTANT_Utf8_info 结构，表示一组 Unicode 码点序列，这组 Unicode 码点序列最终会被初始化为一个 String 对象。</p><p>CONSTANT_Utf8_info 结构用于表示字符串常量的值：</p><pre><code>CONSTANT_Utf8_info {
    u1 tag;
    u2 length;
    u1 bytes[length];
}
</code></pre><p>其中，length则指明了 bytes[]数组的长度，其类型为u2，</p><p>通过翻阅《规范》，我们可以获悉。u2表示两个字节的无符号数，那么1个字节有8位，2个字节就有16位。</p><p>16位无符号数可表示的最大值位2^16 - 1 = 65535。</p><p>也就是说，Class文件中常量池的格式规定了，其字符串常量的长度不能超过65535。</p><p>那么，我们尝试使用以下方式定义字符串：</p><pre><code> String s = &quot;11111...1111&quot;;//其中有65535个字符&quot;1&quot;
</code></pre><p>尝试使用javac编译，同样会得到&quot;错误: 常量字符串过长&quot;，那么原因是什么呢？</p><p>其实，这个原因在javac的代码中是可以找到的，在Gen类中有如下代码：</p><pre><code>private void checkStringConstant(DiagnosticPosition var1, Object var2) {
    if (this.nerrs == 0 &amp;&amp; var2 != null &amp;&amp; var2 instanceof String &amp;&amp; ((String)var2).length() &gt;= 65535) {
        this.log.error(var1, &quot;limit.string&quot;, new Object[0]);
        ++this.nerrs;
    }
}
</code></pre><p>代码中可以看出，当参数类型为String，并且长度大于等于65535的时候，就会导致编译失败。</p><p>这个地方大家可以尝试着debug一下javac的编译过程，也可以发现这个地方会报错。</p><p>如果我们尝试以65534个字符定义字符串，则会发现可以正常编译。</p><p>其实，关于这个值，在《Java虚拟机规范》也有过说明：</p><blockquote><p>if the Java Virtual Machine code for a method is exactly 65535 bytes long and ends with an instruction that is 1 byte long, then that instruction cannot be protected by an exception handler. A compiler writer can work around this bug by limiting the maximum size of the generated Java Virtual Machine code for any method, instance initialization method, or static initializer (the size of any code array) to 65534 bytes</p></blockquote><h3 id="运行期限制" tabindex="-1"><a class="header-anchor" href="#运行期限制"><span>运行期限制</span></a></h3><p>上面提到的这种String长度的限制是编译期的限制，也就是使用String s= “”;这种字面值方式定义的时候才会有的限制。</p><p>那么。String在运行期有没有限制呢，答案是有的，就是我们前文提到的那个Integer.MAX_VALUE ，这个值约等于4G，在运行期，如果String的长度超过这个范围，就可能会抛出异常。(在jdk 1.9之前）</p><p>int 是一个 32 位变量类型，取正数部分来算的话，他们最长可以有</p><pre><code>2^31-1 =2147483647 个 16-bit Unicodecharacter

2147483647 * 16 = 34359738352 位
34359738352 / 8 = 4294967294 (Byte)
4294967294 / 1024 = 4194303.998046875 (KB)
4194303.998046875 / 1024 = 4095.9999980926513671875 (MB)
4095.9999980926513671875 / 1024 = 3.99999999813735485076904296875 (GB)
</code></pre><p>有近 4G 的容量。</p><p>很多人会有疑惑，编译的时候最大长度都要求小于65535了，运行期怎么会出现大于65535的情况呢。这其实很常见，如以下代码：</p><pre><code>String s = &quot;&quot;;
for (int i = 0; i &lt;100000 ; i++) {
    s+=&quot;i&quot;;
}
</code></pre><p>得到的字符串长度就有10万，另外我之前在实际应用中遇到过这个问题。</p><p>之前一次系统对接，需要传输高清图片，约定的传输方式是对方将图片转成BASE64编码，我们接收到之后再转成图片。</p><p>在将BASE64编码后的内容赋值给字符串的时候就抛了异常。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>字符串有长度限制，在编译期，要求字符串常量池中的常量不能超过65535，并且在javac执行过程中控制了最大值为65534。</p><p>在运行期，长度不能超过Int的范围，否则会抛异常。</p>`,50),u={href:"https://www.bilibili.com/video/BV1uK4y1t7H1/",target:"_blank",rel:"noopener noreferrer"};function _(v,S){const n=r("ExternalLinkIcon");return o(),p("div",null,[l,d,e("p",null,[t("因为这个问题涉及到Java的编译原理相关的知识，所以通过视频的方式讲解会更加容易理解一些，视频我上传到了B站："),e("a",g,[t("【灵魂拷问】Java中的String到底有没有长度限制？"),a(n)])]),h,e("p",null,[t("最后，这个知识点 ，我录制了视频("),e("a",u,[t("点击跳转"),a(n)]),t(") ，其中有关于如何进行实验测试、如何查阅Java规范以及如何对javac进行deubg的技巧。欢迎进一步学习。")])])}const m=i(s,[["render",_],["__file","length-of-string.html.vue"]]),b=JSON.parse('{"path":"/docs/java/java-basic/length-of-string.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"String的长度限制","slug":"string的长度限制","link":"#string的长度限制","children":[]},{"level":3,"title":"常量池限制","slug":"常量池限制","link":"#常量池限制","children":[]},{"level":3,"title":"运行期限制","slug":"运行期限制","link":"#运行期限制","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/length-of-string.md"}');export{m as comp,b as data};
