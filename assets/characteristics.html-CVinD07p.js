import{_ as n,o as e,c as t,e as a}from"./app-BihAYnmf.js";const i={},c=a(`<p>我们说面向对象的开发范式，其实是对现实世界的理解和抽象的方法，那么，具体如何将现实世界抽象成代码呢？这就需要运用到面向对象的三大特性，分别是封装性、继承性和多态性。</p><h1 id="封装-encapsulation" tabindex="-1"><a class="header-anchor" href="#封装-encapsulation"><span>封装(Encapsulation)</span></a></h1><p>所谓封装，也就是把客观事物封装成抽象的类，并且类可以把自己的数据和方法只让可信的类或者对象操作，对不可信的进行信息隐藏。</p><p>简单的说，一个类就是一个封装了数据以及操作这些数据的代码的逻辑实体。在一个对象内部，某些代码或某些数据可以是私有的，不能被外界访问。通过这种方式，对象对内部数据提供了不同级别的保护，以防止程序中无关的部分意外的改变或错误的使用了对象的私有部分。</p><h4 id="封装举例" tabindex="-1"><a class="header-anchor" href="#封装举例"><span>封装举例</span></a></h4><p>如我们想要定义一个矩形，先定义一个Rectangle类，并其中通过封装的手段放入一些必备数据。</p><pre><code>/**
* 矩形
*/
class Rectangle {

     /**
      * 设置矩形的长度和宽度
      */
     public Rectangle(int length, int width) {
         this.length = length;
         this.width = width;
     }
    
     /**
      * 长度
      */
     private int length;
    
     /**
      * 宽度
      */
     private int width;
    
     /**
      * 获得矩形面积
      *
      * @return
      */
     public int area() {
         return this.length * this.width;
     }
}
</code></pre><p>我们通过封装的方式，给&quot;矩形&quot;定义了&quot;长度&quot;和&quot;宽度&quot;，这就完成了对现实世界中的&quot;矩形&quot;的抽象的第一步。</p><h3 id="继承-inheritance" tabindex="-1"><a class="header-anchor" href="#继承-inheritance"><span>继承(Inheritance)</span></a></h3><p>继承是指这样一种能力：它可以使用现有类的所有功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。</p><p>通过继承创建的新类称为“子类”或“派生类”，被继承的类称为“基类”、“父类”或“超类”。继承的过程，就是从一般到特殊的过程。</p><h4 id="继承举例" tabindex="-1"><a class="header-anchor" href="#继承举例"><span>继承举例</span></a></h4><p>我们想要定义一个正方形，因为已经有了矩形，所以我们可以直接继承Rectangle类，因为正方形是长方形的一种特例。</p><pre><code>/**
 * 正方形，继承自矩形
 */
class Square extends Rectangle {

    /**
     * 设置正方形边长
     *
     * @param length
     */
    public Square(int length) {
        super(length, length);
    }
}
</code></pre><p>现实世界中，&quot;正方形&quot;是&quot;矩形&quot;的特例，或者说正方形是通过矩形派生出来的，这种派生关系，在面向对象中可以用继承来表达。</p><h3 id="多态-polymorphism" tabindex="-1"><a class="header-anchor" href="#多态-polymorphism"><span>多态(Polymorphism)</span></a></h3><p>所谓多态就是指一个类实例的相同方法在不同情形有不同表现形式。多态机制使具有不同内部结构的对象可以共享相同的外部接口。</p><p>这意味着，虽然针对不同对象的具体操作不同，但通过一个公共的类，它们（那些操作）可以通过相同的方式予以调用。</p><p>最常见的多态就是将子类传入父类参数中，运行时调用父类方法时通过传入的子类决定具体的内部结构或行为。</p><p>关于多态的例子，我们第二章中深入开展介绍。</p><p>在介绍了面向对象的封装、继承、多态的三个基本特征之后，我们基本掌握了对现实世界抽象的基本方法。</p><p>莎士比亚说：&quot;一千个读者眼里有一千个​哈姆雷特&quot;，说到对现实世界的抽象，虽然方法相同，但是运用同样的方法，最终得到的结果可能千差万别，那么如何评价这个抽象的结果的好坏呢？</p><p>这就要提到面喜爱那个对象的五大基本原则了，有了五大原则，我们参考他们来评价一个抽象的好坏。</p>`,23),p=[c];function r(h,s){return e(),t("div",null,p)}const l=n(i,[["render",r],["__file","characteristics.html.vue"]]),d=JSON.parse('{"path":"/docs/java/object-oriented/characteristics.html","title":"基础","lang":"en-US","frontmatter":{"title":"基础"},"headers":[{"level":3,"title":"继承(Inheritance)","slug":"继承-inheritance","link":"#继承-inheritance","children":[]},{"level":3,"title":"多态(Polymorphism)","slug":"多态-polymorphism","link":"#多态-polymorphism","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715385555000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":2}]},"filePathRelative":"docs/java/object-oriented/characteristics.md"}');export{l as comp,d as data};
