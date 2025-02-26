### 聊天demo

实现单聊与群聊，单聊理解为群聊人数为二

#### 1.页面布局

聊天页面Chat.vue文件，左边可选择聊天房间，右边显示聊天框

#### 2.设计

##### 建立聊天室部分

进入聊天页面时，利用socket.io-client与服务端建立链接

```js
let socket = io('ws://localhost:3000',{
  extraHeaders: {
    'Authorization': sessionStorage.getItem('token'),
  }
});
```

在onMounted阶段查询当前用户已加入过的房间

- 前端

```js
onMounted(() => {
  socket.emit('search', { userId: userInfo.id });//查询用户的房间
})
```

- 后端

```js
//查询当前用户房间
    socket.on('search', ({ userId }) => {
        fs2.readFile('./userinfo.txt').then(data => {
            let users = []
            users = data.toString().split('\n').filter(item => item).map(item => JSON.parse(item))
            const userInfo = users.find(item => item.id === userId)
            console.log(userInfo.rooms);

            socket.emit('receiveRoom', userInfo.rooms)
        }).catch(err => {
            console.log('读取文件失败', err)
        })
    })
```

接收房间信息，遍历每个房间并用socket.join(roomId) 方法 进入 房间

- 前端

```js
 //接收查询到的当前房间消息
  socket.on('receiveRoom', (room) => {
    rooms.value = room;
    for (let i = 0; i < rooms.value.length; i++) {
      checked.value.push(false);
      socket.emit('join', { roomId: rooms.value[i].id, userName: userInfo.name });//加入一个房间
    }
  })
```

- 后端

```js
//进入房间
    socket.on('join', ({ roomId, userName }) => {
        socket.join(roomId)
        // console.log(userName, '加入了', roomId);
    })
```

##### 点击不同聊天室，获取历史聊天记录

- 前端

```js
const goChat = (item) => {
  currentRoomName.value = item.name;
  chatList.length = 0;
  currentId.value = item.id;
  console.log(item.id, 'item.id');
  //查询当前房间消息
  socket.emit('searchCurrentRoomMessage', { roomId: item.id })
}
```

- 后端

```js
//查询某个房间的聊天记录
    socket.on('searchCurrentRoomMessage', ({ roomId }) => {
        fs2.readFile('./message.txt').then(data => {
            const messageList = data.toString().split('\n').filter(item => item).map(item => JSON.parse(item))
            console.log(messageList, 'messageList');
            
            const currentRoomMessageList = messageList.filter(item => item.roomId === roomId)
            socket.emit('receiveCurrentRoomMessage', currentRoomMessageList)
        }).catch(err => {
            console.log('读取文件失败', err)
        })
    })
```

- 前端

```js
//接收查询到的当前房间消息
  socket.on('receiveCurrentRoomMessage', (message) => {
    console.log(message, 'receiveCurrentRoomMessage');
    chatList.push(...message);
    // chatList.push(message);
  })
```

##### 新建房间与加入房间

新建房间

- 前端

```js
const newRoom = () => {
  // console.log('新建房间');
  for (let i = 0; i < rooms.value.length; i++) {
    if (rooms.value[i].name === roomInfo.name) {
      ElMessage({
        message: '房间名已存在',
        type: 'warning',
      })
      return;
    }
  }
  socket.emit('newRoom', { user: userInfo, roomName: roomInfo.name });
  handleClose();
}
```

- 后端

```js
//新建房间
    socket.on('newRoom', async ({ user, roomName }) => {
        let roomId = null
        await fs2.readFile('./room.txt').then(data => {
            const room = data.toString().split('\n').filter(item => item).map(item => JSON.parse(item))
            console.log(room.length, 'room');
            roomId = room.length + 1
        }).catch(err => {
            console.log('读取文件失败', err)
        })
        const roomInfo = {
            id: roomId.toString(),
            name: roomName,
            people: [user.id],
        }
        console.log(roomInfo, 'roomInfo');

        //将房间信息写入存储房间文件
        fs.appendFile(`./room.txt`, `${JSON.stringify(roomInfo)}\n`, (err) => {
            if (err) {
                console.log('写入文件失败', err)
            }
        })

        //将房间信息写入用户信息
        fs2.readFile('./userinfo.txt').then(data => {
            let users = []
            users = data.toString().split('\n').filter(item => item).map(item => JSON.parse(item))
            const userInfo = users.find(item => item.id === user.id)
            userInfo.rooms.push({ id: roomId.toString(), name: roomName })
            fs.writeFile(`./userinfo.txt`, users.map(item => JSON.stringify(item)).join('\n'), (err) => {
                if (err) {
                    console.log('写入文件失败', err)
                }
            })
        }).catch(err => {
            console.log('读取文件失败', err)
        })
        socket.emit('newRoomSuccess')
    })
```

加入房间部分

- 前端

```js
const addRoom = () => {
  for (let i = 0; i < rooms.value.length; i++) {
    if (rooms.value[i].name === roomInfo.name) {
      ElMessage({
        message: '你已加入过该房间',
        type: 'warning',
      })
      return;
    }
  }
  socket.emit('addRoom', { user: userInfo, roomName: roomInfo.name });
}
```

