import{_ as r,r as n,o as d,c as _,a as t,b as e,d as i,w as c}from"./app-BihAYnmf.js";const h={},u=t("h3",{id:"一、当泛型遇到重载",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#一、当泛型遇到重载"},[t("span",null,"一、当泛型遇到重载")])],-1),p=t("pre",null,[t("code",null,`public class GenericTypes {  

    public static void method(List<String> list) {  
        System.out.println("invoke method(List<String> list)");  
    }  

    public static void method(List<Integer> list) {  
        System.out.println("invoke method(List<Integer> list)");  
    }  
}  
`)],-1),g=t("code",null,"List<String>",-1),m=t("code",null,"List<Integer>",-1),v=t("code",null,"List<Integer>",-1),b=t("code",null,"List<String>",-1),f=t("h3",{id:"二、当泛型遇到catch",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#二、当泛型遇到catch"},[t("span",null,"二、当泛型遇到catch")])],-1),x=t("h3",{id:"三、当泛型内包含静态变量",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#三、当泛型内包含静态变量"},[t("span",null,"三、当泛型内包含静态变量")])],-1),S=t("pre",null,[t("code",null,`public class StaticTest{
    public static void main(String[] args){
        GT<Integer> gti = new GT<Integer>();
        gti.var=1;
        GT<String> gts = new GT<String>();
        gts.var=2;
        System.out.println(gti.var);
    }
}
class GT<T>{
    public static int var=0;
    public void nothing(T x){}
}
`)],-1),T=t("p",null,"答案是——2！",-1),G=t("p",null,"由于经过类型擦除，所有的泛型类实例都关联到同一份字节码上，泛型类的所有静态变量是共享的。",-1);function L(k,I){const s=n("e"),l=n("integer"),o=n("string"),a=n("t");return d(),_("div",null,[u,p,t("p",null,[e("上面这段代码，有两个重载的函数，因为他们的参数类型不同，一个是"),g,e("另一个是"),m,e(" ，但是，这段代码是编译通不过的。因为我们前面讲过，参数"),v,e("和"),b,e("编译之后都被擦除了，变成了一样的原生类型List"),i(s,null,{default:c(()=>[e("，擦除动作导致这两个方法的特征签名变得一模一样。")]),_:1})]),f,t("p",null,[e("如果我们自定义了一个泛型异常类GenericException"),i(a,null,{default:c(()=>[e("，那么，不要尝试用多个catch取匹配不同的异常类型，例如你想要分别捕获GenericException"),i(o,null,{default:c(()=>[e("、GenericException"),i(l,null,{default:c(()=>[e("，这也是有问题的。")]),_:1})]),_:1})]),_:1})]),x,S,T,G])}const w=r(h,[["render",L],["__file","generics-problem.html.vue"]]),y=JSON.parse('{"path":"/docs/java/java-basic/generics-problem.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"一、当泛型遇到重载","slug":"一、当泛型遇到重载","link":"#一、当泛型遇到重载","children":[]},{"level":3,"title":"二、当泛型遇到catch","slug":"二、当泛型遇到catch","link":"#二、当泛型遇到catch","children":[]},{"level":3,"title":"三、当泛型内包含静态变量","slug":"三、当泛型内包含静态变量","link":"#三、当泛型内包含静态变量","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/generics-problem.md"}');export{w as comp,y as data};
