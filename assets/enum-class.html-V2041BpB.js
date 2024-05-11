import{_ as e,o as n,c as t,a}from"./app-BihAYnmf.js";const s={},l=a("p",null,"Java中定义枚举是使用enum关键字的，但是Java中其实还有一个java.lang.Enum类。这是一个抽象类，定义如下：",-1),c=a("pre",null,[a("code",null,`package java.lang;

public abstract class Enum<E extends Enum<E>> implements Constable, Comparable<E>, Serializable {
    private final String name;
    private final int ordinal;

}
`)],-1),o=a("p",null,"这个类我们在日常开发中不会用到，但是其实我们使用enum定义的枚举，其实现方式就是通过继承Enum类实现的。",-1),i=a("p",null,"当我们使用enum来定义一个枚举类型的时候，编译器会自动帮我们创建一个final类型的类继承Enum类，所以枚举类型不能被继承。",-1),m=[l,c,o,i];function r(u,_){return n(),t("div",null,m)}const p=e(s,[["render",r],["__file","enum-class.html.vue"]]),v=JSON.parse('{"path":"/docs/java/java-basic/enum-class.html","title":"","lang":"en-US","frontmatter":{},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/enum-class.md"}');export{p as comp,v as data};
