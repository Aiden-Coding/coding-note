import{_ as e,o as i,c as n,e as o}from"./app-BihAYnmf.js";const a={},r=o(`<p>关于<code>serialVersionUID</code> 。这个字段到底有什么用？如果不设置会怎么样？为什么《阿里巴巴Java开发手册》中有以下规定：</p><p><img src="http://www.hollischuang.com/wp-content/uploads/2018/12/15455608799770.jpg" alt="-w934">￼</p><h3 id="背景知识" tabindex="-1"><a class="header-anchor" href="#背景知识"><span>背景知识</span></a></h3><p><strong>Serializable 和 Externalizable</strong></p><p>类通过实现 <code>java.io.Serializable</code> 接口以启用其序列化功能。**未实现此接口的类将无法进行序列化或反序列化。**可序列化类的所有子类型本身都是可序列化的。</p><p>如果读者看过<code>Serializable</code>的源码，就会发现，他只是一个空的接口，里面什么东西都没有。**Serializable接口没有方法或字段，仅用于标识可序列化的语义。**但是，如果一个类没有实现这个接口，想要被序列化的话，就会抛出<code>java.io.NotSerializableException</code>异常。</p><p>它是怎么保证只有实现了该接口的方法才能进行序列化与反序列化的呢？</p><p>原因是在执行序列化的过程中，会执行到以下代码：</p><pre><code>if (obj instanceof String) {
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
</code></pre><p>在进行序列化操作时，会判断要被序列化的类是否是<code>Enum</code>、<code>Array</code>和<code>Serializable</code>类型，如果都不是则直接抛出<code>NotSerializableException</code>。</p><p>Java中还提供了<code>Externalizable</code>接口，也可以实现它来提供序列化能力。</p><p><code>Externalizable</code>继承自<code>Serializable</code>，该接口中定义了两个抽象方法：<code>writeExternal()</code>与<code>readExternal()</code>。</p><p>当使用<code>Externalizable</code>接口来进行序列化与反序列化的时候需要开发人员重写<code>writeExternal()</code>与<code>readExternal()</code>方法。否则所有变量的值都会变成默认值。</p><p><strong>transient</strong></p><p><code>transient</code> 关键字的作用是控制变量的序列化，在变量声明前加上该关键字，可以阻止该变量被序列化到文件中，在被反序列化后，<code>transient</code> 变量的值被设为初始值，如 int 型的是 0，对象型的是 null。</p><p><strong>自定义序列化策略</strong></p><p>在序列化过程中，如果被序列化的类中定义了<code>writeObject</code> 和 <code>readObject</code> 方法，虚拟机会试图调用对象类里的 <code>writeObject</code> 和 <code>readObject</code> 方法，进行用户自定义的序列化和反序列化。</p><p>如果没有这样的方法，则默认调用是 <code>ObjectOutputStream</code> 的 <code>defaultWriteObject</code> 方法以及 <code>ObjectInputStream</code> 的 <code>defaultReadObject</code> 方法。</p><p>用户自定义的 <code>writeObject</code> 和 <code>readObject</code> 方法可以允许用户控制序列化的过程，比如可以在序列化的过程中动态改变序列化的数值。</p><p>所以，对于一些特殊字段需要定义序列化的策略的时候，可以考虑使用transient修饰，并自己重写<code>writeObject</code> 和 <code>readObject</code> 方法，如<code>java.util.ArrayList</code>中就有这样的实现。</p><p>我们随便找几个Java中实现了序列化接口的类，如String、Integer等，我们可以发现一个细节，那就是这些类除了实现了<code>Serializable</code>外，还定义了一个<code>serialVersionUID</code> <img src="http://www.hollischuang.com/wp-content/uploads/2018/12/15455622116411.jpg" alt="">￼</p><p>那么，到底什么是<code>serialVersionUID</code>呢？为什么要设置这样一个字段呢？</p><h3 id="什么是serialversionuid" tabindex="-1"><a class="header-anchor" href="#什么是serialversionuid"><span>什么是serialVersionUID</span></a></h3><p>序列化是将对象的状态信息转换为可存储或传输的形式的过程。我们都知道，Java对象是保存在JVM的堆内存中的，也就是说，如果JVM堆不存在了，那么对象也就跟着消失了。</p><p>而序列化提供了一种方案，可以让你在即使JVM停机的情况下也能把对象保存下来的方案。就像我们平时用的U盘一样。把Java对象序列化成可存储或传输的形式（如二进制流），比如保存在文件中。这样，当再次需要这个对象的时候，从文件中读取出二进制流，再从二进制流中反序列化出对象。</p><p>虚拟机是否允许反序列化，不仅取决于类路径和功能代码是否一致，一个非常重要的一点是两个类的序列化 ID 是否一致，这个所谓的序列化ID，就是我们在代码中定义的<code>serialVersionUID</code>。</p><h3 id="如果serialversionuid变了会怎样" tabindex="-1"><a class="header-anchor" href="#如果serialversionuid变了会怎样"><span>如果serialVersionUID变了会怎样</span></a></h3><p>我们举个例子吧，看看如果<code>serialVersionUID</code>被修改了会发生什么？</p><pre><code>public class SerializableDemo1 {
    public static void main(String[] args) {
        //Initializes The Object
        User1 user = new User1();
        user.setName(&quot;hollis&quot;);
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
    }
}

class User1 implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
 }
</code></pre><p>我们先执行以上代码，把一个User1对象写入到文件中。然后我们修改一下User1类，把<code>serialVersionUID</code>的值改为<code>2L</code>。</p><pre><code>class User1 implements Serializable {
    private static final long serialVersionUID = 2L;
    private String name;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
</code></pre><p>然后执行以下代码，把文件中的对象反序列化出来：</p><pre><code>public class SerializableDemo2 {
    public static void main(String[] args) {
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
</code></pre><p>执行结果如下：</p><pre><code>java.io.InvalidClassException: com.hollis.User1; local class incompatible: stream classdesc serialVersionUID = 1, local class serialVersionUID = 2
</code></pre><p>可以发现，以上代码抛出了一个<code>java.io.InvalidClassException</code>，并且指出<code>serialVersionUID</code>不一致。</p><p>这是因为，在进行反序列化时，JVM会把传来的字节流中的<code>serialVersionUID</code>与本地相应实体类的<code>serialVersionUID</code>进行比较，如果相同就认为是一致的，可以进行反序列化，否则就会出现序列化版本不一致的异常，即是<code>InvalidCastException</code>。</p><p>这也是《阿里巴巴Java开发手册》中规定，在兼容性升级中，在修改类的时候，不要修改<code>serialVersionUID</code>的原因。<strong>除非是完全不兼容的两个版本</strong>。所以，<strong><code>serialVersionUID</code>其实是验证版本一致性的。</strong></p><p>如果读者感兴趣，可以把各个版本的JDK代码都拿出来看一下，那些向下兼容的类的<code>serialVersionUID</code>是没有变化过的。比如String类的<code>serialVersionUID</code>一直都是<code>-6849794470754667710L</code>。</p><p>但是，作者认为，这个规范其实还可以再严格一些，那就是规定：</p><p>如果一个类实现了<code>Serializable</code>接口，就必须手动添加一个<code>private static final long serialVersionUID</code>变量，并且设置初始值。</p><h3 id="为什么要明确定一个serialversionuid" tabindex="-1"><a class="header-anchor" href="#为什么要明确定一个serialversionuid"><span>为什么要明确定一个serialVersionUID</span></a></h3><p>如果我们没有在类中明确的定义一个<code>serialVersionUID</code>的话，看看会发生什么。</p><p>尝试修改上面的demo代码，先使用以下类定义一个对象，该类中不定义<code>serialVersionUID</code>，将其写入文件。</p><pre><code>class User1 implements Serializable {
    private String name;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
 }
</code></pre><p>然后我们修改User1类，向其中增加一个属性。在尝试将其从文件中读取出来，并进行反序列化。</p><pre><code>class User1 implements Serializable {
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
 }
</code></pre><p>执行结果： <code>java.io.InvalidClassException: com.hollis.User1; local class incompatible: stream classdesc serialVersionUID = -2986778152837257883, local class serialVersionUID = 7961728318907695402</code></p><p>同样，抛出了<code>InvalidClassException</code>，并且指出两个<code>serialVersionUID</code>不同，分别是<code>-2986778152837257883</code>和<code>7961728318907695402</code>。</p><p>从这里可以看出，系统自己添加了一个<code>serialVersionUID</code>。</p><p>所以，一旦类实现了<code>Serializable</code>，就建议明确的定义一个<code>serialVersionUID</code>。不然在修改类的时候，就会发生异常。</p><p><code>serialVersionUID</code>有两种显示的生成方式： 一是默认的1L，比如：<code>private static final long serialVersionUID = 1L;</code> 二是根据类名、接口名、成员方法及属性等来生成一个64位的哈希字段，比如： <code>private static final long serialVersionUID = xxxxL;</code></p><p>后面这种方式，可以借助IDE生成，后面会介绍。</p><h3 id="背后原理" tabindex="-1"><a class="header-anchor" href="#背后原理"><span>背后原理</span></a></h3><p>知其然，要知其所以然，我们再来看看源码，分析一下为什么<code>serialVersionUID</code>改变的时候会抛异常？在没有明确定义的情况下，默认的<code>serialVersionUID</code>是怎么来的？</p><p>为了简化代码量，反序列化的调用链如下：</p><p><code>ObjectInputStream.readObject -&gt; readObject0 -&gt; readOrdinaryObject -&gt; readClassDesc -&gt; readNonProxyDesc -&gt; ObjectStreamClass.initNonProxy</code></p><p>在<code>initNonProxy</code>中 ，关键代码如下：</p><p><img src="http://www.hollischuang.com/wp-content/uploads/2018/12/15455655236269.jpg" alt="">￼</p><p>在反序列化过程中，对<code>serialVersionUID</code>做了比较，如果发现不相等，则直接抛出异常。</p><p>深入看一下<code>getSerialVersionUID</code>方法：</p><pre><code>public long getSerialVersionUID() {
    // REMIND: synchronize instead of relying on volatile?
    if (suid == null) {
        suid = AccessController.doPrivileged(
            new PrivilegedAction&lt;Long&gt;() {
                public Long run() {
                    return computeDefaultSUID(cl);
                }
            }
        );
    }
    return suid.longValue();
}
</code></pre><p>在没有定义<code>serialVersionUID</code>的时候，会调用<code>computeDefaultSUID</code> 方法，生成一个默认的<code>serialVersionUID</code>。</p><p>这也就找到了以上两个问题的根源，其实是代码中做了严格的校验。</p><h3 id="idea提示" tabindex="-1"><a class="header-anchor" href="#idea提示"><span>IDEA提示</span></a></h3><p>为了确保我们不会忘记定义<code>serialVersionUID</code>，可以调节一下Intellij IDEA的配置，在实现<code>Serializable</code>接口后，如果没定义<code>serialVersionUID</code>的话，IDEA（eclipse一样）会进行提示： <img src="http://www.hollischuang.com/wp-content/uploads/2018/12/15455657868672.jpg" alt="">￼</p><p>并且可以一键生成一个：</p><p><img src="http://www.hollischuang.com/wp-content/uploads/2018/12/15455658088098.jpg" alt="">￼</p><p>当然，这个配置并不是默认生效的，需要手动到IDEA中设置一下：</p><p><img src="http://www.hollischuang.com/wp-content/uploads/2018/12/15455659620042.jpg" alt="">￼</p><p>在图中标号3的地方（Serializable class without serialVersionUID的配置），打上勾，保存即可。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p><code>serialVersionUID</code>是用来验证版本一致性的。所以在做兼容性升级的时候，不要改变类中<code>serialVersionUID</code>的值。</p><p>如果一个类实现了Serializable接口，一定要记得定义<code>serialVersionUID</code>，否则会发生异常。可以在IDE中通过设置，让他帮忙提示，并且可以一键快速生成一个<code>serialVersionUID</code>。</p><p>之所以会发生异常，是因为反序列化过程中做了校验，并且如果没有明确定义的话，会根据类的属性自动生成一个。</p>`,75),c=[r];function s(t,l){return i(),n("div",null,c)}const p=e(a,[["render",s],["__file","serialVersionUID-modify.html.vue"]]),u=JSON.parse('{"path":"/docs/java/java-basic/serialVersionUID-modify.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"背景知识","slug":"背景知识","link":"#背景知识","children":[]},{"level":3,"title":"什么是serialVersionUID","slug":"什么是serialversionuid","link":"#什么是serialversionuid","children":[]},{"level":3,"title":"如果serialVersionUID变了会怎样","slug":"如果serialversionuid变了会怎样","link":"#如果serialversionuid变了会怎样","children":[]},{"level":3,"title":"为什么要明确定一个serialVersionUID","slug":"为什么要明确定一个serialversionuid","link":"#为什么要明确定一个serialversionuid","children":[]},{"level":3,"title":"背后原理","slug":"背后原理","link":"#背后原理","children":[]},{"level":3,"title":"IDEA提示","slug":"idea提示","link":"#idea提示","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/serialVersionUID-modify.md"}');export{p as comp,u as data};
