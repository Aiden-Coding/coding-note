import{_ as t,o as e,c as a,e as n}from"./app-BihAYnmf.js";const r={},i=n(`<p><code>ArrayList</code>使用了<code>transient</code>关键字进行存储优化，而<code>Vector</code>没有这样做，为什么？</p><h3 id="arraylist" tabindex="-1"><a class="header-anchor" href="#arraylist"><span>ArrayList</span></a></h3><pre><code>/** 
     * Save the state of the &lt;tt&gt;ArrayList&lt;/tt&gt; instance to a stream (that 
     * is, serialize it). 
     * 
     * @serialData The length of the array backing the &lt;tt&gt;ArrayList&lt;/tt&gt; 
     *             instance is emitted (int), followed by all of its elements 
     *             (each an &lt;tt&gt;Object&lt;/tt&gt;) in the proper order. 
     */  
    private void writeObject(java.io.ObjectOutputStream s)  
        throws java.io.IOException{  
        // Write out element count, and any hidden stuff  
        int expectedModCount = modCount;  
        s.defaultWriteObject();  

        // Write out array length  
        s.writeInt(elementData.length);  

        // Write out all elements in the proper order.  
        for (int i=0; i&lt;size; i++)  
            s.writeObject(elementData[i]);  

        if (modCount != expectedModCount) {  
            throw new ConcurrentModificationException();  
        }  

    }  
</code></pre><p>ArrayList实现了writeObject方法，可以看到只保存了非null的数组位置上的数据。即list的size个数的elementData。需要额外注意的一点是，ArrayList的实现，提供了fast-fail机制，可以提供弱一致性。</p><h3 id="vector" tabindex="-1"><a class="header-anchor" href="#vector"><span>Vector</span></a></h3><pre><code>/**
     * Save the state of the {@code Vector} instance to a stream (that
     * is, serialize it).
     * This method performs synchronization to ensure the consistency
     * of the serialized data.
     */
    private void writeObject(java.io.ObjectOutputStream s)
            throws java.io.IOException {
        final java.io.ObjectOutputStream.PutField fields = s.putFields();
        final Object[] data;
        synchronized (this) {
            fields.put(&quot;capacityIncrement&quot;, capacityIncrement);
            fields.put(&quot;elementCount&quot;, elementCount);
            data = elementData.clone();
        }
        fields.put(&quot;elementData&quot;, data);
        s.writeFields();
    }
</code></pre><p>Vector也实现了writeObject方法，但方法并没有像ArrayList一样进行优化存储，实现语句是</p><p><code>data = elementData.clone();</code></p><p>clone()的时候会把null值也拷贝。所以保存相同内容的Vector与ArrayList，Vector的占用的字节比ArrayList要多。</p><p>可以测试一下，序列化存储相同内容的Vector与ArrayList，分别到一个文本文件中去。* Vector需要243字节* ArrayList需要135字节 分析：</p><p>ArrayList是非同步实现的一个单线程下较为高效的数据结构（相比Vector来说）。 ArrayList只通过一个修改记录字段提供弱一致性，主要用在迭代器里。没有同步方法。 即上面提到的Fast-fail机制.ArrayList的存储结构定义为transient，重写writeObject来实现自定义的序列化，优化了存储。</p><p>Vector是多线程环境下更为可靠的数据结构，所有方法都实现了同步。</p><h3 id="区别" tabindex="-1"><a class="header-anchor" href="#区别"><span>区别</span></a></h3><blockquote><p>同步处理：Vector同步，ArrayList非同步 Vector缺省情况下增长原来一倍的数组长度，ArrayList是0.5倍. ArrayList: int newCapacity = oldCapacity + (oldCapacity &gt;&gt; 1); ArrayList自动扩大容量为原来的1.5倍（实现的时候，方法会传入一个期望的最小容量，若扩容后容量仍然小于最小容量，那么容量就为传入的最小容量。扩容的时候使用的Arrays.copyOf方法最终调用native方法进行新数组创建和数据拷贝）</p><p>Vector: int newCapacity = oldCapacity + ((capacityIncrement &gt; 0) ? capacityIncrement : oldCapacity);</p><p>Vector指定了<code>initialCapacity，capacityIncrement</code>来初始化的时候，每次增长<code>capacityIncrement</code></p></blockquote>`,14),o=[i];function c(s,l){return e(),a("div",null,o)}const p=t(r,[["render",c],["__file","why-transient-in-arraylist.html.vue"]]),h=JSON.parse('{"path":"/docs/java/java-basic/why-transient-in-arraylist.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"ArrayList","slug":"arraylist","link":"#arraylist","children":[]},{"level":3,"title":"Vector","slug":"vector","link":"#vector","children":[]},{"level":3,"title":"区别","slug":"区别","link":"#区别","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/why-transient-in-arraylist.md"}');export{p as comp,h as data};
