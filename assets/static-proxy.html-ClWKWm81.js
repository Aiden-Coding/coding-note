import{_ as e,o as i,c as n,e as l}from"./app-BihAYnmf.js";const s={},a=l(`<p>所谓静态代理，就是代理类是由程序员自己编写的，在编译期就确定好了的。来看下下面的例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface HelloSerivice {
    public void say();
}

public class HelloSeriviceImpl implements HelloSerivice{

    @Override
    public void say() {
        System.out.println(&quot;hello world&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码比较简单，定义了一个接口和其实现类。这就是代理模式中的目标对象和目标对象的接口。接下来定义代理对象。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class HelloSeriviceProxy implements HelloSerivice{

    private HelloSerivice target;
    public HelloSeriviceProxy(HelloSerivice target) {
        this.target = target;
    }

    @Override
    public void say() {
        System.out.println(&quot;记录日志&quot;);
        target.say();
        System.out.println(&quot;清理数据&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面就是一个代理类，他也实现了目标对象的接口，并且扩展了say方法。下面是一个测试类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Main {
    @Test
    public void testProxy(){
        //目标对象
        HelloSerivice target = new HelloSeriviceImpl();
        //代理对象
        HelloSeriviceProxy proxy = new HelloSeriviceProxy(target);
        proxy.say();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>// 记录日志 // hello world // 清理数据</p><p>这就是一个简单的静态的代理模式的实现。代理模式中的所有角色（代理对象、目标对象、目标对象的接口）等都是在编译期就确定好的。</p><p>静态代理的用途</p><p>1.控制真实对象的访问权限：通过代理对象控制真实对象的使用权限。</p><p>2.避免创建大对象：通过使用一个代理小对象来代表一个真实的大对象，可以减少系统资源的消耗，对系统进行优化并提高运行速度。</p><p>3.增强真实对象的功能：这个比较简单，通过代理可以在调用真实对象的方法的前后增加额外功能。</p>`,12),d=[a];function t(r,v){return i(),n("div",null,d)}const o=e(s,[["render",t],["__file","static-proxy.html.vue"]]),u=JSON.parse('{"path":"/docs/java/java-basic/static-proxy.html","title":"","lang":"en-US","frontmatter":{},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/static-proxy.md"}');export{o as comp,u as data};
