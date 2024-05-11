import{_ as e,r as c,o as s,c as a,a as t,d as o,e as i}from"./app-BihAYnmf.js";const l={},r=t("p",null,"JMockit是基于JavaSE5中的java.lang.instrument包开发，内部使用ASM库来动态修改java的字节码，使得java这种静态语言可以想动态脚本语言一样动态设置被Mock对象私有属性，模拟静态、私有方法行为等等，对于手机开发，嵌入式开发等要求代码尽量简洁的情况下，或者对于被测试代码不想做任何修改的前提下，使用JMockit可以轻松搞定很多测试场景。",-1),p={href:"http://www.hollischuang.com/wp-content/uploads/2015/09/20140104100723093.jpg",target:"_blank",rel:"noopener noreferrer"},u=t("img",{src:"http://www.hollischuang.com/wp-content/uploads/2015/09/20140104100723093.jpg",alt:"20140104100723093",width:"885",height:"1010",class:"alignleft size-full wp-image-571"},null,-1),d=t("p",null,"通过如下方式在maven中添加JMockit的相关依赖：",-1),k=t("pre",null,[t("code",null,`        <dependency>  
            <groupId>com.googlecode.jmockit</groupId>  
            <artifactId>jmockit</artifactId>  
            <version>1.5</version>  
            <scope>test</scope>  
        </dependency>  
        <dependency>  
            <groupId>com.googlecode.jmockit</groupId>  
            <artifactId>jmockit-coverage</artifactId>  
            <version>0.999.24</version>  
            <scope>test</scope>  
        </dependency>
`)],-1),g=t("p",null,"JMockit有两种Mock方式：基于行为的Mock方式和基于状态的Mock方式：",-1),M=t("p",null,"引用单元测试中mock的使用及mock神器jmockit实践中JMockit API和工具如下：",-1),h={href:"http://www.hollischuang.com/wp-content/uploads/2015/09/20140104102342843.jpg",target:"_blank",rel:"noopener noreferrer"},m=t("img",{src:"http://www.hollischuang.com/wp-content/uploads/2015/09/20140104102342843.jpg",alt:"20140104102342843",width:"913",height:"472",class:"alignleft size-full wp-image-572"},null,-1),b=i(`<h3 id="_1-基于行为的mock方式" tabindex="-1"><a class="header-anchor" href="#_1-基于行为的mock方式"><span>(1).基于行为的Mock方式：</span></a></h3><p>非常类似与EasyMock和PowerMock的工作原理，基本步骤为：</p><p>1.录制方法预期行为。</p><p>2.真实调用。</p><p>3.验证录制的行为被调用。</p><p>通过一个简单的例子来介绍JMockit的基本流程：</p><p><strong>要Mock测试的方法如下：</strong></p><pre><code>public class MyObject {
    public String hello(String name){
        return &quot;Hello &quot; + name;
    }
}
</code></pre><p><strong>使用JMockit编写的单元测试如下：</strong></p><pre><code>@Mocked  //用@Mocked标注的对象，不需要赋值，jmockit自动mock  
MyObject obj;  

@Test  
public void testHello() {  
    new NonStrictExpectations() {//录制预期模拟行为  
        {  
            obj.hello(&quot;Zhangsan&quot;);  
            returns(&quot;Hello Zhangsan&quot;);  
            //也可以使用：result = &quot;Hello Zhangsan&quot;;  
        }  
    };  
    assertEquals(&quot;Hello Zhangsan&quot;, obj.hello(&quot;Zhangsan&quot;));//调用测试方法  
    new Verifications() {//验证预期Mock行为被调用  
        {  
            obj.hello(&quot;Hello Zhangsan&quot;);  
            times = 1;  
        }  
    };  
}  
</code></pre><p>JMockit也可以分类为非局部模拟与局部模拟，区分在于Expectations块是否有参数，有参数的是局部模拟，反之是非局部模拟。</p><p>而Expectations块一般由Expectations类和NonStrictExpectations类定义，类似于EasyMock和PowerMock中的Strict Mock和一般性Mock。</p><p>用Expectations类定义的，则mock对象在运行时只能按照 Expectations块中定义的顺序依次调用方法，不能多调用也不能少调用，所以可以省略掉Verifications块；</p><p>而用NonStrictExpectations类定义的，则没有这些限制，所以如果需要验证，则要添加Verifications块。</p><p>上述的例子使用了非局部模拟，下面我们使用局部模拟来改写上面的测试，代码如下：</p><pre><code>@Test  
public void testHello() {  
    final MyObject obj = new MyObject();  
    new NonStrictExpectations(obj) {//录制预期模拟行为  
        {  
            obj.hello(&quot;Zhangsan&quot;);  
            returns(&quot;Hello Zhangsan&quot;);  
            //也可以使用：result = &quot;Hello Zhangsan&quot;;  
        }  
    };  
    assertEquals(&quot;Hello Zhangsan&quot;, obj.hello(&quot;Zhangsan&quot;));//调用测试方法  
    new Verifications() {//验证预期Mock行为被调用  
        {  
            obj.hello(&quot;Hello Zhangsan&quot;);  
            times = 1;  
        }  
    };  
}  
</code></pre><p><strong>模拟静态方法：</strong></p><pre><code>@Test  
public void testMockStaticMethod() {  
    new NonStrictExpectations(ClassMocked.class) {  
        {  
            ClassMocked.getDouble(1);//也可以使用参数匹配：ClassMocked.getDouble(anyDouble);  
            result = 3;  
        }  
    };  

    assertEquals(3, ClassMocked.getDouble(1));  

    new Verifications() {  
        {  
            ClassMocked.getDouble(1);  
            times = 1;  
        }  
    };  
}  
</code></pre><p><strong>模拟私有方法：</strong></p><p>如果ClassMocked类中的getTripleString(int)方法指定调用一个私有的multiply3(int)的方法，我们可以使用如下方式来Mock：</p><pre><code>@Test  
public void testMockPrivateMethod() throws Exception {  
    final ClassMocked obj = new ClassMocked();  
    new NonStrictExpectations(obj) {  
        {  
            this.invoke(obj, &quot;multiply3&quot;, 1);//如果私有方法是静态的，可以使用：this.invoke(null, &quot;multiply3&quot;)  
            result = 4;  
        }  
    };  

    String actual = obj.getTripleString(1);  
    assertEquals(&quot;4&quot;, actual);  

    new Verifications() {  
        {  
            this.invoke(obj, &quot;multiply3&quot;, 1);  
            times = 1;  
        }  
    };  
}  
</code></pre><p><strong>设置Mock对象私有属性的值：</strong> 我们知道EasyMock和PowerMock的Mock对象是通过JDK/CGLIB动态代理实现的，本质上是类的继承或者接口的实现，但是在java面向对象编程中，基类对象中的私有属性是无法被子类继承的，所以如果被Mock对象的方法中使用到了其自身的私有属性，并且这些私有属性没有提供对象访问方法，则使用传统的Mock方法是无法进行测试的，JMockit提供了设置Mocked对象私有属性值的方法，代码如下： 被测试代码：</p><pre><code>public class ClassMocked {  
    private String name = &quot;name_init&quot;;  

    public String getName() {  
        return name;  
    }  

    private static String className=&quot;Class3Mocked_init&quot;;  

    public static String getClassName(){  
        return className;  
    }  
}  
</code></pre><p><strong>使用JMockit设置私有属性：</strong></p><pre><code>@Test  
public void testMockPrivateProperty() throws IOException {  
    final ClassMocked obj = new ClassMocked();  
    new NonStrictExpectations(obj) {  
        {  
            this.setField(obj, &quot;name&quot;, &quot;name has bean change!&quot;);  
        }  
    };  

    assertEquals(&quot;name has bean change!&quot;, obj.getName());  
}  
</code></pre><p><strong>使用JMockit设置静态私有属性：</strong></p><pre><code>@Test  
public void testMockPrivateStaticProperty() throws IOException {  
    new NonStrictExpectations(Class3Mocked.class) {  
        {  
            this.setField(ClassMocked.class, &quot;className&quot;, &quot;className has bean change!&quot;);  
        }  
    };  

    assertEquals(&quot;className has bean change!&quot;, ClassMocked.getClassName());  
}  
</code></pre><h3 id="_2-基于状态的mock方式" tabindex="-1"><a class="header-anchor" href="#_2-基于状态的mock方式"><span>(2).基于状态的Mock方式：</span></a></h3><p>JMockit上面的基于行为Mock方式和传统的EasyMock和PowerMock流程基本类似，相当于把被模拟的方法当作黑盒来处理，而JMockit的基于状态的Mock可以直接改写被模拟方法的内部逻辑，更像是真正意义上的白盒测试，下面通过简单例子介绍JMockit基于状态的Mock。 被测试的代码如下：</p><pre><code>public class StateMocked {  

    public static int getDouble(int i){  
        return i*2;  
    }  

    public int getTriple(int i){  
        return i*3;  
    }  
} 
</code></pre><p><strong>改写普通方法内容：</strong></p><pre><code>@Test  
public void testMockNormalMethodContent() throws IOException {  
    StateMocked obj = new StateMocked();  
    new MockUp&lt;StateMocked&gt;() {//使用MockUp修改被测试方法内部逻辑  
        @Mock  
      public int getTriple(int i) {  
            return i * 30;  
        }  
    };  
    assertEquals(30, obj.getTriple(1));  
    assertEquals(60, obj.getTriple(2));  
    Mockit.tearDownMocks();//注意：在JMockit1.5之后已经没有Mockit这个类，使用MockUp代替，mockUp和tearDown方法在MockUp类中  
}  
</code></pre><p><strong>修改静态方法的内容：</strong> 基于状态的JMockit改写静态/final方法内容和测试普通方法没有什么区别，需要注意的是在MockUp中的方法除了不包含static关键字以外，其他都和被Mock的方法签名相同，并且使用@Mock标注，测试代码如下：</p><pre><code>@Test  
    public void testGetTriple() {  
        new MockUp&lt;StateMocked&gt;() {  
            @Mock    
            public int getDouble(int i){    
                return i*20;    
            }  
        };    
        assertEquals(20, StateMocked.getDouble(1));    
        assertEquals(40, StateMocked.getDouble(2));   
    }  
</code></pre><p>原文链接: http://blog.csdn.net/chjttony/article/details/17838693</p>`,35);function q(w,j){const n=c("ExternalLinkIcon");return s(),a("div",null,[r,t("p",null,[t("a",p,[u,o(n)])]),d,k,g,M,t("p",null,[t("a",h,[m,o(n)])]),b])}const v=e(l,[["render",q],["__file","ut-with-jmockit.html.vue"]]),E=JSON.parse('{"path":"/docs/java/java-basic/ut-with-jmockit.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"(1).基于行为的Mock方式：","slug":"_1-基于行为的mock方式","link":"#_1-基于行为的mock方式","children":[]},{"level":3,"title":"(2).基于状态的Mock方式：","slug":"_2-基于状态的mock方式","link":"#_2-基于状态的mock方式","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/ut-with-jmockit.md"}');export{v as comp,E as data};
