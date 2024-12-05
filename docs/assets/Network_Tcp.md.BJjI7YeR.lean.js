import{_ as a,o,c,a5 as l}from"./chunks/framework.W6qmpZhh.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Network/Tcp.md","filePath":"Network/Tcp.md","lastUpdated":null}'),d={name:"Network/Tcp.md"};function t(i,e,r,p,n,s){return o(),c("div",null,e[0]||(e[0]=[l('<h3 id="tcp" tabindex="-1"><code>Tcp</code> <a class="header-anchor" href="#tcp" aria-label="Permalink to &quot;`Tcp`&quot;">​</a></h3><h4 id="_1-三次握手和四次挥手" tabindex="-1">1.三次握手和四次挥手 <a class="header-anchor" href="#_1-三次握手和四次挥手" aria-label="Permalink to &quot;1.三次握手和四次挥手&quot;">​</a></h4><h5 id="三次握手" tabindex="-1">三次握手 <a class="header-anchor" href="#三次握手" aria-label="Permalink to &quot;三次握手&quot;">​</a></h5><p>相关名词</p><ul><li><p><code>seq</code>（sequence number），序列号随机生成的</p></li><li><p><code>ack</code>（acknowledgement number）确认号 <code>ack</code> = <code>seq</code>+ 1</p></li><li><p><code>ACK</code> （acknowledgement）确定序列号有效</p></li><li><p><code>SYN</code>（synchronous）发起新连接</p></li><li><p><code>FIN</code> （FINISH）完成</p></li></ul><p>客户端与服务端</p><h6 id="_1-准备链接" tabindex="-1">1，准备链接 <a class="header-anchor" href="#_1-准备链接" aria-label="Permalink to &quot;1，准备链接&quot;">​</a></h6><p>TCP服务端创建传输控制模块<code>TCB</code>，进入LISTEN（监听）状态 ，TCP客户端也同样先创建传输控制模块<code>TCB</code> 。</p><h6 id="_2-tcp客户端发起第一次握手" tabindex="-1">2，TCP客户端发起第一次握手 <a class="header-anchor" href="#_2-tcp客户端发起第一次握手" aria-label="Permalink to &quot;2，TCP客户端发起第一次握手&quot;">​</a></h6><p>TCP客户端向服务器发出连接请求报文，报文参数如下</p><ul><li><p>报文中的首部位SYN = 1 ，预示着发起新链接</p></li><li><p>同时会附带一个seq=x(<em>一个随机的序列号 这里用x代替</em>)</p></li></ul><p>发送后<code>TCB</code>进入SYN-SENT（同步已发送状态），TCP规定，SYN报文段（SYN=1的报文段）不能携带数据，但需要消耗掉一个序号。</p><h6 id="_3-tcp服务器接受请求-然后发起第二次握手" tabindex="-1">3，TCP服务器接受请求，然后发起第二次握手 <a class="header-anchor" href="#_3-tcp服务器接受请求-然后发起第二次握手" aria-label="Permalink to &quot;3，TCP服务器接受请求，然后发起第二次握手&quot;">​</a></h6><p>TCP服务器接受到请求后，同意链接，就会返回发出确认报文，报文中携带的参数有，</p><ul><li><code>ACK</code> = 1(你的请求序列号是有效的)</li><li><code>SYN</code> = 1 发起新链接</li><li><code>seq</code> = y （自己初始化一个随机的序列号）</li><li><code>ack</code> = x+1 (小写的<code>ack</code>为确认号，x为第一次客户端握手中的seq 随机序列号 )</li></ul><p>此时，TCP服务器进程进入了<code>SYN-RCVD</code>（同步收到）状态。这个报文也不能携带数据，但是同样要消耗一个序号。</p><h6 id="_4-tcp客户端接受到服务器返回-然后发起第三次握手" tabindex="-1">4，TCP客户端接受到服务器返回，然后发起第三次握手 <a class="header-anchor" href="#_4-tcp客户端接受到服务器返回-然后发起第三次握手" aria-label="Permalink to &quot;4，TCP客户端接受到服务器返回，然后发起第三次握手&quot;">​</a></h6><p>TCP客户进程收到确认后，还要向服务器给出确认，确认报文参数如下</p><ul><li><code>ACK</code> = 1(你的请求序列号是有效的)</li><li><code>seq</code> = x+1(x为第一次客户端握手中的seq 随机序列号 )</li><li><code> ack</code> = y+1 (y为第二次握手中服务器端的seq 随机序列号 )</li></ul><p>此时，TCP连接建立，客户端进入ESTABLISHED（已建立连接）状态。TCP规定，<code>ACK</code>报文段可以携带数据，但是如果不携带数据则不消耗序号。</p><h6 id="_5-当服务器收到客户端的确认后也进入established状态-此后双方就可以开始通信了。" tabindex="-1">5，当服务器收到客户端的确认后也进入ESTABLISHED状态，此后双方就可以开始通信了。 <a class="header-anchor" href="#_5-当服务器收到客户端的确认后也进入established状态-此后双方就可以开始通信了。" aria-label="Permalink to &quot;5，当服务器收到客户端的确认后也进入ESTABLISHED状态，此后双方就可以开始通信了。&quot;">​</a></h6>',21)]))}const T=a(d,[["render",t]]);export{u as __pageData,T as default};
