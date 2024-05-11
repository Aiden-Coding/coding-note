import{_ as a,o as t,c as l,a as e}from"./app-BihAYnmf.js";const r={},n=e("p",null,"replace、replaceAll和replaceFirst是Java中常用的替换字符的方法,它们的方法定义是：",-1),c=e("p",null,"replace(CharSequence target, CharSequence replacement) ，用replacement替换所有的target，两个参数都是字符串。",-1),s=e("p",null,"replaceAll(String regex, String replacement) ，用replacement替换所有的regex匹配项，regex很明显是个正则表达式，replacement是字符串。",-1),i=e("p",null,"replaceFirst(String regex, String replacement) ，基本和replaceAll相同，区别是只替换第一个匹配项。",-1),p=e("p",null,"可以看到，其中replaceAll以及replaceFirst是和正则表达式有关的，而replace和正则表达式无关。",-1),o=e("p",null,"replaceAll和replaceFirst的区别主要是替换的内容不同，replaceAll是替换所有匹配的字符，而replaceFirst()仅替换第一次出现的字符",-1),d=e("h3",{id:"用法例子",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#用法例子"},[e("span",null,"用法例子")])],-1),_=e("pre",null,[e("code",null,`String string = "abc123adb23456aa";
System.out.println(string);//abc123adb23456aa

//使用replace将a替换成H
System.out.println(string.replace("a","H"));//Hbc123Hdb23456HH
//使用replaceFirst将第一个a替换成H
System.out.println(string.replaceFirst("a","H"));//Hbc123adb23456aa
//使用replace将a替换成H
System.out.println(string.replaceAll("a","H"));//Hbc123Hdb23456HH

//使用replaceFirst将第一个数字替换成H
System.out.println(string.replaceFirst("\\\\d","H"));//abcH23adb23456aa
//使用replaceAll将所有数字替换成H
System.out.println(string.replaceAll("\\\\d","H"));//abcHHHadbHHHHHaa
`)],-1),m=[n,c,s,i,p,o,d,_];function H(g,u){return t(),l("div",null,m)}const b=a(r,[["render",H],["__file","replace-in-string.html.vue"]]),S=JSON.parse('{"path":"/docs/java/java-basic/replace-in-string.html","title":"","lang":"en-US","frontmatter":{},"headers":[{"level":3,"title":"用法例子","slug":"用法例子","link":"#用法例子","children":[]}],"git":{"createdTime":1715384499000,"updatedTime":1715384499000,"contributors":[{"name":"dong","email":"dwx_job@163.com","commits":1}]},"filePathRelative":"docs/java/java-basic/replace-in-string.md"}');export{b as comp,S as data};
