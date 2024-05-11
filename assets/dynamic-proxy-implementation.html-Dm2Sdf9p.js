import{_ as e,o as n,c as i,e as a}from"./app-BihAYnmf.js";const l={},s=a(`<p>Java中，实现动态代理有两种方式：</p><p>1、JDK动态代理：java.lang.reflect 包中的Proxy类和InvocationHandler接口提供了生成动态代理类的能力。</p><p>2、Cglib动态代理：Cglib (Code Generation Library )是一个第三方代码生成类库，运行时在内存中动态生成一个子类对象从而实现对目标对象功能的扩展。</p><p>关于这两种动态代理的写法本文就不深入展开了，读者感兴趣的话，后面我再写文章单独介绍。本文主要来简单说一下这两种动态代理的区别和用途。</p><p>JDK动态代理和Cglib动态代理的区别</p><p>JDK的动态代理有一个限制，就是使用动态代理的对象必须实现一个或多个接口。如果想代理没有实现接口的类，就可以使用CGLIB实现。</p><p>Cglib是一个强大的高性能的代码生成包，它可以在运行期扩展Java类与实现Java接口。它广泛的被许多AOP的框架使用，例如Spring AOP和dynaop，为他们提供方法的interception（拦截）。</p><p>Cglib包的底层是通过使用一个小而快的字节码处理框架ASM，来转换字节码并生成新的类。不鼓励直接使用ASM，因为它需要你对JVM内部结构包括class文件的格式和指令集都很熟悉。</p><p>Cglib与动态代理最大的区别就是：</p><p>使用动态代理的对象必须实现一个或多个接口</p><p>使用cglib代理的对象则无需实现接口，达到代理类无侵入。</p><h3 id="java实现动态代理的大致步骤" tabindex="-1"><a class="header-anchor" href="#java实现动态代理的大致步骤"><span>Java实现动态代理的大致步骤</span></a></h3><p>1、定义一个委托类和公共接口。</p><p>2、自己定义一个类（调用处理器类，即实现 InvocationHandler 接口），这个类的目的是指定运行时将生成的代理类需要完成的具体任务（包括Preprocess和Postprocess），即代理类调用任何方法都会经过这个调用处理器类（在本文最后一节对此进行解释）。</p><p>3、生成代理对象（当然也会生成代理类），需要为他指定(1)委托对象(2)实现的一系列接口(3)调用处理器类的实例。因此可以看出一个代理对象对应一个委托对象，对应一个调用处理器实例。</p><h3 id="java-实现动态代理主要涉及哪几个类" tabindex="-1"><a class="header-anchor" href="#java-实现动态代理主要涉及哪几个类"><span>Java 实现动态代理主要涉及哪几个类</span></a></h3><p>java.lang.reflect.Proxy: 这是生成代理类的主类，通过 Proxy 类生成的代理类都继承了 Proxy 类，即 DynamicProxyClass extends Proxy。</p><p>java.lang.reflect.InvocationHandler: 这里称他为&quot;调用处理器&quot;，他是一个接口，我们动态生成的代理类需要完成的具体内容需要自己定义一个类，而这个类必须实现 InvocationHandler 接口。</p><h3 id="动态代理实现" tabindex="-1"><a class="header-anchor" href="#动态代理实现"><span>动态代理实现</span></a></h3><p>使用动态代理实现功能：不改变Test类的情况下，在方法target 之前打印一句话，之后打印一句话。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class UserServiceImpl implements UserService {

    @Override
    public void add() {
        // TODO Auto-generated method stub
        System.out.println(&quot;--------------------add----------------------&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="jdk动态代理" tabindex="-1"><a class="header-anchor" href="#jdk动态代理"><span>jdk动态代理</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class MyInvocationHandler implements InvocationHandler {

    private Object target;

    public MyInvocationHandler(Object target) {

        super();
        this.target = target;

    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        PerformanceMonior.begin(target.getClass().getName()+&quot;.&quot;+method.getName());
        //System.out.println(&quot;-----------------begin &quot;+method.getName()+&quot;-----------------&quot;);
        Object result = method.invoke(target, args);
        //System.out.println(&quot;-----------------end &quot;+method.getName()+&quot;-----------------&quot;);
        PerformanceMonior.end();
        return result;
    }

    public Object getProxy(){

        return Proxy.newProxyInstance(Thread.currentThread().getContextClassLoader(), target.getClass().getInterfaces(), this);
    }

}

public static void main(String[] args) {

  UserService service = new UserServiceImpl();
  MyInvocationHandler handler = new MyInvocationHandler(service);
  UserService proxy = (UserService) handler.getProxy();
  proxy.add();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cglib动态代理" tabindex="-1"><a class="header-anchor" href="#cglib动态代理"><span>cglib动态代理</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class CglibProxy implements MethodInterceptor{  
 private Enhancer enhancer = new Enhancer();  
 public Object getProxy(Class clazz){  
  //设置需要创建子类的类  
  enhancer.setSuperclass(clazz);  
  enhancer.setCallback(this);  
  //通过字节码技术动态创建子类实例  
  return enhancer.create();  
 }  
 //实现MethodInterceptor接口方法  
 public Object intercept(Object obj, Method method, Object[] args,  
   MethodProxy proxy) throws Throwable {  
  System.out.println(&quot;前置代理&quot;);  
  //通过代理类调用父类中的方法  
  Object result = proxy.invokeSuper(obj, args);  
  System.out.println(&quot;后置代理&quot;);  
  return result;  
 }  
}  

public class DoCGLib {  
 public static void main(String[] args) {  
  CglibProxy proxy = new CglibProxy();  
  //通过生成子类的方式创建代理类  
  UserServiceImpl proxyImp = (UserServiceImpl)proxy.getProxy(UserServiceImpl.class);  
  proxyImp.add();  
 }  
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25),r=[s];function d(t,c){return n(),i("div",null,r)}const o=e(l,[["render",d],["__file","dynamic-proxy-implementation.html.vue"]]),u=JSON.parse('{"path":"/docs/java/java-basic/dynamic-proxy-implementation.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"Java实现动态代理的大致步骤","slug":"java实现动态代理的大致步骤","link":"#java实现动态代理的大致步骤","children":[]},{"level":3,"title":"Java 实现动态代理主要涉及哪几个类","slug":"java-实现动态代理主要涉及哪几个类","link":"#java-实现动态代理主要涉及哪几个类","children":[]},{"level":3,"title":"动态代理实现","slug":"动态代理实现","link":"#动态代理实现","children":[]},{"level":3,"title":"cglib动态代理","slug":"cglib动态代理","link":"#cglib动态代理","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/dynamic-proxy-implementation.md"}');export{o as comp,u as data};
