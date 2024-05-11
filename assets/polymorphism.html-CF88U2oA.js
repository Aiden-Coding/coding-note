import{_ as a,o as e,c as n,e as l}from"./app-BihAYnmf.js";const p={},i=l(`<p>在第1.2章节中，我们介绍了面向对象的封装、继承和多态这三个基本特性，并且分别对封装和继承简单的举例做了说明。</p><p>这一章节中，我们针对上一章节遗留的多态性进行展开介绍。</p><h2 id="什么是多态" tabindex="-1"><a class="header-anchor" href="#什么是多态"><span>什么是多态</span></a></h2><p>我们先基于所有的编程语言介绍了什么是多态以及多态的分类。然后再重点介绍下Java中的多态。</p><p>多态（Polymorphism）,指为不同数据类型的实体提供统一的接口，或使用一个单一的符号来表示多个不同的类型。一般情况下，可以把多态分成以下几类：</p><ul><li>特设多态：为个体的特定类型的任意集合定义一个共同接口。</li><li>参数多态：指定一个或多个类型不靠名字而是靠可以标识任何类型的抽象符号。</li><li>子类型：一个名字指称很多不同的类的实例，这些类有某个共同的超类。</li></ul><h3 id="特设多态" tabindex="-1"><a class="header-anchor" href="#特设多态"><span>特设多态</span></a></h3><p>特设多态是程序设计语言的一种多态，多态函数有多个不同的实现，依赖于其实参而调用相应版本的函数。</p><p>上一节我们介绍过的函数重载是特设多态的一种，除此之外还有运算符重载也是特设多态的一种。</p><h3 id="参数多态" tabindex="-1"><a class="header-anchor" href="#参数多态"><span>参数多态</span></a></h3><p>参数多态在程序设计语言与类型论中是指声明与定义函数、复合类型、变量时不指定其具体的类型，而把这部分类型作为参数使用，使得该定义对各种具体类型都适用。</p><p>参数多态其实也有很广泛的应用，比如Java中的泛型就是参数多态的一种。参数多态另外一个应用比较广泛的地方就是函数式编程。</p><h3 id="子类型" tabindex="-1"><a class="header-anchor" href="#子类型"><span>子类型</span></a></h3><p>在面向对象程序设计中，计算机程序运行时，相同的消息可能会送给多个不同的类别之对象，而系统可依据对象所属类别，引发对应类别的方法，而有不同的行为。</p><p>这种子类型多态其实就是Java中常见的多态，下面我们针对Java中的这种子类型多态展开介绍下。</p><h2 id="java中的多态" tabindex="-1"><a class="header-anchor" href="#java中的多态"><span>Java中的多态</span></a></h2><p>Java中的多态的概念比较简单，就是同一操作作用于不同的对象，可以有不同的解释，产生不同的执行结果。</p><p>Java中多态其实是一种运行期的状态。为了实现运行期的多态，或者说是动态绑定，需要满足三个条件：</p><ul><li>有类继承或者接口实现</li><li>子类要重写父类的方法</li><li>父类的引用指向子类的对象</li></ul><p>简单来一段代码解释下：</p><pre><code>public class Parent{
    
    public void call(){
        sout(&quot;im Parent&quot;);
    }
}

public class Son extends Parent{// 1.有类继承或者接口实现
    public void call(){// 2.子类要重写父类的方法
        sout(&quot;im Son&quot;);
    }
}

public class Daughter extends Parent{// 1.有类继承或者接口实现
    public void call(){// 2.子类要重写父类的方法
        sout(&quot;im Daughter&quot;);
    }
}

public class Test{
    
    public static void main(String[] args){
        Parent p = new Son(); //3.父类的引用指向子类的对象
        Parent p1 = new Daughter(); //3.父类的引用指向子类的对象
    }
}
</code></pre><p>这样，就实现了多态，同样是Parent类的实例，p.call 调用的是Son类的实现、p1.call调用的是Daughter的实现。</p><p>有人说，你自己定义的时候不就已经知道p是son，p1是Daughter了么。但是，有些时候你用到的对象并不都是自己声明的。</p><p>比如Spring 中的IOC出来的对象，你在使用的时候就不知道他是谁，或者说你可以不用关心他是谁。根据具体情况而定。</p><blockquote><p>IOC，是Ioc—Inversion of Control 的缩写，中文翻译成“控制反转”，它是一种设计思想，意味着将你设计好的对象交给容器控制，而不是传统的在你的对象内部直接控制。</p><p>换句话说当我们使用Spring框架的时候，对象是Spring容器创建出来并由容器进行管理，我们只需要使用就行了。</p></blockquote><h3 id="静态多态" tabindex="-1"><a class="header-anchor" href="#静态多态"><span>静态多态</span></a></h3><p>上面我们说的多态，是一种运行期的概念。另外，还有一种说法，认为多态还分为动态多态和静态多态。</p><p>上面提到的那种动态绑定认为是动态多态，因为只有在运行期才能知道真正调用的是哪个类的方法。</p><p>很多人认为，还有一种静态多态，一般认为Java中的函数重载是一种静态多态，因为他需要在编译期决定具体调用哪个方法。</p><p>结合2.1章节，我们介绍过的重载和重写的相关概念，我们再来总结下重载和重写这两个概念：</p><p>1、重载是一个编译期概念、重写是一个运行期概念。</p><p>2、重载遵循所谓“编译期绑定”，即在编译时根据参数变量的类型判断应该调用哪个方法。</p><p>3、重写遵循所谓“运行期绑定”，即在运行的时候，根据引用变量所指向的实际对象的类型来调用方法。</p><p>4、Java中的方法重写是Java多态（子类型）的实现方式。而Java中的方法重写其实是特设多态的一种实现方式。</p>`,34),t=[i];function o(s,r){return e(),n("div",null,t)}const h=a(p,[["render",o],["__file","polymorphism.html.vue"]]),d=JSON.parse('{"path":"/docs/java/object-oriented/polymorphism.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"什么是多态","slug":"什么是多态","link":"#什么是多态","children":[{"level":3,"title":"特设多态","slug":"特设多态","link":"#特设多态","children":[]},{"level":3,"title":"参数多态","slug":"参数多态","link":"#参数多态","children":[]},{"level":3,"title":"子类型","slug":"子类型","link":"#子类型","children":[]}]},{"level":2,"title":"Java中的多态","slug":"java中的多态","link":"#java中的多态","children":[{"level":3,"title":"静态多态","slug":"静态多态","link":"#静态多态","children":[]}]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/object-oriented/polymorphism.md"}');export{h as comp,d as data};
