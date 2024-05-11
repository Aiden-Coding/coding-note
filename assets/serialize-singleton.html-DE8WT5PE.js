import{_ as o,r as l,o as i,c,a as e,b as n,d as a,e as s}from"./app-BihAYnmf.js";const p={},r=e("p",null,"本文将通过实例+阅读Java源码的方式介绍序列化是如何破坏单例模式的，以及如何避免序列化对单例的破坏。",-1),d={href:"http://www.hollischuang.com/archives/205",target:"_blank",rel:"noopener noreferrer"},u=s(`<p>但是，单例模式真的能够实现实例的唯一性吗？</p><p>答案是否定的，很多人都知道使用反射可以破坏单例模式，除了反射以外，使用序列化与反序列化也同样会破坏单例。</p><h2 id="序列化对单例的破坏" tabindex="-1"><a class="header-anchor" href="#序列化对单例的破坏"><span>序列化对单例的破坏</span></a></h2><p>首先来写一个单例的类：</p><p>code 1</p><pre><code>package com.hollis;
import java.io.Serializable;
/**
 * Created by hollis on 16/2/5.
 * 使用双重校验锁方式实现单例
 */
public class Singleton implements Serializable{
    private volatile static Singleton singleton;
    private Singleton (){}
    public static Singleton getSingleton() {
        if (singleton == null) {
            synchronized (Singleton.class) {
                if (singleton == null) {
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }
}
</code></pre><p>接下来是一个测试类：</p><p>code 2</p><pre><code>package com.hollis;
import java.io.*;
/**
 * Created by hollis on 16/2/5.
 */
public class SerializableDemo1 {
    //为了便于理解，忽略关闭流操作及删除文件操作。真正编码时千万不要忘记
    //Exception直接抛出
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        //Write Obj to file
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(&quot;tempFile&quot;));
        oos.writeObject(Singleton.getSingleton());
        //Read Obj from file
        File file = new File(&quot;tempFile&quot;);
        ObjectInputStream ois =  new ObjectInputStream(new FileInputStream(file));
        Singleton newInstance = (Singleton) ois.readObject();
        //判断是否是同一个对象
        System.out.println(newInstance == Singleton.getSingleton());
    }
}
//false
</code></pre><p>输出结构为false，说明：</p><blockquote><p>通过对Singleton的序列化与反序列化得到的对象是一个新的对象，这就破坏了Singleton的单例性。</p></blockquote><p>这里，在介绍如何解决这个问题之前，我们先来深入分析一下，为什么会这样？在反序列化的过程中到底发生了什么。</p><h2 id="objectinputstream" tabindex="-1"><a class="header-anchor" href="#objectinputstream"><span>ObjectInputStream</span></a></h2><p>对象的序列化过程通过ObjectOutputStream和ObjectInputputStream来实现的，那么带着刚刚的问题，分析一下ObjectInputputStream 的<code>readObject</code> 方法执行情况到底是怎样的。</p><p>为了节省篇幅，这里给出ObjectInputStream的<code>readObject</code>的调用栈：</p><img src="https://www.hollischuang.com/wp-content/uploads/2016/02/640.png" alt="" width="840" height="309" class="aligncenter size-full wp-image-3561"><p>这里看一下重点代码，<code>readOrdinaryObject</code>方法的代码片段： code 3</p><pre><code>private Object readOrdinaryObject(boolean unshared)
        throws IOException
    {
        //此处省略部分代码

        Object obj;
        try {
            obj = desc.isInstantiable() ? desc.newInstance() : null;
        } catch (Exception ex) {
            throw (IOException) new InvalidClassException(
                desc.forClass().getName(),
                &quot;unable to create instance&quot;).initCause(ex);
        }

        //此处省略部分代码

        if (obj != null &amp;&amp;
            handles.lookupException(passHandle) == null &amp;&amp;
            desc.hasReadResolveMethod())
        {
            Object rep = desc.invokeReadResolve(obj);
            if (unshared &amp;&amp; rep.getClass().isArray()) {
                rep = cloneArray(rep);
            }
            if (rep != obj) {
                handles.setObject(passHandle, obj = rep);
            }
        }

        return obj;
    }
</code></pre><p>code 3 中主要贴出两部分代码。先分析第一部分：</p><p>code 3.1</p><pre><code>Object obj;
try {
    obj = desc.isInstantiable() ? desc.newInstance() : null;
} catch (Exception ex) {
    throw (IOException) new InvalidClassException(desc.forClass().getName(),&quot;unable to create instance&quot;).initCause(ex);
}
</code></pre><p>这里创建的这个obj对象，就是本方法要返回的对象，也可以暂时理解为是ObjectInputStream的<code>readObject</code>返回的对象。</p><img src="https://www.hollischuang.com/wp-content/uploads/2016/02/641.jpeg" alt="" width="1080" height="336" class="aligncenter size-full wp-image-3563"><blockquote><p><code>isInstantiable</code>：如果一个serializable/externalizable的类可以在运行时被实例化，那么该方法就返回true。针对serializable和externalizable我会在其他文章中介绍。</p><p><code>desc.newInstance</code>：该方法通过反射的方式调用无参构造方法新建一个对象。</p></blockquote><p>所以。到目前为止，也就可以解释，为什么序列化可以破坏单例了？</p><blockquote><p>答：序列化会通过反射调用无参数的构造方法创建一个新的对象。</p></blockquote><p>那么，接下来我们再看刚开始留下的问题，如何防止序列化/反序列化破坏单例模式。</p><h2 id="防止序列化破坏单例模式" tabindex="-1"><a class="header-anchor" href="#防止序列化破坏单例模式"><span>防止序列化破坏单例模式</span></a></h2><p>先给出解决方案，然后再具体分析原理：</p><p>只要在Singleton类中定义<code>readResolve</code>就可以解决该问题：</p><p>code 4</p><pre><code>package com.hollis;
import java.io.Serializable;
/**
 * Created by hollis on 16/2/5.
 * 使用双重校验锁方式实现单例
 */
public class Singleton implements Serializable{
    private volatile static Singleton singleton;
    private Singleton (){}
    public static Singleton getSingleton() {
        if (singleton == null) {
            synchronized (Singleton.class) {
                if (singleton == null) {
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }

    private Object readResolve() {
        return singleton;
    }
}
</code></pre><p>还是运行以下测试类：</p><pre><code>package com.hollis;
import java.io.*;
/**
 * Created by hollis on 16/2/5.
 */
public class SerializableDemo1 {
    //为了便于理解，忽略关闭流操作及删除文件操作。真正编码时千万不要忘记
    //Exception直接抛出
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        //Write Obj to file
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(&quot;tempFile&quot;));
        oos.writeObject(Singleton.getSingleton());
        //Read Obj from file
        File file = new File(&quot;tempFile&quot;);
        ObjectInputStream ois =  new ObjectInputStream(new FileInputStream(file));
        Singleton newInstance = (Singleton) ois.readObject();
        //判断是否是同一个对象
        System.out.println(newInstance == Singleton.getSingleton());
    }
}
//true
</code></pre><p>本次输出结果为true。具体原理，我们回过头继续分析code 3中的第二段代码:</p><p>code 3.2</p><pre><code>if (obj != null &amp;&amp;
            handles.lookupException(passHandle) == null &amp;&amp;
            desc.hasReadResolveMethod())
        {
            Object rep = desc.invokeReadResolve(obj);
            if (unshared &amp;&amp; rep.getClass().isArray()) {
                rep = cloneArray(rep);
            }
            if (rep != obj) {
                handles.setObject(passHandle, obj = rep);
            }
        }
</code></pre><p><code>hasReadResolveMethod</code>:如果实现了serializable 或者 externalizable接口的类中包含<code>readResolve</code>则返回true</p><p><code>invokeReadResolve</code>:通过反射的方式调用要被反序列化的类的readResolve方法。</p><p>所以，原理也就清楚了，主要在Singleton中定义readResolve方法，并在该方法中指定要返回的对象的生成策略，就可以防止单例被破坏。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>在涉及到序列化的场景时，要格外注意他对单例的破坏。</p><h2 id="推荐阅读" tabindex="-1"><a class="header-anchor" href="#推荐阅读"><span>推荐阅读</span></a></h2>`,43),b={href:"http://www.hollischuang.com/archives/1140",target:"_blank",rel:"noopener noreferrer"};function h(m,g){const t=l("ExternalLinkIcon");return i(),c("div",null,[r,e("blockquote",null,[e("p",null,[n("单例模式，是设计模式中最简单的一种。通过单例模式可以保证系统中一个类只有一个实例而且该实例易于外界访问，从而方便对实例个数的控制并节约系统资源。如果希望在系统中某个类的对象只能存在一个，单例模式是最好的解决方案。关于单例模式的使用方式，可以阅读"),e("a",d,[n("单例模式的七种写法"),a(t)])])]),u,e("p",null,[e("a",b,[n("深入分析Java的序列化与反序列化"),a(t)])])])}const S=o(p,[["render",h],["__file","serialize-singleton.html.vue"]]),O=JSON.parse('{"path":"/docs/java/java-basic/serialize-singleton.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"序列化对单例的破坏","slug":"序列化对单例的破坏","link":"#序列化对单例的破坏","children":[]},{"level":2,"title":"ObjectInputStream","slug":"objectinputstream","link":"#objectinputstream","children":[]},{"level":2,"title":"防止序列化破坏单例模式","slug":"防止序列化破坏单例模式","link":"#防止序列化破坏单例模式","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"推荐阅读","slug":"推荐阅读","link":"#推荐阅读","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/serialize-singleton.md"}');export{S as comp,O as data};
