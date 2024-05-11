import{_ as t,r as s,o as a,c,a as n,d as i,w as l,b as e}from"./app-BihAYnmf.js";const d={},r=n("p",null,"同步与异步描述的是被调用者的。",-1),_=n("p",null,"如A调用B：",-1),h=n("p",null,"如果是同步，B在接到A的调用后，会立即执行要做的事。A的本次调用可以得到结果。",-1),m=n("p",null,"如果是异步，B在接到A的调用后，不保证会立即执行要做的事，但是保证会去做，B在做好了之后会通知A。A的本次调用得不到结果，但是B执行完之后会通知A。",-1),p=n("h3",{id:"同步-异步-和-阻塞-非阻塞之间的区别",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#同步-异步-和-阻塞-非阻塞之间的区别"},[n("span",null,"同步，异步 和 阻塞，非阻塞之间的区别")])],-1),u=n("p",null,"同步，异步，是描述被调用方的。",-1),v=n("p",null,"同步不一定阻塞，异步也不一定非阻塞。没有必然关系。",-1),b=n("p",null,"举个简单的例子，老张烧水。 1 老张把水壶放到火上，一直在水壶旁等着水开。（同步阻塞） 2 老张把水壶放到火上，去客厅看电视，时不时去厨房看看水开没有。（同步非阻塞） 3 老张把响水壶放到火上，一直在水壶旁等着水开。（异步阻塞） 4 老张把响水壶放到火上，去客厅看电视，水壶响之前不再去看它了，响了再去拿壶。（异步非阻塞）",-1),f=n("p",null,"1和2的区别是，调用方在得到返回之前所做的事情不一样。 1和3的区别是，被调用方对于烧水的处理不一样。",-1);function y(z,A){const o=s("RouteLink");return a(),c("div",null,[r,_,h,m,p,u,n("p",null,[i(o,{to:"/basics/java-basic/block-vs-non-blocking.html"},{default:l(()=>[e("阻塞、非阻塞")]),_:1}),e("，是描述调用方的。")]),v,b,f])}const k=t(d,[["render",y],["__file","synchronized-vs-asynchronization.html.vue"]]),x=JSON.parse('{"path":"/docs/java/java-basic/synchronized-vs-asynchronization.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"同步，异步 和 阻塞，非阻塞之间的区别","slug":"同步-异步-和-阻塞-非阻塞之间的区别","link":"#同步-异步-和-阻塞-非阻塞之间的区别","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/synchronized-vs-asynchronization.md"}');export{k as comp,x as data};
