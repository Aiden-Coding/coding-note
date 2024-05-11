import{_ as n,o as e,c as t,e as r}from"./app-BihAYnmf.js";const o={},i=r(`<p>字符串，是Java中最常用的一个数据类型了。</p><p>本文，也是对于Java中字符串相关知识的一个补充，主要来介绍一下字符串拼接相关的知识。本文基于jdk1.8.0_181。</p><h3 id="字符串拼接" tabindex="-1"><a class="header-anchor" href="#字符串拼接"><span>字符串拼接</span></a></h3><p>字符串拼接是我们在Java代码中比较经常要做的事情，就是把多个字符串拼接到一起。</p><p>我们都知道，<strong>String是Java中一个不可变的类</strong>，所以他一旦被实例化就无法被修改。</p><blockquote><p>不可变类的实例一旦创建，其成员变量的值就不能被修改。这样设计有很多好处，比如可以缓存hashcode、使用更加便利以及更加安全等。</p></blockquote><p>但是，既然字符串是不可变的，那么字符串拼接又是怎么回事呢？</p><p><strong>字符串不变性与字符串拼接</strong></p><p>其实，所有的所谓字符串拼接，都是重新生成了一个新的字符串。下面一段字符串拼接代码：</p><pre><code>String s = &quot;abcd&quot;;
s = s.concat(&quot;ef&quot;);
</code></pre><p>其实最后我们得到的s已经是一个新的字符串了。如下图</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2019/01/15472897908391.jpg" alt="">￼</p><p>s中保存的是一个重新创建出来的String对象的引用。</p><p>那么，在Java中，到底如何进行字符串拼接呢？字符串拼接有很多种方式，这里简单介绍几种比较常用的。</p><p><strong>使用<code>+</code>拼接字符串</strong></p><p>在Java中，拼接字符串最简单的方式就是直接使用符号<code>+</code>来拼接。如：</p><pre><code>String wechat = &quot;Hollis&quot;;
String introduce = &quot;每日更新Java相关技术文章&quot;;
String hollis = wechat + &quot;,&quot; + introduce;
</code></pre><p><strong>concat</strong><br> 除了使用<code>+</code>拼接字符串之外，还可以使用String类中的方法concat方法来拼接字符串。如：</p><pre><code>String wechat = &quot;Hollis&quot;;
String introduce = &quot;每日更新Java相关技术文章&quot;;
String hollis = wechat.concat(&quot;,&quot;).concat(introduce);
</code></pre><p><strong>StringBuffer</strong></p><p>关于字符串，Java中除了定义了一个可以用来定义<strong>字符串常量</strong>的<code>String</code>类以外，还提供了可以用来定义<strong>字符串变量</strong>的<code>StringBuffer</code>类，它的对象是可以扩充和修改的。</p><p>使用<code>StringBuffer</code>可以方便的对字符串进行拼接。如：</p><pre><code>StringBuffer wechat = new StringBuffer(&quot;Hollis&quot;);
String introduce = &quot;每日更新Java相关技术文章&quot;;
StringBuffer hollis = wechat.append(&quot;,&quot;).append(introduce);
</code></pre><p><strong>StringBuilder</strong><br> 除了<code>StringBuffer</code>以外，还有一个类<code>StringBuilder</code>也可以使用，其用法和<code>StringBuffer</code>类似。如：</p><pre><code>StringBuilder wechat = new StringBuilder(&quot;Hollis&quot;);
String introduce = &quot;每日更新Java相关技术文章&quot;;
StringBuilder hollis = wechat.append(&quot;,&quot;).append(introduce);
</code></pre><p><strong>StringUtils.join</strong><br> 除了JDK中内置的字符串拼接方法，还可以使用一些开源类库中提供的字符串拼接方法名，如<code>apache.commons中</code>提供的<code>StringUtils</code>类，其中的<code>join</code>方法可以拼接字符串。</p><pre><code>String wechat = &quot;Hollis&quot;;
String introduce = &quot;每日更新Java相关技术文章&quot;;
System.out.println(StringUtils.join(wechat, &quot;,&quot;, introduce));
</code></pre><p>这里简单说一下，StringUtils中提供的join方法，最主要的功能是：将数组或集合以某拼接符拼接到一起形成新的字符串，如：</p><pre><code>String []list  ={&quot;Hollis&quot;,&quot;每日更新Java相关技术文章&quot;};
String result= StringUtils.join(list,&quot;,&quot;);
System.out.println(result);
//结果：Hollis,每日更新Java相关技术文章
</code></pre><p>并且，Java8中的String类中也提供了一个静态的join方法，用法和StringUtils.join类似。</p><p>以上就是比较常用的五种在Java种拼接字符串的方式，那么到底哪种更好用呢？为什么阿里巴巴Java开发手册中不建议在循环体中使用<code>+</code>进行字符串拼接呢？</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2019/01/15472850170230.jpg" alt="" style="width:917px;">￼</p><p>(阿里巴巴Java开发手册中关于字符串拼接的规约)</p><h3 id="使用-拼接字符串的实现原理" tabindex="-1"><a class="header-anchor" href="#使用-拼接字符串的实现原理"><span>使用<code>+</code>拼接字符串的实现原理</span></a></h3><p>关于这个知识点，前面的章节介绍过，主要是通过StringBuilder的append方法实现的。</p><h3 id="concat是如何实现的" tabindex="-1"><a class="header-anchor" href="#concat是如何实现的"><span>concat是如何实现的</span></a></h3><p>我们再来看一下concat方法的源代码，看一下这个方法又是如何实现的。</p><pre><code>public String concat(String str) {
    int otherLen = str.length();
    if (otherLen == 0) {
        return this;
    }
    int len = value.length;
    char buf[] = Arrays.copyOf(value, len + otherLen);
    str.getChars(buf, len);
    return new String(buf, true);
}
</code></pre><p>这段代码首先创建了一个字符数组，长度是已有字符串和待拼接字符串的长度之和，再把两个字符串的值复制到新的字符数组中，并使用这个字符数组创建一个新的String对象并返回。</p><p>通过源码我们也可以看到，经过concat方法，其实是new了一个新的String，这也就呼应到前面我们说的字符串的不变性问题上了。</p><h3 id="stringbuffer和stringbuilder" tabindex="-1"><a class="header-anchor" href="#stringbuffer和stringbuilder"><span>StringBuffer和StringBuilder</span></a></h3><p>接下来我们看看<code>StringBuffer</code>和<code>StringBuilder</code>的实现原理。</p><p>和<code>String</code>类类似，<code>StringBuilder</code>类也封装了一个字符数组，定义如下：</p><pre><code>char[] value;
</code></pre><p>与<code>String</code>不同的是，它并不是<code>final</code>的，所以他是可以修改的。另外，与<code>String</code>不同，字符数组中不一定所有位置都已经被使用，它有一个实例变量，表示数组中已经使用的字符个数，定义如下：</p><pre><code>int count;
</code></pre><p>其append源码如下：</p><pre><code>public StringBuilder append(String str) {
    super.append(str);
    return this;
}
</code></pre><p>该类继承了<code>AbstractStringBuilder</code>类，看下其<code>append</code>方法：</p><pre><code>public AbstractStringBuilder append(String str) {
    if (str == null)
        return appendNull();
    int len = str.length();
    ensureCapacityInternal(count + len);
    str.getChars(0, len, value, count);
    count += len;
    return this;
}
</code></pre><p>append会直接拷贝字符到内部的字符数组中，如果字符数组长度不够，会进行扩展。</p><p><code>StringBuffer</code>和<code>StringBuilder</code>类似，最大的区别就是<code>StringBuffer</code>是线程安全的，看一下<code>StringBuffer</code>的<code>append</code>方法。</p><pre><code>public synchronized StringBuffer append(String str) {
    toStringCache = null;
    super.append(str);
    return this;
}
</code></pre><p>该方法使用<code>synchronized</code>进行声明，说明是一个线程安全的方法。而<code>StringBuilder</code>则不是线程安全的。</p><h3 id="stringutils-join是如何实现的" tabindex="-1"><a class="header-anchor" href="#stringutils-join是如何实现的"><span>StringUtils.join是如何实现的</span></a></h3><p>通过查看<code>StringUtils.join</code>的源代码，我们可以发现，其实他也是通过<code>StringBuilder</code>来实现的。</p><pre><code>public static String join(final Object[] array, String separator, final int startIndex, final int endIndex) {
    if (array == null) {
        return null;
    }
    if (separator == null) {
        separator = EMPTY;
    }

    // endIndex - startIndex &amp;gt; 0:   Len = NofStrings *(len(firstString) + len(separator))
    //           (Assuming that all Strings are roughly equally long)
    final int noOfItems = endIndex - startIndex;
    if (noOfItems &amp;lt;= 0) {
        return EMPTY;
    }

    final StringBuilder buf = new StringBuilder(noOfItems * 16);

    for (int i = startIndex; i &amp;lt; endIndex; i++) {
        if (i &amp;gt; startIndex) {
            buf.append(separator);
        }
        if (array[i] != null) {
            buf.append(array[i]);
        }
    }
    return buf.toString();
}
</code></pre><h3 id="效率比较" tabindex="-1"><a class="header-anchor" href="#效率比较"><span>效率比较</span></a></h3><p>既然有这么多种字符串拼接的方法，那么到底哪一种效率最高呢？我们来简单对比一下。</p><pre><code>long t1 = System.currentTimeMillis();
//这里是初始字符串定义
for (int i = 0; i &amp;lt; 50000; i++) {
    //这里是字符串拼接代码
}
long t2 = System.currentTimeMillis();
System.out.println(&quot;cost:&quot; + (t2 - t1));
</code></pre><p>我们使用形如以上形式的代码，分别测试下五种字符串拼接代码的运行时间。得到结果如下：</p><pre><code>+ cost:5119
StringBuilder cost:3
StringBuffer cost:4
concat cost:3623
StringUtils.join cost:25726
</code></pre><p>从结果可以看出，用时从短到长的对比是：</p><p><code>StringBuilder</code>&lt;<code>StringBuffer</code>&lt;<code>concat</code>&lt;<code>+</code>&lt;<code>StringUtils.join</code></p><p><code>StringBuffer</code>在<code>StringBuilder</code>的基础上，做了同步处理，所以在耗时上会相对多一些。</p><p>StringUtils.join也是使用了StringBuilder，并且其中还是有很多其他操作，所以耗时较长，这个也容易理解。其实StringUtils.join更擅长处理字符串数组或者列表的拼接。</p><p>那么问题来了，前面我们分析过，其实使用<code>+</code>拼接字符串的实现原理也是使用的<code>StringBuilder</code>，那为什么结果相差这么多，高达1000多倍呢？</p><p>我们再把以下代码反编译下：</p><pre><code>long t1 = System.currentTimeMillis();
String str = &quot;hollis&quot;;
for (int i = 0; i &amp;lt; 50000; i++) {
    String s = String.valueOf(i);
    str += s;
}
long t2 = System.currentTimeMillis();
System.out.println(&quot;+ cost:&quot; + (t2 - t1));
</code></pre><p>反编译后代码如下：</p><pre><code>long t1 = System.currentTimeMillis();
String str = &quot;hollis&quot;;
for(int i = 0; i &amp;lt; 50000; i++)
{
    String s = String.valueOf(i);
    str = (new StringBuilder()).append(str).append(s).toString();
}

long t2 = System.currentTimeMillis();
System.out.println((new StringBuilder()).append(&quot;+ cost:&quot;).append(t2 - t1).toString());
</code></pre><p>我们可以看到，反编译后的代码，在<code>for</code>循环中，每次都是<code>new</code>了一个<code>StringBuilder</code>，然后再把<code>String</code>转成<code>StringBuilder</code>，再进行<code>append</code>。</p><p>而频繁的新建对象当然要耗费很多时间了，不仅仅会耗费时间，频繁的创建对象，还会造成内存资源的浪费。</p><p>所以，阿里巴巴Java开发手册建议：循环体内，字符串的连接方式，使用 <code>StringBuilder</code> 的 <code>append</code> 方法进行扩展。而不要使用<code>+</code>。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>本文介绍了什么是字符串拼接，虽然字符串是不可变的，但是还是可以通过新建字符串的方式来进行字符串的拼接。</p><p>常用的字符串拼接方式有五种，分别是使用<code>+</code>、使用<code>concat</code>、使用<code>StringBuilder</code>、使用<code>StringBuffer</code>以及使用<code>StringUtils.join</code>。</p><p>由于字符串拼接过程中会创建新的对象，所以如果要在一个循环体中进行字符串拼接，就要考虑内存问题和效率问题。</p><p>因此，经过对比，我们发现，直接使用<code>StringBuilder</code>的方式是效率最高的。因为<code>StringBuilder</code>天生就是设计来定义可变字符串和字符串的变化操作的。</p><p>但是，还要强调的是：</p><p>1、如果不是在循环体中进行字符串拼接的话，直接使用<code>+</code>就好了。</p><p>2、如果在并发场景中进行字符串拼接的话，要使用<code>StringBuffer</code>来代替<code>StringBuilder</code>。</p>`,82),c=[i];function d(p,a){return e(),t("div",null,c)}const s=n(o,[["render",d],["__file","string-concat.html.vue"]]),u=JSON.parse('{"path":"/docs/java/java-basic/string-concat.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"字符串拼接","slug":"字符串拼接","link":"#字符串拼接","children":[]},{"level":3,"title":"使用+拼接字符串的实现原理","slug":"使用-拼接字符串的实现原理","link":"#使用-拼接字符串的实现原理","children":[]},{"level":3,"title":"concat是如何实现的","slug":"concat是如何实现的","link":"#concat是如何实现的","children":[]},{"level":3,"title":"StringBuffer和StringBuilder","slug":"stringbuffer和stringbuilder","link":"#stringbuffer和stringbuilder","children":[]},{"level":3,"title":"StringUtils.join是如何实现的","slug":"stringutils-join是如何实现的","link":"#stringutils-join是如何实现的","children":[]},{"level":3,"title":"效率比较","slug":"效率比较","link":"#效率比较","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/string-concat.md"}');export{s as comp,u as data};
