import{_ as a,r as i,o as c,c as d,a as o,b as e,d as n,e as t}from"./app-BihAYnmf.js";const s={},r={href:"http://47.103.216.138/archives/2550",target:"_blank",rel:"noopener noreferrer"},v=o("code",null,"synchronized",-1),p=o("code",null,"volatile",-1),h=o("code",null,"final",-1),_=o("code",null,"concurren包",-1),u={href:"http://47.103.216.138/archives/2637",target:"_blank",rel:"noopener noreferrer"},g=o("code",null,"synchronized",-1),f=o("code",null,"volatile",-1),b=t(`<p>本文就围绕<code>volatile</code>展开，主要介绍<code>volatile</code>的用法、<code>volatile</code>的原理，以及<code>volatile</code>是如何提供可见性和有序性保障的等。</p><p><code>volatile</code>这个关键字，不仅仅在Java语言中有，在很多语言中都有的，而且其用法和语义也都是不尽相同的。尤其在C语言、C++以及Java中，都有<code>volatile</code>关键字。都可以用来声明变量或者对象。下面简单来介绍一下Java语言中的<code>volatile</code>关键字。</p><h3 id="volatile的用法" tabindex="-1"><a class="header-anchor" href="#volatile的用法"><span>volatile的用法</span></a></h3><p><code>volatile</code>通常被比喻成&quot;轻量级的<code>synchronized</code>&quot;，也是Java并发编程中比较重要的一个关键字。和<code>synchronized</code>不同，<code>volatile</code>是一个变量修饰符，只能用来修饰变量。无法修饰方法及代码块等。</p><p><code>volatile</code>的用法比较简单，只需要在声明一个可能被多线程同时访问的变量时，使用<code>volatile</code>修饰就可以了。</p><pre><code>public class Singleton {  
    private volatile static Singleton singleton;  
    private Singleton (){}  
    public static Singleton getSingleton() {  
    if (singleton == null) {  
        synchronized (Singleton.class) {  
        if (singleton == null) {  
            singleton = new Singleton();  
        }  
        }  
    }  
    return singleton;  
    }  
}  
</code></pre><p>如以上代码，是一个比较典型的使用双重锁校验的形式实现单例的，其中使用<code>volatile</code>关键字修饰可能被多个线程同时访问到的singleton。</p><h3 id="volatile的原理" tabindex="-1"><a class="header-anchor" href="#volatile的原理"><span>volatile的原理</span></a></h3>`,8),m={href:"http://47.103.216.138/archives/2550",target:"_blank",rel:"noopener noreferrer"},k=t('<p>但是，对于<code>volatile</code>变量，当对<code>volatile</code>变量进行写操作的时候，JVM会向处理器发送一条lock前缀的指令，将这个缓存中的变量回写到系统主存中。</p><p>但是就算写回到内存，如果其他处理器缓存的值还是旧的，再执行计算操作就会有问题，所以在多处理器下，为了保证各个处理器的缓存是一致的，就会实现<code>缓存一致性协议</code></p><p><strong>缓存一致性协议</strong>：每个处理器通过嗅探在总线上传播的数据来检查自己缓存的值是不是过期了，当处理器发现自己缓存行对应的内存地址被修改，就会将当前处理器的缓存行设置成无效状态，当处理器要对这个数据进行修改操作的时候，会强制重新从系统内存里把数据读到处理器缓存里。</p><p>所以，如果一个变量被<code>volatile</code>所修饰的话，在每次数据变化之后，其值都会被强制刷入主存。而其他处理器的缓存由于遵守了缓存一致性协议，也会把这个变量的值从主存加载到自己的缓存中。这就保证了一个<code>volatile</code>在并发编程中，其值在多个缓存中是可见的。</p><h3 id="volatile与可见性" tabindex="-1"><a class="header-anchor" href="#volatile与可见性"><span>volatile与可见性</span></a></h3><p>可见性是指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值。</p>',6),S={href:"http://47.103.216.138/archives/2550",target:"_blank",rel:"noopener noreferrer"},y=o("p",null,[e("前面的关于"),o("code",null,"volatile"),e("的原理中介绍过了，Java中的"),o("code",null,"volatile"),e("关键字提供了一个功能，那就是被其修饰的变量在被修改后可以立即同步到主内存，被其修饰的变量在每次使用之前都从主内存刷新。因此，可以使用"),o("code",null,"volatile"),e("来保证多线程操作时变量的可见性。")],-1),x=o("h3",{id:"volatile与有序性",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#volatile与有序性"},[o("span",null,"volatile与有序性")])],-1),J=o("p",null,"有序性即程序执行的顺序按照代码的先后顺序执行。",-1),z={href:"http://47.103.216.138/archives/2550",target:"_blank",rel:"noopener noreferrer"},T=o("code",null,"load->add->save",-1),C=o("code",null,"load->save->add",-1),j=t('<p>而<code>volatile</code>除了可以保证数据的可见性之外，还有一个强大的功能，那就是他可以禁止指令重排优化等。</p><p>普通的变量仅仅会保证在该方法的执行过程中所依赖的赋值结果的地方都能获得正确的结果，而不能保证变量的赋值操作的顺序与程序代码中的执行顺序一致。</p><p>volatile可以禁止指令重排，这就保证了代码的程序会严格按照代码的先后顺序执行。这就保证了有序性。被<code>volatile</code>修饰的变量的操作，会严格按照代码顺序执行，<code>load-&gt;add-&gt;save</code> 的执行顺序就是：load、add、save。</p><h3 id="volatile与原子性" tabindex="-1"><a class="header-anchor" href="#volatile与原子性"><span>volatile与原子性</span></a></h3><p>原子性是指一个操作是不可中断的，要全部执行完成，要不就都不执行。</p>',5),w={href:"http://47.103.216.138/archives/2618",target:"_blank",rel:"noopener noreferrer"},N=t(`<p>在上一篇文章中，我们介绍<code>synchronized</code>的时候，提到过，为了保证原子性，需要通过字节码指令<code>monitorenter</code>和<code>monitorexit</code>，但是<code>volatile</code>和这两个指令之间是没有任何关系的。</p><p><strong>所以，<code>volatile</code>是不能保证原子性的。</strong></p><p>在以下两个场景中可以使用<code>volatile</code>来代替<code>synchronized</code>：</p><blockquote><p>1、运算结果并不依赖变量的当前值，或者能够确保只有单一的线程会修改变量的值。</p><p>2、变量不需要与其他状态变量共同参与不变约束。</p></blockquote><p>除以上场景外，都需要使用其他方式来保证原子性，如<code>synchronized</code>或者<code>concurrent包</code>。</p><p>我们来看一下volatile和原子性的例子：</p><pre><code>public class Test {
    public volatile int inc = 0;

    public void increase() {
        inc++;
    }

    public static void main(String[] args) {
        final Test test = new Test();
        for(int i=0;i&lt;10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j&lt;1000;j++)
                        test.increase();
                };
            }.start();
        }

        while(Thread.activeCount()&gt;1)  //保证前面的线程都执行完
            Thread.yield();
        System.out.println(test.inc);
    }
}
</code></pre><p>以上代码比较简单，就是创建10个线程，然后分别执行1000次<code>i++</code>操作。正常情况下，程序的输出结果应该是10000，但是，多次执行的结果都小于10000。这其实就是<code>volatile</code>无法满足原子性的原因。</p><p>为什么会出现这种情况呢，那就是因为虽然volatile可以保证<code>inc</code>在多个线程之间的可见性。但是无法<code>inc++</code>的原子性。</p><h3 id="总结与思考" tabindex="-1"><a class="header-anchor" href="#总结与思考"><span>总结与思考</span></a></h3><p>我们介绍过了<code>volatile</code>关键字和<code>synchronized</code>关键字。现在我们知道，<code>synchronized</code>可以保证原子性、有序性和可见性。而<code>volatile</code>却只能保证有序性和可见性。</p><p>那么，我们再来看一下双重校验锁实现的单例，已经使用了<code>synchronized</code>，为什么还需要<code>volatile</code>？</p><pre><code>public class Singleton {  
    private volatile static Singleton singleton;  
    private Singleton (){}  
    public static Singleton getSingleton() {  
    if (singleton == null) {  
        synchronized (Singleton.class) {  
        if (singleton == null) {  
            singleton = new Singleton();  
        }  
        }  
    }  
    return singleton;  
    }  
}  
</code></pre><p>答案，我们在下一篇文章：既生synchronized，何生亮volatile中介绍，敬请关注我的博客(http://47.103.216.138)和公众号(Hollis)。</p>`,14);function P(U,V){const l=i("ExternalLinkIcon");return c(),d("div",null,[o("p",null,[e("在"),o("a",r,[e("再有人问你Java内存模型是什么，就把这篇文章发给他"),n(l)]),e("中我们曾经介绍过，Java语言为了解决并发编程中存在的原子性、可见性和有序性问题，提供了一系列和并发处理相关的关键字，比如"),v,e("、"),p,e("、"),h,e("、"),_,e("等。在"),o("a",u,[e("前一篇"),n(l)]),e("文章中，我们也介绍了"),g,e("的用法及原理。本文，来分析一下另外一个关键字——"),f,e("。")]),b,o("p",null,[e("在"),o("a",m,[e("再有人问你Java内存模型是什么，就把这篇文章发给他"),n(l)]),e("中我们曾经介绍过，为了提高处理器的执行速度，在处理器和内存之间增加了多级缓存来提升。但是由于引入了多级缓存，就存在缓存数据不一致问题。")]),k,o("p",null,[e("我们在"),o("a",S,[e("再有人问你Java内存模型是什么，就把这篇文章发给他"),n(l)]),e("中分析过：Java内存模型规定了所有的变量都存储在主内存中，每条线程还有自己的工作内存，线程的工作内存中保存了该线程中使用到的变量的主内存副本拷贝，线程对变量的所有操作都必须在工作内存中进行，而不能直接读写主内存。不同的线程之间也无法直接访问对方工作内存中的变量，线程间变量的传递均需要自己的工作内存和主存之间进行数据同步进行。所以，就可能出现线程1改了某个变量的值，但是线程2不可见的情况。")]),y,x,J,o("p",null,[e("我们在"),o("a",z,[e("再有人问你Java内存模型是什么，就把这篇文章发给他"),n(l)]),e("中分析过：除了引入了时间片以外，由于处理器优化和指令重排等，CPU还可能对输入代码进行乱序执行，比如"),T,e(" 有可能被优化成"),C,e(" 。这就是可能存在有序性问题。")]),j,o("p",null,[e("我们在"),o("a",w,[e("Java的并发编程中的多线程问题到底是怎么回事儿？"),n(l)]),e("中分析过：线程是CPU调度的基本单位。CPU有时间片的概念，会根据不同的调度算法进行线程调度。当一个线程获得时间片之后开始执行，在时间片耗尽之后，就会失去CPU使用权。所以在多线程场景下，由于时间片在线程间轮换，就会发生原子性问题。")]),N])}const B=a(s,[["render",P],["__file","volatile.html.vue"]]),E=JSON.parse('{"path":"/docs/java/concurrent-coding/volatile.html","title":"volatile","lang":"en-US","frontmatter":{"title":"volatile"},"headers":[{"level":3,"title":"volatile的用法","slug":"volatile的用法","link":"#volatile的用法","children":[]},{"level":3,"title":"volatile的原理","slug":"volatile的原理","link":"#volatile的原理","children":[]},{"level":3,"title":"volatile与可见性","slug":"volatile与可见性","link":"#volatile与可见性","children":[]},{"level":3,"title":"volatile与有序性","slug":"volatile与有序性","link":"#volatile与有序性","children":[]},{"level":3,"title":"volatile与原子性","slug":"volatile与原子性","link":"#volatile与原子性","children":[]},{"level":3,"title":"总结与思考","slug":"总结与思考","link":"#总结与思考","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715385399000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":2}]},"filePathRelative":"docs/java/concurrent-coding/volatile.md"}');export{B as comp,E as data};
