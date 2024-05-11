import{_ as a,o as t,c as e,e as n}from"./app-BihAYnmf.js";const i={},s=n(`<p>static表示“静态”的意思，用来修饰成员变量和成员方法，也可以形成静态static代码块</p><h3 id="静态变量" tabindex="-1"><a class="header-anchor" href="#静态变量"><span>静态变量</span></a></h3><p>我们用static表示变量的级别，一个类中的静态变量，不属于类的对象或者实例。因为静态变量与所有的对象实例共享，因此他们不具线程安全性。</p><p>通常，静态变量常用final关键来修饰，表示通用资源或可以被所有的对象所使用。如果静态变量未被私有化，可以用“类名.变量名”的方式来使用。</p><pre><code>//static variable example
private static int count;
public static String str;
</code></pre><h3 id="静态方法" tabindex="-1"><a class="header-anchor" href="#静态方法"><span>静态方法</span></a></h3><p>与静态变量一样，静态方法是属于类而不是实例。</p><p>一个静态方法只能使用静态变量和调用静态方法。通常静态方法通常用于想给其他的类使用而不需要创建实例。例如：Collections class(类集合)。</p><p>Java的包装类和实用类包含许多静态方法。main()方法就是Java程序入口点，是静态方法。</p><pre><code>//static method example
public static void setCount(int count) {
    if(count &amp;gt; 0)
    StaticExample.count = count;
}

//static util method
public static int addInts(int i, int...js){
    int sum=i;
    for(int x : js) sum+=x;
    return sum;
}
</code></pre><p>从Java8以上版本开始也可以有接口类型的静态方法了。</p><h3 id="静态代码块" tabindex="-1"><a class="header-anchor" href="#静态代码块"><span>静态代码块</span></a></h3><p>Java的静态块是一组指令在类装载的时候在内存中由Java ClassLoader执行。</p><p>静态块常用于初始化类的静态变量。大多时候还用于在类装载时候创建静态资源。</p><p>Java不允许在静态块中使用非静态变量。一个类中可以有多个静态块，尽管这似乎没有什么用。静态块只在类装载入内存时，执行一次。</p><pre><code>static{
    //can be used to initialize resources when class is loaded
    System.out.println(&amp;quot;StaticExample static block&amp;quot;);
    //can access only static variables and methods
    str=&amp;quot;Test&amp;quot;;
    setCount(2);
}
</code></pre><h3 id="静态类" tabindex="-1"><a class="header-anchor" href="#静态类"><span>静态类</span></a></h3><p>Java可以嵌套使用静态类，但是静态类不能用于嵌套的顶层。</p><p>静态嵌套类的使用与其他顶层类一样，嵌套只是为了便于项目打包。</p><p>原文地址：https://zhuanlan.zhihu.com/p/26819685</p>`,20),c=[s];function l(p,o){return t(),e("div",null,c)}const d=a(i,[["render",l],["__file","static-in-java.html.vue"]]),h=JSON.parse('{"path":"/docs/java/java-basic/static-in-java.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"静态变量","slug":"静态变量","link":"#静态变量","children":[]},{"level":3,"title":"静态方法","slug":"静态方法","link":"#静态方法","children":[]},{"level":3,"title":"静态代码块","slug":"静态代码块","link":"#静态代码块","children":[]},{"level":3,"title":"静态类","slug":"静态类","link":"#静态类","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/static-in-java.md"}');export{d as comp,h as data};
