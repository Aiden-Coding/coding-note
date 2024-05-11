import{_ as r,r as a,o as d,c,a as e,b as s,d as t,w as o,e as l}from"./app-BihAYnmf.js";const p="/coding-note/assets/image-D1RqGf3c.png",m="/coding-note/assets/image-1-DoUP3xpn.png",u="/coding-note/assets/image-2-BIhlHNxz.png",h="/coding-note/assets/image-7-CFwkhiP_.png",g="/coding-note/assets/image-8-Gl6vnjO-.png",_="/coding-note/assets/image-9-DJbOQ6Dq.png",v="/coding-note/assets/image-10-CssBu2_2.png",y="/coding-note/assets/image-11-Z2FO4TMg.png",b="/coding-note/assets/image-12-DiDsc3Ih.png",x="/coding-note/assets/image-18-Bg6RHpMh.png",S="/coding-note/assets/image-19-BmGeHGQG.png",L="/coding-note/assets/image-20-67E3zxVw.png",M="/coding-note/assets/image-21-CsItyz7A.png",Q="/coding-note/assets/image-22-BbG1dTBO.png",w="/coding-note/assets/image-23-StDoD90x.png",q="/coding-note/assets/image-24-DQHX8OyP.png",f="/coding-note/assets/image-25-DZ4vf27b.png",k="/coding-note/assets/image-26-Bb6CMMWd.png",A="/coding-note/assets/image-27-3yGujenZ.png",C={},O=l('<h2 id="mysql-是什么" tabindex="-1"><a class="header-anchor" href="#mysql-是什么"><span>MySQL 是什么</span></a></h2><p>MySQL 是一个关系型数据库，也是我们国内使用频率最高的一种数据库（没有之一），不管是校招还是社招，都是必考内容，并且考察项目会非常多，属于二哥一直强调的 Java 后端四大件之一。</p><p>MySQL 的学习路线戳：<a href="./MySQL%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF">MySQL 的学习四阶段</a></p><p>对于学生党来说，我推荐大家至少在大一下半学期完成 MySQL 的学习，因为在后面做项目的时候，必然会用到 MySQL 进行 CRUD。不然就不是一名称职的 CRUD 工程师（😂）。</p><p>好，要想学好 MySQL，就必然需要在本地先安装 MySQL，主要分为 Windows 平台和 macOS 平台，服务器（生产环境）上的一般就是 Linux。</p><p>我们接下来都会给大家讲到，稍安勿躁。</p><h2 id="mysql-的安装" tabindex="-1"><a class="header-anchor" href="#mysql-的安装"><span>MySQL 的安装</span></a></h2><p>从 MySQL 的应用领域来说，MySQL 一共可以分为四个版本：</p><ul><li>MySQL Community Server（社区版），我们一般都用这个版本（免费，可白嫖 😁）。</li><li>MySQL Enterprise Edition（企业版），需要付费，一般大型企业才会用。</li><li>MySQL Cluster（集群版），用于架设 MySQL 集群，一般也是大型企业才会用到，小公司一个单体的 MySQL 就够用了。</li><li>MySQL Cluster CGE (Carrier Grade Edition)，MySQL Cluster 的高级版本，提供了额外的稳定性和性能。不在我们的讨论范围内。</li></ul>',9),D={href:"https://paicoding.com",target:"_blank",rel:"noopener noreferrer"},W=e("p",null,"MySQL 8.0 引入了很多重大更新，包括：",-1),B=e("li",null,"默认 utf8mb4 字符集，支持 emoji 表情符号。",-1),E=e("li",null,"InnoDB 增强，比如说自增列支持自动填充（auto_increment），消除以往重启实例自增列不连续的问题。",-1),R=e("li",null,"性能增强，8.0 相比 5.7 在高并发时性能提升近 1 倍。",-1),I={href:"https://www.cnblogs.com/YangJiaXin/p/13800134.html",target:"_blank",rel:"noopener noreferrer"},U=e("p",null,"接下来的安装，我们都以 MySQL 8.0 为例。",-1),z=e("h3",{id:"windows-平台",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#windows-平台"},[e("span",null,"Windows 平台")])],-1),G=e("p",null,"直接进入 MySQL 官网进行下载。",-1),N={href:"https://dev.mysql.com/downloads/mysql/",target:"_blank",rel:"noopener noreferrer"},T=l('<p>或者直接在搜素引擎上搜“MySQL 下载”关键字，直接跳转到官网。</p><p><img src="'+p+'" alt="Alt text"></p><p>网站会根据你的操作系统自动帮你匹配对应的版本，如下图所示。新手直接下载 MSI 安装包即可。</p><p><img src="'+m+'" alt="Alt text"></p><blockquote><p>Microsoft Installer，一种用于安装、维护和删除 Windows 操作系统上的软件的文件格式。</p></blockquote><p>当出现以下界面时，直接选择「no thanks，just start my download」即可。</p><p><img src="'+u+'" alt="Alt text"></p><p>下载完成后，直接双击安装（我这里只说关键步骤）。</p><p>当出现下面这一步时，选择默认的开发者模式就好（会安装 MySQL 服务器「必须」、MySQL Shell「命令行操作」、MySQL 连接器「支持编程语言和 MySQL 之间的通信」等）。</p><p><img src="'+h+'" alt="Alt text"></p><p>其他的选项我就不解释了，能看懂的话就自己选择，看不懂的话默认就好（😂）。</p><p>在「高可用」界面上选择「Standalone MySql Server / Classic MySQL Replication」，意思就是我们打算让 MySQL 作为单机服务器来运行。</p><p><img src="'+g+'" alt="Alt text"></p><p>在「Type and Networking」界面上，选择「Development Computer」，开发计算机，占用最小资源。</p><p><img src="'+_+'" alt="Alt text"></p><p>「Connectivity」中如果 3306 端口被占用的情况下可以修改，但不建议，保持默认就好。</p><p><img src="'+v+'" alt="Alt text"></p><p>MySQL 8.0 版本可以使用强密码，本地开发随便选就好。</p><p><img src="'+y+'" alt="Alt text"></p><p>安装过程中会提示你输入 root 用户的密码，这个密码一定要记住，后面会用到。</p><p><img src="'+b+'" alt="Alt text"></p><p>在「Windows Service」界面上，可以勾选复选框让 MySQL 作为 Windows 服务运行，然后指定服务名（当开机时启动 MySQL），并作为标准系统账号。</p><p><img src="'+x+'" alt="Alt text"></p>',23),j={href:"https://www.sjkjc.com/mysql/install-on-windows/",target:"_blank",rel:"noopener noreferrer"},H=e("h3",{id:"macos-平台",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#macos-平台"},[e("span",null,"macOS 平台")])],-1),P={href:"https://dev.mysql.com/downloads/mysql/",target:"_blank",rel:"noopener noreferrer"},F=e("p",null,"根据自己的 macOS 是 Intel 还是 M1 芯片，选择对应的版本。",-1),V=e("p",null,[e("img",{src:S,alt:"Alt text"})],-1),J={href:"https://zh.wikipedia.org/zh-sg/X86",target:"_blank",rel:"noopener noreferrer"},X={href:"https://zh.wikipedia.org/zh-cn/ARM",target:"_blank",rel:"noopener noreferrer"},Y=e("p",null,[s("你也可以直接运行 "),e("code",null,"uname -m"),s(" 命令来查看自己的 macOS 是基于哪种架构。")],-1),Z=e("p",null,[e("img",{src:L,alt:"Alt text"})],-1),K=e("p",null,"安装方式几乎和 Windows 完全一样，我这里就不再赘述了。",-1),$=e("p",null,"安装完成后，会在系统偏好设置里出现一个 MySQL 的服务图标，如下图所示。",-1),ee=e("p",null,[e("img",{src:M,alt:"Alt text"})],-1),se=l('<p><img src="'+Q+'" alt="Alt text"></p><h3 id="linux-平台" tabindex="-1"><a class="header-anchor" href="#linux-平台"><span>Linux 平台</span></a></h3><p>Linux 平台通常又分为 CentOS 和 Ubuntu 两种：</p><ul><li>CentOS（Community ENTerprise Operating System）是 Red Hat Enterprise Linux（RHEL）的一个免费克隆版本；使用 YUM（Yellowdog Updater Modified）作为其包管理工具。</li><li>Ubuntu 是基于 Debian 的 Linux 发行版；使用 APT（Advanced Packaging Tool）作为包管理工具。</li></ul><p>可以通过 <code>cat /etc/os-release</code> 命令来查看自己的 Linux 版本。二哥目前有两台服务器，一台腾讯云的，一台阿里云的，TencentOS 是完全兼容 CentOS 的；阿里云的是 Ubuntu。</p><p><img src="'+w+`" alt="Alt text"></p><h4 id="centos" tabindex="-1"><a class="header-anchor" href="#centos"><span>CentOS</span></a></h4><p>CentOS 可以使用 yum 命令来安装 MySQL。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># 安装命令
yum install mysql mysql-server mysql-libs

# 初始密码查找

grep &quot;temporary password&quot; /var/log/mysqld.log

## 输出如下
# A temporary password is generated for root@localhost: xxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="ubuntu" tabindex="-1"><a class="header-anchor" href="#ubuntu"><span>Ubuntu</span></a></h4><p>Ubuntu 可以使用 apt-get 命令来安装 MySQL。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># 安装命令
sudo apt-get install mysql-server mysql-client -y

# 注意安装过程中的初始化密码设置（若没有，则可以通过下面的方法找到初始化密码）

grep &quot;temporary password&quot; /var/log/mysqld.log

## 输出如下
# A temporary password is generated for root@localhost: xxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后，可以通过 <code>set password</code> 或者 <code>update user</code> 命令来修改 MySQL 的登录密码。</p><p>比如说，我想把 root 用户的密码修改为 123，可以通过以下命令来修改。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>set password for root@localhost = password(&#39;123&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>use mysql;

update user set password=password(&#39;123&#39;) where user=&#39;root&#39; and host=&#39;localhost&#39;;

flush privileges;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql-的启动和停止" tabindex="-1"><a class="header-anchor" href="#mysql-的启动和停止"><span>MySQL 的启动和停止</span></a></h2><p>Windows 和 macOS 平台的 MySQL 安装完成后，启动或者停止服务可以直接到系统服务/偏好设置里面进行操作。</p><p>比如说：</p><p><img src="`+q+`" alt="Alt text"></p><p>Linux 的话就主要通过命令来完成，比如说。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># 启动
sudo service mysql start
# 或 sudo service mysqld start

# 关闭
sudo service mysql stop

# 重启
sudo service mysql restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>sudo（superuser do的缩写）是 Linux 下的一个命令，用于以 root 权限执行命令。</p></blockquote><h2 id="mysql-的连接" tabindex="-1"><a class="header-anchor" href="#mysql-的连接"><span>MySQL 的连接</span></a></h2><p>MySQL 的连接方式主要有两种：</p>`,26),te=e("li",null,"命令行连接，MySQL 自带的",-1),ne={href:"https://paicoding.com/article/detail/411",target:"_blank",rel:"noopener noreferrer"},le={href:"https://paicoding.com/article/detail/410",target:"_blank",rel:"noopener noreferrer"},ie=l('<h3 id="命令行连接" tabindex="-1"><a class="header-anchor" href="#命令行连接"><span>命令行连接</span></a></h3><p>如果 MySQL 已经安装到系统环境变量中，那么可以直接在命令行中输入 <code>mysql -u root -p</code> 来连接 MySQL。</p><p><img src="'+f+`" alt="Alt text"></p><p>如果没有安装到系统环境变量中，Windows 平台可以在 MySQL 的安装目录下的 bin 目录中找到 mysql.exe 文件，macOS 平台可以在 <code>/usr/local/mysql/bin</code> 目录下找到 mysql 文件。</p><p>这里以 Windows 为例，打开 cmd 命令行窗口，导航到 bin 目录。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>cd C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后输入 <code>mysql -u root -p</code> 命令来连接 MySQL。随后输入密码就可以访问 MySQL 服务了。</p><h3 id="图形化连接" tabindex="-1"><a class="header-anchor" href="#图形化连接"><span>图形化连接</span></a></h3>`,8),ae={href:"https://paicoding.com/article/detail/411",target:"_blank",rel:"noopener noreferrer"},oe=e("p",null,[e("img",{src:k,alt:"Alt text"})],-1),re=e("p",null,"然后就可以查看对应的数据库和表了。",-1),de=e("p",null,[e("img",{src:A,alt:"Alt text"})],-1),ce=e("h2",{id:"小结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#小结"},[e("span",null,"小结")])],-1),pe=e("p",null,"这篇内容详细地介绍了 Windows、macOS 和 Linux 平台下 MySQL 的安装和连接，算是为后面的《二哥的 MySQL 进阶之路》做好了铺垫，冲。",-1),me=e("hr",null,null,-1);function ue(he,ge){const n=a("ExternalLinkIcon"),i=a("RouteLink");return d(),c("div",null,[O,e("p",null,[s("从 MySQL 的发展历史来说，目前主流的版本是 MySQL 8.0，"),e("a",D,[s("技术派"),t(n)]),s("项目用的就是 MySQL 8.0，不支持 MySQL 5.7（以前的主流版本，于 2023 年 10 月 31 日 终结生命周期）。")]),W,e("ul",null,[B,E,R,e("li",null,[s("更多新特性参照"),e("a",I,[s("这篇"),t(n)]),s("。")])]),U,z,G,e("p",null,[e("a",N,[s("https://dev.mysql.com/downloads/mysql/"),t(n)])]),T,e("p",null,[s("就这样一直到 finish 就行，其他的配置不明白的话，可以参考这篇："),e("a",j,[s("在 Windows 上安装 MySQL"),t(n)])]),H,e("p",null,[s("可以使用 "),t(i,{to:"/docs/gongju/brew.html"},{default:o(()=>[s("Homebrew")]),_:1}),s(" 来安装 MySQL，但这里为了和 Windows 安装匹配，我们这里依然使用官网下载安装包的方式。")]),e("p",null,[e("a",P,[s("https://dev.mysql.com/downloads/mysql/"),t(n)])]),F,V,e("p",null,[s("我 目前的机器是 Intel 版本，所以选择 "),e("a",J,[s("x86 架构"),t(n)]),s("的 64 位版本，苹果最新的芯片采用的是 "),e("a",X,[s("ARM 架构"),t(n)]),s("，高级精简指令集，不懂的小伙伴可以去查一下维基百科")]),Y,Z,K,$,ee,e("p",null,[s("如果使用 Homebrew 安装的话，可以问一下 "),t(i,{to:"/docs/gongju/warp.html"},{default:o(()=>[s("wrap")]),_:1}),s(" AI。")]),se,e("ul",null,[te,e("li",null,[s("图形化连接，比如说 Workbench、Navicat（"),e("a",ne,[s("Windows 版"),t(n)]),s("、"),e("a",le,[s("macOS 版"),t(n)]),s("）、DataGrip 等")])]),ie,e("p",null,[s("我个人使用的是 "),e("a",ae,[s("Navicat"),t(n)]),s("，大家可以通过链接找到安装包，安装完成后新建连接。")]),oe,re,de,ce,pe,me])}const ve=r(C,[["render",ue],["__file","anzhuang.html.vue"]]),ye=JSON.parse('{"path":"/docs/mysql/anzhuang.html","title":"MySQL安装","lang":"en-US","frontmatter":{"title":"MySQL安装"},"headers":[{"level":2,"title":"MySQL 是什么","slug":"mysql-是什么","link":"#mysql-是什么","children":[]},{"level":2,"title":"MySQL 的安装","slug":"mysql-的安装","link":"#mysql-的安装","children":[{"level":3,"title":"Windows 平台","slug":"windows-平台","link":"#windows-平台","children":[]},{"level":3,"title":"macOS 平台","slug":"macos-平台","link":"#macos-平台","children":[]},{"level":3,"title":"Linux 平台","slug":"linux-平台","link":"#linux-平台","children":[]}]},{"level":2,"title":"MySQL 的启动和停止","slug":"mysql-的启动和停止","link":"#mysql-的启动和停止","children":[]},{"level":2,"title":"MySQL 的连接","slug":"mysql-的连接","link":"#mysql-的连接","children":[{"level":3,"title":"命令行连接","slug":"命令行连接","link":"#命令行连接","children":[]},{"level":3,"title":"图形化连接","slug":"图形化连接","link":"#图形化连接","children":[]}]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1715268415000,"updatedTime":1715272900000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":2}]},"filePathRelative":"docs/mysql/安装.md"}');export{ve as comp,ye as data};