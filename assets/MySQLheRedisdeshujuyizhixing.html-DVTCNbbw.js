import{_ as t,r as n,o as r,c as o,a as e,b as s,d as l,e as d}from"./app-BihAYnmf.js";const a="/coding-note/assets/image-3-DxhDoYid.png",p="/coding-note/assets/image-4-FNcc8GaH.png",g="/coding-note/assets/image-5-DAz2EVte.png",c="/coding-note/assets/image-6-BI2Y0wrj.png",h="/coding-note/assets/image-13-DjA073fL.png",m="/coding-note/assets/image-14-DVh48JoI.png",_="/coding-note/assets/image-15-DOh-Dsix.png",y="/coding-note/assets/image-16--FhIgSCv.png",R="/coding-note/assets/image-17-hxw-ylQK.png",u={},L=d('<p>如何保障 MySQL 和 Redis 的数据一致性？这个问题很早之前我就遇到过，但是一直没有仔细去研究，上个月看了极客的课程，有一篇文章专门有过讲解，刚好有粉丝也问我这个问题，所以感觉有必要单独出一篇。</p><p><strong>之前也看了很多相关的文章，但是感觉讲的都不好</strong>，很多文章都会去讲各种策略，比如（旁路缓存）策略、（读穿 / 写穿）策略和（写回）策略等，感觉意义真的不大，然后有的文章也只讲了部分情况，也没有告诉最优解。</p><p>我直接先抛一下结论：<strong>在满足实时性的条件下，不存在两者完全保存一致的方案，只有最终一致性方案。</strong> 根据网上的众多解决方案，总结出 6 种，直接看目录：</p><p><img src="'+a+'" alt="Alt text"></p><h2 id="不好的方案" tabindex="-1"><a class="header-anchor" href="#不好的方案"><span>不好的方案</span></a></h2><h3 id="_1-先写-mysql-再写-redis" tabindex="-1"><a class="header-anchor" href="#_1-先写-mysql-再写-redis"><span>1. 先写 MySQL，再写 Redis</span></a></h3><p><img src="'+p+'" alt="Alt text"></p><blockquote><p>图解说明：</p><ul><li>这是一副时序图，描述请求的先后调用顺序；</li><li>橘黄色的线是请求 A，黑色的线是请求 B；</li><li>橘黄色的文字，是 MySQL 和 Redis 最终不一致的数据；</li><li>数据是从 10 更新为 11；</li><li>后面所有的图，都是这个含义，不再赘述。</li></ul></blockquote><p>请求 A、B 都是先写 MySQL，然后再写 Redis，在高并发情况下，如果请求 A 在写 Redis 时卡了一会，请求 B 已经依次完成数据的更新，就会出现图中的问题。</p><p>这个图已经画的很清晰了，我就不用再去啰嗦了吧，<strong>不过这里有个前提，就是对于读请求，先去读 Redis，如果没有，再去读 DB，但是读请求不会再回写 Redis。</strong> 大白话说一下，就是读请求不会更新 Redis。</p><h3 id="_2-先写-redis-再写-mysql" tabindex="-1"><a class="header-anchor" href="#_2-先写-redis-再写-mysql"><span>2. 先写 Redis，再写 MySQL</span></a></h3><p><img src="'+g+'" alt="Alt text"></p><p>同“先写 MySQL，再写 Redis”，看图可秒懂。</p><h3 id="_3-先删除-redis-再写-mysql" tabindex="-1"><a class="header-anchor" href="#_3-先删除-redis-再写-mysql"><span>3. 先删除 Redis，再写 MySQL</span></a></h3><p>这幅图和上面有些不一样，前面的请求 A 和 B 都是更新请求，这里的请求 A 是更新请求，<strong>但是请求 B 是读请求，且请求 B 的读请求会回写 Redis。</strong></p><p><img src="'+c+'" alt="Alt text"></p><p>请求 A 先删除缓存，可能因为卡顿，数据一直没有更新到 MySQL，导致两者数据不一致。</p><p><strong>这种情况出现的概率比较大，因为请求 A 更新 MySQL 可能耗时会比较长，而请求 B 的前两步都是查询，会非常快。</strong></p><h2 id="好的方案" tabindex="-1"><a class="header-anchor" href="#好的方案"><span>好的方案</span></a></h2><h3 id="_4-先删除-redis-再写-mysql-再删除-redis" tabindex="-1"><a class="header-anchor" href="#_4-先删除-redis-再写-mysql-再删除-redis"><span>4. 先删除 Redis，再写 MySQL，再删除 Redis</span></a></h3><p>对于“先删除 Redis，再写 MySQL”，如果要解决最后的不一致问题，其实再对 Redis 重新删除即可，<strong>这个也是大家常说的“缓存双删”。</strong></p><p><img src="'+h+'" alt="Alt text"></p><p>为了便于大家看图，对于蓝色的文字，“删除缓存 10”必须在“回写缓存10”后面，那如何才能保证一定是在后面呢？<strong>网上给出的第一个方案是，让请求 A 的最后一次删除，等待 500ms。</strong></p><p>对于这种方案，看看就行，反正我是不会用，太 Low 了，风险也不可控。</p><p><strong>那有没有更好的方案呢，我建议异步串行化删除，即删除请求入队列</strong></p><p><img src="'+m+'" alt="Alt text"></p><p>异步删除对线上业务无影响，串行化处理保障并发情况下正确删除。</p><p>如果双删失败怎么办，网上有给 Redis 加一个缓存过期时间的方案，这个不敢苟同。<strong>个人建议整个重试机制，可以借助消息队列的重试机制，也可以自己整个表，记录重试次数</strong>，方法很多。</p><blockquote><p>简单小结一下：</p><ul><li>“缓存双删”不要用无脑的 sleep 500 ms；</li><li>通过消息队列的异步&amp;串行，实现最后一次缓存删除；</li><li>缓存删除失败，增加重试机制。</li></ul></blockquote><h3 id="_5-先写-mysql-再删除-redis" tabindex="-1"><a class="header-anchor" href="#_5-先写-mysql-再删除-redis"><span>5. 先写 MySQL，再删除 Redis</span></a></h3><p><img src="'+_+'" alt="Alt text"></p><p>对于上面这种情况，对于第一次查询，请求 B 查询的数据是 10，但是 MySQL 的数据是 11，<strong>只存在这一次不一致的情况，对于不是强一致性要求的业务，可以容忍。</strong>（那什么情况下不能容忍呢，比如秒杀业务、库存服务等。）</p><p>当请求 B 进行第二次查询时，因为没有命中 Redis，会重新查一次 DB，然后再回写到 Reids。</p><p><img src="'+y+'" alt="Alt text"></p><p>这里需要满足 2 个条件：</p><ul><li>缓存刚好自动失效；</li><li>请求 B 从数据库查出 10，回写缓存的耗时，比请求 A 写数据库，并且删除缓存的还长。</li></ul><p>对于第二个条件，我们都知道更新 DB 肯定比查询耗时要长，所以出现这个情况的概率很小，同时满足上述条件的情况更小。</p><h3 id="_6-先写-mysql-通过-binlog-异步更新-redis" tabindex="-1"><a class="header-anchor" href="#_6-先写-mysql-通过-binlog-异步更新-redis"><span>6. 先写 MySQL，通过 Binlog，异步更新 Redis</span></a></h3><p>这种方案，主要是监听 MySQL 的 Binlog，然后通过异步的方式，将数据更新到 Redis，这种方案有个前提，查询的请求，不会回写 Redis。</p><p><img src="'+R+'" alt="Alt text"></p><p>这个方案，会保证 MySQL 和 Redis 的最终一致性，但是如果中途请求 B 需要查询数据，如果缓存无数据，就直接查 DB；如果缓存有数据，查询的数据也会存在不一致的情况。</p><p><strong>所以这个方案，是实现最终一致性的终极解决方案，但是不能保证实时性。</strong></p><h2 id="几种方案比较" tabindex="-1"><a class="header-anchor" href="#几种方案比较"><span>几种方案比较</span></a></h2><p>我们对比上面讨论的 6 种方案：</p><ol><li>先写 Redis，再写 MySQL</li></ol><ul><li><strong>这种方案，我肯定不会用</strong>，万一 DB 挂了，你把数据写到缓存，DB 无数据，这个是灾难性的；</li><li>我之前也见同学这么用过，如果写 DB 失败，对 Redis 进行逆操作，那如果逆操作失败呢，是不是还要搞个重试？</li></ul><ol start="2"><li>先写 MySQL，再写 Redis</li></ol><ul><li><strong>对于并发量、一致性要求不高的项目，很多就是这么用的</strong>，我之前也经常这么搞，但是不建议这么做；</li><li>当 Redis 瞬间不可用的情况，需要报警出来，然后线下处理。</li></ul><ol start="3"><li>先删除 Redis，再写 MySQL</li></ol><ul><li>这种方式，我还真没用过，<strong>直接忽略吧。</strong></li></ul><ol start="4"><li>先删除 Redis，再写 MySQL，再删除 Redis</li></ol><ul><li>这种方式虽然可行，但是<strong>感觉好复杂</strong>，还要搞个消息队列去异步删除 Redis。</li></ul><ol start="5"><li>先写 MySQL，再删除 Redis</li></ol><ul><li><strong>比较推荐这种方式</strong>，删除 Redis 如果失败，可以再多重试几次，否则报警出来；</li><li>这个方案，是实时性中最好的方案，在一些高并发场景中，推荐这种。</li></ul><ol start="6"><li>先写 MySQL，通过 Binlog，异步更新 Redis</li></ol><ul><li><strong>对于异地容灾、数据汇总等，建议会用这种方式</strong>，比如 binlog + kafka，数据的一致性也可以达到秒级；</li><li>纯粹的高并发场景，不建议用这种方案，比如抢购、秒杀等。</li></ul><p><strong>个人结论：</strong></p><ul><li><strong>实时一致性方案</strong>：采用“先写 MySQL，再删除 Redis”的策略，这种情况虽然也会存在两者不一致，但是需要满足的条件有点苛刻，<strong>所以是满足实时性条件下，能尽量满足一致性的最优解。</strong></li><li><strong>最终一致性方案</strong>：采用“先写 MySQL，通过 Binlog，异步更新 Redis”，可以通过 Binlog，结合消息队列异步更新 Redis，<strong>是最终一致性的最优解。</strong></li></ul><hr>',59),S={href:"https://mp.weixin.qq.com/s/RL4Bt_UkNcnsBGL_9w37Zg",target:"_blank",rel:"noopener noreferrer"},Q={href:"https://mp.weixin.qq.com/s/l7v4s1VekIPNi7KZuUgwGQ",target:"_blank",rel:"noopener noreferrer"};function M(q,x){const i=n("ExternalLinkIcon");return r(),o("div",null,[L,e("blockquote",null,[e("p",null,[s("整理：沉默王二，戳"),e("a",S,[s("转载链接"),l(i)]),s("，作者：楼仔，戳"),e("a",Q,[s("原文链接"),l(i)]),s("。")])])])}const b=t(u,[["render",M],["__file","MySQLheRedisdeshujuyizhixing.html.vue"]]),k=JSON.parse('{"path":"/docs/mysql/MySQLheRedisdeshujuyizhixing.html","title":"MySQL和Redis的数据一致性","lang":"en-US","frontmatter":{"title":"MySQL和Redis的数据一致性"},"headers":[{"level":2,"title":"不好的方案","slug":"不好的方案","link":"#不好的方案","children":[{"level":3,"title":"1. 先写 MySQL，再写 Redis","slug":"_1-先写-mysql-再写-redis","link":"#_1-先写-mysql-再写-redis","children":[]},{"level":3,"title":"2. 先写 Redis，再写 MySQL","slug":"_2-先写-redis-再写-mysql","link":"#_2-先写-redis-再写-mysql","children":[]},{"level":3,"title":"3. 先删除 Redis，再写 MySQL","slug":"_3-先删除-redis-再写-mysql","link":"#_3-先删除-redis-再写-mysql","children":[]}]},{"level":2,"title":"好的方案","slug":"好的方案","link":"#好的方案","children":[{"level":3,"title":"4. 先删除 Redis，再写 MySQL，再删除 Redis","slug":"_4-先删除-redis-再写-mysql-再删除-redis","link":"#_4-先删除-redis-再写-mysql-再删除-redis","children":[]},{"level":3,"title":"5. 先写 MySQL，再删除 Redis","slug":"_5-先写-mysql-再删除-redis","link":"#_5-先写-mysql-再删除-redis","children":[]},{"level":3,"title":"6. 先写 MySQL，通过 Binlog，异步更新 Redis","slug":"_6-先写-mysql-通过-binlog-异步更新-redis","link":"#_6-先写-mysql-通过-binlog-异步更新-redis","children":[]}]},{"level":2,"title":"几种方案比较","slug":"几种方案比较","link":"#几种方案比较","children":[]}],"git":{"createdTime":1715268415000,"updatedTime":1715268415000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/mysql/MySQL和Redis的数据一致性.md"}');export{b as comp,k as data};
