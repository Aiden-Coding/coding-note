import{_ as t,r as a,o as s,c as o,a as e,b as n,d as r,e as i}from"./app-BihAYnmf.js";const c="/coding-note/assets/image-66-DsYWblnt.png",l="/coding-note/assets/image-67-m8MxE3PL.png",d="/coding-note/assets/image-68-CXdjJXXW.png",h="/coding-note/assets/image-69-D931Z0aJ.png",m="/coding-note/assets/image-70-BqyqnbZP.png",g="/coding-note/assets/image-71-DEp6f3MU.png",u="/coding-note/assets/image-72-6i5vvWnp.png",_={},f=i('<h1 id="一次内存溢出排查优化实战" tabindex="-1"><a class="header-anchor" href="#一次内存溢出排查优化实战"><span>一次内存溢出排查优化实战</span></a></h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p><code>OutOfMemoryError</code> 问题相信很多朋友都遇到过，相对于常见的业务异常（数组越界、空指针等）来说这类问题是很难定位和解决的。</p><p>本文以最近碰到的一次线上内存溢出的定位、解决问题的方式展开；希望能对碰到类似问题的同学带来思路和帮助。</p><p>主要从<code>表现--&gt;排查--&gt;定位--&gt;解决</code> 四个步骤来分析和解决问题。</p><h2 id="表象" tabindex="-1"><a class="header-anchor" href="#表象"><span>表象</span></a></h2><p>最近我们生产上的一个应用不断的爆出内存溢出，并且随着业务量的增长出现的频次越来越高。</p><p>该程序的业务逻辑非常简单，就是从 Kafka 中将数据消费下来然后批量的做持久化操作。</p><p>而现象则是随着 Kafka 的消息越多，出现的异常的频次就越快。由于当时还有其他工作所以只能让运维做重启，并且监控好堆内存以及 GC 情况。</p><blockquote><p>重启大法虽好，可是依然不能根本解决问题。</p></blockquote><h2 id="排查" tabindex="-1"><a class="header-anchor" href="#排查"><span>排查</span></a></h2><p>于是我们想根据运维之前收集到的内存数据、GC 日志尝试判断哪里出现问题。</p><p><img src="'+c+'" alt="Alt text"></p><p>结果发现老年代的内存使用就算是发生 GC 也一直居高不下，而且随着时间推移也越来越高。</p><p>结合 jstat 的日志发现就算是发生了 FGC 老年代也已经回收不了，内存已经到顶。</p><p><img src="'+l+'" alt="Alt text"></p><p>甚至有几台应用 FGC 达到了上百次，时间也高的可怕。</p><p>这说明应用的内存使用肯定是有问题的，有许多赖皮对象始终回收不掉。</p><h2 id="定位" tabindex="-1"><a class="header-anchor" href="#定位"><span>定位</span></a></h2><p>由于生产上的内存 dump 文件非常大，达到了几十G。也是由于我们的内存设置太大有关。</p><p>所以导致想使用 MAT 分析需要花费大量时间。</p><p>因此我们便想是否可以在本地复现，这样就要好定位的多。</p><p>为了尽快的复现问题，我将本地应用最大堆内存设置为 150M。</p><p>然后在消费 Kafka 那里 Mock 为一个 while 循环一直不断的生成数据。</p><p>同时当应用启动之后利用 VisualVM 连上应用实时监控内存、GC 的使用情况。</p><p>结果跑了 10 几分钟内存使用并没有什么问题。根据图中可以看出，每产生一次 GC 内存都能有效的回收，所以这样并没有复现问题。</p><p><img src="'+d+'" alt="Alt text"></p><p>没法复现问题就很难定位了。于是我们 review 代码，发现生产的逻辑和我们用 while 循环 Mock 数据还不太一样。</p><p>查看生产的日志发现每次从 Kafka 中取出的都是几百条数据，而我们 Mock 时每次只能产生<strong>一条</strong>。</p><p>为了尽可能的模拟生产情况便在服务器上跑着一个生产者程序，一直源源不断的向 Kafka 中发送数据。</p><p>果然不出意外只跑了一分多钟内存就顶不住了，观察左图发现 GC 的频次非常高，但是内存的回收却是相形见拙。</p><p><img src="'+h+'" alt="Alt text"></p><p>同时后台也开始打印内存溢出了，这样便复现出问题。</p><h2 id="解决" tabindex="-1"><a class="header-anchor" href="#解决"><span>解决</span></a></h2><p>从目前的表现来看就是内存中有许多对象一直存在强引用关系导致得不到回收。</p><p>于是便想看看到底是什么对象占用了这么多的内存，利用 VisualVM 的 HeapDump 功能可以立即 dump 出当前应用的内存情况。</p><p><img src="'+m+'" alt="Alt text"></p><p>结果发现 <code>com.lmax.disruptor.RingBuffer</code> 类型的对象占用了将近 50% 的内存。</p><p>看到这个包自然就想到了 <code>Disruptor</code> 环形队列。</p><p>再次 review 代码发现：从 Kafka 里取出的 700 条数据是直接往 Disruptor 里丢的。</p><p>这里也就能说明为什么第一次模拟数据没复现问题了。</p><p>模拟的时候是一个对象放进队列里，而生产的情况是 700 条数据放进队列里。这个数据量是 700 倍的差距。</p><p>而 Disruptor 作为一个环形队列，再对象没有被覆盖之前是一直存在的。</p><p>我也做了一个实验，证明确实如此。</p><p><img src="'+g+'" alt="Alt text"></p><p>我设置队列大小为 8 ，从 0~9 往里面写 10 条数据，当写到 8 的时候就会把之前 0 的位置覆盖掉，后面的以此类推（类似于 HashMap 的取模定位）。</p><p>所以在生产上假设我们的队列大小是 1024，那么随着系统的运行最终肯定会导致 1024 个位置上装满了对象，而且每个位置是 700 个！</p><p>于是查看了生产上 Disruptor 的 RingBuffer 配置，结果是：<code>1024*1024</code>。</p><p>这个数量级就非常吓人了。</p><p>为了验证是否是这个问题，我在本地将该值换为 2 ，一个最小值试试。</p><p>同样的 128M 内存，也是通过 Kafka 一直源源不断的取出数据。通过监控如下：</p><p><img src="'+u+'" alt="Alt text"></p><p>跑了 20 几分钟系统一切正常，每当一次 GC 都能回收大部分内存，最终呈现锯齿状。</p><p>这样问题就找到了，不过生产上这个值具体设置多少还得根据业务情况测试才能知道，但原有的 1024*1024 是绝对不能再使用了。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>虽然到了最后也就改了一行代码(还没改，直接修改配置)，但这排查过程我觉得是有意义的。</p><p>也会让大部分觉得 JVM 这样的黑盒难以下手的同学有一个直观的感受。</p><p><code>同时也得感叹 Disruptor 东西虽好，也不能乱用哦！</code></p><p>相关演示代码查看：</p>',59),v={href:"https://github.com/crossoverJie/JCSprout/tree/master/src/main/java/com/crossoverjie/disruptor",target:"_blank",rel:"noopener noreferrer"},k=e("p",null,[e("strong",null,"你的点赞与转发是最大的支持。")],-1),x=e("p",null,"原文链接：https://crossoverjie.top/2018/08/29/java-senior/OOM-Disruptor/",-1),b=e("hr",null,null,-1);function M(j,C){const p=a("ExternalLinkIcon");return s(),o("div",null,[f,e("p",null,[e("a",v,[n("https://github.com/crossoverJie/JCSprout/tree/master/src/main/java/com/crossoverjie/disruptor"),r(p)])]),k,x,b])}const G=t(_,[["render",M],["__file","nacunyichu.html.vue"]]),V=JSON.parse('{"path":"/docs/java/jvm/nacunyichu.html","title":"内存溢出","lang":"en-US","frontmatter":{"title":"内存溢出"},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"表象","slug":"表象","link":"#表象","children":[]},{"level":2,"title":"排查","slug":"排查","link":"#排查","children":[]},{"level":2,"title":"定位","slug":"定位","link":"#定位","children":[]},{"level":2,"title":"解决","slug":"解决","link":"#解决","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1715269884000,"updatedTime":1715269884000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/jvm/内存溢出.md"}');export{G as comp,V as data};