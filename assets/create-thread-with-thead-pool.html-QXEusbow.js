import{_ as t,o as n,c as o,a as e}from"./app-BihAYnmf.js";const r={},a=e("p",null,"Java中提供了对线程池的支持，有很多种方式。Jdk提供给外部的接口也很简单。直接调用ThreadPoolExecutor构造一个就可以了：",-1),c=e("pre",null,[e("code",null,`public class MultiThreads {
    public static void main(String[] args) throws InterruptedException, ExecutionException {
        System.out.println(Thread.currentThread().getName());
        System.out.println("通过线程池创建线程");
        ExecutorService executorService = new ThreadPoolExecutor(1, 1, 60L, TimeUnit.SECONDS,
            new ArrayBlockingQueue<Runnable>(10));
        executorService.execute(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        });
    }
}
`)],-1),i=e("p",null,"输出结果：",-1),d=e("pre",null,[e("code",null,`main
通过线程池创建线程
pool-1-thread-1
`)],-1),l=e("p",null,"所谓线程池本质是一个hashSet。多余的任务会放在阻塞队列中。",-1),h=e("p",null,"线程池的创建方式其实也有很多，也可以通过Executors静态工厂构建，但一般不建议。建议使用线程池来创建线程，并且建议使用带有ThreadFactory参数的ThreadPoolExecutor（需要依赖guava）构造方法设置线程名字，具体原因我们在后面的章节中在详细介绍。",-1),s=[a,c,i,d,l,h];function u(p,_){return n(),o("div",null,s)}const x=t(r,[["render",u],["__file","create-thread-with-thead-pool.html.vue"]]),T=JSON.parse('{"path":"/docs/java/concurrent-coding/create-thread-with-thead-pool.html","title":"create-thread-with-thead-pool","lang":"en-US","frontmatter":{"title":"create-thread-with-thead-pool"},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715385399000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":2}]},"filePathRelative":"docs/java/concurrent-coding/create-thread-with-thead-pool.md"}');export{x as comp,T as data};
