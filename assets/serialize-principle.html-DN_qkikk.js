import{_ as n,r as a,o as i,c as r,a as e,b as o,d as c,e as l}from"./app-BihAYnmf.js";const s={},p=l(`<p>序列化是一种对象持久化的手段。普遍应用在网络传输、RMI等场景中。本文通过分析ArrayList的序列化来介绍Java序列化的相关内容。主要涉及到以下几个问题：</p><blockquote><p>怎么实现Java的序列化</p><p>为什么实现了java.io.Serializable接口才能被序列化</p><p>transient的作用是什么</p><p>怎么自定义序列化策略</p><p>自定义的序列化策略是如何被调用的</p><p>ArrayList对序列化的实现有什么好处</p></blockquote><h2 id="java对象的序列化" tabindex="-1"><a class="header-anchor" href="#java对象的序列化"><span>Java对象的序列化</span></a></h2><p>Java平台允许我们在内存中创建可复用的Java对象，但一般情况下，只有当JVM处于运行时，这些对象才可能存在，即，这些对象的生命周期不会比JVM的生命周期更长。但在现实应用中，就可能要求在JVM停止运行之后能够保存(持久化)指定的对象，并在将来重新读取被保存的对象。Java对象序列化就能够帮助我们实现该功能。</p><p>使用Java对象序列化，在保存对象时，会把其状态保存为一组字节，在未来，再将这些字节组装成对象。必须注意地是，对象序列化保存的是对象的&quot;状态&quot;，即它的成员变量。由此可知，<strong>对象序列化不会关注类中的静态变量</strong>。</p><p>除了在持久化对象时会用到对象序列化之外，当使用RMI(远程方法调用)，或在网络中传递对象时，都会用到对象序列化。Java序列化API为处理对象序列化提供了一个标准机制，该API简单易用。</p><h2 id="如何对java对象进行序列化与反序列化" tabindex="-1"><a class="header-anchor" href="#如何对java对象进行序列化与反序列化"><span>如何对Java对象进行序列化与反序列化</span></a></h2><p>在Java中，只要一个类实现了<code>java.io.Serializable</code>接口，那么它就可以被序列化。这里先来一段代码：</p><p>code 1 创建一个User类，用于序列化及反序列化</p><pre><code>package com.hollis;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by hollis on 16/2/2.
 */
public class User implements Serializable{
    private String name;
    private int age;
    private Date birthday;
    private transient String gender;
    private static final long serialVersionUID = -6849794470754667710L;

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

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return &quot;User{&quot; +
                &quot;name=&#39;&quot; + name + &#39;\\&#39;&#39; +
                &quot;, age=&quot; + age +
                &quot;, gender=&quot; + gender +
                &quot;, birthday=&quot; + birthday +
                &#39;}&#39;;
    }
}
</code></pre><p>code 2 对User进行序列化及反序列化的Demo</p><pre><code>package com.hollis;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import java.io.*;
import java.util.Date;

/**
 * Created by hollis on 16/2/2.
 */
public class SerializableDemo {

    public static void main(String[] args) {
        //Initializes The Object
        User user = new User();
        user.setName(&quot;hollis&quot;);
        user.setGender(&quot;male&quot;);
        user.setAge(23);
        user.setBirthday(new Date());
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
            User newUser = (User) ois.readObject();
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
//output 
//User{name=&#39;hollis&#39;, age=23, gender=male, birthday=Tue Feb 02 17:37:38 CST 2016}
//User{name=&#39;hollis&#39;, age=23, gender=null, birthday=Tue Feb 02 17:37:38 CST 2016}
</code></pre><h2 id="序列化及反序列化相关知识" tabindex="-1"><a class="header-anchor" href="#序列化及反序列化相关知识"><span>序列化及反序列化相关知识</span></a></h2><p>1、在Java中，只要一个类实现了<code>java.io.Serializable</code>接口，那么它就可以被序列化。</p><p>2、通过<code>ObjectOutputStream</code>和<code>ObjectInputStream</code>对对象进行序列化及反序列化</p><p>3、虚拟机是否允许反序列化，不仅取决于类路径和功能代码是否一致，一个非常重要的一点是两个类的序列化 ID 是否一致（就是 <code>private static final long serialVersionUID</code>）</p><p>4、序列化并不保存静态变量。</p><p>5、要想将父类对象也序列化，就需要让父类也实现<code>Serializable</code> 接口。</p><p>6、Transient 关键字的作用是控制变量的序列化，在变量声明前加上该关键字，可以阻止该变量被序列化到文件中，在被反序列化后，transient 变量的值被设为初始值，如 int 型的是 0，对象型的是 null。</p><p>7、服务器端给客户端发送序列化对象数据，对象中有一些数据是敏感的，比如密码字符串等，希望对该密码字段在序列化时，进行加密，而客户端如果拥有解密的密钥，只有在客户端进行反序列化时，才可以对密码进行读取，这样可以一定程度保证序列化对象的数据安全。</p><h2 id="arraylist的序列化" tabindex="-1"><a class="header-anchor" href="#arraylist的序列化"><span>ArrayList的序列化</span></a></h2><p>在介绍ArrayList序列化之前，先来考虑一个问题：</p><blockquote><p><strong>如何自定义的序列化和反序列化策略</strong></p></blockquote><p>带着这个问题，我们来看<code>java.util.ArrayList</code>的源码</p><p>code 3</p><pre><code>public class ArrayList&lt;E&gt; extends AbstractList&lt;E&gt;
        implements List&lt;E&gt;, RandomAccess, Cloneable, java.io.Serializable
{
    private static final long serialVersionUID = 8683452581122892189L;
    transient Object[] elementData; // non-private to simplify nested class access
    private int size;
}
</code></pre><p>笔者省略了其他成员变量，从上面的代码中可以知道ArrayList实现了<code>java.io.Serializable</code>接口，那么我们就可以对它进行序列化及反序列化。因为elementData是<code>transient</code>的，所以我们认为这个成员变量不会被序列化而保留下来。我们写一个Demo，验证一下我们的想法：</p><p>code 4</p><pre><code>public static void main(String[] args) throws IOException, ClassNotFoundException {
        List&lt;String&gt; stringList = new ArrayList&lt;String&gt;();
        stringList.add(&quot;hello&quot;);
        stringList.add(&quot;world&quot;);
        stringList.add(&quot;hollis&quot;);
        stringList.add(&quot;chuang&quot;);
        System.out.println(&quot;init StringList&quot; + stringList);
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream(&quot;stringlist&quot;));
        objectOutputStream.writeObject(stringList);

        IOUtils.close(objectOutputStream);
        File file = new File(&quot;stringlist&quot;);
        ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream(file));
        List&lt;String&gt; newStringList = (List&lt;String&gt;)objectInputStream.readObject();
        IOUtils.close(objectInputStream);
        if(file.exists()){
            file.delete();
        }
        System.out.println(&quot;new StringList&quot; + newStringList);
    }
//init StringList[hello, world, hollis, chuang]
//new StringList[hello, world, hollis, chuang]
</code></pre><p>了解ArrayList的人都知道，ArrayList底层是通过数组实现的。那么数组<code>elementData</code>其实就是用来保存列表中的元素的。通过该属性的声明方式我们知道，他是无法通过序列化持久化下来的。那么为什么code 4的结果却通过序列化和反序列化把List中的元素保留下来了呢？</p><h3 id="writeobject和readobject方法" tabindex="-1"><a class="header-anchor" href="#writeobject和readobject方法"><span>writeObject和readObject方法</span></a></h3><p>在ArrayList中定义了来个方法： <code>writeObject</code>和<code>readObject</code>。</p><p>这里先给出结论:</p><blockquote><p>在序列化过程中，如果被序列化的类中定义了writeObject 和 readObject 方法，虚拟机会试图调用对象类里的 writeObject 和 readObject 方法，进行用户自定义的序列化和反序列化。</p><p>如果没有这样的方法，则默认调用是 ObjectOutputStream 的 defaultWriteObject 方法以及 ObjectInputStream 的 defaultReadObject 方法。</p><p>用户自定义的 writeObject 和 readObject 方法可以允许用户控制序列化的过程，比如可以在序列化的过程中动态改变序列化的数值。</p></blockquote><p>来看一下这两个方法的具体实现：</p><p>code 5</p><pre><code>private void readObject(java.io.ObjectInputStream s)
        throws java.io.IOException, ClassNotFoundException {
        elementData = EMPTY_ELEMENTDATA;

        // Read in size, and any hidden stuff
        s.defaultReadObject();

        // Read in capacity
        s.readInt(); // ignored

        if (size &gt; 0) {
            // be like clone(), allocate array based upon size not capacity
            ensureCapacityInternal(size);

            Object[] a = elementData;
            // Read in all elements in the proper order.
            for (int i=0; i&lt;size; i++) {
                a[i] = s.readObject();
            }
        }
    }
</code></pre><p>code 6</p><pre><code>private void writeObject(java.io.ObjectOutputStream s)
        throws java.io.IOException{
        // Write out element count, and any hidden stuff
        int expectedModCount = modCount;
        s.defaultWriteObject();

        // Write out size as capacity for behavioural compatibility with clone()
        s.writeInt(size);

        // Write out all elements in the proper order.
        for (int i=0; i&lt;size; i++) {
            s.writeObject(elementData[i]);
        }

        if (modCount != expectedModCount) {
            throw new ConcurrentModificationException();
        }
    }
</code></pre><p>那么为什么ArrayList要用这种方式来实现序列化呢？</p><h3 id="why-transient" tabindex="-1"><a class="header-anchor" href="#why-transient"><span>why transient</span></a></h3><p>ArrayList实际上是动态数组，每次在放满以后自动增长设定的长度值，如果数组自动增长长度设为100，而实际只放了一个元素，那就会序列化99个null元素。为了保证在序列化的时候不会将这么多null同时进行序列化，ArrayList把元素数组设置为transient。</p><h3 id="why-writeobject-and-readobject" tabindex="-1"><a class="header-anchor" href="#why-writeobject-and-readobject"><span>why writeObject and readObject</span></a></h3><p>前面说过，为了防止一个包含大量空对象的数组被序列化，为了优化存储，所以，ArrayList使用<code>transient</code>来声明<code>elementData</code>。 但是，作为一个集合，在序列化过程中还必须保证其中的元素可以被持久化下来，所以，通过重写<code>writeObject</code> 和 <code>readObject</code>方法的方式把其中的元素保留下来。</p><p><code>writeObject</code>方法把<code>elementData</code>数组中的元素遍历的保存到输出流（ObjectOutputStream）中。</p><p><code>readObject</code>方法从输入流（ObjectInputStream）中读出对象并保存赋值到<code>elementData</code>数组中。</p><p>至此，我们先试着来回答刚刚提出的问题：</p><blockquote><p>如何自定义的序列化和反序列化策略</p></blockquote><p>答：可以通过在被序列化的类中增加writeObject 和 readObject方法。那么问题又来了：</p><blockquote><p>虽然ArrayList中写了writeObject 和 readObject 方法，但是这两个方法并没有显示的被调用啊。</p><p><strong>那么如果一个类中包含writeObject 和 readObject 方法，那么这两个方法是怎么被调用的呢?</strong></p></blockquote><h2 id="objectoutputstream" tabindex="-1"><a class="header-anchor" href="#objectoutputstream"><span>ObjectOutputStream</span></a></h2><p>从code 4中，我们可以看出，对象的序列化过程通过ObjectOutputStream和ObjectInputputStream来实现的，那么带着刚刚的问题，我们来分析一下ArrayList中的writeObject 和 readObject 方法到底是如何被调用的呢？</p><p>为了节省篇幅，这里给出ObjectOutputStream的writeObject的调用栈：</p><p><code>writeObject ---&gt; writeObject0 ---&gt;writeOrdinaryObject---&gt;writeSerialData---&gt;invokeWriteObject</code></p><p>这里看一下invokeWriteObject：</p><pre><code>void invokeWriteObject(Object obj, ObjectOutputStream out)
        throws IOException, UnsupportedOperationException
    {
        if (writeObjectMethod != null) {
            try {
                writeObjectMethod.invoke(obj, new Object[]{ out });
            } catch (InvocationTargetException ex) {
                Throwable th = ex.getTargetException();
                if (th instanceof IOException) {
                    throw (IOException) th;
                } else {
                    throwMiscException(th);
                }
            } catch (IllegalAccessException ex) {
                // should not occur, as access checks have been suppressed
                throw new InternalError(ex);
            }
        } else {
            throw new UnsupportedOperationException();
        }
    }
</code></pre><p>其中<code>writeObjectMethod.invoke(obj, new Object[]{ out });</code>是关键，通过反射的方式调用writeObjectMethod方法。官方是这么解释这个writeObjectMethod的：</p><blockquote><p>class-defined writeObject method, or null if none</p></blockquote><p>在我们的例子中，这个方法就是我们在ArrayList中定义的writeObject方法。通过反射的方式被调用了。</p><p>至此，我们先试着来回答刚刚提出的问题：</p><blockquote><p><strong>如果一个类中包含writeObject 和 readObject 方法，那么这两个方法是怎么被调用的?</strong></p></blockquote><p>答：在使用ObjectOutputStream的writeObject方法和ObjectInputStream的readObject方法时，会通过反射的方式调用。</p><hr><p>至此，我们已经介绍完了ArrayList的序列化方式。那么，不知道有没有人提出这样的疑问：</p><div id="What Serializable Did"></div><blockquote><p><strong>Serializable明明就是一个空的接口，它是怎么保证只有实现了该接口的方法才能进行序列化与反序列化的呢？</strong></p></blockquote><p>Serializable接口的定义：</p><pre><code>public interface Serializable {
}
</code></pre><p>读者可以尝试把code 1中的继承Serializable的代码去掉，再执行code 2，会抛出<code>java.io.NotSerializableException</code>。</p><p>其实这个问题也很好回答，我们再回到刚刚ObjectOutputStream的writeObject的调用栈：</p><p><code>writeObject ---&gt; writeObject0 ---&gt;writeOrdinaryObject---&gt;writeSerialData---&gt;invokeWriteObject</code></p><p>writeObject0方法中有这么一段代码：</p><pre><code>if (obj instanceof String) {
                writeString((String) obj, unshared);
            } else if (cl.isArray()) {
                writeArray(obj, desc, unshared);
            } else if (obj instanceof Enum) {
                writeEnum((Enum&lt;?&gt;) obj, desc, unshared);
            } else if (obj instanceof Serializable) {
                writeOrdinaryObject(obj, desc, unshared);
            } else {
                if (extendedDebugInfo) {
                    throw new NotSerializableException(
                        cl.getName() + &quot;\\n&quot; + debugInfoStack.toString());
                } else {
                    throw new NotSerializableException(cl.getName());
                }
            }
</code></pre><p>在进行序列化操作时，会判断要被序列化的类是否是Enum、Array和Serializable类型，如果不是则直接抛出<code>NotSerializableException</code>。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>1、如果一个类想被序列化，需要实现Serializable接口。否则将抛出<code>NotSerializableException</code>异常，这是因为，在序列化操作过程中会对类型进行检查，要求被序列化的类必须属于Enum、Array和Serializable类型其中的任何一种。</p><p>2、在变量声明前加上该关键字，可以阻止该变量被序列化到文件中。</p><p>3、在类中增加writeObject 和 readObject 方法可以实现自定义序列化策略</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h2>`,79),d={href:"https://www.ibm.com/developerworks/cn/java/j-lo-serial/",target:"_blank",rel:"noopener noreferrer"};function b(u,j){const t=a("ExternalLinkIcon");return i(),r("div",null,[p,e("p",null,[e("a",d,[o("Java 序列化的高级认识"),c(t)])])])}const O=n(s,[["render",b],["__file","serialize-principle.html.vue"]]),m=JSON.parse('{"path":"/docs/java/java-basic/serialize-principle.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Java对象的序列化","slug":"java对象的序列化","link":"#java对象的序列化","children":[]},{"level":2,"title":"如何对Java对象进行序列化与反序列化","slug":"如何对java对象进行序列化与反序列化","link":"#如何对java对象进行序列化与反序列化","children":[]},{"level":2,"title":"序列化及反序列化相关知识","slug":"序列化及反序列化相关知识","link":"#序列化及反序列化相关知识","children":[]},{"level":2,"title":"ArrayList的序列化","slug":"arraylist的序列化","link":"#arraylist的序列化","children":[{"level":3,"title":"writeObject和readObject方法","slug":"writeobject和readobject方法","link":"#writeobject和readobject方法","children":[]},{"level":3,"title":"why transient","slug":"why-transient","link":"#why-transient","children":[]},{"level":3,"title":"why writeObject and readObject","slug":"why-writeobject-and-readobject","link":"#why-writeobject-and-readobject","children":[]}]},{"level":2,"title":"ObjectOutputStream","slug":"objectoutputstream","link":"#objectoutputstream","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/serialize-principle.md"}');export{O as comp,m as data};