- 后端

```js
//加入房间
    socket.on('addRoom', async ({ user, roomName }) => {
        let roomInfo1 = null
        await fs2.readFile('./room.txt').then(data => {
            // console.log(roomInfo, 'roomInfo');
            const room = data.toString().split('\n').filter(item => item).map(item => JSON.parse(item))
            console.log(room, 'room');
            console.log(roomName, 'roomName');
            let roomInfo = room.find(item => item.name === roomName)
            roomInfo.people.push(user.id)
            console.log(roomInfo, 'roomInfo');
    
            //将消息写入文件
            fs.writeFile(`./room.txt`, room.map(item => JSON.stringify(item)).join('\n'), (err) => {
                if (err) {
                    console.log('写入文件失败', err)
                }
            })

            //将房间信息写入用户信息
            fs2.readFile('./userinfo.txt').then(data => {
                let users = []
                users = data.toString().split('\n').filter(item => item).map(item => JSON.parse(item))
                const userInfo = users.find(item => item.id === user.id)
                console.log({ id: roomInfo.id.toString(), name: roomName },'userInfo');
                
                userInfo.rooms.push({ id: roomInfo.id.toString(), name: roomName })
                fs.writeFile(`./userinfo.txt`, users.map(item => JSON.stringify(item)).join('\n'), (err) => {
                    if (err) {
                        console.log('写入文件失败', err)
                    }
                })
            }).catch(err => {
                console.log('读取文件失败', err)
            })
            socket.emit('addRoomSuccess')
        }).catch(err => {
            console.log('读取文件失败', err)
        })


    })
```

##### 发送消息接收消息

消息类型分为文字与图片

- 前端 文字部分

```js
const sendMessage = () => {
  console.log(currentId.value, 'currentId.value');
  if (currentId.value === '') {
    ElMessage({
      message: '请选择一个房间',
      type: 'warning',
    })
    return;
  }
  const data = {
    roomId: currentId.value,
    message: messageText.value,
    from: {
      id: userInfo.id,
      name: userInfo.name
    },
    type: 'text',
    time: new Date().getTime()
  }
  chatList.push(data);
  //向服务器发送消息
  socket.emit('sendMessage', data);
  messageText.value = '';
}
```

- 后端

```js
//接收文字消息
    socket.on('sendMessage', ({ roomId, message, from, time, type }) => {
        const messageInfo = JSON.stringify({
            roomId,
            message,
            from,
            time,
            type: type,
        })
        //将消息写入文件
        fs.appendFile(`./message.txt`, `${messageInfo}\n`, (err) => {
            if (err) {
                console.log('写入文件失败', err)
            }
        })
        //给房间内的人发送消息
        socket.broadcast.to(roomId).emit('receiveMessage', {
            roomId,
            message,
            from,
            time,
            type: type,
        })
    })
```

- 前端 图片消息

```js
//上传图片方法（发消息）
const uploadImg = (file) => {
  console.log(file.file, 'uploadImg');
  if (currentId.value === '') {
    ElMessage({
      message: '请选择一个房间',
      type: 'warning',
    })
    return;
  }
  const data = {
    roomId: currentId.value,
    message: `/images/`+new Date().getTime() + '_' + file.file.name,
    from: {
      id: userInfo.id,
      name: userInfo.name
    },
    time: new Date().getTime(),
    file: file.file,
    type: 'img',
    fileName: new Date().getTime() + '_' + file.file.name
  }
  //向服务器发送消息
  socket.emit('sendImgMessage', data);
  setTimeout(() => {
    chatList.push(data);
  }, 1000);
  // console.log(file);
}
```

- 后端

```js
//接收图片消息
    socket.on('sendImgMessage', ({ roomId, message, from, time, file, fileName, type }) => {

        //避免文件名重复
        const filePath = `./images/${fileName}`;

        const imageBuffer = Buffer.from(file.buffer, 'base64');

        //将图片写入文件
        fs.writeFile(filePath, imageBuffer, (err) => {
            if (err) {
                console.log('写入文件失败', err)
                //给房间内的人发送消息
                socket.broadcast.to(roomId).emit('fileErrMessage', {
                    message: "写入文件失败!",
                    from,
                })
                return
            }
        })
        const messageInfo = JSON.stringify({
            roomId,
            message: `/images/${fileName}`,
            from,
            time,
            type: type,
        })
        //将消息写入文件
        fs.appendFile(`./message.txt`, `${messageInfo}\n`, (err) => {
            if (err) {
                console.log('写入文件失败', err)
            }
        })

        //给房间内的人发送消息
        socket.broadcast.to(roomId).emit('receiveMessage', {
            roomId,
            message: `/images/${fileName}`,
            from,
            time,
            type: type,
            fileName: `/images/${fileName}`,
            file: imageBuffer,
        })
        console.log('发消息')
    })

```

#### 代码地址

前端 ： https://github.com/Liltom1/ChatDemo/tree/master

后端 ： https://github.com/Liltom1/ChatDemo-Node/tree/master