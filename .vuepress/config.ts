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
        },
      ],
    },
    navbar: [
      { text: "Home", link: "/" },
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
