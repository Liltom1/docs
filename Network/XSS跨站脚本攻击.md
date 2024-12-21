---
next:
  text: '首页'
  link: '/'
prev:
  text: '网络状态&强网弱网'
  link: '../Network/网络状态&强网弱网'
---
#### XSS跨站脚本攻击

##### 反射型xss

定义，简单的把用户输入的数据从服务器反射给用户的浏览器

##### 存储型xss

最严重的xss攻击，将script代码通过评论区发送到后台数据库，当用户查看评论时就会收到攻击

##### dom型数据库

攻击者通过web程序的某个页面向用户提供构造好的url当用户访问url,就会执行其中的JavaScript脚本，利用该机制就可以注入恶意代码到当前页面，篡改内容，盗取用户个人敏感信息。

常见属性如下

- loacation
- innerHTML
- document.write
- v-html
- eval

##### 漏洞扫描工具

- wvs
- 椰树
- safe3
- xelenium
- w3af -- Kali
- vega -- Kali
- burp
- kali 操作系统

##### 预防xss攻击

输入过滤：在web端应用程序对输入的数据进行过滤和校验，确保只接受合法的数据

输出转义：在向web页面中输出用户数据时，对其内容进行适当的编码和转义

csp通过设置响应报文头中的csp策略，限制页面中可执行的脚本来源，样式表图像字体等