import{_ as e,o as n,c as i,e as t}from"./app-BihAYnmf.js";const a={},s=t(`<p>想要实现字符流和字节流之间的相互转换需要用到两个类：</p><p>OutputStreamWriter 是字符流通向字节流的桥梁</p><p>InputStreamReader 是字节流通向字符流的桥梁</p><h3 id="字符流转成字节流" tabindex="-1"><a class="header-anchor" href="#字符流转成字节流"><span>字符流转成字节流</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>
public static void main(String[] args) throws IOException {
    File f = new File(&quot;test.txt&quot;);
    
    // OutputStreamWriter 是字符流通向字节流的桥梁,创建了一个字符流通向字节流的对象
    OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(f),&quot;UTF-8&quot;);
    
    osw.write(&quot;我是字符流转换成字节流输出的&quot;);
    osw.close();

}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字节流转成字符流" tabindex="-1"><a class="header-anchor" href="#字节流转成字符流"><span>字节流转成字符流</span></a></h3><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>  public static void main(String[] args) throws IOException {
        
        File f = new File(&quot;test.txt&quot;);
        
        InputStreamReader inr = new InputStreamReader(new FileInputStream(f),&quot;UTF-8&quot;);
        
        char[] buf = new char[1024];
        
        int len = inr.read(buf);
        System.out.println(new String(buf,0,len));
        
        inr.close();

    }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),r=[s];function l(d,c){return n(),i("div",null,r)}const u=e(a,[["render",l],["__file","convert-bytestream-characterstream.html.vue"]]),m=JSON.parse('{"path":"/docs/java/java-basic/convert-bytestream-characterstream.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"字符流转成字节流","slug":"字符流转成字节流","link":"#字符流转成字节流","children":[]},{"level":3,"title":"字节流转成字符流","slug":"字节流转成字符流","link":"#字节流转成字符流","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/convert-bytestream-characterstream.md"}');export{u as comp,m as data};
