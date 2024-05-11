import{_ as a,o as e,c as s,e as t}from"./app-BihAYnmf.js";const n={},l=t('<p>运行时常量池（ Runtime Constant Pool）是每一个类或接口的常量池（ Constant_Pool）的运行时表示形式。</p><p>它包括了若干种不同的常量：从编译期可知的数值字面量到必须运行期解析后才能获得的方法或字段引用。运行时常量池扮演了类似传统语言中符号表（ SymbolTable）的角色，不过它存储数据范围比通常意义上的符号表要更为广泛。</p><p>每一个运行时常量池都分配在 Java 虚拟机的方法区之中，在类和接口被加载到虚拟机后，对应的运行时常量池就被创建出来。</p><p>以上，是Java虚拟机规范中关于运行时常量池的定义。</p><h3 id="运行时常量池在jdk各个版本中的实现" tabindex="-1"><a class="header-anchor" href="#运行时常量池在jdk各个版本中的实现"><span>运行时常量池在JDK各个版本中的实现</span></a></h3><p>根据Java虚拟机规范约定：每一个运行时常量池都在Java虚拟机的方法区中分配，在加载类和接口到虚拟机后，就创建对应的运行时常量池。</p><p>在不同版本的JDK中，运行时常量池所处的位置也不一样。以HotSpot为例：</p><p>在JDK 1.7之前，方法区位于堆内存的永久代中，运行时常量池作为方法区的一部分，也处于永久代中。</p><p>因为使用永久代实现方法区可能导致内存泄露问题，所以，从JDK1.7开始，JVM尝试解决这一问题，在1.7中，将原本位于永久代中的运行时常量池移动到堆内存中。（永久代在JDK 1.7并没有完全移除，只是原来方法区中的运行时常量池、类的静态变量等移动到了堆内存中。）</p><p>在JDK 1.8中，彻底移除了永久代，方法区通过元空间的方式实现。随之，运行时常量池也在元空间中实现。</p><h3 id="运行时常量池中常量的来源" tabindex="-1"><a class="header-anchor" href="#运行时常量池中常量的来源"><span>运行时常量池中常量的来源</span></a></h3><p>运行时常量池中包含了若干种不同的常量：</p><p>编译期可知的字面量和符号引用（来自Class常量池） 运行期解析后可获得的常量（如String的intern方法）</p><p>所以，运行时常量池中的内容包含：Class常量池中的常量、字符串常量池中的内容</p><h3 id="运行时常量池、class常量池、字符串常量池的区别与联系" tabindex="-1"><a class="header-anchor" href="#运行时常量池、class常量池、字符串常量池的区别与联系"><span>运行时常量池、Class常量池、字符串常量池的区别与联系</span></a></h3><p>虚拟机启动过程中，会将各个Class文件中的常量池载入到运行时常量池中。</p><p>所以， Class常量池只是一个媒介场所。在JVM真的运行时，需要把常量池中的常量加载到内存中，进入到运行时常量池。</p><p>字符串常量池可以理解为运行时常量池分出来的部分。加载时，对于class的静态常量池，如果字符串会被装到字符串常量池中。</p>',18),o=[l];function p(c,i){return e(),s("div",null,o)}const d=a(n,[["render",p],["__file","Runtime-Constant-Pool.html.vue"]]),h=JSON.parse('{"path":"/docs/java/java-basic/Runtime-Constant-Pool.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"运行时常量池在JDK各个版本中的实现","slug":"运行时常量池在jdk各个版本中的实现","link":"#运行时常量池在jdk各个版本中的实现","children":[]},{"level":3,"title":"运行时常量池中常量的来源","slug":"运行时常量池中常量的来源","link":"#运行时常量池中常量的来源","children":[]},{"level":3,"title":"运行时常量池、Class常量池、字符串常量池的区别与联系","slug":"运行时常量池、class常量池、字符串常量池的区别与联系","link":"#运行时常量池、class常量池、字符串常量池的区别与联系","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/Runtime-Constant-Pool.md"}');export{d as comp,h as data};