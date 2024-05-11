import{_ as p,r as n,o as u,c as g,a as t,b as e,d as o,w as a,e as c}from"./app-BihAYnmf.js";const m={},h=c('<h3 id="一、各种语言中的编译器是如何处理泛型的" tabindex="-1"><a class="header-anchor" href="#一、各种语言中的编译器是如何处理泛型的"><span>一、各种语言中的编译器是如何处理泛型的</span></a></h3><p>通常情况下，一个编译器处理泛型有两种方式：</p><p>1.<code>Code specialization</code>。在实例化一个泛型类或泛型方法时都产生一份新的目标代码（字节码or二进制代码）。例如，针对一个泛型<code>List</code>，可能需要 针对<code>String</code>，<code>Integer</code>，<code>Float</code>产生三份目标代码。</p><p>2.<code>Code sharing</code>。对每个泛型类只生成唯一的一份目标代码；该泛型类的所有实例都映射到这份目标代码上，在需要的时候执行类型检查和类型转换。</p><p><strong>C++</strong> 中的模板（<code>template</code>）是典型的<code>Code specialization</code>实现。<strong>C++</strong> 编译器会为每一个泛型类实例生成一份执行代码。执行代码中<code>Integer List</code>和<code>String List</code>是两种不同的类型。这样会导致<strong>代码膨胀（code bloat）</strong>。 <strong>C#</strong> 里面泛型无论在程序源码中、编译后的<code>IL</code>中（Intermediate Language，中间语言，这时候泛型是一个占位符）或是运行期的CLR中都是切实存在的，<code>List&lt;Integer&gt;</code>与<code>List&lt;String&gt;</code>就是两个不同的类型，它们在系统运行期生成，有自己的虚方法表和类型数据，这种实现称为类型膨胀，基于这种方法实现的泛型被称为<code>真实泛型</code>。 <strong>Java</strong>语言中的泛型则不一样，它只在程序源码中存在，在编译后的字节码文件中，就已经被替换为原来的原生类型（Raw Type，也称为裸类型）了，并且在相应的地方插入了强制转型代码，因此对于运行期的Java语言来说，<code>ArrayList&lt;Integer&gt;</code>与<code>ArrayList&lt;String&gt;</code>就是同一个类。所以说泛型技术实际上是Java语言的一颗语法糖，Java语言中的泛型实现方法称为<strong>类型擦除</strong>，基于这种方法实现的泛型被称为<code>伪泛型</code>。</p><p><code>C++</code>和<code>C#</code>是使用<code>Code specialization</code>的处理机制，前面提到，他有一个缺点，那就是<strong>会导致代码膨胀</strong>。另外一个弊端是在引用类型系统中，浪费空间，因为引用类型集合中元素本质上都是一个指针。没必要为每个类型都产生一份执行代码。而这也是Java编译器中采用<code>Code sharing</code>方式处理泛型的主要原因。</p><p><code>Java</code>编译器通过<code>Code sharing</code>方式为每个泛型类型创建唯一的字节码表示，并且将该泛型类型的实例都映射到这个唯一的字节码表示上。将多种泛型类形实例映射到唯一的字节码表示是通过<strong>类型擦除</strong>（<code>type erasure</code>）实现的。</p><hr><h3 id="二、什么是类型擦除" tabindex="-1"><a class="header-anchor" href="#二、什么是类型擦除"><span>二、什么是类型擦除</span></a></h3><p>前面我们多次提到这个词：<strong>类型擦除</strong>（<code>type erasure</code>），那么到底什么是类型擦除呢？</p>',10),b={href:"/archives/255",target:"_blank",rel:"noopener noreferrer"},v=c(`<hr><h3 id="三、java编译器处理泛型的过程" tabindex="-1"><a class="header-anchor" href="#三、java编译器处理泛型的过程"><span>三、Java编译器处理泛型的过程</span></a></h3><p><strong>code 1:</strong></p><pre><code>public static void main(String[] args) {  
    Map&lt;String, String&gt; map = new HashMap&lt;String, String&gt;();  
    map.put(&quot;name&quot;, &quot;hollis&quot;);  
    map.put(&quot;age&quot;, &quot;22&quot;);  
    System.out.println(map.get(&quot;name&quot;));  
    System.out.println(map.get(&quot;age&quot;));  
}  
</code></pre><p><strong>反编译后的code 1:</strong></p><pre><code>public static void main(String[] args) {  
    Map map = new HashMap();  
    map.put(&quot;name&quot;, &quot;hollis&quot;);  
    map.put(&quot;age&quot;, &quot;22&quot;); 
    System.out.println((String) map.get(&quot;name&quot;));  
    System.out.println((String) map.get(&quot;age&quot;));  
}  
</code></pre><p>我们发现泛型都不见了，程序又变回了Java泛型出现之前的写法，泛型类型都变回了原生类型，</p><hr><p><strong>code 2:</strong></p><pre><code>interface Comparable&lt;A&gt; {
    public int compareTo(A that);
}

public final class NumericValue implements Comparable&lt;NumericValue&gt; {
    private byte value;

    public NumericValue(byte value) {
        this.value = value;
    }

    public byte getValue() {
        return value;
    }

    public int compareTo(NumericValue that) {
        return this.value - that.value;
    }
}
</code></pre><p><strong>反编译后的code 2:</strong></p><pre><code> interface Comparable {
  public int compareTo( Object that);
} 

public final class NumericValue
    implements Comparable
{
    public NumericValue(byte value)
    {
        this.value = value;
    }
    public byte getValue()
    {
        return value;
    }
    public int compareTo(NumericValue that)
    {
        return value - that.value;
    }
    public volatile int compareTo(Object obj)
    {
        return compareTo((NumericValue)obj);
    }
    private byte value;
}
</code></pre><hr><p><strong>code 3:</strong></p><pre><code>public class Collections {
    public static &lt;A extends Comparable&lt;A&gt;&gt; A max(Collection&lt;A&gt; xs) {
        Iterator&lt;A&gt; xi = xs.iterator();
        A w = xi.next();
        while (xi.hasNext()) {
            A x = xi.next();
            if (w.compareTo(x) &lt; 0)
                w = x;
        }
        return w;
    }
}
</code></pre><p><strong>反编译后的code 3:</strong></p><pre><code>public class Collections
{
    public Collections()
    {
    }
    public static Comparable max(Collection xs)
    {
        Iterator xi = xs.iterator();
        Comparable w = (Comparable)xi.next();
        while(xi.hasNext())
        {
            Comparable x = (Comparable)xi.next();
            if(w.compareTo(x) &lt; 0)
                w = x;
        }
        return w;
    }
}
</code></pre><p>第2个泛型类<code>Comparable &lt;A&gt;</code>擦除后 A被替换为最左边界<code>Object</code>。<code>Comparable&lt;NumericValue&gt;</code>的类型参数<code>NumericValue</code>被擦除掉，但是这直 接导致<code>NumericValue</code>没有实现接口<code>Comparable的compareTo(Object that)</code>方法，于是编译器充当好人，添加了一个<strong>桥接方法</strong>。 第3个示例中限定了类型参数的边界<code>&lt;A extends Comparable&lt;A&gt;&gt;A</code>，A必须为<code>Comparable&lt;A&gt;</code>的子类，按照类型擦除的过程，先讲所有的类型参数 ti换为最左边界<code>Comparable&lt;A&gt;</code>，然后去掉参数类型<code>A</code>，得到最终的擦除后结果。</p><hr><h3 id="四、泛型带来的问题" tabindex="-1"><a class="header-anchor" href="#四、泛型带来的问题"><span>四、泛型带来的问题</span></a></h3><p><strong>一、当泛型遇到重载：</strong></p><pre><code>public class GenericTypes {  

    public static void method(List&lt;String&gt; list) {  
        System.out.println(&quot;invoke method(List&lt;String&gt; list)&quot;);  
    }  

    public static void method(List&lt;Integer&gt; list) {  
        System.out.println(&quot;invoke method(List&lt;Integer&gt; list)&quot;);  
    }  
}  
</code></pre>`,22),x=t("code",null,"List<String>",-1),_=t("code",null,"List<Integer>",-1),C=t("code",null,"List<Integer>",-1),S=t("code",null,"List<String>",-1),y=t("p",null,[t("strong",null,"二、当泛型遇到catch:")],-1),q=c(`<p>三、当泛型内包含静态变量</p><pre><code>public class StaticTest{
    public static void main(String[] args){
        GT&lt;Integer&gt; gti = new GT&lt;Integer&gt;();
        gti.var=1;
        GT&lt;String&gt; gts = new GT&lt;String&gt;();
        gts.var=2;
        System.out.println(gti.var);
    }
}
class GT&lt;T&gt;{
    public static int var=0;
    public void nothing(T x){}
}
</code></pre><p>答案是——2！由于经过类型擦除，所有的泛型类实例都关联到同一份字节码上，泛型类的所有静态变量是共享的。</p><hr><h3 id="五、总结" tabindex="-1"><a class="header-anchor" href="#五、总结"><span>五、总结</span></a></h3><p>1.虚拟机中没有泛型，只有普通类和普通方法,所有泛型类的类型参数在编译时都会被擦除,泛型类并没有自己独有的Class类对象。比如并不存在<code>List&lt;String&gt;</code>.class或是<code>List&lt;Integer&gt;.class</code>，而只有<code>List.class</code>。 2.创建泛型对象时请指明类型，让编译器尽早的做参数检查（<strong>Effective Java，第23条：请不要在新代码中使用原生态类型</strong>） 3.不要忽略编译器的警告信息，那意味着潜在的<code>ClassCastException</code>等着你。 4.静态变量是被泛型类的所有实例所共享的。对于声明为<code>MyClass&lt;T&gt;</code>的类，访问其中的静态变量的方法仍然是 <code>MyClass.myStaticVar</code>。不管是通过<code>new MyClass&lt;String&gt;</code>还是<code>new MyClass&lt;Integer&gt;</code>创建的对象，都是共享一个静态变量。 5.泛型的类型参数不能用在<code>Java</code>异常处理的<code>catch</code>语句中。因为异常处理是由JVM在运行时刻来进行的。由于类型信息被擦除，<code>JVM</code>是无法区分两个异常类型<code>MyException&lt;String&gt;</code>和<code>MyException&lt;Integer&gt;</code>的。对于<code>JVM</code>来说，它们都是 <code>MyException</code>类型的。也就无法执行与异常对应的<code>catch</code>语句。</p>`,6);function f(L,T){const r=n("ExternalLinkIcon"),l=n("e"),i=n("Integer"),s=n("String"),d=n("t");return u(),g("div",null,[h,t("blockquote",null,[t("p",null,[e("类型擦除指的是通过类型参数合并，将泛型类型实例关联到同一份字节码上。编译器只为泛型类型生成一份字节码，并将其实例关联到这份字节码上。类型擦除的关键在于从泛型类型中清除类型参数的相关信息，并且再必要的时候添加类型检查和类型转换的方法。 类型擦除可以简单的理解为将泛型java代码转换为普通java代码，只不过编译器更直接点，将泛型java代码直接转换成普通java字节码。 类型擦除的主要过程如下： 1.将所有的泛型参数用其最左边界（最顶级的父类型）类型替换。（这部分内容可以看："),t("a",b,[e("Java泛型中extends和super的理解"),o(r)]),e("） 2.移除所有的类型参数。")])]),v,t("p",null,[e("上面这段代码，有两个重载的函数，因为他们的参数类型不同，一个是"),x,e("另一个是"),_,e(" ，但是，这段代码是编译通不过的。因为我们前面讲过，参数"),C,e("和"),S,e("编译之后都被擦除了，变成了一样的原生类型List"),o(l,null,{default:a(()=>[e("，擦除动作导致这两个方法的特征签名变得一模一样。")]),_:1})]),y,t("p",null,[e("如果我们自定义了一个泛型异常类GenericException"),o(d,null,{default:a(()=>[e("，那么，不要尝试用多个catch取匹配不同的异常类型，例如你想要分别捕获GenericException"),o(s,null,{default:a(()=>[e("、GenericException"),o(i,null,{default:a(()=>[e("，这也是有问题的。")]),_:1})]),_:1})]),_:1})]),q])}const V=p(m,[["render",f],["__file","type-erasure.html.vue"]]),w=JSON.parse('{"path":"/docs/java/java-basic/type-erasure.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"一、各种语言中的编译器是如何处理泛型的","slug":"一、各种语言中的编译器是如何处理泛型的","link":"#一、各种语言中的编译器是如何处理泛型的","children":[]},{"level":3,"title":"二、什么是类型擦除","slug":"二、什么是类型擦除","link":"#二、什么是类型擦除","children":[]},{"level":3,"title":"三、Java编译器处理泛型的过程","slug":"三、java编译器处理泛型的过程","link":"#三、java编译器处理泛型的过程","children":[]},{"level":3,"title":"四、泛型带来的问题","slug":"四、泛型带来的问题","link":"#四、泛型带来的问题","children":[]},{"level":3,"title":"五、总结","slug":"五、总结","link":"#五、总结","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/type-erasure.md"}');export{V as comp,w as data};
