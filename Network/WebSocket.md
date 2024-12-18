#### WebSocket

定义

单个 TCP 连接上进行[全双工](https://so.csdn.net/so/search?q=全双工&spm=1001.2101.3001.7020)通信的网络协议。它是 `HTML5` 中的一种新特性，能够实现 Web 应用程序和服务器之间的实时通信，比如在线聊天、游戏、[数据可视化](https://edu.csdn.net/cloud/sd_summit?utm_source=glcblog&spm=1001.2101.3001.7020)等。

场景

1. 实时性要求较高的应用，比如在线聊天、游戏、数据可视化等；
2. 需要频繁交换数据的应用，比如在线编辑器、文件管理器等；
3. 需要推送服务的应用，比如实时数据监控、通知系统等；
4. 跨平台的应用，比如桌面应用程序、移动应用程序等。

`nodejs`后端

先创建`WebSocket` 服务器,监听8080 端口

`const wss = new ws.Server({ port: 8080 },()=>{console.log('server is running on8080');});`

监听连接事件

`wss.on('connection',()=>{})` 当有客户端发起链接时监听到

监听客户端消息

`ws.on('message',()=>{})`  客户端发送数据可以被监听到

```ts
// import ws from 'ws'
import * as ws from 'ws'

//创建 socket server服务 8080端口
const wss = new ws.Server({ port: 8080 },()=>{
    console.log('server is running on 8080');
});
const state = {
    HEART:1, 
    MESSAGE:2
}

//监听连接事件
wss.on('connection', (ws) => {
    //客户端链接成功
    console.log('client connected');
    //监听客户端消息
    ws.on('message', (message) => {
        console.log('received: %s', message.toString());
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({
                state:state.MESSAGE,
                message:message.toString()
            })
        })
    })
    let hraetInreval = null;
    //心跳包
    const sendHeart = () => {
        if(ws.readyState === ws.OPEN){
            ws.send(JSON.stringify({state:state.HEART,message:"心跳"}));
        }else{
            clearInterval(hraetInreval);
        }
    }
    hraetInreval = setInterval(sendHeart, 5000);
})



```

前端代码

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

    <div> 
        <ul id="list" ></ul>
        <input type="text" id="input">
        <button id="btn">sse</button> 
    </div>
    <script>
        //建立链接
        const ws = new WebSocket('ws://127.0.0.1:8080');
        //监听是否链接成功
        ws.addEventListener('open', () => {
            console.log('连接成功');
        })
        let input = document.getElementById('input');
        let btn = document.getElementById('btn');
        let list = document.getElementById('list');
        btn.addEventListener('click', () => {
            if (input.value) {
                //向服务端发送消息
                ws.send(input.value);
            }
            input.value = ''
        })
        ws.addEventListener('message', (e) => {
            let li = document.createElement('li');
            if (data.state == 2) {
                li.innerText = e.message;
                list.appendChild(li);
            }
        })
        //关闭链接
        stop.addEventListener('click', () => {
         ws.close()
      })
    </script>
</body>
</html>
```

