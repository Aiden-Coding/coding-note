import{_ as a,o as n,c as e,e as l}from"./app-BihAYnmf.js";const i={},t=l(`<p>final是Java中的一个关键字，它所表示的是“这部分是无法修改的”。</p><p>使用 final 可以定义 ：变量、方法、类。</p><h3 id="final变量" tabindex="-1"><a class="header-anchor" href="#final变量"><span>final变量</span></a></h3><p>如果将变量设置为final，则不能更改final变量的值(它将是常量)。</p><pre><code>class Test{
     final String name = &quot;Hollis&quot;;
 
}
</code></pre><p>一旦final变量被定义之后，是无法进行修改的。</p><h3 id="final方法" tabindex="-1"><a class="header-anchor" href="#final方法"><span>final方法</span></a></h3><p>如果任何方法声明为final，则不能覆盖它。</p><pre><code>class Parent {
    final void name() {
        System.out.println(&quot;Hollis&quot;);
    }
}
</code></pre><p>当我们定义以上类的子类的时候，无法覆盖其name方法，会编译失败。</p><h3 id="final类" tabindex="-1"><a class="header-anchor" href="#final类"><span>final类</span></a></h3><p>如果把任何一个类声明为final，则不能继承它。</p><pre><code>final class Parent {
    
}
</code></pre><p>以上类不能被继承！</p>`,14),s=[t];function c(o,f){return n(),e("div",null,s)}const p=a(i,[["render",c],["__file","final-in-java.html.vue"]]),d=JSON.parse('{"path":"/docs/java/java-basic/final-in-java.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"final变量","slug":"final变量","link":"#final变量","children":[]},{"level":3,"title":"final方法","slug":"final方法","link":"#final方法","children":[]},{"level":3,"title":"final类","slug":"final类","link":"#final类","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/final-in-java.md"}');export{p as comp,d as data};
