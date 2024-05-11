import{_ as e,o as a,c as t,e as l}from"./app-BihAYnmf.js";const r={},n=l(`<p>自从Java 1.5开始，提供了Callable和Future，通过它们可以在任务执行完毕之后得到任务执行结果。</p><pre><code>public class MultiThreads {
    public static void main(String[] args) throws InterruptedException {
        CallableThread callableThread = new CallableThread();
        FutureTask futureTask = new FutureTask&lt;&gt;(callableThread);
        new Thread(futureTask).start();
        System.out.println(futureTask.get());
}

class CallableThread implements Callable {
    @Override
    public Object call() throws Exception {
        System.out.println(Thread.currentThread().getName());
        return &quot;Hollis&quot;;
    }

}
</code></pre><p>输出结果：</p><pre><code>main
通过Callable和FutureTask创建线程
Thread-2
Hollis
</code></pre><p>Callable位于java.util.concurrent包下，它也是一个接口，在它里面也只声明了一个方法，只不过这个方法call()，和Runnable接口中的run()方法不同的是，call()方法有返回值。</p><p>以上代码中，我们在CallableThread的call方法中返回字符串&quot;Hollis&quot;，在主线程是可以获取到的。</p><p>FutureTask可用于异步获取执行结果或取消执行任务的场景。通过传入Callable的任务给FutureTask，直接调用其run方法或者放入线程池执行，之后可以在外部通过FutureTask的get方法异步获取执行结果，因此，FutureTask非常适合用于耗时的计算，主线程可以在完成自己的任务后，再去获取结果。</p><p>另外，FutureTask还可以确保即使调用了多次run方法，它都只会执行一次Runnable或者Callable任务，或者通过cancel取消FutureTask的执行等。</p><p>值得注意的是，<code>futureTask.get()</code>会阻塞主线程，一直等子线程执行完并返回后才能继续执行主线程后面的代码。</p><p>一般，在Callable执行完之前的这段时间，主线程可以先去做一些其他的事情，事情都做完之后，再获取Callable的返回结果。可以通过<code>isDone()</code>来判断子线程是否执行完。</p><p>以上代码改造下就是如下内容：</p><pre><code>public class MultiThreads {
    public static void main(String[] args) throws InterruptedException {
        CallableThread callableThread = new CallableThread();
        FutureTask futureTask = new FutureTask&lt;&gt;(callableThread);
        new Thread(futureTask).start();

        System.out.println(&quot;主线程先做其他重要的事情&quot;);
        if(!futureTask.isDone()){
            // 继续做其他事儿
        }
        System.out.println(future.get()); // 可能会阻塞等待结果
}
</code></pre><p>一般，我们会把Callable放到线程池中，然后让线程池去执行Callable中的代码。关于线程池前面介绍过了，是一种避免重复创建线程的开销的技术手段，线程池也可以用来创建线程。</p>`,13),u=[n];function c(s,o){return a(),t("div",null,u)}const d=e(r,[["render",c],["__file","create-thread-with-callback-future-task.html.vue"]]),p=JSON.parse('{"path":"/docs/java/concurrent-coding/create-thread-with-callback-future-task.html","title":"Callable和Future","lang":"en-US","frontmatter":{"title":"Callable和Future"},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715385399000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":2}]},"filePathRelative":"docs/java/concurrent-coding/create-thread-with-callback-future-task.md"}');export{d as comp,p as data};
