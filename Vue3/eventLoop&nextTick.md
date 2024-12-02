---
next:
  text: 'H5适配'
  link: '../Vue3/H5适配'
---
#### eventLoop&nextTick

##### 1.Js的执行机制

###### 同步任务

代码从上到下执行

###### 异步任务

- 宏任务

script标签中的代码，setTimeout，setInterval，UI交互事件，postMessage，Ajax

- 微任务

Promise.then catch finally，MutaionObserver，process.nextTick(node.js环境)

运行的机制

同步任务，在主进程中的执行栈，主线程之外还有一个任务队列，执行异步任务，在异步任务中先执行宏任务，然后清空宏任务中的微任务

`nextTick` 就是创建一个异步任务，那么它需要等到同步任务执行完成后才执行。

##### 2.nextTick

下一帧需要做的事情

一针需要做什么事情

1.处理用户的事件，就是event 例如 click，input change 等。

2.执行定时器任务

3.执行 requestAnimationFrame

4.执行dom 的回流与重绘

5.计算更新图层的绘制指令

6.绘制指令合并主线程 如果有空余时间会执行 requestidlecallback

