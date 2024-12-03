---
prev:
  text: 'Proxy'
  link: '../Vue3/Proxy'
---
#### Pinia

全局状态管理工具，与vuex作用相同

##### 1.安装

```
npm install pinia
```

vue3

```ts
import {createApp} from 'vue'
import App from './App.vue'
import Hello from './Hello.vue'
import 'uno.css'
import { createPinia } from 'pinia' //引入pinia

// 创建应用
const app = createApp(App)
const pinia = createPinia()//创建pinia


app.component('Hello',Hello)
app.config.globalProperties.x = 99
app.config.globalProperties.$http = () => { }


app.use(pinia)//使用pinia
// 挂载应用
app.mount('#app')

```

##### 2.使用

src文件夹下新增store文件夹，目录结构如下

```
.
├─ store
│  ├─ store-namespace
│  │  └─ index.ts
│  ├─ Text.ts

```

store-namespace文件夹的index.ts定义枚举 内容如下，

```ts
export const enum Name  {
  Test = 'TEST',
}
```

Text.ts文件

```ts
import { defineStore } from "pinia";
import { Name } from "./store-namespace";

export const useTextStore = defineStore( Name.Test, {
  state: () => {
    return {
      text: "hello world",
      count: 0,
    }
  },
  //类似于computed 可以帮我们去修饰我们的值
  getters: {  
    addText(state) {
      return state.text + "123"
    }
  },
  //可以操作异步 和 同步提交state
  actions: {
    changeText() {
      this.count ++
    }
  }
});
```

使用

```vue
<template>
  <div>
    <!-- <Abc>
      <div class="a" >12355</div>
    </Abc>
    <div :class="tom.blue">666</div> -->
    <!-- <H5></H5> -->
    <!-- <div class="flex11" font="black" > test</div> -->
    <div>{{ text.text }}</div>
    <div>{{ text.count }}</div>
    <div>{{ text.addText }}</div>
    <button @click="changeText">改变</button>
  </div>
</template>

<script setup lang="ts" name="App">
import Hello from './Hello.vue';
import { ref, reactive, isRef, shallowRef, triggerRef, customRef, readonly, shallowReactive, toRef, toRefs, toRaw } from 'vue'
import type { Directive } from 'vue';
import Abc from './components/Abc.vue'
import H5 from './components/H5.vue';
import { useTextStore } from './store/Text'; // [!code focus:31]

const text = useTextStore()

const changeText = () => {
  //直接修改
  text.text = 'hello world123789' 

  //修改整体store
  text.$patch({
    text: 'hello',
    count: 10
  })

  //函数形式
  text.$patch((state)=>{
    state.text = 'testt'
    state.count = 10
  })
  
  //修改state 必须修改state里面所有的值
  text.$state = {
    text: 'change',
    count: 798
  }

  //触发更新actions
  text.changeText()
}

</script>

<style module="tom">
.blue {
  color: blue;
}
</style>
```

##### 3.结构store

```ts
const test = useTextStore()

const { text, count } = test



const changeText1 = () => {
  test.count++
  console.log(text, count, ' test')
}

console.log(text, count, ' test')
```

但是结构的值会失去响应性，可以利用storeToRefs将结构后的值添加响应性

```ts
const test = useTextStore()

const { text, count } = storeToRefs(test)



const changeText1 = () => {
  test.count++
  console.log(text.value, count.value, ' test')
}

console.log(text.value, count.value, ' test')
```

##### 4.Actions 与 getter

action也支持同步异步

```ts
import { defineStore } from "pinia";
import { Name } from "./store-namespace";

interface Result {
  name:string,
  isChu:number
}

const getLogin = ():Promise<Result> => { //异步请求接口
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "123",
        isChu: 1
      })
    }, 1000)
  })
}


export const useTextStore = defineStore( Name.Test, {

  state: () => {
    return {
      user: <Result>{},
      name:"123"
    }
  },
  actions: {
    async getLogin(){
      const res = await getLogin()
      this.user = res
      this.setName(res.name) //action也可以互相调用
    },
    setName(name:string){
      this.name = name
    }
  }
});
```

getters

作用类似于computed 数据修饰并且有缓存

普通函数形式

```js
 getters:{
     newCurrent ():number {
         return ++this.current
     }
  },
```

箭头函数不可使用this ，this指向已经改变

```js
    getters:{
       newPrice:(state)=>  `$${state.user.price}`
    },
```

互相调用

```js
    getters:{
       newCurrent ():number | string {
           return ++this.current + this.newName
       },
       newName ():string {
           return `$-${this.name}`
       }
    },
```

##### 5.API

- $reset 重置store状态

```ts
import { useTextStore } from './store/Text'; // [!code focus:31]

const text = useTextStore()
text.$patch({
    text: 'hello',
    count: 10
  })
test.$reset();
```

- $subscribe 订阅store的改变 类似watch

```ts

import { useTextStore } from './store/Text'; // [!code focus:31]

const text = useTextStore()
text.$patch({
    text: 'hello',
    count: 10
  })

text.$subscribe((args,state)=>{
   console.log(args,state);
   
},{
  detached:true//组件卸载之后还想调用 配置true
                })
```

- $onAction 订阅action的调用

```ts
text.$onAction((args)=>{
   console.log(args);
   
})
```

##### 6.pinia插件

```vue
const __piniaKey = '__PINIAKEY__'
//定义兜底变量
 
 
type Options = {
   key?:string
}
//定义入参类型
 
 
 
//将数据存在本地
const setStorage = (key: string, value: any): void => {
 
localStorage.setItem(key, JSON.stringify(value))
 
}
 
 
//存缓存中读取
const getStorage = (key: string) => {
 
return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {})
 
}
 
 
//利用函数柯丽华接受用户入参
const piniaPlugin = (options: Options) => {
 
//将函数返回给pinia  让pinia  调用 注入 context
return (context: PiniaPluginContext) => {
 
const { store } = context;
 
const data = getStorage(`${options?.key ?? __piniaKey}-${store.$id}`)
 
store.$subscribe(() => {
 
setStorage(`${options?.key ?? __piniaKey}-${store.$id}`, toRaw(store.$state));
 
})
 
//返回值覆盖pinia 原始值
return {
 
...data
 
}
 
}
 
}
 
 
//初始化pinia
const pinia = createPinia()
 
 
//注册pinia 插件
pinia.use(piniaPlugin({
 
key: "pinia"
 
}))
```

