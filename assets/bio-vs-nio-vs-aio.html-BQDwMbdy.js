import{_ as e,o as i,c as n,e as t}from"./app-BihAYnmf.js";const l={},s=t(`<h3 id="io" tabindex="-1"><a class="header-anchor" href="#io"><span>IO</span></a></h3><p>什么是IO? 它是指计算机与外部世界或者一个程序与计算机的其余部分之间的接口。它对于任何计算机系统都非常关键，因而所有 I/O 的主体实际上是内置在操作系统中的。单独的程序一般是让系统为它们完成大部分的工作。</p><p>在 Java 编程中，直到最近一直使用 流 的方式完成 I/O。所有 I/O 都被视为单个的字节的移动，通过一个称为 Stream 的对象一次移动一个字节。流 I/O 用于与外部世界接触。它也在内部使用，用于将对象转换为字节，然后再转换回对象。</p><h3 id="bio" tabindex="-1"><a class="header-anchor" href="#bio"><span>BIO</span></a></h3><p>Java BIO即Block I/O ， 同步并阻塞的IO。</p><p>BIO就是传统的java.io包下面的代码实现。</p><h3 id="nio" tabindex="-1"><a class="header-anchor" href="#nio"><span>NIO</span></a></h3><p>什么是NIO? NIO 与原来的 I/O 有同样的作用和目的, 他们之间最重要的区别是数据打包和传输的方式。原来的 I/O 以流的方式处理数据，而 NIO 以块的方式处理数据。</p><p>面向流 的 I/O 系统一次一个字节地处理数据。一个输入流产生一个字节的数据，一个输出流消费一个字节的数据。为流式数据创建过滤器非常容易。链接几个过滤器，以便每个过滤器只负责单个复杂处理机制的一部分，这样也是相对简单的。不利的一面是，面向流的 I/O 通常相当慢。</p><p>一个 面向块 的 I/O 系统以块的形式处理数据。每一个操作都在一步中产生或者消费一个数据块。按块处理数据比按(流式的)字节处理数据要快得多。但是面向块的 I/O 缺少一些面向流的 I/O 所具有的优雅性和简单性。</p><h3 id="aio" tabindex="-1"><a class="header-anchor" href="#aio"><span>AIO</span></a></h3><p>Java AIO即Async非阻塞，是异步非阻塞的IO。</p><h3 id="区别及联系" tabindex="-1"><a class="header-anchor" href="#区别及联系"><span>区别及联系</span></a></h3><p>BIO （Blocking I/O）：同步阻塞I/O模式，数据的读取写入必须阻塞在一个线程内等待其完成。这里假设一个烧开水的场景，有一排水壶在烧开水，BIO的工作模式就是， 叫一个线程停留在一个水壶那，直到这个水壶烧开，才去处理下一个水壶。但是实际上线程在等待水壶烧开的时间段什么都没有做。</p><p>NIO （New I/O）：同时支持阻塞与非阻塞模式，但这里我们以其同步非阻塞I/O模式来说明，那么什么叫做同步非阻塞？如果还拿烧开水来说，NIO的做法是叫一个线程不断地轮询每个水壶的状态，看看是否有水壶的状态发生了改变，从而进行下一步的操作。</p><p>AIO （ Asynchronous I/O）：异步非阻塞I/O模型。异步非阻塞与同步非阻塞的区别在哪里？异步非阻塞无需一个线程去轮询所有IO操作的状态改变，在相应的状态改变后，系统会通知对应的线程来处理。对应到烧开水中就是，为每个水壶上面装了一个开关，水烧开之后，水壶会自动通知我水烧开了。</p><h3 id="各自适用场景" tabindex="-1"><a class="header-anchor" href="#各自适用场景"><span>各自适用场景</span></a></h3><p>BIO方式适用于连接数目比较小且固定的架构，这种方式对服务器资源要求比较高，并发局限于应用中，JDK1.4以前的唯一选择，但程序直观简单易理解。</p><p>NIO方式适用于连接数目多且连接比较短（轻操作）的架构，比如聊天服务器，并发局限于应用中，编程比较复杂，JDK1.4开始支持。</p><p>AIO方式适用于连接数目多且连接比较长（重操作）的架构，比如相册服务器，充分调用OS参与并发操作，编程比较复杂，JDK7开始支持。</p><h3 id="使用方式" tabindex="-1"><a class="header-anchor" href="#使用方式"><span>使用方式</span></a></h3><h4 id="使用bio实现文件的读取和写入。" tabindex="-1"><a class="header-anchor" href="#使用bio实现文件的读取和写入。"><span>使用BIO实现文件的读取和写入。</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
       //Initializes The Object
        User1 user = new User1();
        user.setName(&quot;hollis&quot;);
        user.setAge(23);
        System.out.println(user);

        //Write Obj to File
        ObjectOutputStream oos = null;
        try {
            oos = new ObjectOutputStream(new FileOutputStream(&quot;tempFile&quot;));
            oos.writeObject(user);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            IOUtils.closeQuietly(oos);
        }

        //Read Obj from File
        File file = new File(&quot;tempFile&quot;);
        ObjectInputStream ois = null;
        try {
            ois = new ObjectInputStream(new FileInputStream(file));
            User1 newUser = (User1) ois.readObject();
            System.out.println(newUser);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            IOUtils.closeQuietly(ois);
            try {
                FileUtils.forceDelete(file);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用nio实现文件的读取和写入。" tabindex="-1"><a class="header-anchor" href="#使用nio实现文件的读取和写入。"><span>使用NIO实现文件的读取和写入。</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
static void readNIO() {
		String pathname = &quot;C:\\\\Users\\\\adew\\\\Desktop\\\\jd-gui.cfg&quot;;
		FileInputStream fin = null;
		try {
			fin = new FileInputStream(new File(pathname));
			FileChannel channel = fin.getChannel();

			int capacity = 100;// 字节
			ByteBuffer bf = ByteBuffer.allocate(capacity);
			System.out.println(&quot;限制是：&quot; + bf.limit() + &quot;容量是：&quot; + bf.capacity()
					+ &quot;位置是：&quot; + bf.position());
			int length = -1;

			while ((length = channel.read(bf)) != -1) {

				/*
				 * 注意，读取后，将位置置为0，将limit置为容量, 以备下次读入到字节缓冲中，从0开始存储
				 */
				bf.clear();
				byte[] bytes = bf.array();
				System.out.write(bytes, 0, length);
				System.out.println();

				System.out.println(&quot;限制是：&quot; + bf.limit() + &quot;容量是：&quot; + bf.capacity()
						+ &quot;位置是：&quot; + bf.position());

			}

			channel.close();

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fin != null) {
				try {
					fin.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	static void writeNIO() {
		String filename = &quot;out.txt&quot;;
		FileOutputStream fos = null;
		try {

			fos = new FileOutputStream(new File(filename));
			FileChannel channel = fos.getChannel();
			ByteBuffer src = Charset.forName(&quot;utf8&quot;).encode(&quot;你好你好你好你好你好&quot;);
			// 字节缓冲的容量和limit会随着数据长度变化，不是固定不变的
			System.out.println(&quot;初始化容量和limit：&quot; + src.capacity() + &quot;,&quot;
					+ src.limit());
			int length = 0;

			while ((length = channel.write(src)) != 0) {
				/*
				 * 注意，这里不需要clear，将缓冲中的数据写入到通道中后 第二次接着上一次的顺序往下读
				 */
				System.out.println(&quot;写入长度:&quot; + length);
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用aio实现文件的读取和写入" tabindex="-1"><a class="header-anchor" href="#使用aio实现文件的读取和写入"><span>使用AIO实现文件的读取和写入</span></a></h4><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class ReadFromFile {
  public static void main(String[] args) throws Exception {
    Path file = Paths.get(&quot;/usr/a.txt&quot;);
    AsynchronousFileChannel channel = AsynchronousFileChannel.open(file);

    ByteBuffer buffer = ByteBuffer.allocate(100_000);
    Future&lt;Integer&gt; result = channel.read(buffer, 0);

    while (!result.isDone()) {
      ProfitCalculator.calculateTax();
    }
    Integer bytesRead = result.get();
    System.out.println(&quot;Bytes read [&quot; + bytesRead + &quot;]&quot;);
  }
}
class ProfitCalculator {
  public ProfitCalculator() {
  }
  public static void calculateTax() {
  }
}

public class WriteToFile {

  public static void main(String[] args) throws Exception {
    AsynchronousFileChannel fileChannel = AsynchronousFileChannel.open(
        Paths.get(&quot;/asynchronous.txt&quot;), StandardOpenOption.READ,
        StandardOpenOption.WRITE, StandardOpenOption.CREATE);
    CompletionHandler&lt;Integer, Object&gt; handler = new CompletionHandler&lt;Integer, Object&gt;() {

      @Override
      public void completed(Integer result, Object attachment) {
        System.out.println(&quot;Attachment: &quot; + attachment + &quot; &quot; + result
            + &quot; bytes written&quot;);
        System.out.println(&quot;CompletionHandler Thread ID: &quot;
            + Thread.currentThread().getId());
      }

      @Override
      public void failed(Throwable e, Object attachment) {
        System.err.println(&quot;Attachment: &quot; + attachment + &quot; failed with:&quot;);
        e.printStackTrace();
      }
    };

    System.out.println(&quot;Main Thread ID: &quot; + Thread.currentThread().getId());
    fileChannel.write(ByteBuffer.wrap(&quot;Sample&quot;.getBytes()), 0, &quot;First Write&quot;,
        handler);
    fileChannel.write(ByteBuffer.wrap(&quot;Box&quot;.getBytes()), 0, &quot;Second Write&quot;,
        handler);

  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),a=[s];function d(r,v){return i(),n("div",null,a)}const u=e(l,[["render",d],["__file","bio-vs-nio-vs-aio.html.vue"]]),o=JSON.parse('{"path":"/docs/java/java-basic/bio-vs-nio-vs-aio.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"IO","slug":"io","link":"#io","children":[]},{"level":3,"title":"BIO","slug":"bio","link":"#bio","children":[]},{"level":3,"title":"NIO","slug":"nio","link":"#nio","children":[]},{"level":3,"title":"AIO","slug":"aio","link":"#aio","children":[]},{"level":3,"title":"区别及联系","slug":"区别及联系","link":"#区别及联系","children":[]},{"level":3,"title":"各自适用场景","slug":"各自适用场景","link":"#各自适用场景","children":[]},{"level":3,"title":"使用方式","slug":"使用方式","link":"#使用方式","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/bio-vs-nio-vs-aio.md"}');export{u as comp,o as data};
