import{_ as e,o as a,c as i,e as n}from"./app-BihAYnmf.js";const l={},d=n(`<p>Lambda 表达式，也可称为闭包，它是推动 Java 8 发布的最重要新特性。</p><p>Lambda 允许把函数作为一个方法的参数（函数作为参数传递进方法中）。</p><p>使用 Lambda 表达式可以使代码变的更加简洁紧凑。</p><h3 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h3><p>lambda 表达式的语法格式如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>(parameters) -&gt; expression
或
(parameters) -&gt;{ statements; }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是lambda表达式的重要特征:</p><ul><li>可选类型声明：不需要声明参数类型，编译器可以统一识别参数值。</li><li>可选的参数圆括号：一个参数无需定义圆括号，但多个参数需要定义圆括号。</li><li>可选的大括号：如果主体包含了一个语句，就不需要使用大括号。</li><li>可选的返回关键字：如果主体只有一个表达式返回值则编译器会自动返回值，大括号需要指定明表达式返回了一个数值。</li></ul><h3 id="lambda-表达式实例" tabindex="-1"><a class="header-anchor" href="#lambda-表达式实例"><span>Lambda 表达式实例</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// 1. 不需要参数,返回值为 5  
() -&gt; 5  
  
// 2. 接收一个参数(数字类型),返回其2倍的值  
x -&gt; 2 * x  
  
// 3. 接受2个参数(数字),并返回他们的差值  
(x, y) -&gt; x – y  
  
// 4. 接收2个int型整数,返回他们的和  
(int x, int y) -&gt; x + y  
  
// 5. 接受一个 string 对象,并在控制台打印,不返回任何值(看起来像是返回void)  
(String s) -&gt; System.out.print(s)

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lambda 表达式主要用来定义行内执行的方法类型接口，例如，一个简单方法接口。在上面例子中，我们使用各种类型的Lambda表达式来定义MathOperation接口的方法。然后我们定义了sayMessage的执行。</p><p>Lambda 表达式免去了使用匿名方法的麻烦，并且给予Java简单但是强大的函数化的编程能力。</p><h3 id="变量作用域" tabindex="-1"><a class="header-anchor" href="#变量作用域"><span>变量作用域</span></a></h3><p>lambda 表达式只能引用标记了 final 的外层局部变量，这就是说不能在 lambda 内部修改定义在域外的局部变量，否则会编译错误。如以下代码，编译会出错：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
String first = &quot;&quot;;  
Comparator&lt;String&gt; comparator = (first, second) -&gt; Integer.compare(first.length(), second.length()); 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原文地址：https://www.runoob.com/java/java8-lambda-expressions.html</p>`,16),s=[d];function t(r,c){return a(),i("div",null,s)}const v=e(l,[["render",t],["__file","lambda.html.vue"]]),b=JSON.parse('{"path":"/docs/java/java-basic/lambda.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"语法","slug":"语法","link":"#语法","children":[]},{"level":3,"title":"Lambda 表达式实例","slug":"lambda-表达式实例","link":"#lambda-表达式实例","children":[]},{"level":3,"title":"变量作用域","slug":"变量作用域","link":"#变量作用域","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/lambda.md"}');export{v as comp,b as data};
