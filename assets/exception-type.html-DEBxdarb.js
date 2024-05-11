import{_ as e,o as t,c as a,e as c}from"./app-BihAYnmf.js";const n={},o=c(`<p>Java中的异常， 主要可以分为两⼤类， 即受检异常（ checked exception） 和 ⾮受检异常（ unchecked exception）</p><h3 id="受检异常" tabindex="-1"><a class="header-anchor" href="#受检异常"><span>受检异常</span></a></h3><p>对于受检异常来说， 如果⼀个⽅法在声明的过程中证明了其要有受检异常抛出：</p><pre><code>public void test() throw new Exception{ }
</code></pre><p>那么，当我们在程序中调⽤他的时候， ⼀定要对该异常进⾏处理（ 捕获或者向上抛出） ， 否则是⽆法编译通过的。 这是⼀种强制规范。</p><p>这种异常在IO操作中⽐较多。 ⽐如FileNotFoundException ， 当我们使⽤IO流处理⼀个⽂件的时候， 有⼀种特殊情况， 就是⽂件不存在， 所以， 在⽂件处理的接⼜定义时他会显⽰抛出FileNotFoundException， ⽬的就是告诉这个⽅法的调⽤者，我这个⽅法不保证⼀定可以成功， 是有可能找不到对应的⽂件 的， 你要明确的对这种情况做特殊处理哦。</p><p>所以说， 当我们希望我们的⽅法调⽤者， 明确的处理⼀些特殊情况的时候， 就应该使⽤受检异常。</p><h3 id="非受检异常" tabindex="-1"><a class="header-anchor" href="#非受检异常"><span>非受检异常</span></a></h3><p>对于⾮受检异常来说， ⼀般是运⾏时异常， 继承⾃RuntimeException。 在编写代码的时候， 不需要显⽰的捕获，但是如果不捕获， 在运⾏期如果发⽣异常就会中断程序的执⾏。</p><p>这种异常⼀般可以理解为是代码原因导致的。 ⽐如发⽣空指针、 数组越界等。 所以， 只要代码写的没问题， 这些异常都是可以避免的。 也就不需要我们显⽰的进⾏处理。</p><p>试想⼀下， 如果你要对所有可能发⽣空指针的地⽅做异常处理的话， 那相当于你的所有代码都需要做这件事。</p>`,11),p=[o];function i(s,d){return t(),a("div",null,p)}const r=e(n,[["render",i],["__file","exception-type.html.vue"]]),h=JSON.parse('{"path":"/docs/java/java-basic/exception-type.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"受检异常","slug":"受检异常","link":"#受检异常","children":[]},{"level":3,"title":"非受检异常","slug":"非受检异常","link":"#非受检异常","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/exception-type.md"}');export{r as comp,h as data};
