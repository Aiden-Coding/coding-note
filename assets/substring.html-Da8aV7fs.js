import{_ as n,o as e,c as t,e as s}from"./app-BihAYnmf.js";const i={},r=s(`<p>String是Java中一个比较基础的类，每一个开发人员都会经常接触到。而且，String也是面试中经常会考的知识点。</p><p>String有很多方法，有些方法比较常用，有些方法不太常用。今天要介绍的substring就是一个比较常用的方法，而且围绕substring也有很多面试题。</p><p><code>substring(int beginIndex, int endIndex)</code>方法在不同版本的JDK中的实现是不同的。了解他们的区别可以帮助你更好的使用他。为简单起见，后文中用<code>substring()</code>代表<code>substring(int beginIndex, int endIndex)</code>方法。</p><h2 id="substring-的作用" tabindex="-1"><a class="header-anchor" href="#substring-的作用"><span>substring() 的作用</span></a></h2><p><code>substring(int beginIndex, int endIndex)</code>方法截取字符串并返回其[beginIndex,endIndex-1]范围内的内容。</p><pre><code>String x = &quot;abcdef&quot;;
x = x.substring(1,3);
System.out.println(x);
</code></pre><p>输出内容：</p><pre><code>bc
</code></pre><h2 id="调用substring-时发生了什么" tabindex="-1"><a class="header-anchor" href="#调用substring-时发生了什么"><span>调用substring()时发生了什么？</span></a></h2><p>你可能知道，因为x是不可变的，当使用<code>x.substring(1,3)</code>对x赋值的时候，它会指向一个全新的字符串：</p><p><img src="http://www.programcreek.com/wp-content/uploads/2013/09/string-immutability1-650x303.jpeg" alt="string-immutability1"></p><p>然而，这个图不是完全正确的表示堆中发生的事情。因为在jdk6 和 jdk7中调用substring时发生的事情并不一样。</p><h2 id="jdk-6中的substring" tabindex="-1"><a class="header-anchor" href="#jdk-6中的substring"><span>JDK 6中的substring</span></a></h2><p>String是通过字符数组实现的。在jdk 6 中，String类包含三个成员变量：<code>char value[]</code>， <code>int offset</code>，<code>int count</code>。他们分别用来存储真正的字符数组，数组的第一个位置索引以及字符串中包含的字符个数。</p><p>当调用substring方法的时候，会创建一个新的string对象，但是这个string的值仍然指向堆中的同一个字符数组。这两个对象中只有count和offset 的值是不同的。</p><p><img src="http://www.programcreek.com/wp-content/uploads/2013/09/string-substring-jdk6-650x389.jpeg" alt="string-substring-jdk6"></p><p>下面是证明上说观点的Java源码中的关键代码：</p><pre><code>//JDK 6
String(int offset, int count, char value[]) {
    this.value = value;
    this.offset = offset;
    this.count = count;
}

public String substring(int beginIndex, int endIndex) {
    //check boundary
    return  new String(offset + beginIndex, endIndex - beginIndex, value);
}
</code></pre><h2 id="jdk-6中的substring导致的问题" tabindex="-1"><a class="header-anchor" href="#jdk-6中的substring导致的问题"><span>JDK 6中的substring导致的问题</span></a></h2><p>如果你有一个很长很长的字符串，但是当你使用substring进行切割的时候你只需要很短的一段。这可能导致性能问题，因为你需要的只是一小段字符序列，但是你却引用了整个字符串（因为这个非常长的字符数组一直在被引用，所以无法被回收，就可能导致内存泄露）。在JDK 6中，一般用以下方式来解决该问题，原理其实就是生成一个新的字符串并引用他。</p><pre><code>x = x.substring(x, y) + &quot;&quot;
</code></pre><p>关于JDK 6中subString的使用不当会导致内存系列已经被官方记录在Java Bug Database中：</p><img src="http://www.hollischuang.com/wp-content/uploads/2016/03/leak.png" alt="leak" width="1089" height="744" class="aligncenter size-full wp-image-2660"><blockquote><p>内存泄露：在计算机科学中，内存泄漏指由于疏忽或错误造成程序未能释放已经不再使用的内存。 内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，导致在释放该段内存之前就失去了对该段内存的控制，从而造成了内存的浪费。</p></blockquote><h2 id="jdk-7-中的substring" tabindex="-1"><a class="header-anchor" href="#jdk-7-中的substring"><span>JDK 7 中的substring</span></a></h2><p>上面提到的问题，在jdk 7中得到解决。在jdk 7 中，substring方法会在堆内存中创建一个新的数组。</p><p><img src="http://www.programcreek.com/wp-content/uploads/2013/09/string-substring-jdk71-650x389.jpeg" alt="string-substring-jdk7"></p><p>Java源码中关于这部分的主要代码如下：</p><pre><code>//JDK 7
public String(char value[], int offset, int count) {
    //check boundary
    this.value = Arrays.copyOfRange(value, offset, offset + count);
}

public String substring(int beginIndex, int endIndex) {
    //check boundary
    int subLen = endIndex - beginIndex;
    return new String(value, beginIndex, subLen);
}
</code></pre><p>以上是JDK 7中的subString方法，其使用<code>new String</code>创建了一个新字符串，避免对老字符串的引用。从而解决了内存泄露问题。</p><p>所以，如果你的生产环境中使用的JDK版本小于1.7，当你使用String的subString方法时一定要注意，避免内存泄露。</p>`,31),a=[r];function d(g,c){return e(),t("div",null,a)}const o=n(i,[["render",d],["__file","substring.html.vue"]]),p=JSON.parse('{"path":"/docs/java/java-basic/substring.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"substring() 的作用","slug":"substring-的作用","link":"#substring-的作用","children":[]},{"level":2,"title":"调用substring()时发生了什么？","slug":"调用substring-时发生了什么","link":"#调用substring-时发生了什么","children":[]},{"level":2,"title":"JDK 6中的substring","slug":"jdk-6中的substring","link":"#jdk-6中的substring","children":[]},{"level":2,"title":"JDK 6中的substring导致的问题","slug":"jdk-6中的substring导致的问题","link":"#jdk-6中的substring导致的问题","children":[]},{"level":2,"title":"JDK 7 中的substring","slug":"jdk-7-中的substring","link":"#jdk-7-中的substring","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/substring.md"}');export{o as comp,p as data};
