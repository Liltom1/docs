---
next:
  text: 'Fetch'
  link: '../Network/Fetch'
prev:
  text: '跨域'
  link: '../Network/跨域'
---
#### Ajax

##### 1.定义

通过JavaScript 和 XMLHttpRequest 来向服务器获取数据，然后将数据插入到网页中的某个位置。这种技术能够实现增量式更新页面，提高用户交互体验，减少响应时间和带宽的消耗。

##### 2.用途

- 异步更新页面
- 在页面中特定区域显示动态数据
- 与服务器交互

##### 3.优点

- 提高用户体验
- 减轻服务器压力
- 提高响应速度
- 增加交互性

##### 4.缺点

- seo劣势较大
- 数据与网络的安全性

##### 5.使用方法

核心api

通过XMLHttpRequest创建xhr实例，xhr可以发起HTTP请求，异步通信的方式与服务器进行交互

```js
const xhr = new XMLHttpRequest() //创建 实例
//open方法定义一个请求，第一个参数请求的方法，第二个路径，第三个是否异步处理请求
xhr.open('post', 'http://localhost:3000/api/upload',true) 
```

onreadystatechange 

- readyState 0：未初始化，XMLHttpRequest 对象已经创建，但未调用 open 方法
- readyState 1：已打开，open 方法已经被调用，但 send 方法未被调用
- readyState 2：已发送，send 方法已经被调用，请求已经被服务器接收
- readyState 3：正在接收，服务器正在处理请求并返回数据
- readyState 4：完成，服务器已经完成了数据传输

send 向后端传递参数

###### get

```js
	 const xhr = new XMLHttpRequest()
      //发送get请求
      xhr.open('get', 'http://127.0.0.1:3000/getUserInfo',true)
      xhr.onload = () => { //监听ajax请求是否响应成功，只有响应成功才会触发
        if (xhr.status === 200 ) {
          console.log(xhr)
          document.querySelector('#result').innerHTML = xhr.responseText
        }else{
          console.log('error', xhr.status)
        }
      }
      xhr.send(null)
```

###### post

```js
	 const xhr = new XMLHttpRequest()		
 	 //post请求
      xhr.open('POST', 'http://localhost:3000/api/post')
	 //post要设置请求头的Content-Type
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      //设置超时时间
      xhr.addEventListener('timeout', function (event) { console.log('超时啦'); });
      //设置中断请求
      xhr.addEventListener('abort', function (event) { console.log('我被中断了'); });

      xhr.onload = function () {
        if (xhr.status === 200) {
          document.querySelector('#result').innerText = xhr.responseText;
        }
        else {
          console.log('Request failed.  Returned status of ' + xhr.status);
        }
      };
      xhr.send('name=zhangsan&age=18');
```

如果请求参数携带文件

请求头重Content-Type属性会携带 `boundary=----WebKitFormBoundaryrNUY7iaB8fBNJuHw` 分割线

监听器中，我们通过 event.loaded 和 event.total 属性获取已上传数据量和总数据量，并计算上传进度，最后将进度显示在页面

```js
xhr.addEventListener('progress', function (event) {
          document.querySelector('#result').innerText = `${(event.loaded / event.total * 100).toFixed(2)}%`;
        });
```

