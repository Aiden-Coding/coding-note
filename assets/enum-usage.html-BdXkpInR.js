import{_ as n,o as e,c as t,e as o}from"./app-BihAYnmf.js";const a={},i=o(`<h3 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景"><span>1 背景</span></a></h3><p>在<code>java</code>语言中还没有引入枚举类型之前，表示枚举类型的常用模式是声明一组具有<code>int</code>常量。之前我们通常利用<code>public final static</code> 方法定义的代码如下，分别用1 表示春天，2表示夏天，3表示秋天，4表示冬天。</p><pre><code>public class Season {
    public static final int SPRING = 1;
    public static final int SUMMER = 2;
    public static final int AUTUMN = 3;
    public static final int WINTER = 4;
}
</code></pre><p>这种方法称作int枚举模式。可这种模式有什么问题呢，我们都用了那么久了，应该没问题的。通常我们写出来的代码都会考虑它的<strong>安全性</strong>、<strong>易用性</strong>和<strong>可读性</strong>。 首先我们来考虑一下它的类型<strong>安全性</strong>。当然<strong>这种模式不是类型安全的</strong>。比如说我们设计一个函数，要求传入春夏秋冬的某个值。但是使用int类型，我们无法保证传入的值为合法。代码如下所示：</p><pre><code>private String getChineseSeason(int season){
        StringBuffer result = new StringBuffer();
        switch(season){
            case Season.SPRING :
                result.append(&quot;春天&quot;);
                break;
            case Season.SUMMER :
                result.append(&quot;夏天&quot;);
                break;
            case Season.AUTUMN :
                result.append(&quot;秋天&quot;);
                break;
            case Season.WINTER :
                result.append(&quot;冬天&quot;);
                break;
            default :
                result.append(&quot;地球没有的季节&quot;);
                break;
        }
        return result.toString();
    }

    public void doSomething(){
        System.out.println(this.getChineseSeason(Season.SPRING));//这是正常的场景

        System.out.println(this.getChineseSeason(5));//这个却是不正常的场景，这就导致了类型不安全问题
    }
</code></pre><p>程序<code>getChineseSeason(Season.SPRING)</code>是我们预期的使用方法。可<code>getChineseSeason(5)</code>显然就不是了，而且编译会通过，在运行时会出现什么情况，我们就不得而知了。这显然就不符合<code>Java</code>程序的类型安全。</p><p>接下来我们来考虑一下这种模式的<strong>可读性</strong>。使用枚举的大多数场合，我都需要方便得到枚举类型的字符串表达式。如果将<code>int</code>枚举常量打印出来，我们所见到的就是一组数字，这没什么太大的用处。我们可能会想到使用<code>String</code>常量代替<code>int</code>常量。虽然它为这些常量提供了可打印的字符串，但是它会导致性能问题，因为它依赖于字符串的比较操作，所以这种模式也是我们不期望的。 从<strong>类型安全性</strong>和<strong>程序可读性</strong>两方面考虑，<code>int</code>和<code>String</code>枚举模式的缺点就显露出来了。幸运的是，从<code>Java1.5</code>发行版本开始，就提出了另一种可以替代的解决方案，可以避免<code>int</code>和<code>String</code>枚举模式的缺点，并提供了许多额外的好处。那就是枚举类型（<code>enum type</code>）。接下来的章节将介绍枚举类型的定义、特征、应用场景和优缺点。</p><h3 id="_2-定义" tabindex="-1"><a class="header-anchor" href="#_2-定义"><span>2 定义</span></a></h3><p>枚举类型（<code>enum type</code>）是指由一组固定的常量组成合法的类型。<code>Java</code>中由关键字<code>enum</code>来定义一个枚举类型。下面就是<code>java</code>枚举类型的定义。</p><pre><code>public enum Season {
    SPRING, SUMMER, AUTUMN, WINTER;
}
</code></pre><h3 id="_3-特点" tabindex="-1"><a class="header-anchor" href="#_3-特点"><span>3 特点</span></a></h3><p><code>Java</code>定义枚举类型的语句很简约。它有以下特点：</p><blockquote><ol><li>使用关键字<code>enum</code> 2) 类型名称，比如这里的<code>Season</code> 3) 一串允许的值，比如上面定义的春夏秋冬四季 4) 枚举可以单独定义在一个文件中，也可以嵌在其它<code>Java</code>类中</li></ol></blockquote><p>除了这样的基本要求外，用户还有一些其他选择</p><blockquote><ol start="5"><li>枚举可以实现一个或多个接口（Interface） 6) 可以定义新的变量 7) 可以定义新的方法 8) 可以定义根据具体枚举值而相异的类</li></ol></blockquote><h3 id="_4-应用场景" tabindex="-1"><a class="header-anchor" href="#_4-应用场景"><span>4 应用场景</span></a></h3><p>以在背景中提到的类型安全为例，用枚举类型重写那段代码。代码如下：</p><pre><code>public enum Season {
    SPRING(1), SUMMER(2), AUTUMN(3), WINTER(4);

    private int code;
    private Season(int code){
        this.code = code;
    }

    public int getCode(){
        return code;
    }
}
public class UseSeason {
    /**
     * 将英文的季节转换成中文季节
     * @param season
     * @return
     */
    public String getChineseSeason(Season season){
        StringBuffer result = new StringBuffer();
        switch(season){
            case SPRING :
                result.append(&quot;[中文：春天，枚举常量:&quot; + season.name() + &quot;，数据:&quot; + season.getCode() + &quot;]&quot;);
                break;
            case AUTUMN :
                result.append(&quot;[中文：秋天，枚举常量:&quot; + season.name() + &quot;，数据:&quot; + season.getCode() + &quot;]&quot;);
                break;
            case SUMMER : 
                result.append(&quot;[中文：夏天，枚举常量:&quot; + season.name() + &quot;，数据:&quot; + season.getCode() + &quot;]&quot;);
                break;
            case WINTER :
                result.append(&quot;[中文：冬天，枚举常量:&quot; + season.name() + &quot;，数据:&quot; + season.getCode() + &quot;]&quot;);
                break;
            default :
                result.append(&quot;地球没有的季节 &quot; + season.name());
                break;
        }
        return result.toString();
    }

    public void doSomething(){
        for(Season s : Season.values()){
            System.out.println(getChineseSeason(s));//这是正常的场景
        }
        //System.out.println(getChineseSeason(5));
        //此处已经是编译不通过了，这就保证了类型安全
    }

    public static void main(String[] arg){
        UseSeason useSeason = new UseSeason();
        useSeason.doSomething();
    }
}
</code></pre><p>[中文：春天，枚举常量:SPRING，数据:1] [中文：夏天，枚举常量:SUMMER，数据:2] [中文：秋天，枚举常量:AUTUMN，数据:3] [中文：冬天，枚举常量:WINTER，数据:4]</p><p>这里有一个问题，为什么我要将域添加到枚举类型中呢？目的是想将数据与它的常量关联起来。如1代表春天，2代表夏天。</p><h3 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结"><span>5 总结</span></a></h3><p>那么什么时候应该使用枚举呢？每当需要一组固定的常量的时候，如一周的天数、一年四季等。或者是在我们编译前就知道其包含的所有值的集合。Java 1.5的枚举能满足绝大部分程序员的要求的，它的简明，易用的特点是很突出的。</p><h3 id="_6-用法" tabindex="-1"><a class="header-anchor" href="#_6-用法"><span>6 用法</span></a></h3><h3 id="用法一-常量" tabindex="-1"><a class="header-anchor" href="#用法一-常量"><span>用法一：常量</span></a></h3><pre><code>public enum Color {  
  RED, GREEN, BLANK, YELLOW  
}  
</code></pre><h3 id="用法二-switch" tabindex="-1"><a class="header-anchor" href="#用法二-switch"><span>用法二：switch</span></a></h3><pre><code>enum Signal {  
    GREEN, YELLOW, RED  
}  
public class TrafficLight {  
    Signal color = Signal.RED;  
    public void change() {  
        switch (color) {  
        case RED:  
            color = Signal.GREEN;  
            break;  
        case YELLOW:  
            color = Signal.RED;  
            break;  
        case GREEN:  
            color = Signal.YELLOW;  
            break;  
        }  
    }  
}  
</code></pre><h3 id="用法三-向枚举中添加新方法" tabindex="-1"><a class="header-anchor" href="#用法三-向枚举中添加新方法"><span>用法三：向枚举中添加新方法</span></a></h3><pre><code>public enum Color {  
    RED(&quot;红色&quot;, 1), GREEN(&quot;绿色&quot;, 2), BLANK(&quot;白色&quot;, 3), YELLO(&quot;黄色&quot;, 4);  
    // 成员变量  
    private String name;  
    private int index;  
    // 构造方法  
    private Color(String name, int index) {  
        this.name = name;  
        this.index = index;  
    }  
    // 普通方法  
    public static String getName(int index) {  
        for (Color c : Color.values()) {  
            if (c.getIndex() == index) {  
                return c.name;  
            }  
        }  
        return null;  
    }  
    // get set 方法  
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }  
    public int getIndex() {  
        return index;  
    }  
    public void setIndex(int index) {  
        this.index = index;  
    }  
}  
</code></pre><h3 id="用法四-覆盖枚举的方法" tabindex="-1"><a class="header-anchor" href="#用法四-覆盖枚举的方法"><span>用法四：覆盖枚举的方法</span></a></h3><pre><code>public enum Color {  
    RED(&quot;红色&quot;, 1), GREEN(&quot;绿色&quot;, 2), BLANK(&quot;白色&quot;, 3), YELLO(&quot;黄色&quot;, 4);  
    // 成员变量  
    private String name;  
    private int index;  
    // 构造方法  
    private Color(String name, int index) {  
        this.name = name;  
        this.index = index;  
    }  
    //覆盖方法  
    @Override  
    public String toString() {  
        return this.index+&quot;_&quot;+this.name;  
    }  
}  
</code></pre><h3 id="用法五-实现接口" tabindex="-1"><a class="header-anchor" href="#用法五-实现接口"><span>用法五：实现接口</span></a></h3><pre><code>public interface Behaviour {  
    void print();  
    String getInfo();  
}  
public enum Color implements Behaviour{  
    RED(&quot;红色&quot;, 1), GREEN(&quot;绿色&quot;, 2), BLANK(&quot;白色&quot;, 3), YELLO(&quot;黄色&quot;, 4);  
    // 成员变量  
    private String name;  
    private int index;  
    // 构造方法  
    private Color(String name, int index) {  
        this.name = name;  
        this.index = index;  
    }  
//接口方法  
    @Override  
    public String getInfo() {  
        return this.name;  
    }  
    //接口方法  
    @Override  
    public void print() {  
        System.out.println(this.index+&quot;:&quot;+this.name);  
    }  
}  
</code></pre><h3 id="用法六-使用接口组织枚举" tabindex="-1"><a class="header-anchor" href="#用法六-使用接口组织枚举"><span>用法六：使用接口组织枚举</span></a></h3><pre><code>public interface Food {  
    enum Coffee implements Food{  
        BLACK_COFFEE,DECAF_COFFEE,LATTE,CAPPUCCINO  
    }  
    enum Dessert implements Food{  
        FRUIT, CAKE, GELATO  
    }  
}
</code></pre>`,35),s=[i];function r(c,l){return e(),t("div",null,s)}const u=n(a,[["render",r],["__file","enum-usage.html.vue"]]),p=JSON.parse('{"path":"/docs/java/java-basic/enum-usage.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"1 背景","slug":"_1-背景","link":"#_1-背景","children":[]},{"level":3,"title":"2 定义","slug":"_2-定义","link":"#_2-定义","children":[]},{"level":3,"title":"3 特点","slug":"_3-特点","link":"#_3-特点","children":[]},{"level":3,"title":"4 应用场景","slug":"_4-应用场景","link":"#_4-应用场景","children":[]},{"level":3,"title":"5 总结","slug":"_5-总结","link":"#_5-总结","children":[]},{"level":3,"title":"6 用法","slug":"_6-用法","link":"#_6-用法","children":[]},{"level":3,"title":"用法一：常量","slug":"用法一-常量","link":"#用法一-常量","children":[]},{"level":3,"title":"用法二：switch","slug":"用法二-switch","link":"#用法二-switch","children":[]},{"level":3,"title":"用法三：向枚举中添加新方法","slug":"用法三-向枚举中添加新方法","link":"#用法三-向枚举中添加新方法","children":[]},{"level":3,"title":"用法四：覆盖枚举的方法","slug":"用法四-覆盖枚举的方法","link":"#用法四-覆盖枚举的方法","children":[]},{"level":3,"title":"用法五：实现接口","slug":"用法五-实现接口","link":"#用法五-实现接口","children":[]},{"level":3,"title":"用法六：使用接口组织枚举","slug":"用法六-使用接口组织枚举","link":"#用法六-使用接口组织枚举","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/enum-usage.md"}');export{u as comp,p as data};
