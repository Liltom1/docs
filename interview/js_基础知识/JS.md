# JS

### 1.类型

- 值类型：string,number,布尔类型，symbol,undefined

- 引用类型：对象，数组，null，函数

  typeof可以判断所以的值类型 ，引用类型，只能判断函数 ，其他 null ['a','b],{x:100}都识别为‘object’

### 2.变量计算-类型转换

- 字符串拼接 10 + '12' = '1012'
- ==  : 0 == ''  , 0 == false false == '' null == undefined 100 == '100'
- if语句和逻辑运算

何时使用 == 

```js
const obj = { x : 100 }
if(obj.a == null) {}

//相当于
//if(obj.a === null || obj.a === undefined )
```

!!xxx === true 为 truly 变量

!!xxx === false 为 falsely 变量

if语句判断时，是判断的是否为truly或falsely变量

### 3.原型与原型链



### 4.作用域与闭包



### 5.异步

单线程和异步，异步同步的区别

1.同步阻塞代码，异步不阻塞代码

2.异步应用场景，网络请求，定时任务

3.有了callback hell,才出现promise解决回调地狱的问题

### 6.DOM（document object model）

1.DOM是那种数据结构

DOM 本质是 从html文件解析出来的 一颗树

2.DOM操作常用的API

3.attr和property的区别

4.一次插入多个DOM节点，考虑性能

知识点

#### DOM结构操作

- 新增/插入节点
- 获取子元素列表，获取父元素
- 删除子元素

新增/插入节点 ：appendChild

获取子元素列表，获取父元素: p1.parentNode , div1.childNodes

可通过DOM节点的nodename与nodetype来判断节点是什么元素

删除子元素:div1.removeChild( div1ChildNodesP[0] )

#### DOM节点操作

获取dom节点

getElementById ，getElementsByTagName ，getElementsByClassName ，querySelectorAll

先获取dom节点

以property 形式设置节点属性

p.style.width = '100px'

p.className = 'red'

以attribute方式设置节点属性

p1.setAttribute('style', 'font-size: 50px;')

property：修改对象属性，不会体现到html结构中

attribute:修改html属性，会改变html结构

这两者都会引起DOM重新渲染，优先使用property去修改DOM

#### DOM的性能优化

- 对DOM查询做缓存
- 将频繁操作改为一次性操作

一次插入多个节点，考虑性能

```js
const list = document.getElementById('list')
// 创建一个文档片段，此时还没有插入到 DOM 结构中
const frag = document.createDocumentFragment()
for (let i  = 0; i < 20; i++) {
    const li = document.createElement('li')
    li.innerHTML = `List item ${i}`

    // 先插入文档片段中
    frag.appendChild(li)
}
// 都完成之后，再统一插入到 DOM 结构中
list.appendChild(frag)
console.log(list)
```

### 7.Bom操作（browser object model）

- navigator
- screen
- location
- history

navigator.userAgent 查看浏览器类型

screen获取屏幕的信息

location获取url信息

history控制页面的前进后退

### 8.事件

事件绑定，事件冒泡，事件代理

### 9.ajax

手写一个ajax

```js
function ajax(url) {
    const p = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(
                        JSON.parse(xhr.responseText)
                    )
                } else if (xhr.status === 404 || xhr.status === 500) {
                    reject(new Error('404 not found'))
                }
            }
        }
        xhr.send(null)
    })
    return p
}

const url = '/data/test.json'
ajax(url)
.then(res => console.log(res))
.catch(err => console.error(err))

```

同源策略，协议，域名，端口三者必须一致

跨域

图片加载无视同源策略

- '<img src='地址zxcz' /'>
- '<link href='跨域的CSS地址' /'>
- script src=跨域的js地址 

img方式可以实现埋点

link script方式可以使用CDN

script可实现jsonp

CORS，服务器设置http header

### 10. cookie 和 localstorage 和 sessionStorage

html5为存储而设计，最大可存5M

api简单易用setitem getitem

localstorage 数据会永久存储，除非代码或手动删除

sessionStorage 数据只存在于当前会话，浏览器关闭则清空

cookie 使用 设置 document.cookie = 'a=100' 获取 document.cookie 最大存储4kb

cookie请求时会发送到服务端

### 11.防抖与节流

防抖

```js
function debounce(fn, delay = 500) {
    // timer 是闭包中的
    let timer = null

    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}
input1.addEventListener('keyup', debounce(function (e) {
    console.log(e.target)
    console.log(input1.value)
}, 600))
```

节流

```js
// 节流
function throttle(fn, delay = 100) {
    let timer = null

    return function () {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}
div1.addEventListener('drag', throttle(function (e) {
    console.log(e.offsetX, e.offsetY)
}))
```

