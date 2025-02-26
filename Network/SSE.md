---
next:
  text: 'WebSocket'
  link: '../Network/WebSocket'
prev:
  text: '浏览器输入URL会发生什么'
  link: '../Network/浏览器输入URL会发生什么'
---
#### SSE

定义：SSE（Server-Sent Events）是一种用于实现服务器主动向客户端推送数据的技术，也被称为“事件流”（Event Stream）。它基于 HTTP 协议，利用了其长连接特性，在客户端与服务器之间建立一条持久化连接，并通过这条连接实现服务器向客户端的实时数据推送。

##### SSE 和 Socket 区别

- 技术实现

SSE 基于 HTTP 协议，利用了其长连接特性，通过浏览器向服务器发送一个 HTTP 请求，建立一条持久化的连接。而 WebSocket 则是通过特殊的升级协议（HTTP/1.1 Upgrade 或者 HTTP/2）建立新的 TCP 连接，与传统 HTTP 连接不同

- 数据格式

SSE 可以传输文本和二进制格式的数据，但只支持单向数据流，即只能由服务器向客户端推送数据。WebSocket 支持双向数据流，客户端和服务器可以互相发送消息，并且没有消息大小限制。

- 连接状态

SSE 的连接状态仅有三种：已连接、连接中、已断开。连接状态是由浏览器自动维护的，客户端无法手动关闭或重新打开连接。而 WebSocket 连接的状态更灵活，可以手动打开、关闭、重连等。

- 兼容性

SSE 是标准的 Web API，可以在大部分现代浏览器和移动设备上使用。但如果需要兼容老版本的浏览器（如 IE6/7/8），则需要使用 polyfill 库进行兼容。而 WebSocket 在一些老版本 Android 手机上可能存在兼容性问题，需要使用一些特殊的 API 进行处理

- 安全性

SSE 的实现比较简单，都是基于 HTTP 协议的，与普通的 Web 应用没有太大差异，因此风险相对较低。WebSocket 则需要通过额外的安全措施（如 SSL/TLS 加密）来确保数据传输的安全性，避免被窃听和篡改，否则可能会带来安全隐患。

SSE 和 WebSocket 都有各自的优缺点，适用于不同的场景和需求。如果只需要服务器向客户端单向推送数据，并且应用在前端的浏览器环境中，则 SSE 是一个更加轻量级、易于实现和维护的选择。而如果需要双向传输数据、支持自定义协议、或者在更加复杂的网络环境中应用，则 WebSocket 可能更加适合。

##### 用法

######  EventSource() 构造函数

```js
let source = new EventSource('http://127.0.0.1:3000/sse');
//第一个参数是URL
//第二个参数Object 类型
//withCredentials：Boolean 类型，表示是否允许发送 Cookie 和 HTTP 认证信息。默认为 false。
//headers：Object 类型，表示要发送的请求头信息。
//retryInterval：Number 类型，表示与服务器失去连接后，重新连接的时间间隔。默认为 1000 毫秒。

```

####  EventSource.readyState 属性

`readyState` 属性表示当前 `EventSource` 对象的状态，它是一个只读属性，它的值有以下几个：

- `CONNECTING`：表示正在和服务器建立连接。
- `OPEN`：表示已经建立连接，正在接收服务器发送的数据。
- `CLOSED`：表示连接已经被关闭，无法再接收服务器发送的数据。

#### EventSource.close() 方法

关闭 `EventSource` 对象与服务器的连接，停止接收服务器发送的数据。

```js
source.close();
```

#### EventSource.onopen 事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>sse</div>
    <div id="result"></div>
    <div> <button id="btn">sse</button> </div>
    <script>
        let btn = document.getElementById('btn');
        btn.addEventListener('click', () => {
            let source = new EventSource('http://127.0.0.1:3000/sse');
            source.onopen = function(event) { // ![cros focus:3]
                console.log('连接成功！', event);
            };
            source.addEventListener('lol', (e) => {
                console.log(e.data);
                document.getElementById('result').innerHTML += e.data;
            })
            source.onmessage = function(event) {
                console.log('接收到数据：', event);
            };
        })
    </script>
</body>
</html>
```

#### EventSource.onerror 事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>sse</div>
    <div id="result"></div>
    <div> <button id="btn">sse</button> </div>
    <script>
        let btn = document.getElementById('btn');
        btn.addEventListener('click', () => {
            let source = new EventSource('http://127.0.0.1:3000/sse');
            source.onopen = function(event) {
                console.log('连接成功！', event);
            };
            source.onerror  = function(event) { // ![cros focus:3]
                console.log('连接失败！', event);
            };
            source.addEventListener('lol', (e) => {
                console.log(e.data);
                document.getElementById('result').innerHTML += e.data;
            })
            source.onmessage = function(event) {
                console.log('接收到数据：', event);
            };
        })
    </script>
</body>
</html>
```

#### EventSource.onmessage 事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>sse</div>
    <div id="result"></div>
    <div> <button id="btn">sse</button> </div>
    <script>
        let btn = document.getElementById('btn');
        btn.addEventListener('click', () => {
            let source = new EventSource('http://127.0.0.1:3000/sse');
            source.onopen = function(event) {
                console.log('连接成功！', event);
            };
            source.addEventListener('lol', (e) => {
                console.log(e.data);
                document.getElementById('result').innerHTML += e.data;
            })
            source.onmessage = function(event) { // ![cros focus:3]
                console.log('接收到数据：', event);
            };
        })
    </script>
</body>
</html>
```

后端需要设置参数

```js
const express = require('express');

const app = express();



app.get('/sse',(req,res)=>{
    // 跨域允许
    res.setHeader('Access-Control-Allow-Origin', '*')
    // 任何头信息
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.writeHead(200, { //  ![cros focus:3]
        'Content-Type': 'text/event-stream', //核心返回数据流 设置请求头 将请求变为sse请求
        'Connection': 'close'
    })
    let timer = setInterval(()=>{
        // ![cros focus:3]
        //返回自定义事件名
        res.write(`event:lol\n`) 
        res.write(`data: 123321 \n\n`)
    },300)
    setTimeout(()=>{
        clearInterval(timer)
        res.end()
    },3000)
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
```

