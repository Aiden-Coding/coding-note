import{_ as e,o as n,c as t,e as a}from"./app-BihAYnmf.js";const r={},c=a(`<pre><code>public class MultiThreads {
    public static void main(String[] args) throws InterruptedException {
        System.out.println(Thread.currentThread().getName());


        System.out.println(&quot;实现Runnable接口创建线程&quot;);
        RunnableThread runnableThread = new RunnableThread();
        new Thread(runnableThread).start();

      }
}

class RunnableThread implements Runnable {

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName());
    }
}
</code></pre><p>输出结果：</p><pre><code>main
实现Runnable接口创建线程
Thread-1
</code></pre><p>通过实现接口，同样覆盖<code>run()</code>就可以创建一个新的线程了。</p><p>我们都知道，Java是不支持多继承的，所以，使用Runnbale接口的形式，就可以避免要多继承 。比如有一个类A，已经继承了类B，就无法再继承Thread类了，这时候要想实现多线程，就需要使用Runnable接口了。</p><p>除此之外，两者之间几乎无差别。</p><p>但是，这两种创建线程的方式，其实是有一个缺点的，那就是：在执行完任务之后无法获取执行结果。</p><p>如果我们希望再主线程中得到子线程的执行结果的话，就需要用到Callable和FutureTask</p>`,8),d=[c];function o(l,i){return n(),t("div",null,d)}const m=e(r,[["render",o],["__file","create-thread-with-Implement.html.vue"]]),h=JSON.parse('{"path":"/docs/java/concurrent-coding/create-thread-with-Implement.html","title":"create-thread-with-Implement","lang":"en-US","frontmatter":{"title":"create-thread-with-Implement"},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715385399000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":2}]},"filePathRelative":"docs/java/concurrent-coding/create-thread-with-Implement.md"}');export{m as comp,h as data};
