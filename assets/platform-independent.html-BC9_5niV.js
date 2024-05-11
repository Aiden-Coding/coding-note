import{_ as n,r as t,o,c,a,b as e,d as s,e as l}from"./app-BihAYnmf.js";const r={},i=l('<p>相信对于很多Java开发来说，在刚刚接触Java语言的时候，就听说过Java是一门跨平台的语言，Java是平台无关性的，这也是Java语言可以迅速崛起并风光无限的一个重要原因。那么，到底什么是平台无关性？Java又是如何实现平台无关性的呢？本文就来简单介绍一下。</p><h3 id="什么是平台无关性" tabindex="-1"><a class="header-anchor" href="#什么是平台无关性"><span>什么是平台无关性</span></a></h3><p>平台无关性就是一种语言在计算机上的运行不受平台的约束，一次编译，到处执行（Write Once ,Run Anywhere）。</p><p>也就是说，用Java创建的可执行二进制程序，能够不加改变的运行于多个平台。</p><h4 id="平台无关性好处" tabindex="-1"><a class="header-anchor" href="#平台无关性好处"><span>平台无关性好处</span></a></h4><p>作为一门平台无关性语言，无论是在自身发展，还是对开发者的友好度上都是很突出的。</p><p>因为其平台无关性，所以Java程序可以运行在各种各样的设备上，尤其是一些嵌入式设备，如打印机、扫描仪、传真机等。随着5G时代的来临，也会有更多的终端接入网络，相信平台无关性的Java也能做出一些贡献。</p><p>对于Java开发者来说，Java减少了开发和部署到多个平台的成本和时间。真正的做到一次编译，到处运行。</p><h3 id="平台无关性的实现" tabindex="-1"><a class="header-anchor" href="#平台无关性的实现"><span>平台无关性的实现</span></a></h3><p>对于Java的平台无关性的支持，就像对安全性和网络移动性的支持一样，是分布在整个Java体系结构中的。其中扮演者重要的角色的有Java语言规范、Class文件、Java虚拟机（JVM）等。</p><h4 id="编译原理基础" tabindex="-1"><a class="header-anchor" href="#编译原理基础"><span>编译原理基础</span></a></h4><p>讲到Java语言规范、Class文件、Java虚拟机就不得不提Java到底是是如何运行起来的。</p>',12),h={href:"http://www.hollischuang.com/archives/58",target:"_blank",rel:"noopener noreferrer"},v=a("p",null,'但是，我们日常开发使用的C、C++、Java、Python等都属于高级语言，而非二进制语言。所以，想要让计算机认识我们写出来的Java代码，那就需要把他"翻译"成由0和1组成的二进制文件。这个过程就叫做编译。负责这一过程的处理的工具叫做编译器。',-1),J={href:"https://www.hollischuang.com/archives/2322",target:"_blank",rel:"noopener noreferrer"},d=l('<p><img src="https://www.hollischuang.com/wp-content/uploads/2019/03/15539284762449.jpg" alt=""></p><p>前端编译主要指与源语言有关但与目标机无关的部分。Java中，我们所熟知的<code>javac</code>的编译就是前端编译。除了这种以外，我们使用的很多IDE，如eclipse，idea等，都内置了前端编译器。主要功能就是把<code>.java</code>代码转换成<code>.class</code>代码。</p><p>这里提到的<code>.class</code>代码，其实就是Class文件。</p><p>后端编译主要是将中间代码再翻译成机器语言。Java中，这一步骤就是Java虚拟机来执行的。</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2019/03/15539289530245.jpg" alt=""></p><p>所以，我们说的，Java的平台无关性实现主要作用于以上阶段。如下图所示：</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2019/03/15539291533175.jpg" alt=""></p><p>我们从后往前介绍一下这三位主演：Java虚拟机、Class文件、Java语言规范</p><p><strong>Java虚拟机</strong></p><p>所谓平台无关性，就是说要能够做到可以在多个平台上都能无缝对接。但是，对于不同的平台，硬件和操作系统肯定都是不一样的。</p><p>对于不同的硬件和操作系统，最主要的区别就是指令不同。比如同样执行a+b，A操作系统对应的二进制指令可能是10001000，而B操作系统对应的指令可能是11101110。那么，想要做到跨平台，最重要的就是可以根据对应的硬件和操作系统生成对应的二进制指令。</p><p>而这一工作，主要由我们的Java虚拟机完成。虽然Java语言是平台无关的，但是JVM却是平台有关的，不同的操作系统上面要安装对应的JVM。</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2019/03/15539297082025.jpg" alt=""></p><p>上图是Oracle官网下载JDK的指引，不同的操作系统需要下载对应的Java虚拟机。</p><p>有了Java虚拟机，想要执行a+b操作，A操作系统上面的虚拟机就会把指令翻译成10001000，B操作系统上面的虚拟机就会把指令翻译成11101110。</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2019/03/15539303829914.jpg" alt=""> ps：图中的Class文件中内容为mock内容</p><p>所以，Java之所以可以做到跨平台，是因为Java虚拟机充当了桥梁。他扮演了运行时Java程序与其下的硬件和操作系统之间的缓冲角色。</p><h4 id="字节码" tabindex="-1"><a class="header-anchor" href="#字节码"><span>字节码</span></a></h4><p>各种不同的平台的虚拟机都使用统一的程序存储格式——字节码（ByteCode）是构成平台无关性的另一个基石。Java虚拟机只与由字节码组成的Class文件进行交互。</p><p>我们说Java语言可以Write Once ,Run Anywhere。这里的Write其实指的就是生成Class文件的过程。</p><p>因为Java Class文件可以在任何平台创建，也可以被任何平台的Java虚拟机装载并执行，所以才有了Java的平台无关性。</p><h4 id="java语言规范" tabindex="-1"><a class="header-anchor" href="#java语言规范"><span>Java语言规范</span></a></h4><p>已经有了统一的Class文件，以及可以在不同平台上将Class文件翻译成对应的二进制文件的Java虚拟机，Java就可以彻底实现跨平台了吗？</p><p>其实并不是的，Java语言在跨平台方面也是做了一些努力的，这些努力被定义在Java语言规范中。</p><p>比如，Java中基本数据类型的值域和行为都是由其自己定义的。而C/C++中，基本数据类型是由它的占位宽度决定的，占位宽度则是由所在平台决定的。所以，在不同的平台中，对于同一个C++程序的编译结果会出现不同的行为。</p><p>举一个简单的例子，对于int类型，在Java中，int占4个字节，这是固定的。</p><p>但是在C++中却不是固定的了。在16位计算机上，int类型的长度可能为两字节；在32位计算机上，可能为4字节；当64位计算机流行起来后，int类型的长度可能会达到8字节。（这里说的都是可能哦！）</p><p><img src="https://www.hollischuang.com/wp-content/uploads/2021/06/Jietu20210627-141259-2.jpg" alt=""></p><p>通过保证基本数据类型在所有平台的一致性，Java语言为平台无关性提供强了有力的支持。</p><h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h3><p>对于Java的平台无关性的支持是分布在整个Java体系结构中的。其中扮演着重要角色的有Java语言规范、Class文件、Java虚拟机等。</p><ul><li>Java语言规范 <ul><li>通过规定Java语言中基本数据类型的取值范围和行为</li></ul></li><li>Class文件 <ul><li>所有Java文件要编译成统一的Class文件</li></ul></li><li>Java虚拟机 <ul><li>通过Java虚拟机将Class文件转成对应平台的二进制文件等</li></ul></li></ul><p>Java的平台无关性是建立在Java虚拟机的平台有关性基础之上的，是因为Java虚拟机屏蔽了底层操作系统和硬件的差异。</p><h3 id="语言无关性" tabindex="-1"><a class="header-anchor" href="#语言无关性"><span>语言无关性</span></a></h3><p>其实，Java的无关性不仅仅体现在平台无关性上面，向外扩展一下，Java还具有语言无关性。</p><p>前面我们提到过。JVM其实并不是和Java文件进行交互的，而是和Class文件，也就是说，其实JVM运行的时候，并不依赖于Java语言。</p>',36),u={href:"https://www.hollischuang.com/archives/2938",target:"_blank",rel:"noopener noreferrer"},m=a("p",null,"参考资料",-1),w=a("p",null,"《深入理解Java虚拟机（第二版）》 《深入Java虚拟机》 《Java语言规范——基于Java SE 8》 《Java虚拟机规范第8版》",-1);function _(g,f){const p=t("ExternalLinkIcon");return o(),c("div",null,[i,a("p",null,[e("我们在"),a("a",h,[e("Java代码的编译与反编译那些事儿"),s(p)]),e("中介绍过，在计算机世界中，计算机只认识0和1，所以，真正被计算机执行的其实是由0和1组成的二进制文件。")]),v,a("p",null,[e("在"),a("a",J,[e("深入分析Java的编译原理"),s(p)]),e("中我们介绍过，在Java平台中，想要把Java文件，编译成二进制文件，需要经过两步编译，前端编译和后端编译：")]),d,a("p",null,[e("时至今日，商业机构和开源机构已经在Java语言之外发展出一大批可以在JVM上运行的语言了，如Groovy、Scala、Jython等。之所以可以支持，就是因为这些语言也可以被编译成字节码（Class文件）。而虚拟机并不关心字节码是有哪种语言编译而来的。详见"),a("a",u,[e("牛逼了，教你用九种语言在JVM上输出HelloWorld"),s(p)])]),m,w])}const b=n(r,[["render",_],["__file","platform-independent.html.vue"]]),j=JSON.parse('{"path":"/docs/java/object-oriented/platform-independent.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"什么是平台无关性","slug":"什么是平台无关性","link":"#什么是平台无关性","children":[]},{"level":3,"title":"平台无关性的实现","slug":"平台无关性的实现","link":"#平台无关性的实现","children":[]},{"level":3,"title":"小结","slug":"小结","link":"#小结","children":[]},{"level":3,"title":"语言无关性","slug":"语言无关性","link":"#语言无关性","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/object-oriented/platform-independent.md"}');export{b as comp,j as data};