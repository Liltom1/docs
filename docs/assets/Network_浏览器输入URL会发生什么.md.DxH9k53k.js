import{_ as o,o as a,c,a5 as d}from"./chunks/framework.W6qmpZhh.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{"next":{"text":"SSE","link":"../Network/SSE"},"prev":{"text":"Fetch","link":"../Network/Fetch"}},"headers":[],"relativePath":"Network/浏览器输入URL会发生什么.md","filePath":"Network/浏览器输入URL会发生什么.md","lastUpdated":1734234563000}'),t={name:"Network/浏览器输入URL会发生什么.md"};function p(l,e,i,r,n,s){return a(),c("div",null,e[0]||(e[0]=[d('<h4 id="浏览器输入url会发生什么" tabindex="-1">浏览器输入URL会发生什么 <a class="header-anchor" href="#浏览器输入url会发生什么" aria-label="Permalink to &quot;浏览器输入URL会发生什么&quot;">​</a></h4><h5 id="认识url" tabindex="-1">认识URL <a class="header-anchor" href="#认识url" aria-label="Permalink to &quot;认识URL&quot;">​</a></h5><p>三部分组成</p><p><code>https://xiaoman.blog.csdn.net/category_11618172_2.html</code></p><ul><li><code>https</code>:访问协议</li><li><code>xiaoman.blog.csdn.net</code>:服务器名称简称域名</li><li><code>category_11618172_2.html</code>:资源路径</li></ul><h5 id="第一步dns查询-域名寻址" tabindex="-1">第一步<code>DNS</code>查询，域名寻址 <a class="header-anchor" href="#第一步dns查询-域名寻址" aria-label="Permalink to &quot;第一步`DNS`查询，域名寻址&quot;">​</a></h5><p><code>DNS</code>将域名与<code>IP</code>映射，</p><p>1.先从浏览器中缓存的<code>DNS</code>中去查找真的的<code>IP</code></p><p>2.在操作系统中去查看</p><p>3.本地hosts文件</p><p>4.向域名服务器去查找</p><p>向域名服务器去查找的查找规则</p><p>客户端</p><p>向本地<code>DNS</code>服务器查找</p><p>根域名服务器查找</p><p>顶级域名服务器</p><p>权威域名服务器查找</p><h5 id="第二部拿到ip地址会三次握手发送请求" tabindex="-1">第二部拿到<code>IP</code>地址会三次握手发送请求 <a class="header-anchor" href="#第二部拿到ip地址会三次握手发送请求" aria-label="Permalink to &quot;第二部拿到`IP`地址会三次握手发送请求&quot;">​</a></h5><p>options请求：遇到跨域情况先进行options预检请求，或者自定义请求头的时候会发送options预检请求</p><p>只有为post 请求头是<code>opponication json</code>时才会发送预检请求</p><h5 id="第三步浏览器缓存" tabindex="-1">第三步浏览器缓存 <a class="header-anchor" href="#第三步浏览器缓存" aria-label="Permalink to &quot;第三步浏览器缓存&quot;">​</a></h5><ul><li>强缓存</li></ul><p>缓存服务器提供的一些资源（静态资源） 后台配置 可以设置缓存的事件 cache-control 与 expires</p><p>cache-control优先级更高</p><p>缓存的方法有两种</p><p>硬盘缓存</p><p>内存缓存 （多次刷新会存到内存缓存）</p><ul><li>协商缓存</li></ul><p>与服务器协商</p><p>last-modified 与 if-modified-since:设置时间是否可以对的上</p><p><code>Etag</code>：设置版本号或者哈希值去进行缓存</p><p><code>Etag</code>与 last-modified 共存时<code>Etag</code>优先级高 ，<code>Etag</code>适用于频繁请求的资源，last-modified适用于不频繁请的资源</p><h5 id="第四步四次挥手-断开链接-渲染页面" tabindex="-1">第四步四次挥手 断开链接 渲染页面 <a class="header-anchor" href="#第四步四次挥手-断开链接-渲染页面" aria-label="Permalink to &quot;第四步四次挥手 断开链接 渲染页面&quot;">​</a></h5><p>拿到资源后进行渲染，</p><p><code>html</code>解析器把标签解析成<code>dom</code>树去渲染</p><p><code>css</code>解析器会把<code>css</code>进行格式化 em单位转为<code>px</code></p><p>在渲染过程中会经常遇到回流与重绘</p><h6 id="回流-首次渲染会触发" tabindex="-1">回流 （首次渲染会触发） <a class="header-anchor" href="#回流-首次渲染会触发" aria-label="Permalink to &quot;回流 （首次渲染会触发）&quot;">​</a></h6><ul><li>首次渲染</li><li>浏览器窗口大小发生改变</li><li>元素尺寸或位置发生改变</li><li>元素内容变化（文字或图片）</li><li>字体大小变化</li><li>添加或删除可见的DOM元素</li><li>激活<code>css</code>伪类</li><li>查询某些属性或调用某些方法</li></ul><h6 id="重绘" tabindex="-1">重绘 <a class="header-anchor" href="#重绘" aria-label="Permalink to &quot;重绘&quot;">​</a></h6><p>和颜色相关的会发生重绘color,background-color</p><p>解析JavaScript</p><p><code>V8</code>引擎去解析 <code>js</code>代码先经过解析器解析成<code>AST</code>抽象语法树 -&gt;生成字节码-&gt;再通过解释器边解析边执行（<code>JIT</code>）-&gt;编译器-&gt;将字节码解释成机器码010101再到<code>cpu</code>去运行</p><p>还有一个AOT，直接编译成二进制的，苹果/java9 使用</p><p>生成字节码的原因是兼容各种操作系统与硬件</p><p><code>DNS</code>内容分发</p><p>从就近服务器寻找，一层一层递归找到原服务器地址，一层一层返回并进行缓存（异地灾备)</p><p><code>CDN</code>工作过程在<code>DNS</code> 寻址过程中 在最后一步 就使用 权威域名服务器 查找，智能<code>DNS</code>从就近的服务器节点查找</p><p><code>CDN</code>有负载均衡 某一台服务器过高会向就近服务器分流</p>',49)]))}const m=o(t,[["render",p]]);export{u as __pageData,m as default};
