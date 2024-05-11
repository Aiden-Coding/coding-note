import{_ as p,r as i,o as c,c as d,a,b as t,d as e,w as o,e as s}from"./app-BihAYnmf.js";const r="/coding-note/assets/image-99-CXbpvYH1.png",m="/coding-note/assets/image-100-mbgyzKjM.png",_="/coding-note/assets/image-101-BJe38Gaa.png",h="/coding-note/assets/image-124-DTvrzlhI.png",u="/coding-note/assets/image-125-DTbpdjhw.png",v="/coding-note/assets/image-126-Cmm2J3_v.png",g="/coding-note/assets/image-127-DhsL62nc.png",J="/coding-note/assets/image-128-L2c5XtVf.png",M="/coding-note/assets/image-129-Cr-BY6-P.png",j="/coding-note/assets/image-130-BjaeTqqt.png",V="/coding-note/assets/image-131-C_CtzjrQ.png",x="/coding-note/assets/image-132-C1fvQhOn.png",f="/coding-note/assets/image-133-BI6D6I2Q.png",A="/coding-note/assets/image-102-BSDmlwN6.png",b={},S=a("h1",{id:"第一节-大白话带你认识-jvm",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#第一节-大白话带你认识-jvm"},[a("span",null,"第一节：大白话带你认识 JVM")])],-1),k=a("p",null,[a("img",{src:r,alt:"Alt text"})],-1),w=a("p",null,"那就让我们开始吧！",-1),C=s('<p>一开始，项目组打算使用 C++，但 C++ 无法达到跨平台的要求，比如在 Windows 系统下编译的 Hello.exe 无法直接拿到 Linux 环境下执行。</p><p><img src="'+m+'" alt="Alt text"></p><p>在当时，C++ 已经非常流行了，但无法跨平台，只能忍痛割爱了。</p><p>怎么办呢？</p><p>三妹不知道有没有听过直译器（解释器）这玩意？（估计你没听过）就是每跑一行代码就生成机器码，然后执行，比如说 Python 和 Ruby 用的就是直译器。在每个操作系统上装一个直译器就好了，跨平台的目的就达到了。</p><p><img src="'+_+'" alt="Alt text"></p><p>但直译器有个缺点，就是没法像编译器那样对一些热点代码进行优化，从而让机器码跑得更快一些。</p><p>怎么办呢？</p><p>来个结合体呗，编译器和直译器一块上！</p><p><img src="'+h+'" alt="Alt text"></p>',10),E=s('<p><img src="'+u+'" alt="Alt text"></p><blockquote><ul><li>Java 虚拟机：Java Virtual Machine，简称 JVM，也就是我们接下来要学习的重点。</li><li>字节码：Bytecode，接下来会细讲。</li><li>JIT：Just-In-Time，即时编译器，后面会细讲。</li></ul></blockquote><p>这样的话，不仅跨平台的目的达到了，而且性能得到了优化，两全其美！</p><p>“为什么 Java 虚拟机会叫 Java 虚拟机呢？”三妹问了一个很古怪的问题。</p><p>虚拟机，顾名思义，就是虚拟的机器（多苍白的解释），反正就是看不见摸不着的机器，一个相对物理机的叫法，你把它想象成一个会执行字节码的怪兽吧。</p><p>记得上大学那会，由于没有 Linux 环境，但又需要在上面玩一些命令，于是二哥就会在 Windows 上装一个 Linux 的虚拟机，这个 JVM 就类似这种东西。</p><p>说白了，就是我们编写 Java 代码，编译 Java 代码，目的不是让它在 Linux、Windows 或者 MacOS 上跑，而是在 JVM 上跑。</p><h2 id="jvm-家族" tabindex="-1"><a class="header-anchor" href="#jvm-家族"><span>JVM 家族</span></a></h2><p>我刚讲完这些，三妹就问：“都有哪些 Java 虚拟机呢？”</p><p>来看下面这张思维导图，一目了然。</p><p><img src="'+v+'" alt="Alt text"></p><p>除了我们经常看到、听到的 Hotspot VM，还有很多，下面我来简单介绍一下。</p><ul><li>Sun Classic：世界上第一款商用 Java 虚拟机，但执行效率低下，导致 Java 程序的性能和 C/C++ 存在很大差距，因此给后来者留下了“Java 语言很慢”的刻板印象。</li><li>Exact VM：为了提升 Classic 的效率，Sun 的虚拟机团队曾在 Solaris（Sun 研发的一款类似 Unix 的操作系统）上发布过这款虚拟机，它的执行系统里包含有热点探测、即时编译等，但不是很成熟。Sun Classic 在 JDK 1.4 的时候被彻底抛弃，而 Exact VM 被抛弃得更早，取代它的正是 HotSpot VM——时也命也。</li><li>Mobile VM：Java 在移动手机端（被 Android 和 IOS 二分天下）的发展并没有那么成功，因此 Mobile VM 的声望值比较低。</li><li>Embedded VM：嵌入式设备上的虚拟机。</li><li>BEA JRockit：曾经号称是“世界上最快的 Java 虚拟机”，后来被 Oracle 收购后就没有声音了。</li><li>IBM J9 VM：提起 IBM，基本上所有程序员都知道了，也是个巨头，所以他家的虚拟机也很强，在职责分离和模块化上做得比 HotSpot 更好。目前已经开源给 Eclipse 基金会。</li><li>BEA Liquid VM：是 BEA 公司开发的可以直接运行在自家系统上的虚拟机，可以越过操作系统直接和硬件打交道，因此可以更大程度上的发挥硬件的能力。不过核心用的还是 JRockit，所以伴随着 JRockit 的消失，Liquid VM 也退出历史舞台了。</li><li>Azul VM：是 Azul 公司在 HotSpot 基础上进行大量改进后的，可以运行在 Azul 公司专有硬件上的虚拟机。2010 年起，Azul 公司的重心从硬件转移到软件上，并发布了 Zing 虚拟机，性能方面很强大。</li><li>Apache Harmony 和 Google Android Dalvik VM 并不是 严格意义上的 Java 虚拟机，但对 Java 虚拟机的发展起到了很大的刺激作用。但它们终究没有熬过时间。</li><li>Microsoft JVM：在早期的 Java Applets 年代，微软为了在 IE 中支持 Applets 开发了自己的 Java 虚拟机。你敢相信？Microsoft JVM 只有 Windows 版本，它与 JVM 实现的“一次编译，到处运行”的理念完全沾不上边。关键是，1997 年 10 月，Sun 公司因为这事把微软告了，最后微软赔给了 Sun 公司 2000 万美金，并且终止了在 Java 虚拟机方面的发展。如果，我是说如果，如果微软保持着对 Java 的热情，后面还有 .Net 什么事？</li></ul><p><img src="'+g+'" alt="Alt text"></p><p>最后再来讲一下：HotSpot VM，OracleJDK（商用）和 OpenJDK（开源）的默认虚拟机，也是目前使用最广泛的 Java 虚拟机，也就是传说中的太子，Java 虚拟机中的嫡长子。</p><p>HotSpot 的技术优势就在于热点代码探测技术（名字就从这来的）和准确式内存管理技术，但其实这两个技术在 Exact VM 中都有体现，因此你看起个好的名字多重要（开玩笑了，这就是命）。</p><p>热点代码探测，指的是，通过执行计数器找出最具有编译价值的代码，然后通知即时编译器以方法为单位进行编译，解释器就可以不再逐行的将字节码翻译成机器码，而是将一整个方法的所有字节码翻译成机器码再执行。</p>',17),L=s('<h2 id="jvm-的组织架构" tabindex="-1"><a class="header-anchor" href="#jvm-的组织架构"><span>JVM 的组织架构</span></a></h2><p>“JVM 的组织架构是什么样子的呢？它由哪些单位组成的呢？”三妹继续追问到。</p><p>JVM 大致可以划分为三个部门，分别是类加载器（Class Loader）、运行时数据区（Runtime Data Areas）和执行引擎（Excution Engine），见下图。</p><p><img src="'+J+'" alt="Alt text"></p><p>这三个部门具体又是干什么的，可以通过下面这幅图来了解。</p><p><img src="'+M+'" alt="Alt text"></p><h3 id="类加载器" tabindex="-1"><a class="header-anchor" href="#类加载器"><span>类加载器</span></a></h3>',7),B=a("h3",{id:"运行时数据区",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#运行时数据区"},[a("span",null,"运行时数据区")])],-1),D=a("p",null,"运行时数据区就相当于明朝时期的国库，国库里有钱，那执行引擎就能够继续执行字节码，国库里没钱就会抛出 OutOfMemoryError 异常。",-1),I=a("p",null,"JVM 定义了 Java 程序运行期间需要使用到的内存区域，简单来说，这块内存区域存放了字节码信息以及程序执行过程的数据，垃圾收集器也会针对运行时数据区进行对象回收的工作。看下面这张图就能理解：",-1),q=a("p",null,[a("img",{src:j,alt:"Alt text"})],-1),z=a("p",null,"运行时数据区通常包括：方法区、堆、虚拟机栈、本地方法栈以及程序计数器五个部分。不过，运行时数据区的划分也随着JDK的发展不断变迁，JDK 1.6、JDK 1.7、JDK 1.8 的内存划分都会有所不同。",-1),O=a("p",null,[a("img",{src:V,alt:"Alt text"})],-1),T=a("h3",{id:"执行引擎",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#执行引擎"},[a("span",null,"执行引擎")])],-1),K=a("p",null,[t("执行引擎（Execution Engine）就好像明朝时期的六部，主要用来干具体的事，“虚拟机”是一个相对于“物理机”的概念，这两种机器都有代码执行能力，其区别是物理机的执行引擎是直接建立在处理器、缓存、指令集和操作系统层面上的，而"),a("strong",null,"虚拟机的执行引擎则是由软件自行实现的"),t("，因此可以不受物理条件制约地定制指令集与执行引擎的结构关系，能够执行那些不被硬件直接支持的指令集格式。")],-1),R=a("p",null,[a("img",{src:x,alt:"Alt text"})],-1),H=a("li",null,"解释器：读取字节码，然后执行指令。因为它是一行一行地解释和执行指令，所以它可以很快地解释字节码，但是执行起来会比较慢（毕竟要一行执行完再执行下一行）。",-1),y=s('<p>这些内容我们都会在后面的章节里单独来细讲。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2><p>“三妹，关于 Java 虚拟机，今天我们就学到这吧，后面再展开细讲，怎么样？”转动了一下僵硬的脖子后，我对三妹说，“Java 虚拟机是一块很大很深的内容，如果一上来学太多的话，我怕难倒你。”</p><p>“好的，二哥，我也觉得今天的知识量够了，我要好好消化几天。我会加油的！”三妹似乎对未来充满了希望，这正是我想看到的。</p><p>总的来说，JVM 是 Java 程序执行的环境，它隐藏了底层操作系统和硬件的复杂性，提供了一个统一、稳定和安全的运行平台。</p><p><img src="'+f+'" alt="Alt text"></p><p>你把 Java 源代码编译后的字节码文件扔给它，它就可以在 JVM 中执行，不管你是在 Windows、Linux 还是 MacOS 环境下编译的，它都可以跑，屏蔽了底层操作系统的差异。</p><hr><p><img src="'+A+'" alt="Alt text"></p><p>两个置顶帖「球友必看」和「知识图谱」里已经沉淀了非常多优质的内容，<strong>相信能帮助你走的更快、更稳、更远</strong>。</p>',10),N={href:"https://mp.weixin.qq.com/s/AyRK5OWGYugS6s2vn2CPuA",target:"_blank",rel:"noopener noreferrer"},W={href:"https://mp.weixin.qq.com/s/7JIKnYCYtYrpAXRTjU0LLw",target:"_blank",rel:"noopener noreferrer"},Y=a("p",null,[t("最后，把二哥的座右铭送给大家："),a("strong",null,"没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟"),t("。")],-1);function G(P,Q){const l=i("RouteLink"),n=i("ExternalLinkIcon");return c(),d("div",null,[S,a("p",null,[t("“二哥，之前你讲 Java 的"),e(l,{to:"/docs/java/overview/hello-world.html"},{default:o(()=>[t("第一行代码 hello world")]),_:1}),t(" 的时候就提到了 JVM，那时候我就想知道 JVM 到底是什么，但你说这是一块非常大的内容，会放到后面专门来讲，那学完了 "),e(l,{to:"/docs/java/overview/"},{default:o(()=>[t("Java 基础知识")]),_:1}),t("，又学完了"),e(l,{to:"/docs/java/thread/"},{default:o(()=>[t("并发编程")]),_:1}),t("，今天我们就来学习 JVM 吧？”三妹咪了一口麦香可可奶茶后对我说。")]),a("p",null,[t("“好的，三妹，这篇内容就来带你认识一下什么是 JVM， JVM 是 Java 体系中非常重要，又有一些难度的知识，但每个想要更加优秀的程序员都应该掌握它。尤其是想去大厂或者中厂的球友，更应该掌握它，因为 JVM 在大中厂面试的时候，比重很大，我随便从《"),e(l,{to:"/docs/java/zhishixingqiu/mianshi.html"},{default:o(()=>[t("Java 面试指南")]),_:1}),t("》中截张图大家感受一下。”我回答。")]),k,w,a("p",null,[t("看过《"),e(l,{to:"/docs/java/overview/what-is-java.html"},{default:o(()=>[t("Java 发展简史")]),_:1}),t("》的三妹应该知道，Sun 在 1991 年成立了一个由詹姆斯·高斯林（James Gosling）领导的，名为“Green”的项目组，目的是开发一种能够在各种消费性电子产品上运行的程序架构。")]),C,a("p",null,[t("编译器负责把 Java 源代码编译成"),e(l,{to:"/docs/java/jvm/bytecode.html"},{default:o(()=>[t("字节码")]),_:1}),t("，Java 虚拟机负责把字节码转换成机器码。转换的时候，可以做一些压缩或者优化，通过 "),e(l,{to:"/docs/java/jvm/jit.html"},{default:o(()=>[t("JIT")]),_:1}),t(" 来完成，这样的机器码跑起来就快多了。")]),E,a("p",null,[t("这样的话，效率就提高了很多，对吧？也就是我们后面会讲到的 "),e(l,{to:"/docs/java/jvm/jit.html"},{default:o(()=>[t("JIT 技术")]),_:1}),t("。")]),L,a("p",null,[t("类加载器是 JVM 最有权威的一个部门，相当于明朝时期的内阁，用来加载"),e(l,{to:"/docs/java/jvm/what-is-jvm.html"},{default:o(()=>[t("类文件")]),_:1}),t("，也就是 .class 文件。如果类文件加载失败，也就没有运行时数据区和执行引擎什么事了，它们什么也干不了。")]),a("p",null,[t("类加载器负责将字节码文件加载到内存中，主要会经历加载->连接->实例化这三个阶段，我们会放在"),e(l,{to:"/docs/java/jvm/class-load.html"},{default:o(()=>[t("后面的章节单独来讲")]),_:1}),t("。")]),B,D,I,q,z,O,a("p",null,[t("我们会在"),e(l,{to:"/docs/java/jvm/neicun-jiegou.html"},{default:o(()=>[t("后面的章节单独来讲")]),_:1}),t("。")]),T,K,a("p",null,[t("执行引擎的任务就是将"),e(l,{to:"/docs/java/jvm/zijiema-zhiling.html"},{default:o(()=>[t("字节码指令")]),_:1}),t("解释/编译为对应平台上的本地机器指令才可以。简单来说，JVM 中的执行引擎充当了将高级语言翻译为机器语言的译者。")]),R,a("ul",null,[H,a("li",null,[e(l,{to:"/docs/java/jvm/jit.html"},{default:o(()=>[t("即时编译器")]),_:1}),t("：执行引擎首先按照解释执行的方式来执行，随着时间推移，即时编译器会选择性的把一些热点代码编译成本地代码。执行本地代码比一条一条进行解释执行的速度快很多，因为本地代码是保存在缓存里的。")]),a("li",null,[e(l,{to:"/docs/java/jvm/garbage-collector.html"},{default:o(()=>[t("垃圾回收器")]),_:1}),t("，用来回收堆内存中的垃圾对象。")])]),y,a("ul",null,[a("li",null,[e(l,{to:"/docs/java/zhishixingqiu/mianshi.html"},{default:o(()=>[t("二哥的 Java 面试指南专栏发布了 ✌️")]),_:1})]),a("li",null,[a("a",N,[t("二哥的原创实战项目技术派上线了 ✌️"),e(n)])]),a("li",null,[a("a",W,[t("2000+薪资待遇还不错的公司名单 ✌️"),e(n)])]),a("li",null,[e(l,{to:"/docs/java/thread/"},{default:o(()=>[t("二哥的并发编程小册发布了 ✌️")]),_:1})])]),Y])}const X=p(b,[["render",G],["__file","JVM.html.vue"]]),Z=JSON.parse('{"path":"/docs/java/jvm/JVM.html","title":"JVM","lang":"en-US","frontmatter":{"title":"JVM"},"headers":[{"level":2,"title":"JVM 家族","slug":"jvm-家族","link":"#jvm-家族","children":[]},{"level":2,"title":"JVM 的组织架构","slug":"jvm-的组织架构","link":"#jvm-的组织架构","children":[{"level":3,"title":"类加载器","slug":"类加载器","link":"#类加载器","children":[]},{"level":3,"title":"运行时数据区","slug":"运行时数据区","link":"#运行时数据区","children":[]},{"level":3,"title":"执行引擎","slug":"执行引擎","link":"#执行引擎","children":[]}]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1715269884000,"updatedTime":1715269884000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/jvm/JVM.md"}');export{X as comp,Z as data};
