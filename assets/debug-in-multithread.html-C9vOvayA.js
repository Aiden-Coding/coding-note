import{_ as e,o as t,c as n,e as a}from"./app-BihAYnmf.js";const r={},d=a(`<p>在学习过了前面几篇文章之后，相信很多人对于Java中的多线程都有了一定的了解，相信很多读者已经尝试过中写一些多线程的代码了。</p><p>但是我之前面试过很多人，很多人都知道多线程怎么实现，但是却不知道如何调试多线程的代码，这篇文章我们来介绍下如何调试多线程的代码。</p><p>首先我们写一个多线程的例子，使用实现Runnable接口的方式定义多个线程，并启动执行。</p><pre><code>/**
 * @author Hollis
 */
public class MultiThreadDebug {

    public static void main(String[] args) {
        MyThread myThread = new MyThread();

        Thread thread1 = new Thread(myThread, &quot;thread 1&quot;);
        Thread thread2 = new Thread(myThread, &quot;thread 2&quot;);
        Thread thread3 = new Thread(myThread, &quot;thread 3&quot;);

        thread1.start();

        thread2.start();

        thread3.start();
    }
}

class MyThread implements Runnable {

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + &quot; running&quot;);
    }
}

我们尝试在代码中设置断点，并使用debug模式启动。
</code></pre><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/11/16065562943648.jpg" alt="">￼</p><p>如题，程序启动后，会进入一个线程的断点中，我们尝试看一下当前是哪个线程：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/11/16065563249582.jpg" alt="">￼</p><p>发现是thread 1进入了断点。接着，我们尝试让代码继续执行，代码就直接结束运行，并且控制台打印如下：</p><pre><code>Connected to the target VM, address: &#39;127.0.0.1:55768&#39;, transport: &#39;socket&#39;
thread 3 running
Disconnected from the target VM, address: &#39;127.0.0.1:55768&#39;, transport: &#39;socket&#39;
thread 2 running
thread 1 running

Process finished with exit code 0
</code></pre><p>如果我们多次执行这个代码，就会发现，每一次打印的结果都不一样，三个线程的输出顺序是随机的，并且每一次debug只会进入到一个线程的执行。</p><p>每次执行结果随即是因为不一定哪个线程可以先获得CPU时间片。</p><p>那么，我们怎么才能让每一个线程的执行都能被debug呢？如何在多线程中进行debug排查问题呢？</p><p>其实，在IDEA中有一个设置，那就是当我们在断点处单击鼠标右键就会弹出一个设置对话框，当我们把其中的All 修改为 Thread之后，尝试重新执行debug代码。</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/11/16065565440571.jpg" alt="">￼</p><p>重新执行之后，就可以发现，每一个线程都会进入到断点当中了。</p>`,15),o=[d];function c(h,p){return t(),n("div",null,o)}const i=e(r,[["render",c],["__file","debug-in-multithread.html.vue"]]),u=JSON.parse('{"path":"/docs/java/concurrent-coding/debug-in-multithread.html","title":"线程调试","lang":"en-US","frontmatter":{"title":"线程调试"},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715385399000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":2}]},"filePathRelative":"docs/java/concurrent-coding/debug-in-multithread.md"}');export{i as comp,u as data};
