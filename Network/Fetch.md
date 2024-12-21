---
next:
  text: '浏览器输入URL会发生什么'
  link: '../Network/浏览器输入URL会发生什么'
prev:
  text: 'Ajax'
  link: '../Network/Ajax'
---
#### Fetch

与ajax作用相同，fetch更加简单易用，多用于大型数据集和长时间运行的操作

##### 1.fetch与ajax对比

- fetch的API设计相对简单，简洁易用
- fetch只支持GET与POST请求方法
- fetch设置请求头更加直接，通过fetch 方法中的 options中 header对象进行设置，ajax需要用setRequestHeader
- 请求体fetch 方法中的 options中的data字段，ajax需要用xhr.send
- 支持的数据类型 ，接受数据时用res.json()`, `.blob()`, `.arrayBuffer(),XHR 只支持文本和二进制数据两种数据类型
- 在进行[跨域请求](https://so.csdn.net/so/search?q=跨域请求&spm=1001.2101.3001.7020)时，`fetch` API 提供了一种简单而强大的解决方案——使用 CORS（跨域资源共享）头部实现跨域请求，而 XHR 则使用了一个叫做 `XMLHttpRequest Level 2` 的规范，在代码编写上相对较为繁琐

##### 2.返回格式

- text(): 将响应体解析为纯文本字符串并返回。
- json(): 将响应体解析为JSON格式并返回一个JavaScript对象。
- blob(): 将响应体解析为二进制数据并返回一个Blob对象。
- arrayBuffer(): 将响应体解析为二进制数据并返回一个ArrayBuffer对象。
- formData(): 将响应体解析为FormData对象。
  

##### 3.get

```js
fetch('http://localhost:3000/getUserInfo').then(res => {
        console.log(res);
        return res.text()
      }).then(data => {
        console.log(data, 'data');
      })
```

##### 4.post

```js
const abort = new AbortController()
fetch('http://localhost:3000/api/post', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        signal:abort.signal,
        body: JSON.stringify({
          name:'Tom',
          age:99
        })
      }).then(res =>{
        console.log(res);
        return res.json()
      }).then(data => {
        console.log(data, 'data');
        document.querySelector('#result').innerText = JSON.stringify(data)
      }).catch(error => {
        if (error.name === 'AbortError') {
          console.log('Fetch operation is aborted:', error.message);
        } else {
          console.error('Fetch error:', error);
        }
      })
```

##### 5.中断请求

```js
const abort = new AbortController()
fetch('http://localhost:3000/api/post', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        signal:abort.signal, // ![code focus:1]
        body: JSON.stringify({
          name:'Tom',
          age:99
        })
      }).then(res =>{
        console.log(res);
        return res.json()
      }).then(data => {
        console.log(data, 'data');
        document.querySelector('#result').innerText = JSON.stringify(data)
      }).catch(error => {
        if (error.name === 'AbortError') {
          console.log('Fetch operation is aborted:', error.message);
        } else {
          console.error('Fetch error:', error);
        }
      })
```

```js
document.querySelector('#stop').addEventListener('click',()=>{
      abort.abort()
    })
```

##### 6.获取响应体与实时数据流

```js
const data = await fetch('http://localhost:3000/api/txt', {
        signal: abort.signal
      })

      const response = await data.clone() //复制响应体
      const render = data.body.getReader() //获取数据流的rander对象
      const contentLength = data.headers.get('Content-Length') //获取数据流的长度
      let loaded = 0
      while (true) {
        const { value, done } = await render.read()
        if (done) {
          break
        }
        loaded += value.length
        document.querySelector('#result').innerText = `${(loaded / contentLength * 100).toFixed(2)}%`
      }
const text = await response.text()
      console.log(text);
```

