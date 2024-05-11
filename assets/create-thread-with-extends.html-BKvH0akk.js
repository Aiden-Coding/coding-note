import{_ as e,o as t,c as n,e as r}from"./app-BihAYnmf.js";const a={},d=r(`<pre><code>/**
 * @author Hollis
 */
public class MultiThreads {

    public static void main(String[] args) throws InterruptedException {
        System.out.println(Thread.currentThread().getName());

        System.out.println(&quot;继承Thread类创建线程&quot;);
        SubClassThread subClassThread = new SubClassThread();
        subClassThread.start();  
    }
}

class SubClassThread extends Thread {

    @Override
    public void run() {
        System.out.println(getName());
    }
}
</code></pre><p>输出结果：</p><pre><code>main
继承Thread类创建线程
Thread-0
</code></pre><p>SubClassThread是一个继承了Thread类的子类，继承Thread类，并重写其中的run方法。然后new 一个SubClassThread的对象，并调用其start方法，即可启动一个线程。之后就会运行run中的代码。</p><p>每个线程都是通过某个特定Thread对象所对应的方法<code>run()</code>来完成其操作的，方法<code>run()</code>称为线程体。通过调用Thread类的<code>start()</code>方法来启动一个线程。</p><p>在主线程中，调用了子线程的<code>start()</code>方法后，主线程无需等待子线程的执行，即可执行后续的代码。而子线程便会开始执行其<code>run()</code>方法。</p><p>当然，<code>run()</code>方法也是一个公有方法，在main函数中也可以直接调用这个方法，但是直接调用<code>run()</code>的话，主线程就需要等待其执行完，这种情况下，<code>run()</code>就是一个普通方法。</p><p>如果读者感兴趣的话，查看一下前面介绍的Thread的源码，就可以发现，他继承了一个接口，那就是<code>java.lang.Runnable</code>，其实，开发者在代码中也可以直接通过这个接口创建一个新的线程。</p>`,8),c=[d];function o(s,i){return t(),n("div",null,c)}const u=e(a,[["render",o],["__file","create-thread-with-extends.html.vue"]]),l=JSON.parse('{"path":"/docs/java/concurrent-coding/create-thread-with-extends.html","title":"create-thread-with-extends","lang":"en-US","frontmatter":{"title":"create-thread-with-extends"},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715385399000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":2}]},"filePathRelative":"docs/java/concurrent-coding/create-thread-with-extends.md"}');export{u as comp,l as data};
