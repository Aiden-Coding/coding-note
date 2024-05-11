import{_ as e,o as i,c as n,e as s}from"./app-BihAYnmf.js";const t={},l=s(`<p><strong>1、直接使用普通for循环进行操作</strong></p><p>我们说不能在foreach中进行，但是使用普通的for循环还是可以的，因为普通for循环并没有用到Iterator的遍历，所以压根就没有进行fail-fast的检验。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>        List&lt;String&gt; userNames = new ArrayList&lt;String&gt;() {{
            add(&quot;Hollis&quot;);
            add(&quot;hollis&quot;);
            add(&quot;HollisChuang&quot;);
            add(&quot;H&quot;);
        }};
    
        for (int i = 0; i &lt; 1; i++) {
            if (userNames.get(i).equals(&quot;Hollis&quot;)) {
                userNames.remove(i);
            }
        }
        System.out.println(userNames);
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方案其实存在一个问题，那就是remove操作会改变List中元素的下标，可能存在漏删的情况。 <strong>2、直接使用Iterator进行操作</strong></p><p>除了直接使用普通for循环以外，我们还可以直接使用Iterator提供的remove方法。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>        List&lt;String&gt; userNames = new ArrayList&lt;String&gt;() {{
            add(&quot;Hollis&quot;);
            add(&quot;hollis&quot;);
            add(&quot;HollisChuang&quot;);
            add(&quot;H&quot;);
        }};
    
        Iterator iterator = userNames.iterator();
    
        while (iterator.hasNext()) {
            if (iterator.next().equals(&quot;Hollis&quot;)) {
                iterator.remove();
            }
        }
        System.out.println(userNames);
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果直接使用Iterator提供的remove方法，那么就可以修改到expectedModCount的值。那么就不会再抛出异常了。</p><p><strong>3、使用Java 8中提供的filter过滤</strong></p><p>Java 8中可以把集合转换成流，对于流有一种filter操作， 可以对原始 Stream 进行某项测试，通过测试的元素被留下来生成一个新 Stream。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>        List&lt;String&gt; userNames = new ArrayList&lt;String&gt;() {{
            add(&quot;Hollis&quot;);
            add(&quot;hollis&quot;);
            add(&quot;HollisChuang&quot;);
            add(&quot;H&quot;);
        }};
    
        userNames = userNames.stream().filter(userName -&gt; !userName.equals(&quot;Hollis&quot;)).collect(Collectors.toList());
        System.out.println(userNames);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4、使用增强for循环其实也可以</strong></p><p>如果，我们非常确定在一个集合中，某个即将删除的元素只包含一个的话， 比如对Set进行操作，那么其实也是可以使用增强for循环的，只要在删除之后，立刻结束循环体，不要再继续进行遍历就可以了，也就是说不让代码执行到下一次的next方法。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>        List&lt;String&gt; userNames = new ArrayList&lt;String&gt;() {{
            add(&quot;Hollis&quot;);
            add(&quot;hollis&quot;);
            add(&quot;HollisChuang&quot;);
            add(&quot;H&quot;);
        }};
    
        for (String userName : userNames) {
            if (userName.equals(&quot;Hollis&quot;)) {
                userNames.remove(userName);
                break;
            }
        }
        System.out.println(userNames);
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>5、直接使用fail-safe的集合类</strong></p><p>在Java中，除了一些普通的集合类以外，还有一些采用了fail-safe机制的集合类。这样的集合容器在遍历时不是直接在集合内容上访问的，而是先复制原有集合内容，在拷贝的集合上进行遍历。</p><p>由于迭代时是对原集合的拷贝进行遍历，所以在遍历过程中对原集合所作的修改并不能被迭代器检测到，所以不会触发ConcurrentModificationException。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    ConcurrentLinkedDeque&lt;String&gt; userNames = new ConcurrentLinkedDeque&lt;String&gt;() {{
        add(&quot;Hollis&quot;);
        add(&quot;hollis&quot;);
        add(&quot;HollisChuang&quot;);
        add(&quot;H&quot;);
    }};
    
    for (String userName : userNames) {
        if (userName.equals(&quot;Hollis&quot;)) {
            userNames.remove();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于拷贝内容的优点是避免了ConcurrentModificationException，但同样地，迭代器并不能访问到修改后的内容，即：迭代器遍历的是开始遍历那一刻拿到的集合拷贝，在遍历期间原集合发生的修改迭代器是不知道的。</p><p>java.util.concurrent包下的容器都是安全失败，可以在多线程下并发使用，并发修改。</p>`,19),a=[l];function d(r,u){return i(),n("div",null,a)}const v=e(t,[["render",d],["__file","delete-while-iterator.html.vue"]]),m=JSON.parse('{"path":"/docs/java/java-basic/delete-while-iterator.html","title":"","lang":"en-US","frontmatter":{},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/delete-while-iterator.md"}');export{v as comp,m as data};
