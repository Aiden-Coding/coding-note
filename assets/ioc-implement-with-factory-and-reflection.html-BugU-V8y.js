import{_ as e,o as n,c as t,e as a}from"./app-BihAYnmf.js";const i={},p=a(`<p>本文系转载，原文地址：https://blog.csdn.net/fuzhongmin05/article/details/61614873</p><h3 id="反射机制概念" tabindex="-1"><a class="header-anchor" href="#反射机制概念"><span>反射机制概念</span></a></h3><p>我们考虑一个场景，如果我们在程序运行时，一个对象想要检视自己所拥有的成员属性，该如何操作？再考虑另一个场景，如果我们想要在运行期获得某个类的Class信息如它的属性、构造方法、一般方法后再考虑是否创建它的对象，这种情况该怎么办呢？这就需要用到反射！</p><p>我们.java文件在编译后会变成.class文件，这就像是个镜面，本身是.java，在镜中是.class，他们其实是一样的；那么同理，我们看到镜子的反射是.class，就能通过反编译，了解到.java文件的本来面目。</p><p>对于反射，官方给出的概念：反射是Java语言的一个特性，它允许程序在运行时（注意不是编译的时候）来进行自我检查并且对内部的成员进行操作。例如它允许一个Java类获取它所有的成员变量和方法并且显示出来。</p><p>反射主要是指程序可以访问，检测和修改它本身状态或行为的一种能力，并能根据自身行为的状态和结果，调整或修改应用所描述行为的状态和相关的语义。在Java中，只要给定类的名字，那么就可以通过反射机制来获得类的所有信息。</p><p>反射是Java中一种强大的工具，能够使我们很方便的创建灵活的代码，这些代码可以在运行时装配，无需在组件之间进行源代码链接。但是反射使用不当会成本很高！类中有什么信息，利用反射机制就能可以获得什么信息，不过前提是得知道类的名字。</p><h3 id="反射机制的作用" tabindex="-1"><a class="header-anchor" href="#反射机制的作用"><span>反射机制的作用</span></a></h3><p>1、在运行时判断任意一个对象所属的类；</p><p>2、在运行时获取类的对象；</p><p>3、在运行时访问java对象的属性，方法，构造方法等。</p><p>首先要搞清楚为什么要用反射机制？直接创建对象不就可以了吗，这就涉及到了动态与静态的概念。</p><p>静态编译：在编译时确定类型，绑定对象，即通过。</p><p>动态编译：运行时确定类型，绑定对象。动态编译最大限度发挥了Java的灵活性，体现了多态的应用，用以降低类之间的藕合性。</p><h3 id="反射机制的优缺点" tabindex="-1"><a class="header-anchor" href="#反射机制的优缺点"><span>反射机制的优缺点</span></a></h3><p>反射机制的优点：可以实现动态创建对象和编译，体现出很大的灵活性（特别是在J2EE的开发中它的灵活性就表现的十分明显）。通过反射机制我们可以获得类的各种内容，进行反编译。对于JAVA这种先编译再运行的语言来说，反射机制可以使代码更加灵活，更加容易实现面向对象。</p><p>比如，一个大型的软件，不可能一次就把它设计得很完美，把这个程序编译后，发布了，当发现需要更新某些功能时，我们不可能要用户把以前的卸载，再重新安装新的版本，假如这样的话，这个软件肯定是没有多少人用的。采用静态的话，需要把整个程序重新编译一次才可以实现功能的更新，而采用反射机制的话，它就可以不用卸载，只需要在运行时动态地创建和编译，就可以实现该功能。</p><p>反射机制的缺点：对性能有影响。使用反射基本上是一种解释操作，我们可以告诉JVM，我们希望做什么并且让它满足我们的要求。这类操作总是慢于直接执行相同的操作。</p><h3 id="反射与工厂模式实现ioc" tabindex="-1"><a class="header-anchor" href="#反射与工厂模式实现ioc"><span>反射与工厂模式实现IOC</span></a></h3><p>Spring中的IoC的实现原理就是工厂模式加反射机制。 我们首先看一下不用反射机制时的工厂模式：</p><pre><code>interface fruit{
    public abstract void eat();
} 
class Apple implements fruit{
     public void eat(){
         System.out.println(&quot;Apple&quot;);
     }
} 
class Orange implements fruit{
     public void eat(){
         System.out.println(&quot;Orange&quot;);
     }
}
//构造工厂类
//也就是说以后如果我们在添加其他的实例的时候只需要修改工厂类就行了
class Factory{
     public static fruit getInstance(String fruitName){
         fruit f=null;
         if(&quot;Apple&quot;.equals(fruitName)){
             f=new Apple();
         }
         if(&quot;Orange&quot;.equals(fruitName)){
             f=new Orange();
         }
         return f;
     }
}
class hello{
     public static void main(String[] a){
         fruit f=Factory.getInstance(&quot;Orange&quot;);
         f.eat();
     }
}
</code></pre><p>上面写法的缺点是当我们再添加一个子类的时候，就需要修改工厂类了。如果我们添加太多的子类的时候，改动就会很多。下面用反射机制实现工厂模式：</p><pre><code>interface fruit{
     public abstract void eat();
}
class Apple implements fruit{
public void eat(){
         System.out.println(&quot;Apple&quot;);
     }
}
class Orange implements fruit{
public void eat(){
        System.out.println(&quot;Orange&quot;);
    }
}
class Factory{
    public static fruit getInstance(String ClassName){
        fruit f=null;
        try{
            f=(fruit)Class.forName(ClassName).newInstance();
        }catch (Exception e) {
            e.printStackTrace();
        }
        return f;
    }
}
class hello{
    public static void main(String[] a){
        fruit f=Factory.getInstance(&quot;Reflect.Apple&quot;);
        if(f!=null){
            f.eat();
        }
    }
}
</code></pre><p>现在就算我们添加任意多个子类的时候，工厂类都不需要修改。使用反射机制实现的工厂模式可以通过反射取得接口的实例，但是需要传入完整的包和类名。而且用户也无法知道一个接口有多少个可以使用的子类，所以我们通过属性文件的形式配置所需要的子类。</p><p>下面编写使用反射机制并结合属性文件的工厂模式（即IoC）。首先创建一个fruit.properties的资源文件：</p><pre><code>apple=Reflect.Apple
orange=Reflect.Orange
</code></pre><p>然后编写主类代码：</p><pre><code>interface fruit{
    public abstract void eat();
}
class Apple implements fruit{
    public void eat(){
        System.out.println(&quot;Apple&quot;);
    }
}
class Orange implements fruit{
    public void eat(){
        System.out.println(&quot;Orange&quot;);
    }
}
//操作属性文件类
class init{
    public static Properties getPro() throws FileNotFoundException, IOException{
        Properties pro=new Properties();
        File f=new File(&quot;fruit.properties&quot;);
        if(f.exists()){
            pro.load(new FileInputStream(f));
        }else{
            pro.setProperty(&quot;apple&quot;, &quot;Reflect.Apple&quot;);
            pro.setProperty(&quot;orange&quot;, &quot;Reflect.Orange&quot;);
            pro.store(new FileOutputStream(f), &quot;FRUIT CLASS&quot;);
        }
        return pro;
    }
}
class Factory{
    public static fruit getInstance(String ClassName){
        fruit f=null;
        try{
            f=(fruit)Class.forName(ClassName).newInstance();
        }catch (Exception e) {
            e.printStackTrace();
        }
        return f;
    }
}
class hello{
    public static void main(String[] a) throws FileNotFoundException, IOException{
        Properties pro=init.getPro();
        fruit f=Factory.getInstance(pro.getProperty(&quot;apple&quot;));
        if(f!=null){
            f.eat();
        }
    }
}
</code></pre><p>运行结果：Apple</p><h3 id="ioc容器的技术剖析" tabindex="-1"><a class="header-anchor" href="#ioc容器的技术剖析"><span>IOC容器的技术剖析</span></a></h3><p>IOC中最基本的技术就是“反射(Reflection)”编程，通俗来讲就是根据给出的类名（字符串方式）来动态地生成对象，这种编程方式可以让对象在生成时才被决定到底是哪一种对象。只要是在Spring中生产的对象都要在配置文件中给出定义，目的就是提高灵活性和可维护性。</p><p>目前C#、Java和PHP5等语言均支持反射，其中PHP5的技术书籍中，有时候也被翻译成“映射”。有关反射的概念和用法，大家应该都很清楚。反射的应用是很广泛的，很多的成熟的框架，比如像Java中的Hibernate、Spring框架，.Net中NHibernate、Spring.NET框架都是把”反射“作为最基本的技术手段。</p><p>反射技术其实很早就出现了，但一直被忽略，没有被进一步的利用。当时的反射编程方式相对于正常的对象生成方式要慢至少得10倍。现在的反射技术经过改良优化，已经非常成熟，反射方式生成对象和通常对象生成方式，速度已经相差不大了，大约为1-2倍的差距。</p><p>我们可以把IOC容器的工作模式看做是工厂模式的升华，可以把IOC容器看作是一个工厂，这个工厂里要生产的对象都在配置文件中给出定义，然后利用编程语言提供的反射机制，根据配置文件中给出的类名生成相应的对象。从实现来看，IOC是把以前在工厂方法里写死的对象生成代码，改变为由配置文件来定义，也就是把工厂和对象生成这两者独立分隔开来，目的就是提高灵活性和可维护性。</p><h3 id="使用ioc框架应该注意什么" tabindex="-1"><a class="header-anchor" href="#使用ioc框架应该注意什么"><span>使用IOC框架应该注意什么</span></a></h3><p>使用IOC框架产品能够给我们的开发过程带来很大的好处，但是也要充分认识引入IOC框架的缺点，做到心中有数，杜绝滥用框架。</p><p>1）软件系统中由于引入了第三方IOC容器，生成对象的步骤变得有些复杂，本来是两者之间的事情，又凭空多出一道手续，所以，我们在刚开始使用IOC框架的时候，会感觉系统变得不太直观。所以，引入了一个全新的框架，就会增加团队成员学习和认识的培训成本，并且在以后的运行维护中，还得让新加入者具备同样的知识体系。</p><p>2）由于IOC容器生成对象是通过反射方式，在运行效率上有一定的损耗。如果你要追求运行效率的话，就必须对此进行权衡。</p><p>3）具体到IOC框架产品（比如Spring）来讲，需要进行大量的配置工作，比较繁琐，对于一些小的项目而言，客观上也可能加大一些工作成本。</p><p>4）IOC框架产品本身的成熟度需要进行评估，如果引入一个不成熟的IOC框架产品，那么会影响到整个项目，所以这也是一个隐性的风险。</p><p>我们大体可以得出这样的结论：一些工作量不大的项目或者产品，不太适合使用IOC框架产品。另外，如果团队成员的知识能力欠缺，对于IOC框架产品缺乏深入的理解，也不要贸然引入。最后，特别强调运行效率的项目或者产品，也不太适合引入IOC框架产品，像WEB2.0网站就是这种情况。</p>`,41),r=[p];function o(l,c){return n(),t("div",null,r)}const u=e(i,[["render",o],["__file","ioc-implement-with-factory-and-reflection.html.vue"]]),f=JSON.parse('{"path":"/docs/java/java-basic/ioc-implement-with-factory-and-reflection.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"反射机制概念","slug":"反射机制概念","link":"#反射机制概念","children":[]},{"level":3,"title":"反射机制的作用","slug":"反射机制的作用","link":"#反射机制的作用","children":[]},{"level":3,"title":"反射机制的优缺点","slug":"反射机制的优缺点","link":"#反射机制的优缺点","children":[]},{"level":3,"title":"反射与工厂模式实现IOC","slug":"反射与工厂模式实现ioc","link":"#反射与工厂模式实现ioc","children":[]},{"level":3,"title":"IOC容器的技术剖析","slug":"ioc容器的技术剖析","link":"#ioc容器的技术剖析","children":[]},{"level":3,"title":"使用IOC框架应该注意什么","slug":"使用ioc框架应该注意什么","link":"#使用ioc框架应该注意什么","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/ioc-implement-with-factory-and-reflection.md"}');export{u as comp,f as data};
