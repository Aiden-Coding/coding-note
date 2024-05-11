import{_ as e,o as n,c as t,e as a}from"./app-BihAYnmf.js";const r={},o=a(`<p>在Java中有两类线程：User Thread(用户线程)、Daemon Thread(守护线程) 。用户线程一般用户执行用户级任务，而守护线程也就是“后台线程”，一般用来执行后台任务，守护线程最典型的应用就是GC(垃圾回收器)。</p><p>这两种线程其实是没有什么区别的，唯一的区别就是Java虚拟机在所有“用户线程”都结束后就会退出。</p><p>我们可以通过使用<code>setDaemon()</code>方法通过传递true作为参数，使线程成为一个守护线程。我们必须在启动线程之前调用一个线程的<code>setDaemon()</code>方法。否则，就会抛出一个<code>java.lang.IllegalThreadStateException</code>。</p><p>可以使用<code>isDaemon()</code>方法来检查线程是否是守护线程。</p><pre><code>/**
 * @author Hollis
 */
public class Main {
    public static void main(String[] args) {

        Thread t1 = new Thread();
        System.out.println(t1.isDaemon());
        t1.setDaemon(true);
        System.out.println(t1.isDaemon());
        t1.start();
        t1.setDaemon(false);
    }
}
</code></pre><p>以上代码输出结果：</p><pre><code>false
true
Exception in thread &quot;main&quot; java.lang.IllegalThreadStateException
    at java.lang.Thread.setDaemon(Thread.java:1359)
    at com.hollis.Main.main(Main.java:16)
</code></pre><p>我们提到，当JVM中只剩下守护线程的时候，JVM就会退出，那么写一段代码测试下：</p><pre><code>/**
 * @author Hollis
 */
public class Main {
    public static void main(String[] args) {

        Thread childThread = new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    System.out.println(&quot;I&#39;m child thread..&quot;);
                    try {
                        TimeUnit.MILLISECONDS.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
        childThread.start();
        System.out.println(&quot;I&#39;m main thread...&quot;);
    }
}
</code></pre><p>以上代码中，我们在Main线程中开启了一个子线程，在并没有显示将其设置为守护线程的情况下，他是一个用户线程，代码比较好理解，就是子线程处于一个while(true)循环中，每隔一秒打印一次<code>I&#39;m child thread..</code></p><p>输出结果为：</p><pre><code>I&#39;m main thread...
I&#39;m child thread..
I&#39;m child thread..
.....
I&#39;m child thread..
I&#39;m child thread..
</code></pre><p>我们再把子线程设置成守护线程，重新运行以上代码。</p><pre><code>/**
 * @author Hollis
 */
public class Main {
    public static void main(String[] args) {

        Thread childThread = new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    System.out.println(&quot;I&#39;m child thread..&quot;);
                    try {
                        TimeUnit.MILLISECONDS.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
        childThread.setDaemon(true);
        childThread.start();
        System.out.println(&quot;I&#39;m main thread...&quot;);
    }
}
</code></pre><p>以上代码，我们通过<code>childThread.setDaemon(true);</code>把子线程设置成守护线程，然后运行，得到以下结果：</p><pre><code>I&#39;m main thread...
I&#39;m child thread..
</code></pre><p>子线程只打印了一次，也就是，在main线程执行结束后，由于子线程是一个守护线程，JVM就会直接退出了。</p><p><strong>值得注意的是，在Daemon线程中产生的新线程也是Daemon的。</strong></p><p>提到线程，有一个很重要的东西我们需要介绍一下，那就是ThreadLocal。</p>`,19),d=[o];function i(c,l){return n(),t("div",null,d)}const h=e(r,[["render",i],["__file","deamon-thread.html.vue"]]),m=JSON.parse('{"path":"/docs/java/concurrent-coding/deamon-thread.html","title":"守护线程","lang":"en-US","frontmatter":{"title":"守护线程"},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715385399000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":2}]},"filePathRelative":"docs/java/concurrent-coding/deamon-thread.md"}');export{h as comp,m as data};
