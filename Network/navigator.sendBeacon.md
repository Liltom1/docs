---
next:
  text: 'HTTPS'
  link: '../Network/HTTPS'
prev:
  text: 'WebSocket'
  link: '../Network/WebSocket'
---
#### `navigator.sendBeacon`

##### 应用场景

发送心跳包：可以使用 `navigator.sendBeacon` 发送心跳包，以保持与服务器的长连接，避免因为长时间没有网络请求而导致连接被关闭。

埋点：可以使用 `navigator.sendBeacon` 在页面关闭或卸载时记录用户在线时间，pv uv，以及错误日志上报 按钮点击次数。

发送用户反馈：可以使用 `navigator.sendBeacon` 发送用户反馈信息，如用户意见、bug 报告等，以便进行产品优化和改进

ping请求 是`html5` 新增的 并且是`sendBeacon` 特有的 ping 请求 只能携带少量数据，并且不需要等待服务端响应，因此非常适合做埋点统计，以及日志统计相关功能。

##### `navigator.sendBeacon`与 Ajax fetch对比

优点

1. 不受页面卸载过程的影响，确保数据可靠发送。
2. 异步执行，不阻塞页面关闭或跳转。
3. 能够发送跨域请求。

缺点

- fetch 和 ajax 都可以发送任意请求 而 sendBeacon 只能发送POST

- fetch 和 ajax 可以传输任意字节数据 而 sendBeacon 只能传送少量数据（64KB 以内）

- fetch 和 ajax 可以定义任意请求头 而 sendBeacon 无法自定义请求头

- sendBeacon 只能传输 [`ArrayBuffer`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArrayBuffer)、[`ArrayBufferView`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FTypedArray)、[`Blob`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FBlob)、[`DOMString`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FString)、[`FormData`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FFormData) 或 [`URLSearchParams`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FURLSearchParams) 类型的数据

- `如果处于危险的网络环境，或者开启了广告屏蔽插件 此请求将无效`

##### 使用方法

```js
let data = JSON.stringify({name:'test'})
lob = new Blob([data], { type: 'application/json' })
document.getElementById('btn').addEventListener('click', () => {
       navigator.sendBeacon('http://localhost:3000/sendBeacon',blob,{
        type:"beacon"
    })
  })

```

后端

```ts
const express = require('express');

const app = express();



app.post('/sendBeacon',(req,res)=>{
    // 跨域允许
    res.setHeader('Access-Control-Allow-Origin', '*')
    // 任何头信息
    res.setHeader('Access-Control-Allow-Headers', '*')

    res.send('sendBeacon')
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
```

