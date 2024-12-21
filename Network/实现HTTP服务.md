---
next:
  text: '跨域'
  link: '../Network/跨域'
prev:
  text: 'Tcp'
  link: '../Network/Tcp'
---
#### 实现HTTP服务

利用node.js原生的net模块实现

`socket`可以监听很多事件

1. `close` 一旦套接字完全关闭就触发
2. `connect` 当成功建立套接字连接时触发
3. `data` 接收到数据时触发
4. `end` 当套接字的另一端表示传输结束时触发，从而结束套接字的可读端

```js
// import net from 'net'

const net = require('node:net')

let html = `
   <h1>BLG</h1>
`
let headers = [
  'HTTP/1.1 200 OK',
  'Content-Type: text/html',
  `Content-length:${html.length} `,
  `Date:${new Date()}`,
  'Connection: keep-alive',
  //'Transfer-Encoding: chunked',
  '\r\n',
  html
]


const server = net.createServer((socket) => { //createServer 方法创建TCP服务器 可以监听链接请求
  //参数socket是 当新连接创建后会被触发。socket 是 net.Socket实例。 socket 对象代表一个与 TCP 服务器或客户端的连接，包含多种用于发送、接收和关闭连接的方法。
  socket.on('data', (data) => { // socket.on方法为实例添加事件监听器 第一个参数为事件名data ,data事件是当接受到数据时触发
    // console.log('data is', data.toString())
    let msg = data.toString()
    if(/GET/.test(msg)) {
      socket.write(headers.join('\r\n')) //在 socket.write 发送数据 是服务端向客户端发送数据
      socket.end() //半关闭 socket。例如，它发送一个 FIN 包。可能服务器仍在发送数据。
    }
    // socket.write('hello from server')
  })
})


server.listen(8080, () => { //当服务器调用 server.listen 绑定后会触发
  console.log('server is listening', server.address())
})
```

