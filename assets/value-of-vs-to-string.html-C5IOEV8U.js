import{_ as e,o as n,c as i,a as t}from"./app-BihAYnmf.js";const o={},a=t("p",null,"我们有三种方式将一个int类型的变量变成一个String类型，那么他们有什么区别？",-1),r=t("pre",null,[t("code",null,`1.int i = 5;
2.String i1 = "" + i;
3.String i2 = String.valueOf(i);
4.String i3 = Integer.toString(i);
`)],-1),s=t("p",null,"第三行和第四行没有任何区别，因为String.valueOf(i)也是调用Integer.toString(i)来实现的。",-1),l=t("p",null,"第二行代码其实是String i1 = (new StringBuilder()).append(i).toString();，首先创建一个StringBuilder对象，然后再调用append方法，再调用toString方法。",-1),c=[a,r,s,l];function d(_,g){return n(),i("div",null,c)}const m=e(o,[["render",d],["__file","value-of-vs-to-string.html.vue"]]),p=JSON.parse('{"path":"/docs/java/java-basic/value-of-vs-to-string.html","title":"","lang":"en-US","frontmatter":{},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/value-of-vs-to-string.md"}');export{m as comp,p as data};
