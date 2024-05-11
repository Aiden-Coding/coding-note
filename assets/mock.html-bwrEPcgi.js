import{_ as a,o as e,c,e as t}from"./app-BihAYnmf.js";const o={},p=t('<p>碰撞测试是汽车开发活动中的重要组成部分。所有汽车在上市之前都要经过碰撞测试，并公布测试结果。碰撞测试的目的用于评定运输包装件在运输过程中承受多次重复性机械碰撞的耐冲击强度及包装对内装物的保护能力。说简单点就是为了测试汽车在碰撞的时候锁所产生的自身损伤、对车内人员及车外人员、物品等的损伤情况。</p><p><img src="http://www.hollischuang.com/wp-content/uploads/2017/03/mock-193x300.jpg" alt="mock" width="193" height="300" class="aligncenter size-medium wp-image-1795"> 在进行汽车的碰撞测试时，当然不能让真人来进行测试，一般采用假人来测试。但是为了保证测试的真实性及可靠性，假人的生物力学性能应该和人体一样——比如身体各部分的大小和质量，以及关节的刚性等等，只有这样使用它们的模拟才能和现实相匹配。为了保证覆盖到的情况够全面，一般都会使用各种不同的假人，不同的假人模拟男性或者女性的身体，以及不同身高和年龄的人体。</p><p>想想软件测试，其实和汽车的碰撞测试流程差不多。一个软件在发布上线之前都要经过各种测试，并产出测试报告，更严格的一点的要保证单测覆盖率不能低于某个值。和汽车碰撞测试类似，我们在软件测试中也会用到很多“假人”。用这些“假人”的目的也是为了保证测试有效的进行。</p><hr><h3 id="why" tabindex="-1"><a class="header-anchor" href="#why"><span>why</span></a></h3><p>不知道你在日常开发中有没有遇到过以下问题或需求：</p><p>1、和别人一起做同一个项目，相互之间已经约定好接口。然后你开始开发，开发完自己的代码后，你想测试下你的服务实现逻辑是否正确。但是因为你依赖的只是接口，真正的服务还有开发出来。</p><p>2、还是和上面类似的场景，你要依赖的服务是通过RPC的方式调用的，而外部服务的稳定性很难保证。</p><p>3、对于一个接口或者方法，你希望测试其各种不同情况，但是依赖的服务的执行策略及返回值你没办法决定。</p><p>4、你依赖的服务或者对象很难创建！(比如具体的web容器)</p><p>5、依赖的对象的某些行为很难触发！（比如网络异常）</p><p>6、以上问题你都没有，但是你要用的那个服务他处理速度实在是太慢了。</p><p>上面这些情况都是日常开发测试过程中可能遇到的比较麻烦的问题。这些问题都会大大的提高测试成本。可以说，很多开发人员不愿意写单元测试很大程度上都和以上这六点有关系。</p><p>幸运的是，Mock对象可以解决以上问题。使用mock对象进行的测试就是mock测试。</p><h3 id="what" tabindex="-1"><a class="header-anchor" href="#what"><span>what</span></a></h3><p>mock测试就是在测试过程中，对于某些不容易构造或者不容易获取的对象，用一个虚拟的对象来创建以便测试的测试方法。</p><p>mock对象，就是非真实对象，是模拟出来的一个对象。可以理解为汽车碰撞测试的那个假人。mock对象就是真实对象在调试期间的代替品。</p><img src="http://www.hollischuang.com/wp-content/uploads/2017/03/Mock1-300x196.jpg" alt="Mock1" width="300" height="196" class="aligncenter size-medium wp-image-1796"><p>你创建这样一个“假人”的成本比较低，这个“假人”可以按照你设定的“剧情”来运行。</p><p>在Java的单元测试中，很多Mock框架可以使用，用的比较多的有easymock、mockito、powermock、jmockit等。</p><p>面向对象开发中，我们通常定义一个接口，使用一个接口来描述这个对象。在被测试代码中只是通过接口来引用对象，所以它不知道这个引用的对象是真实对象，还是mock对象。</p><p>好了，这篇文章的内容差不多就这些了，主要是让大家知道，在Java中可以使用mock对象来模拟真实对象来进行单元测试，好处很多。下一篇会详细介绍如何使用mockito框架进行单元测试。</p>',22),i=[p];function h(s,m){return e(),c("div",null,i)}const l=a(o,[["render",h],["__file","mock.html.vue"]]),r=JSON.parse('{"path":"/docs/java/java-basic/mock.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"why","slug":"why","link":"#why","children":[]},{"level":3,"title":"what","slug":"what","link":"#what","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/mock.md"}');export{l as comp,r as data};
