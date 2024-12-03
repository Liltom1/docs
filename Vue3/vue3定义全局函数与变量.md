---
prev:
  text: '自定义hooks'
  link: '../Vue3/自定义hooks'
next:
  text: 'css中Style完整新特性'
  link: '../Vue3/css中Style完整新特性'
---
#### vue3定义全局函数与变量

在main.ts文件

```ts
// 创建应用
const app = createApp(App)

app.config.globalProperties.$http = () => { }
```

使用

```ts

import {ref,reactive,getCurrentInstance} from 'vue'
const app = getCurrentInstance()
console.log(app?.proxy?.$http)
```

