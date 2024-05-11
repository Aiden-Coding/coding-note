import{_ as r,r as l,o,c as s,a as e,b as n,d as t,e as i}from"./app-BihAYnmf.js";const c={},p=i('<h2 id="java对象的序列化与反序列化" tabindex="-1"><a class="header-anchor" href="#java对象的序列化与反序列化"><span>Java对象的序列化与反序列化</span></a></h2><p>在Java中，我们可以通过多种方式来创建对象，并且只要对象没有被回收我们都可以复用该对象。但是，我们创建出来的这些Java对象都是存在于JVM的堆内存中的。只有JVM处于运行状态的时候，这些对象才可能存在。一旦JVM停止运行，这些对象的状态也就随之而丢失了。</p><p>但是在真实的应用场景中，我们需要将这些对象持久化下来，并且能够在需要的时候把对象重新读取出来。Java的对象序列化可以帮助我们实现该功能。</p><p>对象序列化机制（object serialization）是Java语言内建的一种对象持久化方式，通过对象序列化，可以把对象的状态保存为字节数组，并且可以在有需要的时候将这个字节数组通过反序列化的方式再转换成对象。对象序列化可以很容易的在JVM中的活动对象和字节数组（流）之间进行转换。</p><p>在Java中，对象的序列化与反序列化被广泛应用到RMI(远程方法调用)及网络传输中。</p><h2 id="相关接口及类" tabindex="-1"><a class="header-anchor" href="#相关接口及类"><span>相关接口及类</span></a></h2><p>Java为了方便开发人员将Java对象进行序列化及反序列化提供了一套方便的API来支持。其中包括以下接口和类：</p><blockquote><p>java.io.Serializable</p><p>java.io.Externalizable</p><p>ObjectOutput</p><p>ObjectInput</p><p>ObjectOutputStream</p><p>ObjectInputStream</p></blockquote><h2 id="serializable-接口" tabindex="-1"><a class="header-anchor" href="#serializable-接口"><span>Serializable 接口</span></a></h2>',9),u=e("code",null,"java.io.Serializable",-1),b=e("strong",null,"序列化接口没有方法或字段，仅用于标识可序列化的语义。",-1),m={href:"http://www.hollischuang.com/archives/1140#What%20Serializable%20Did",target:"_blank",rel:"noopener noreferrer"},d=i(`<p>当试图对一个对象进行序列化的时候，如果遇到不支持 Serializable 接口的对象。在此情况下，将抛出 <code>NotSerializableException</code>。</p><p>如果要序列化的类有父类，要想同时将在父类中定义过的变量持久化下来，那么父类也应该集成<code>java.io.Serializable</code>接口。</p><p>下面是一个实现了<code>java.io.Serializable</code>接口的类</p><pre><code>package com.hollischaung.serialization.SerializableDemos;
import java.io.Serializable;
/**
 * Created by hollis on 16/2/17.
 * 实现Serializable接口
 */
public class User1 implements Serializable {

    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return &quot;User{&quot; +
                &quot;name=&#39;&quot; + name + &#39;\\&#39;&#39; +
                &quot;, age=&quot; + age +
                &#39;}&#39;;
    }
}
</code></pre><p>通过下面的代码进行序列化及反序列化</p><pre><code>package com.hollischaung.serialization.SerializableDemos;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import java.io.*;
/**
 * Created by hollis on 16/2/17.
 * SerializableDemo1 结合SerializableDemo2说明 一个类要想被序列化必须实现Serializable接口
 */
public class SerializableDemo1 {

    public static void main(String[] args) {
        //Initializes The Object
        User1 user = new User1();
        user.setName(&quot;hollis&quot;);
        user.setAge(23);
        System.out.println(user);

        //Write Obj to File
        ObjectOutputStream oos = null;
        try {
            oos = new ObjectOutputStream(new FileOutputStream(&quot;tempFile&quot;));
            oos.writeObject(user);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            IOUtils.closeQuietly(oos);
        }

        //Read Obj from File
        File file = new File(&quot;tempFile&quot;);
        ObjectInputStream ois = null;
        try {
            ois = new ObjectInputStream(new FileInputStream(file));
            User1 newUser = (User1) ois.readObject();
            System.out.println(newUser);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            IOUtils.closeQuietly(ois);
            try {
                FileUtils.forceDelete(file);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}

//OutPut:
//User{name=&#39;hollis&#39;, age=23}
//User{name=&#39;hollis&#39;, age=23}
</code></pre><h2 id="externalizable接口" tabindex="-1"><a class="header-anchor" href="#externalizable接口"><span>Externalizable接口</span></a></h2><p>除了Serializable 之外，java中还提供了另一个序列化接口<code>Externalizable</code></p><p>为了了解Externalizable接口和Serializable接口的区别，先来看代码，我们把上面的代码改成使用Externalizable的形式。</p><pre><code>package com.hollischaung.serialization.ExternalizableDemos;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;

/**
 * Created by hollis on 16/2/17.
 * 实现Externalizable接口
 */
public class User1 implements Externalizable {

    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void writeExternal(ObjectOutput out) throws IOException {

    }

    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {

    }

    @Override
    public String toString() {
        return &quot;User{&quot; +
                &quot;name=&#39;&quot; + name + &#39;\\&#39;&#39; +
                &quot;, age=&quot; + age +
                &#39;}&#39;;
    }
}
</code></pre><p></p><pre><code>package com.hollischaung.serialization.ExternalizableDemos;

import java.io.*;

/**
 * Created by hollis on 16/2/17.
 */
public class ExternalizableDemo1 {

    //为了便于理解和节省篇幅，忽略关闭流操作及删除文件操作。真正编码时千万不要忘记
    //IOException直接抛出
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        //Write Obj to file
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(&quot;tempFile&quot;));
        User1 user = new User1();
        user.setName(&quot;hollis&quot;);
        user.setAge(23);
        oos.writeObject(user);
        //Read Obj from file
        File file = new File(&quot;tempFile&quot;);
        ObjectInputStream ois =  new ObjectInputStream(new FileInputStream(file));
        User1 newInstance = (User1) ois.readObject();
        //output
        System.out.println(newInstance);
    }
}
//OutPut:
//User{name=&#39;null&#39;, age=0}
</code></pre><p>通过上面的实例可以发现，对User1类进行序列化及反序列化之后得到的对象的所有属性的值都变成了默认值。也就是说，之前的那个对象的状态并没有被持久化下来。这就是Externalizable接口和Serializable接口的区别：</p><p>Externalizable继承了Serializable，该接口中定义了两个抽象方法：<code>writeExternal()</code>与<code>readExternal()</code>。当使用Externalizable接口来进行序列化与反序列化的时候需要开发人员重写<code>writeExternal()</code>与<code>readExternal()</code>方法。由于上面的代码中，并没有在这两个方法中定义序列化实现细节，所以输出的内容为空。还有一点值得注意：在使用Externalizable进行序列化的时候，在读取对象时，会调用被序列化类的无参构造器去创建一个新的对象，然后再将被保存对象的字段的值分别填充到新对象中。所以，实现Externalizable接口的类必须要提供一个public的无参的构造器。</p><p>按照要求修改之后代码如下：</p><pre><code>package com.hollischaung.serialization.ExternalizableDemos;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectOutput;

/**
 * Created by hollis on 16/2/17.
 * 实现Externalizable接口,并实现writeExternal和readExternal方法
 */
public class User2 implements Externalizable {

    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeObject(name);
        out.writeInt(age);
    }

    public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        name = (String) in.readObject();
        age = in.readInt();
    }

    @Override
    public String toString() {
        return &quot;User{&quot; +
                &quot;name=&#39;&quot; + name + &#39;\\&#39;&#39; +
                &quot;, age=&quot; + age +
                &#39;}&#39;;
    }
}
</code></pre><p></p><pre><code>package com.hollischaung.serialization.ExternalizableDemos;

import java.io.*;

/**
 * Created by hollis on 16/2/17.
 */
public class ExternalizableDemo2 {

    //为了便于理解和节省篇幅，忽略关闭流操作及删除文件操作。真正编码时千万不要忘记
    //IOException直接抛出
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        //Write Obj to file
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(&quot;tempFile&quot;));
        User2 user = new User2();
        user.setName(&quot;hollis&quot;);
        user.setAge(23);
        oos.writeObject(user);
        //Read Obj from file
        File file = new File(&quot;tempFile&quot;);
        ObjectInputStream ois =  new ObjectInputStream(new FileInputStream(file));
        User2 newInstance = (User2) ois.readObject();
        //output
        System.out.println(newInstance);
    }
}
//OutPut:
//User{name=&#39;hollis&#39;, age=23}
</code></pre><p>这次，就可以把之前的对象状态持久化下来了。</p><blockquote><p>如果User类中没有无参数的构造函数，在运行时会抛出异常：<code>java.io.InvalidClassException</code></p></blockquote><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h2>`,21),h={href:"https://zh.wikipedia.org/wiki/%E5%BA%8F%E5%88%97%E5%8C%96",target:"_blank",rel:"noopener noreferrer"},g={href:"http://www.blogjava.net/jiangshachina/archive/2012/02/13/369898.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.ibm.com/developerworks/cn/java/j-lo-serial/",target:"_blank",rel:"noopener noreferrer"},O=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读"},[e("span",null,"推荐阅读")])],-1),j={href:"http://www.hollischuang.com/archives/1140",target:"_blank",rel:"noopener noreferrer"},S={href:"http://www.hollischuang.com/archives/1144",target:"_blank",rel:"noopener noreferrer"};function x(z,w){const a=l("ExternalLinkIcon");return o(),s("div",null,[p,e("p",null,[n("类通过实现 "),u,n(" 接口以启用其序列化功能。未实现此接口的类将无法使其任何状态序列化或反序列化。可序列化类的所有子类型本身都是可序列化的。"),b,n(" ("),e("a",m,[n("该接口并没有方法和字段，为什么只有实现了该接口的类的对象才能被序列化呢？"),t(a)]),n(")")]),d,e("p",null,[e("a",h,[n("维基百科"),t(a)])]),e("p",null,[e("a",g,[n("理解Java对象序列化"),t(a)])]),e("p",null,[e("a",v,[n("Java 序列化的高级认识"),t(a)])]),O,e("p",null,[e("a",j,[n("深入分析Java的序列化与反序列化"),t(a)])]),e("p",null,[e("a",S,[n("单例与序列化的那些事儿"),t(a)])])])}const I=r(c,[["render",x],["__file","serialize-in-java.html.vue"]]),f=JSON.parse('{"path":"/docs/java/java-basic/serialize-in-java.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Java对象的序列化与反序列化","slug":"java对象的序列化与反序列化","link":"#java对象的序列化与反序列化","children":[]},{"level":2,"title":"相关接口及类","slug":"相关接口及类","link":"#相关接口及类","children":[]},{"level":2,"title":"Serializable 接口","slug":"serializable-接口","link":"#serializable-接口","children":[]},{"level":2,"title":"Externalizable接口","slug":"externalizable接口","link":"#externalizable接口","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]},{"level":2,"title":"推荐阅读","slug":"推荐阅读","link":"#推荐阅读","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/serialize-in-java.md"}');export{I as comp,f as data};
