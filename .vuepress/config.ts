import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from "@vuepress/bundler-vite";
import { webpackBundler } from "@vuepress/bundler-webpack";

export default defineUserConfig({
  base: "/coding-note/",
  title: "coding",
  description: "Just playing around",
  bundler: viteBundler(),
  // bundler: webpackBundler(),
  theme: recoTheme({
    // 自动设置分类
    autoSetBlogCategories: true,
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "小董",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      // "/docs/theme-reco/": [
      //   {
      //     text: "module one",
      //     children: ["home", "theme"],
      //   },
      //   {
      //     text: "module two",
      //     children: ["api", "plugin"],
      //   },
      // ],
      "/docs/kafka/": [
        {
          text: "Kafka教程",
          children: ["Kafka教程"],
        },
      ],
      "/docs/mysql/": ["MySQL学习路线", "安装", "事务", "事务的实现", "MySQL和Redis的数据一致性"],

      "/docs/java/": [
        {
          text: "jvm",
          children: [
            "jvm/JVM",
            "jvm/Java程序编译",
            "jvm/Java代码运行流程",
            "jvm/内存数据区",
            "jvm/栈虚拟机和寄存器",
            "jvm/栈帧结构",
            "jvm/对象",
            "jvm/垃圾回收机制",
            "jvm/图解垃圾回收机制",
            "jvm/垃圾收集器",
            "jvm/经典垃圾回收器",
            "jvm/即时编译JIT器",
            "jvm/ASM教程",
            "jvm/字节码",
            "jvm/字节码指令",
            "jvm/字节码指令执行流程",
            "jvm/类文件结构",
            "jvm/类加载机制",
            "jvm/CPU100排查",
            "jvm/内存溢出",
            "jvm/CMS-GC问题分析",
            "jvm/问题诊断和排查工具",
            "jvm/HotspotDebugger",
            "jvm/编译JDK",
            "jvm/总结",
          ],
          collapsible: true, // 默认展开，true 为折叠
        },
        {
          text: "java-basic",
          children: [
            "java-basic/annotation-in-java.md",
            "java-basic/annotation-in-spring.md",
            "java-basic/annotion-and-reflect.md",
            "java-basic/aop-vs-proxy.md",
            "java-basic/apache-collections.md",
            "java-basic/api-vs-spi.md",
            "java-basic/arraylist-vs-linkedlist-vs-vector.md",
            "java-basic/Arrays-asList.md",
            "java-basic/ASCII.md",
            "java-basic/basic-data-types.md",
            "java-basic/big-endian-vs-little-endian.md",
            "java-basic/bio-vs-nio-vs-aio.md",
            "java-basic/block-vs-non-blocking.md",
            "java-basic/boxing-unboxing.md",
            "java-basic/bug-in-apache-commons-collections.md",
            "java-basic/bug-in-fastjson.md",
            "java-basic/byte-stream-vs-character-stream.md",
            "java-basic/CET-UTC-GMT-CST.md",
            "java-basic/class-contant-pool.md",
            "java-basic/Class.md",
            "java-basic/Collection-vs-Collections.md",
            "java-basic/ConcurrentSkipListMap.md",
            "java-basic/const-in-java.md",
            "java-basic/convert-bytestream-characterstream.md",
            "java-basic/CopyOnWriteArrayList.md",
            "java-basic/create-annotation.md",
            "java-basic/create-spi.md",
            "java-basic/custom-annotation.md",
            "java-basic/define-exception.md",
            "java-basic/delete-while-iterator.md",
            "java-basic/diff-serializable-vs-externalizable.md",
            "java-basic/dynamic-proxy-implementation.md",
            "java-basic/dynamic-proxy-vs-reflection.md",
            "java-basic/dynamic-proxy.md",
            "java-basic/enum-class.md",
            "java-basic/enum-compare.md",
            "java-basic/enum-impl.md",
            "java-basic/enum-serializable.md",
            "java-basic/enum-singleton.md",
            "java-basic/enum-switch.md",
            "java-basic/enum-thread-safe.md",
            "java-basic/enum-usage.md",
            "java-basic/Enumeration-vs-Iterator.md",
            "java-basic/error-vs-exception.md",
            "java-basic/exception-chain.md",
            "java-basic/exception-type.md",
            "java-basic/extends-vs-super.md",
            "java-basic/fail-fast-vs-fail-safe.md",
            "java-basic/final-in-java.md",
            "java-basic/final-string.md",
            "java-basic/float-amount.md",
            "java-basic/float.md",
            "java-basic/gbk-gb2312-gb18030.md",
            "java-basic/genericity-list-wildcard.md",
            "java-basic/genericity-list.md",
            "java-basic/generics-problem.md",
            "java-basic/generics.md",
            "java-basic/get-los_angeles-time.md",
            "java-basic/GMT.md",
            "java-basic/h2-db.md",
            "java-basic/handle-exception.md",
            "java-basic/hash-in-hashmap.md",
            "java-basic/hashmap-capacity.md",
            "java-basic/hashmap-default-capacity.md",
            "java-basic/hashmap-default-loadfactor.md",
            "java-basic/HashMap-HashTable-ConcurrentHashMap.md",
            "java-basic/hashmap-init-capacity.md",
            "java-basic/input-stream-vs-output-stream.md",
            "java-basic/instanceof-in-java.md",
            "java-basic/integer-cache.md",
            "java-basic/integer-scope.md",
            "java-basic/intern.md",
            "java-basic/ioc-implement-with-factory-and-reflection.md",
            "java-basic/iteration-of-collection.md",
            "java-basic/jms.md",
            "java-basic/junit.md",
            "java-basic/k-t-v-e.md",
            "java-basic/keyword-about-exception.md",
            "java-basic/lambda.md",
            "java-basic/length-of-string.md",
            "java-basic/linux-io.md",
            "java-basic/meta-annotation.md",
            "java-basic/mock.md",
            "java-basic/netty.md",
            "java-basic/order-about-finllly-return.md",
            "java-basic/protobuf.md",
            "java-basic/README.md",
            "java-basic/reflection.md",
            "java-basic/replace-in-string.md",
            "java-basic/Runtime-Constant-Pool.md",
            "java-basic/serialize-in-java.md",
            "java-basic/serialize-principle.md",
            "java-basic/serialize-singleton.md",
            "java-basic/serialize.md",
            "java-basic/serialVersionUID-modify.md",
            "java-basic/serialVersionUID.md",
            "java-basic/set-repetition.md",
            "java-basic/set-vs-list.md",
            "java-basic/simpledateformat-thread-safe.md",
            "java-basic/single-double-float.md",
            "java-basic/spi-principle.md",
            "java-basic/stack-alloc.md",
            "java-basic/StandardTime-vs-daylightSavingTime.md",
            "java-basic/static-in-java.md",
            "java-basic/static-proxy.md",
            "java-basic/stop-create-bigdecimal-with-double.md",
            "java-basic/stop-use-enum-in-api.md",
            "java-basic/stop-using-equlas-in-bigdecimal.md",
            "java-basic/stream.md",
            "java-basic/string-append.md",
            "java-basic/string-concat.md",
            "java-basic/string-pool.md",
            "java-basic/stringjoiner-in-java8.md",
            "java-basic/substring.md",
            "java-basic/success-isSuccess-and-boolean-Boolean.md",
            "java-basic/switch-string.md",
            "java-basic/synchronized-vs-asynchronization.md",
            "java-basic/synchronizedlist-vector.md",
            "java-basic/syntactic-sugar.md",
            "java-basic/time-in-java8.md",
            "java-basic/time-zone.md",
            "java-basic/timestamp.md",
            "java-basic/transient-in-java.md",
            "java-basic/try-with-resources.md",
            "java-basic/type-erasure.md",
            "java-basic/UNICODE.md",
            "java-basic/url-encode.md",
            "java-basic/usage-of-reflection.md",
            "java-basic/ut-with-jmockit.md",
            "java-basic/UTF8-UTF16-UTF32.md",
            "java-basic/value-of-vs-to-string.md",
            "java-basic/why-gbk.md",
            "java-basic/why-transient-in-arraylist.md",
            "java-basic/why-utf8.md",
            "java-basic/Wildcard-Character.md",
            "java-basic/YYYY-vs-yyyy.md",
          ],
          collapsible: true, // 默认展开，true 为折叠
        },

        {
          text: "object-oriented",
          children: [
            "object-oriented/multiple-inheritance.md",
            "/java/object-oriented/characteristics.md",
            "/docs/java/object-oriented/constructor.md",
            "object-oriented/extends-implement.md",
            "object-oriented/inheritance-composition.md",
            "object-oriented/java-pass-by.md",
            "object-oriented/jvm-language.md",
            "object-oriented/object-oriented-vs-procedure-oriented.md",
            "object-oriented/overloading-vs-overriding.md",
            "object-oriented/platform-independent.md",
            "object-oriented/polymorphism.md",
            "object-oriented/principle.md",
            "object-oriented/scope.md",
            "object-oriented/variable.md",
            "object-oriented/why-pass-by-reference.md",
          ],
          collapsible: true, // 默认展开，true 为折叠
        },

        {
          text: "concurrent-coding",
          children: [
            "concurrent-coding/concurrent-vs-parallel.md",
            "concurrent-coding/concurrent.md",
            "concurrent-coding/create-thread-with-callback-future-task.md",
            "concurrent-coding/create-thread-with-extends.md",
            "concurrent-coding/create-thread-with-Implement.md",
            "concurrent-coding/create-thread-with-thead-pool.md",
            "concurrent-coding/deadlock-java-level.md",
            "concurrent-coding/deamon-thread.md",
            "concurrent-coding/debug-in-multithread.md",
            "concurrent-coding/implement-of-thread.md",
            "concurrent-coding/parallel.md",
            "concurrent-coding/priority-of-thread.md",
            "concurrent-coding/progress-vs-thread.md",
            "concurrent-coding/state-of-thread.md",
            "concurrent-coding/synchronized.md",
            "concurrent-coding/thread-safe.md",
            "concurrent-coding/thread-scheduling.md",
            "concurrent-coding/thread.md",
            "concurrent-coding/volatile.md",
            "concurrent-coding/why-not-executors.md",
          ],
          collapsible: true, // 默认展开，true 为折叠
        },
      ],

      "/docs/interview/": [
        {
          text: "面渣逆袭",
          children: [
            "面渣逆袭/JVM",
            "面渣逆袭/JavaSE",
            "面渣逆袭/集合",
            "面渣逆袭/并发编程",
            "面渣逆袭/Spring",
            "面渣逆袭/MyBatis",
            "面渣逆袭/MySQL",
            "面渣逆袭/Redis",
            "面渣逆袭/RocketMQ",
            "面渣逆袭/操作系统",
            "面渣逆袭/分布式",
            "面渣逆袭/计算机网络",
            "面渣逆袭/微服务",
          ],
          collapsible: true, // 默认展开，true 为折叠
        },
      ],
    },
    navbar: [
      { text: "面试", link: "/docs/interview/面渣逆袭/" },
      // { text: "Categories", link: "/categories/reco/1/" },
      // { text: "Tags", link: "/tags/tag1/1/" },
      { text: "java", link: "/docs/java/jvm/垃圾回收机制" },
      { text: "kafka", link: "/docs/kafka/Kafka教程" },
      { text: "mysql", link: "/docs/mysql/安装" },
      { text: "github", link: "https://github.com/Aiden-Coding/coding-note.git" },
      // {
      //   text: "Docs",
      //   children: [
      //     { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
      //     { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
      //     { text: "kafka", link: "/docs/kafka/Kafka教程" },
      //   ],
      // },
    ],
    // bulletin: {
    //   body: [
    //     {
    //       type: "text",
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "QQ 群",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li>QQ群1：1037296104</li>
    //         <li>QQ群2：1061561395</li>
    //         <li>QQ群3：962687802</li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "GitHub",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "buttongroup",
    //       children: [
    //         {
    //           text: "打赏",
    //           link: "/docs/others/donate.html",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // commentConfig: {
    //   type: 'valine',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
