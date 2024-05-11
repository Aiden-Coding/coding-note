import{_ as i,r as o,o as r,c as a,a as n,b as e,d,w as s,e as c}from"./app-BihAYnmf.js";const l={},p=n("p",null,"Vector是java.util包中的一个类。 SynchronizedList是java.util.Collections中的一个静态内部类。",-1),m=c(`<p><strong>那么，到底SynchronizedList和Vector有没有区别，为什么java api要提供这两种线程安全的List的实现方式呢？</strong></p><p>首先，我们知道Vector和Arraylist都是List的子类，他们底层的实现都是一样的。所以这里比较如下两个<code>list1</code>和<code>list2</code>的区别：</p><pre><code>List&lt;String&gt; list = new ArrayList&lt;String&gt;();
List list2 =  Collections.synchronizedList(list);
Vector&lt;String&gt; list1 = new Vector&lt;String&gt;();
</code></pre><h2 id="一、比较几个重要的方法。" tabindex="-1"><a class="header-anchor" href="#一、比较几个重要的方法。"><span>一、比较几个重要的方法。</span></a></h2><h3 id="_1-1-add方法" tabindex="-1"><a class="header-anchor" href="#_1-1-add方法"><span>1.1 add方法</span></a></h3><p><strong>Vector的实现：</strong></p><pre><code>public void add(int index, E element) {
    insertElementAt(element, index);
}

public synchronized void insertElementAt(E obj, int index) {
    modCount++;
    if (index &gt; elementCount) {
        throw new ArrayIndexOutOfBoundsException(index
                                                 + &quot; &gt; &quot; + elementCount);
    }
    ensureCapacityHelper(elementCount + 1);
    System.arraycopy(elementData, index, elementData, index + 1, elementCount - index);
    elementData[index] = obj;
    elementCount++;
}

private void ensureCapacityHelper(int minCapacity) {
    // overflow-conscious code
    if (minCapacity - elementData.length &gt; 0)
        grow(minCapacity);
}
</code></pre><p><strong>synchronizedList的实现：</strong></p><pre><code>public void add(int index, E element) {
   synchronized (mutex) {
       list.add(index, element);
   }
}
</code></pre><p>这里，使用同步代码块的方式调用ArrayList的add()方法。ArrayList的add方法内容如下：</p><pre><code>public void add(int index, E element) {
    rangeCheckForAdd(index);
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    System.arraycopy(elementData, index, elementData, index + 1,
                     size - index);
    elementData[index] = element;
    size++;
}
private void rangeCheckForAdd(int index) {
    if (index &gt; size || index &lt; 0)
        throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
}
private void ensureCapacityInternal(int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        minCapacity = Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    ensureExplicitCapacity(minCapacity);
}
</code></pre><p>从上面两段代码中发现有两处不同： <strong>1.Vector使用同步方法实现，synchronizedList使用同步代码块实现。 2.两者的扩充数组容量方式不一样（两者的add方法在扩容方面的差别也就是ArrayList和Vector的差别。）</strong></p><h3 id="_1-2-remove方法" tabindex="-1"><a class="header-anchor" href="#_1-2-remove方法"><span>1.2 remove方法</span></a></h3><p><strong>synchronizedList的实现：</strong></p><pre><code>public E remove(int index) {
    synchronized (mutex) {return list.remove(index);}
}
</code></pre><p>ArrayList类的remove方法内容如下：</p><pre><code>public E remove(int index) {
    rangeCheck(index);

    modCount++;
    E oldValue = elementData(index);

    int numMoved = size - index - 1;
    if (numMoved &gt; 0)
        System.arraycopy(elementData, index+1, elementData, index,
                         numMoved);
    elementData[--size] = null; // clear to let GC do its work

    return oldValue;
}
</code></pre><p><strong>Vector的实现：</strong></p><pre><code>public synchronized E remove(int index) {
        modCount++;
        if (index &gt;= elementCount)
            throw new ArrayIndexOutOfBoundsException(index);
        E oldValue = elementData(index);

        int numMoved = elementCount - index - 1;
        if (numMoved &gt; 0)
            System.arraycopy(elementData, index+1, elementData, index,
                             numMoved);
        elementData[--elementCount] = null; // Let gc do its work

        return oldValue;
    }
</code></pre><p><strong>从remove方法中我们发现除了一个使用同步方法，一个使用同步代码块之外几乎无任何区别。</strong></p><blockquote><p>通过比较其他方法，我们发现，SynchronizedList里面实现的方法几乎都是使用同步代码块包上List的方法。如果该List是ArrayList,那么，SynchronizedList和Vector的一个比较明显区别就是一个使用了同步代码块，一个使用了同步方法。</p></blockquote><h2 id="三、区别分析" tabindex="-1"><a class="header-anchor" href="#三、区别分析"><span>三、区别分析</span></a></h2><p><strong>数据增长区别</strong></p><blockquote><p>从内部实现机制来讲ArrayList和Vector都是使用数组(Array)来控制集合中的对象。当你向这两种类型中增加元素的时候，如果元素的数目超出了内部数组目前的长度它们都需要扩展内部数组的长度，Vector缺省情况下自动增长原来一倍的数组长度，ArrayList是原来的50%,所以最后你获得的这个集合所占的空间总是比你实际需要的要大。所以如果你要在集合中保存大量的数据那么使用Vector有一些优势，因为你可以通过设置集合的初始化大小来避免不必要的资源开销。</p></blockquote><p><strong>同步代码块和同步方法的区别</strong></p><p>1.同步代码块在锁定的范围上可能比同步方法要小，一般来说锁的范围大小和性能是成反比的。</p><p>2.同步块可以更加精确的控制锁的作用域（锁的作用域就是从锁被获取到其被释放的时间），同步方法的锁的作用域就是整个方法。</p><p>3.同步代码块可以选择对哪个对象加锁，但是静态方法只能给this对象加锁。</p><blockquote><p>因为SynchronizedList只是使用同步代码块包裹了ArrayList的方法，而ArrayList和Vector中同名方法的方法体内容并无太大差异，所以在锁定范围和锁的作用域上两者并无区别。 在锁定的对象区别上，SynchronizedList的同步代码块锁定的是mutex对象，Vector锁定的是this对象。那么mutex对象又是什么呢？ 其实SynchronizedList有一个构造函数可以传入一个Object,如果在调用的时候显示的传入一个对象，那么锁定的就是用户传入的对象。如果没有指定，那么锁定的也是this对象。</p></blockquote><p>所以，SynchronizedList和Vector的区别目前为止有两点： 1.如果使用add方法，那么他们的扩容机制不一样。 2.SynchronizedList可以指定锁定的对象。</p><p>但是，凡事都有但是。 SynchronizedList中实现的类并没有都使用synchronized同步代码块。其中有listIterator和listIterator(int index)并没有做同步处理。但是Vector却对该方法加了方法锁。 所以说，在使用SynchronizedList进行遍历的时候要手动加锁。</p><p>但是，但是之后还有但是。</p><p>之前的比较都是基于我们将ArrayList转成SynchronizedList。那么如果我们想把LinkedList变成线程安全的，或者说我想要方便在中间插入和删除的同步的链表，那么我可以将已有的LinkedList直接转成 SynchronizedList，而不用改变他的底层数据结构。而这一点是Vector无法做到的，因为他的底层结构就是使用数组实现的，这个是无法更改的。</p><p>所以，最后，SynchronizedList和Vector最主要的区别： <strong>1.SynchronizedList有很好的扩展和兼容功能。他可以将所有的List的子类转成线程安全的类。</strong> <strong>2.使用SynchronizedList的时候，进行遍历时要手动进行同步处理</strong>。 <strong>3.SynchronizedList可以指定锁定的对象。</strong></p>`,34);function h(u,y){const t=o("t");return r(),a("div",null,[p,n("p",null,[e("在多线程的场景中可以直接使用Vector类，也可以使用Collections.synchronizedList(List"),d(t,null,{default:s(()=>[e(" list)方法来返回一个线程安全的List。")]),_:1})]),m])}const g=i(l,[["render",h],["__file","synchronizedlist-vector.html.vue"]]),L=JSON.parse('{"path":"/docs/java/java-basic/synchronizedlist-vector.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"一、比较几个重要的方法。","slug":"一、比较几个重要的方法。","link":"#一、比较几个重要的方法。","children":[{"level":3,"title":"1.1 add方法","slug":"_1-1-add方法","link":"#_1-1-add方法","children":[]},{"level":3,"title":"1.2 remove方法","slug":"_1-2-remove方法","link":"#_1-2-remove方法","children":[]}]},{"level":2,"title":"三、区别分析","slug":"三、区别分析","link":"#三、区别分析","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/synchronizedlist-vector.md"}');export{g as comp,L as data};
