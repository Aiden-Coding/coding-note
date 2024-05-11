import{_ as t,o as r,c as e,e as i}from"./app-BihAYnmf.js";const o={},n=i(`<p>我们学习过，Java虚拟机采用抢占式调度模型。也就是说他会给优先级更高的线程优先分配CPU。</p><p>虽然Java线程调度是系统自动完成的，但是我们还是可以“建议”系统给某些线程多分配一点执行时间，另外的一些线程则可以少分配一点——这项操作可以通过设置线程优先级来完成。</p><p>Java语言一共设置了10个级别的线程优先级（Thread.MIN_PRIORITY至Thread.MAX_PRIORITY），在两个线程同时处于Ready状态时，优先级越高的线程越容易被系统选择执行。</p><p>Java 线程优先级使用 1 ~ 10 的整数表示。默认的优先级是5。</p><pre><code>最低优先级 1：Thread.MIN_PRIORITY

最高优先级 10：Thread.MAX_PRIORITY

普通优先级 5：Thread.NORM_PRIORITY
</code></pre><p>在Java中，可以使用Thread类的<code>setPriority()</code>方法为线程设置了新的优先级。<code>getPriority()</code>方法返回线程的当前优先级。当创建一个线程时，其默认优先级是创建该线程的线程的优先级。</p><p>以下代码演示如何设置和获取线程的优先：</p><pre><code>/**
 * @author Hollis
 */
public class Main {

    public static void main(String[] args) {
        Thread t = Thread.currentThread();
        System.out.println(&quot;Main Thread  Priority:&quot; + t.getPriority());

        Thread t1 = new Thread();
        System.out.println(&quot;Thread(t1) Priority:&quot; + t1.getPriority());
        t1.setPriority(Thread.MAX_PRIORITY - 1);
        System.out.println(&quot;Thread(t1) Priority:&quot; + t1.getPriority());

        t.setPriority(Thread.NORM_PRIORITY);
        System.out.println(&quot;Main Thread  Priority:&quot; + t.getPriority());

        Thread t2 = new Thread();
        System.out.println(&quot;Thread(t2) Priority:&quot; + t2.getPriority());

        // Change thread t2 priority to minimum
        t2.setPriority(Thread.MIN_PRIORITY);
        System.out.println(&quot;Thread(t2) Priority:&quot; + t2.getPriority());
    }

}
</code></pre><p>输出结果为：</p><pre><code>Main Thread  Priority:5
Thread(t1) Priority:5
Thread(t1) Priority:9
Main Thread  Priority:5
Thread(t2) Priority:5
Thread(t2) Priority:1
</code></pre><p>在上面的代码中，Java虚拟机启动时，就会通过main方法启动一个线程，JVM就会一直运行下去，直到以下任意一个条件发生：</p><ul><li>调用了exit()方法，并且exit()有权限被正常执行。</li><li>所有的“非守护线程”都死了(即JVM中仅仅只有“守护线程”)。</li></ul>`,12),a=[n];function d(c,h){return r(),e("div",null,a)}const T=t(o,[["render",d],["__file","priority-of-thread.html.vue"]]),s=JSON.parse('{"path":"/docs/java/concurrent-coding/priority-of-thread.html","title":"线程优先","lang":"en-US","frontmatter":{"title":"线程优先"},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715385399000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":2}]},"filePathRelative":"docs/java/concurrent-coding/priority-of-thread.md"}');export{T as comp,s as data};
