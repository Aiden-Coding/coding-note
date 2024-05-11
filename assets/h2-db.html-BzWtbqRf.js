import{_ as n,o as s,c as a,e as t}from"./app-BihAYnmf.js";const e={},i=t(`<p>H2是一个开源的嵌入式（非嵌入式设备）数据库引擎，它是一个用Java开发的类库，可直接嵌入到应用程序中，与应用程序一起打包发布，不受平台限制。</p><p>H2与Derby、HSQLDB、MySQL、PostgreSQL等开源数据库相比，H2的优势为：</p><ul><li>Java开发，不受平台限制；</li><li>H2只有一个jar包，占用空间小，适合嵌入式数据库；</li><li>有web控制台，用于管管理数据库。</li></ul><p>接下来介绍Spring+Mybatis+H2的数据库访问实践，参考：https://blog.csdn.net/xktxoo/article/details/78014739</p><p>添加H2数据库依赖：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;com.h2database&lt;/groupId&gt;
    &lt;artifactId&gt;h2&lt;/artifactId&gt;
    &lt;version&gt;1.4.190&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>H2数据库属性文件配置如下，本文采用内存模式访问H2数据库：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>driver=org.h2.Driver
# 内存模式
url=jdbc:h2:mem:testdb;MODE=MYSQL;DB_CLOSE_DELAY=-1
# 持久化模式
#url= jdbc:h2:tcp://localhost/~/test1;MODE=MYSQL;DB_CLOSE_DELAY=-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>H2数据库访问的Spring配置文件为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;beans xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
       xmlns=&quot;http://www.springframework.org/schema/beans&quot;
       xmlns:tx=&quot;http://www.springframework.org/schema/tx&quot;
       xmlns:jdbc=&quot;http://www.springframework.org/schema/jdbc&quot;
       xsi:schemaLocation=&quot;
            http://www.springframework.org/schema/beans
                http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
            http://www.springframework.org/schema/tx
                http://www.springframework.org/schema/tx/spring-tx-4.0.xsd
            http://www.springframework.org/schema/jdbc
                http://www.springframework.org/schema/jdbc/spring-jdbc-3.0.xsd&quot;&gt;

    &lt;!-- 引入属性文件 --&gt;
    &lt;bean id=&quot;propertyConfigurer&quot; class=&quot;org.springframework.beans.factory.config.PropertyPlaceholderConfigurer&quot;&gt;
        &lt;property name=&quot;locations&quot;&gt;
            &lt;list&gt;
                &lt;value&gt;classpath:config.properties&lt;/value&gt;
            &lt;/list&gt;
        &lt;/property&gt;
    &lt;/bean&gt;

    &lt;!-- 自动扫描DAO --&gt;
    &lt;bean class=&quot;org.mybatis.spring.mapper.MapperScannerConfigurer&quot;&gt;
        &lt;property name=&quot;basePackage&quot; value=&quot;com.xiaofan.test&quot; /&gt;
    &lt;/bean&gt;

    &lt;!-- 配置Mybatis sqlSessionFactory --&gt;
    &lt;bean id=&quot;sqlSessionFactory&quot; class=&quot;org.mybatis.spring.SqlSessionFactoryBean&quot;&gt;
        &lt;property name=&quot;dataSource&quot; ref=&quot;dataSource&quot;/&gt;
        &lt;property name=&quot;configLocation&quot; value=&quot;classpath:mybatis_config.xml&quot;/&gt;
        &lt;property name=&quot;mapperLocations&quot; value=&quot;classpath:user_mapper.xml&quot;/&gt;
    &lt;/bean&gt;

    &lt;!-- 配置数据源 --&gt;
    &lt;bean id=&quot;dataSource&quot;
          class=&quot;org.springframework.jdbc.datasource.DriverManagerDataSource&quot;&gt;
        &lt;property name=&quot;driverClassName&quot; value=&quot;\${driver}&quot; /&gt;
        &lt;property name=&quot;url&quot; value=&quot;\${url}&quot; /&gt;
        &lt;!--&lt;property name=&quot;username&quot; value=&quot;sa&quot; /&gt;--&gt;
        &lt;!--&lt;property name=&quot;password&quot; value=&quot;123&quot; /&gt;--&gt;
    &lt;/bean&gt;

    &lt;!-- 初始化数据库 --&gt;
    &lt;jdbc:initialize-database data-source=&quot;dataSource&quot; ignore-failures=&quot;DROPS&quot;&gt;
        &lt;jdbc:script location=&quot;classpath:sql/ddl.sql&quot; /&gt;
        &lt;jdbc:script location=&quot;classpath:sql/dml.sql&quot; /&gt;
    &lt;/jdbc:initialize-database&gt;

    &lt;!-- 配置事务管理 --&gt;
    &lt;tx:annotation-driven transaction-manager=&quot;transactionManager&quot; proxy-target-class=&quot;true&quot;/&gt;
    &lt;bean id=&quot;transactionManager&quot;
          class=&quot;org.springframework.jdbc.datasource.DataSourceTransactionManager&quot;&gt;
        &lt;property name=&quot;dataSource&quot; ref=&quot;dataSource&quot;/&gt;
    &lt;/bean&gt;

&lt;/beans&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化数据库的DDL语句文件为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CREATE TABLE \`user\` (
  \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
  \`name\` varchar(100) NOT NULL,
  \`age\` int(11) NOT NULL,
  PRIMARY KEY (\`id\`)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化数据库的DML语句文件为：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>insert into \`user\` (\`id\`,\`name\`,\`age\`) values (1, &#39;Jerry&#39;, 27);
insert into \`user\` (\`id\`,\`name\`,\`age\`) values (2, &#39;Angel&#39;, 25);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>编写测试文件，如下：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Created by Jerry on 17/7/30.
 */</span>
<span class="token annotation punctuation">@ContextConfiguration</span><span class="token punctuation">(</span>locations <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;classpath:config.xml&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@RunWith</span><span class="token punctuation">(</span><span class="token class-name">SpringJUnit4ClassRunner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractJUnit4SpringContextTests</span><span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token class-name">UserDAO</span> userDAO<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@org.junit.Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testInsert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">int</span> result <span class="token operator">=</span> userDAO<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;LiLei&quot;</span><span class="token punctuation">,</span> <span class="token number">27</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>result <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@org.junit.Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> result <span class="token operator">=</span> userDAO<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token number">2L</span><span class="token punctuation">,</span> <span class="token string">&quot;Jerry update&quot;</span><span class="token punctuation">,</span> <span class="token number">28</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>result <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@org.junit.Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testSelect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">User</span> result <span class="token operator">=</span> userDAO<span class="token punctuation">.</span><span class="token function">findByName</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;Jerry&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@org.junit.Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testDelete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> result <span class="token operator">=</span> userDAO<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">&quot;Jerry&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertTrue</span><span class="token punctuation">(</span>result <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),l=[i];function o(c,p){return s(),a("div",null,l)}const r=n(e,[["render",o],["__file","h2-db.html.vue"]]),d=JSON.parse('{"path":"/docs/java/java-basic/h2-db.html","title":"","lang":"en-US","frontmatter":{},"headers":[],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/h2-db.md"}');export{r as comp,d as data};
