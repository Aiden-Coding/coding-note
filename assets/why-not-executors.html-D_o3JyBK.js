import{_ as n,r,o as a,c as d,a as e,b as o,d as t,e as u}from"./app-BihAYnmf.js";const i={},l={href:"https://mp.weixin.qq.com/s/-89-CcDnSLBYy3THmcLEdQ",target:"_blank",rel:"noopener noreferrer"},s=e("p",null,"在文中有这样一段描述：",-1),p=e("blockquote",null,[e("p",null,"可以通过Executors静态工厂构建线程池，但一般不建议这样使用。")],-1),h={href:"https://zhuanlan.zhihu.com/p/32867181",target:"_blank",rel:"noopener noreferrer"},x=u(`<p>本文我们就来围绕这个问题来分析一下为什么JDK自身提供的构建线程池的方式并不建议使用？到底应该如何创建一个线程池呢？</p><h3 id="executors" tabindex="-1"><a class="header-anchor" href="#executors"><span>Executors</span></a></h3><p>Executors 是一个Java中的工具类。提供工厂方法来创建不同类型的线程池。</p><p><img src="http://www.hollischuang.com/wp-content/uploads/2018/10/15406248096737.jpg" alt="">￼</p><p>从上图中也可以看出，Executors的创建线程池的方法，创建出来的线程池都实现了ExecutorService接口。常用方法有以下几个：</p><p><code>newFiexedThreadPool(int Threads)</code>：创建固定数目线程的线程池。</p><p><code>newCachedThreadPool()</code>：创建一个可缓存的线程池，调用execute 将重用以前构造的线程（如果线程可用）。如果没有可用的线程，则创建一个新线程并添加到池中。终止并从缓存中移除那些已有 60 秒钟未被使用的线程。</p><p><code>newSingleThreadExecutor()</code>创建一个单线程化的Executor。</p><p><code>newScheduledThreadPool(int corePoolSize)</code>创建一个支持定时及周期性的任务执行的线程池，多数情况下可用来替代Timer类。</p><p>类看起来功能还是比较强大的，又用到了工厂模式、又有比较强的扩展性，重要的是用起来还比较方便，如：</p><pre><code class="language-text">ExecutorService executor = Executors.newFixedThreadPool(nThreads) ;
</code></pre><p>即可创建一个固定大小的线程池。</p><p>但是为什么我说不建议大家使用这个类来创建线程池呢？</p><p>我提到的是『不建议』，但是在阿里巴巴Java开发手册中也明确指出，而且用的词是『不允许』使用Executors创建线程池。 <img src="http://www.hollischuang.com/wp-content/uploads/2018/10/15406254121131.jpg" alt="" style="width:1177px;">￼</p><h3 id="executors存在什么问题" tabindex="-1"><a class="header-anchor" href="#executors存在什么问题"><span>Executors存在什么问题</span></a></h3><p>在阿里巴巴Java开发手册中提到，使用Executors创建线程池可能会导致OOM(OutOfMemory ,内存溢出)，但是并没有说明为什么，那么接下来我们就来看一下到底为什么不允许使用Executors？</p><p>我们先来一个简单的例子，模拟一下使用Executors导致OOM的情况。</p><pre><code class="language-text">/**
 * @author Hollis
 */
public class ExecutorsDemo {
    private static ExecutorService executor = Executors.newFixedThreadPool(15);
    public static void main(String[] args) {
        for (int i = 0; i &lt; Integer.MAX_VALUE; i++) {
            executor.execute(new SubThread());
        }
    }
}

class SubThread implements Runnable {
    @Override
    public void run() {
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            //do nothing
        }
    }
}
</code></pre><p>通过指定JVM参数：<code>-Xmx8m -Xms8m</code> 运行以上代码，会抛出OOM:</p><pre><code class="language-text">Exception in thread &quot;main&quot; java.lang.OutOfMemoryError: GC overhead limit exceeded
    at java.util.concurrent.LinkedBlockingQueue.offer(LinkedBlockingQueue.java:416)
    at java.util.concurrent.ThreadPoolExecutor.execute(ThreadPoolExecutor.java:1371)
    at com.hollis.ExecutorsDemo.main(ExecutorsDemo.java:16)
</code></pre><p>以上代码指出，<code>ExecutorsDemo.java</code>的第16行，就是代码中的<code>executor.execute(new SubThread());</code>。</p><h3 id="executors为什么存在缺陷" tabindex="-1"><a class="header-anchor" href="#executors为什么存在缺陷"><span>Executors为什么存在缺陷</span></a></h3><p>通过上面的例子，我们知道了<code>Executors</code>创建的线程池存在OOM的风险，那么到底是什么原因导致的呢？我们需要深入<code>Executors</code>的源码来分析一下。</p><p>其实，在上面的报错信息中，我们是可以看出蛛丝马迹的，在以上的代码中其实已经说了，真正的导致OOM的其实是<code>LinkedBlockingQueue.offer</code>方法。</p><pre><code class="language-text">Exception in thread &quot;main&quot; java.lang.OutOfMemoryError: GC overhead limit exceeded
    at java.util.concurrent.LinkedBlockingQueue.offer(LinkedBlockingQueue.java:416)
    at java.util.concurrent.ThreadPoolExecutor.execute(ThreadPoolExecutor.java:1371)
    at com.hollis.ExecutorsDemo.main(ExecutorsDemo.java:16)
</code></pre><p>如果读者翻看代码的话，也可以发现，其实底层确实是通过<code>LinkedBlockingQueue</code>实现的：</p><pre><code class="language-text">public static ExecutorService newFixedThreadPool(int nThreads) {
        return new ThreadPoolExecutor(nThreads, nThreads,
                                      0L, TimeUnit.MILLISECONDS,
                                      new LinkedBlockingQueue&lt;Runnable&gt;());
</code></pre><p>如果读者对Java中的阻塞队列有所了解的话，看到这里或许就能够明白原因了。</p><p>Java中的<code>BlockingQueue</code>主要有两种实现，分别是<code>ArrayBlockingQueue</code> 和 <code>LinkedBlockingQueue</code>。</p><p><code>ArrayBlockingQueue</code>是一个用数组实现的有界阻塞队列，必须设置容量。</p><p><code>LinkedBlockingQueue</code>是一个用链表实现的有界阻塞队列，容量可以选择进行设置，不设置的话，将是一个无边界的阻塞队列，最大长度为<code>Integer.MAX_VALUE</code>。</p><p>这里的问题就出在：**不设置的话，将是一个无边界的阻塞队列，最大长度为Integer.MAX_VALUE。**也就是说，如果我们不设置<code>LinkedBlockingQueue</code>的容量的话，其默认容量将会是<code>Integer.MAX_VALUE</code>。</p><p>而<code>newFixedThreadPool</code>中创建<code>LinkedBlockingQueue</code>时，并未指定容量。此时，<code>LinkedBlockingQueue</code>就是一个无边界队列，对于一个无边界队列来说，是可以不断的向队列中加入任务的，这种情况下就有可能因为任务过多而导致内存溢出问题。</p><p>上面提到的问题主要体现在<code>newFixedThreadPool</code>和<code>newSingleThreadExecutor</code>两个工厂方法上，并不是说<code>newCachedThreadPool</code>和<code>newScheduledThreadPool</code>这两个方法就安全了，这两种方式创建的最大线程数可能是<code>Integer.MAX_VALUE</code>，而创建这么多线程，必然就有可能导致OOM。</p><h3 id="创建线程池的正确姿势" tabindex="-1"><a class="header-anchor" href="#创建线程池的正确姿势"><span>创建线程池的正确姿势</span></a></h3><p>避免使用Executors创建线程池，主要是避免使用其中的默认实现，那么我们可以自己直接调用<code>ThreadPoolExecutor</code>的构造函数来自己创建线程池。在创建的同时，给<code>BlockQueue</code>指定容量就可以了。</p><pre><code class="language-text">private static ExecutorService executor = new ThreadPoolExecutor(10, 10,
        60L, TimeUnit.SECONDS,
        new ArrayBlockingQueue(10));
</code></pre><p>这种情况下，一旦提交的线程数超过当前可用线程数时，就会抛出<code>java.util.concurrent.RejectedExecutionException</code>，这是因为当前线程池使用的队列是有边界队列，队列已经满了便无法继续处理新的请求。但是异常（Exception）总比发生错误（Error）要好。</p><p>除了自己定义<code>ThreadPoolExecutor</code>外。还有其他方法。这个时候第一时间就应该想到开源类库，如apache和guava等。</p><p>作者推荐使用guava提供的ThreadFactoryBuilder来创建线程池。</p><pre><code class="language-text">public class ExecutorsDemo {

    private static ThreadFactory namedThreadFactory = new ThreadFactoryBuilder()
        .setNameFormat(&quot;demo-pool-%d&quot;).build();

    private static ExecutorService pool = new ThreadPoolExecutor(5, 200,
        0L, TimeUnit.MILLISECONDS,
        new LinkedBlockingQueue&lt;Runnable&gt;(1024), namedThreadFactory, new ThreadPoolExecutor.AbortPolicy());

    public static void main(String[] args) {

        for (int i = 0; i &lt; Integer.MAX_VALUE; i++) {
            pool.execute(new SubThread());
        }
    }
}
</code></pre><p>通过上述方式创建线程时，不仅可以避免OOM的问题，还可以自定义线程名称，更加方便的出错的时候溯源。</p><p>思考题，文中作者说：发生异常（Exception）要比发生错误（Error）好，为什么这么说？</p><p>文中提到的《阿里巴巴Java开发手册》，请关注公众号Hollis，回复：手册。即可获得完整版PDF。</p>`,44);function E(g,m){const c=r("ExternalLinkIcon");return a(),d("div",null,[e("p",null,[o("在《"),e("a",l,[o("深入源码分析Java线程池的实现原理"),t(c)]),o("》这篇文章中，我们介绍过了Java中线程池的常见用法以及基本原理。")]),s,p,e("p",null,[o("关于这个问题，在那篇文章中并没有深入的展开。作者之所以这么说，是因为这种创建线程池的方式有很大的隐患，稍有不慎就有可能导致线上故障，如：一次Java线程池误用引发的血案和总结（ "),e("a",h,[o("https://zhuanlan.zhihu.com/p/32867181"),t(c)]),o(" ）")]),x])}const T=n(i,[["render",E],["__file","why-not-executors.html.vue"]]),k=JSON.parse('{"path":"/docs/java/concurrent-coding/why-not-executors.html","title":"线程池的常见用","lang":"en-US","frontmatter":{"title":"线程池的常见用"},"headers":[{"level":3,"title":"Executors","slug":"executors","link":"#executors","children":[]},{"level":3,"title":"Executors存在什么问题","slug":"executors存在什么问题","link":"#executors存在什么问题","children":[]},{"level":3,"title":"Executors为什么存在缺陷","slug":"executors为什么存在缺陷","link":"#executors为什么存在缺陷","children":[]},{"level":3,"title":"创建线程池的正确姿势","slug":"创建线程池的正确姿势","link":"#创建线程池的正确姿势","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715385399000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":2}]},"filePathRelative":"docs/java/concurrent-coding/why-not-executors.md"}');export{T as comp,k as data};
