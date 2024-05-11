import{_ as c,r as n,o as t,c as p,a,b as l,d as e,e as o}from"./app-BihAYnmf.js";const r={},i=a("p",null,"在Java中，常量池的概念想必很多人都听说过。这也是面试中比较常考的题目之一。在Java有关的面试题中，一般习惯通过String的有关问题来考察面试者对于常量池的知识的理解，几道简单的String面试题难倒了无数的开发者。所以说，常量池是Java体系中一个非常重要的概念。",-1),d=a("p",null,[l("谈到常量池，在Java体系中，共用三种常量池。分别是"),a("strong",null,"字符串常量池"),l("、"),a("strong",null,"Class常量池"),l("和"),a("strong",null,"运行时常量池"),l("。")],-1),h=a("p",null,"本文先来介绍一下到底什么是Class常量池。",-1),v=a("h3",{id:"什么是class文件",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#什么是class文件"},[a("span",null,"什么是Class文件")])],-1),u={href:"http://www.hollischuang.com/archives/58",target:"_blank",rel:"noopener noreferrer"},C={href:"http://www.hollischuang.com/archives/2322",target:"_blank",rel:"noopener noreferrer"},_=o(`<p>有了字节码，无论是哪种平台（如Windows、Linux等），只要安装了虚拟机，都可以直接运行字节码。</p><p>同样，有了字节码，也解除了Java虚拟机和Java语言之间的耦合。这话可能很多人不理解，Java虚拟机不就是运行Java语言的么？这种解耦指的是什么？</p><p>其实，目前Java虚拟机已经可以支持很多除Java语言以外的语言了，如Groovy、JRuby、Jython、Scala等。之所以可以支持，就是因为这些语言也可以被编译成字节码。而虚拟机并不关心字节码是有哪种语言编译而来的。</p><p>Java语言中负责编译出字节码的编译器是一个命令是<code>javac</code>。</p><blockquote><p>javac是收录于JDK中的Java语言编译器。该工具可以将后缀名为.java的源文件编译为后缀名为.class的可以运行于Java虚拟机的字节码。</p></blockquote><p>如，我们有以下简单的<code>HelloWorld.java</code>代码：</p><pre><code>public class HelloWorld {
    public static void main(String[] args) {
        String s = &quot;Hollis&quot;;
    }
}
</code></pre><p>通过javac命令生成class文件：</p><pre><code>javac HelloWorld.java
</code></pre><p>生成<code>HelloWorld.class</code>文件:</p><p><img src="http://www.hollischuang.com/wp-content/uploads/2018/10/15401179593014.jpg" alt="">￼</p><blockquote><p>如何使用16进制打开class文件：使用 <code>vim test.class</code> ，然后在交互模式下，输入<code>:%!xxd</code> 即可。</p></blockquote><p>可以看到，上面的文件就是Class文件，Class文件中包含了Java虚拟机指令集和符号表以及若干其他辅助信息。</p><p>要想能够读懂上面的字节码，需要了解Class类文件的结构，由于这不是本文的重点，这里就不展开说明了。</p>`,14),g=a("code",null,"HelloWorld.class",-1),m=a("code",null,"cafe babe",-1),b={href:"http://www.hollischuang.com/archives/491",target:"_blank",rel:"noopener noreferrer"},J=o(`<p>我们需要知道的是，在Class文件的4个字节的魔数后面的分别是4个字节的Class文件的版本号（第5、6个字节是次版本号，第7、8个字节是主版本号，我生成的Class文件的版本号是52，这时Java 8对应的版本。也就是说，这个版本的字节码，在JDK 1.8以下的版本中无法运行）在版本号后面的，就是Class常量池入口了。</p><h3 id="class常量池" tabindex="-1"><a class="header-anchor" href="#class常量池"><span>Class常量池</span></a></h3><p>Class常量池可以理解为是Class文件中的资源仓库。 Class文件中除了包含类的版本、字段、方法、接口等描述信息外，还有一项信息就是常量池(constant pool table)，用于存放编译器生成的各种字面量(Literal)和符号引用(Symbolic References)。</p><p>由于不同的Class文件中包含的常量的个数是不固定的，所以在Class文件的常量池入口处会设置两个字节的常量池容量计数器，记录了常量池中常量的个数。</p><p><img src="http://www.hollischuang.com/wp-content/uploads/2018/10/15401192359009.jpg" alt="-w697">￼</p><p>当然，还有一种比较简单的查看Class文件中常量池的方法，那就是通过<code>javap</code>命令。对于以上的<code>HelloWorld.class</code>，可以通过</p><pre><code>javap -v  HelloWorld.class
</code></pre><p>查看常量池内容如下:</p><p><img src="http://www.hollischuang.com/wp-content/uploads/2018/10/15401195127619.jpg" alt="">￼</p><blockquote><p>从上图中可以看到，反编译后的class文件常量池中共有16个常量。而Class文件中常量计数器的数值是0011，将该16进制数字转换成10进制的结果是17。</p><p>原因是与Java的语言习惯不同，常量池计数器是从1开始而不是从0开始的，常量池的个数是10进制的17，这就代表了其中有16个常量，索引值范围为1-16。</p></blockquote><h3 id="常量池中有什么" tabindex="-1"><a class="header-anchor" href="#常量池中有什么"><span>常量池中有什么</span></a></h3><p>介绍完了什么是Class常量池以及如何查看常量池，那么接下来我们就要深入分析一下，Class常量池中都有哪些内容。</p><p>常量池中主要存放两大类常量：字面量（literal）和符号引用（symbolic references）。</p><h3 id="字面量" tabindex="-1"><a class="header-anchor" href="#字面量"><span>字面量</span></a></h3><p>前面说过，Class常量池中主要保存的是字面量和符号引用，那么到底什么字面量？</p><blockquote><p>在计算机科学中，字面量（literal）是用于表达源代码中一个固定值的表示法（notation）。几乎所有计算机编程语言都具有对基本值的字面量表示，诸如：整数、浮点数以及字符串；而有很多也对布尔类型和字符类型的值也支持字面量表示；还有一些甚至对枚举类型的元素以及像数组、记录和对象等复合类型的值也支持字面量表示法。</p></blockquote><p>以上是关于计算机科学中关于字面量的解释，并不是很容易理解。说简单点，字面量就是指由字母、数字等构成的字符串或者数值。</p><p>字面量只可以右值出现，所谓右值是指等号右边的值，如：int a=123这里的a为左值，123为右值。在这个例子中123就是字面量。</p><pre><code>int a = 123;
String s = &quot;hollis&quot;;
</code></pre><p>上面的代码事例中，123和hollis都是字面量。</p><p>本文开头的HelloWorld代码中，Hollis就是一个字面量。</p><h3 id="符号引用" tabindex="-1"><a class="header-anchor" href="#符号引用"><span>符号引用</span></a></h3><p>常量池中，除了字面量以外，还有符号引用，那么到底什么是符号引用呢。</p><p>符号引用是编译原理中的概念，是相对于直接引用来说的。主要包括了以下三类常量： * 类和接口的全限定名 * 字段的名称和描述符 * 方法的名称和描述符</p><p>这也就可以印证前面的常量池中还包含一些<code>com/hollis/HelloWorld</code>、<code>main</code>、<code>([Ljava/lang/String;)V</code>等常量的原因了。</p><h3 id="class常量池有什么用" tabindex="-1"><a class="header-anchor" href="#class常量池有什么用"><span>Class常量池有什么用</span></a></h3><p>前面介绍了这么多，关于Class常量池是什么，怎么查看Class常量池以及Class常量池中保存了哪些东西。有一个关键的问题没有讲，那就是Class常量池到底有什么用。</p><p>首先，可以明确的是，Class常量池是Class文件中的资源仓库，其中保存了各种常量。而这些常量都是开发者定义出来，需要在程序的运行期使用的。</p><p>在《深入理解Java虚拟》中有这样的表述：</p><p>Java代码在进行<code>Javac</code>编译的时候，并不像C和C++那样有“连接”这一步骤，而是在虚拟机加载Class文件的时候进行动态连接。也就是说，在Class文件中不会保存各个方法、字段的最终内存布局信息，因此这些字段、方法的符号引用不经过运行期转换的话无法得到真正的内存入口地址，也就无法直接被虚拟机使用。当虚拟机运行时，需要从常量池获得对应的符号引用，再在类创建时或运行时解析、翻译到具体的内存地址之中。关于类的创建和动态连接的内容，在虚拟机类加载过程时再进行详细讲解。</p><p>前面这段话，看起来很绕，不是很容易理解。其实他的意思就是： Class是用来保存常量的一个媒介场所，并且是一个中间场所。在JVM真的运行时，需要把常量池中的常量加载到内存中。</p><p>至于到底哪个阶段会做这件事情，以及Class常量池中的常量会以何种方式被加载到具体什么地方，会在本系列文章的后续内容中继续阐述。欢迎关注我的博客(http://www.hollischuang.com) 和公众号(Hollis)，即可第一时间获得最新内容。</p><p>另外，关于常量池中常量的存储形式，以及数据类型的表示方法本文中并未涉及，并不是说这部分知识点不重要，只是Class字节码的分析本就枯燥，作者不想在一篇文章中给读者灌输太多的理论上的内容。感兴趣的读者可以自行Google学习，如果真的有必要，我也可以单独写一篇文章再深入介绍。</p><h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h3>`,34),w={href:"https://blog.csdn.net/luanlouis/article/details/39960815",target:"_blank",rel:"noopener noreferrer"};function f(k,j){const s=n("ExternalLinkIcon");return t(),p("div",null,[i,d,h,v,a("p",null,[l("在"),a("a",u,[l("Java代码的编译与反编译那些事儿"),e(s)]),l("中我们介绍过Java的编译和反编译的概念。我们知道，计算机只认识0和1，所以程序员写的代码都需要经过编译成0和1构成的二进制格式才能够让计算机运行。")]),a("p",null,[l("我们在《"),a("a",C,[l("深入分析Java的编译原理"),e(s)]),l("》中提到过，为了让Java语言具有良好的跨平台能力，Java独具匠心的提供了一种可以在所有平台上都能使用的一种中间代码——字节码（ByteCode）。")]),_,a("blockquote",null,[a("p",null,[l("读者可以看到，"),g,l("文件中的前八个字母是"),m,l("，这就是Class文件的魔数（"),a("a",b,[l("Java中的”魔数”"),e(s)]),l("）")])]),J,a("p",null,[l("《深入理解java虚拟机》 "),a("a",w,[l("《Java虚拟机原理图解》 1.2.2、Class文件中的常量池详解（上）"),e(s)])])])}const q=c(r,[["render",f],["__file","class-contant-pool.html.vue"]]),H=JSON.parse('{"path":"/docs/java/java-basic/class-contant-pool.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"什么是Class文件","slug":"什么是class文件","link":"#什么是class文件","children":[]},{"level":3,"title":"Class常量池","slug":"class常量池","link":"#class常量池","children":[]},{"level":3,"title":"常量池中有什么","slug":"常量池中有什么","link":"#常量池中有什么","children":[]},{"level":3,"title":"字面量","slug":"字面量","link":"#字面量","children":[]},{"level":3,"title":"符号引用","slug":"符号引用","link":"#符号引用","children":[]},{"level":3,"title":"Class常量池有什么用","slug":"class常量池有什么用","link":"#class常量池有什么用","children":[]},{"level":3,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/class-contant-pool.md"}');export{q as comp,H as data};