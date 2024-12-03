---
prev:
  text: 'ProvideInject(依赖注入)'
  link: '../Vue3/ProvideInject(依赖注入)'
next:
  text: 'Tsx'
  link: '../Vue3/Tsx'
---
#### Mitt

全局事件总线

##### 1.安装

```cmd
npm install mitt -S
```

##### 2.使用

在main.ts中，引用mitt

```ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// [!code focus,9]
import mitt from 'mitt' //引用
const emitter = mitt() //调用
export const app = createApp(App)
declare module 'vue' { //声明
    export interface ComponentCustomProperties {
        $Bus: typeof emitter
    }
}
app.config.globalProperties.$Bus = emitter //挂载到全局app上
app.component('Menu', Menu)
app.mount('#app')

```

在组件中使用

A组件

```vue
<template>

 <div>
    <button @click="Onhandler()" >我是A组件</button>
 </div>

</template>

<script setup lang='ts'>
import { ref,reactive} from 'vue' // [!code focus:8]
import { getCurrentInstance } from 'vue'; //引入getCurrentInstance方法

const instance = getCurrentInstance();//获取
function Onhandler(){
    instance?.proxy?.$Bus.emit("on-click","我是A组件") //挂载on-click事件
    console.log("hello ,我是A组件")
}

</script>
<style scoped>

</style>
```

B组件

```vue
<template>

 <div>

 </div>

</template>

<script setup lang='ts'>
import { ref,reactive} from 'vue'// [!code focus:11]
import { getCurrentInstance } from 'vue';

const instance = getCurrentInstance();

instance?.proxy?.$Bus.on('on-click', (str:string) => {//监听on-click事件
    console.log(str,'B组件')   
});
instance?.proxy?.$Bus.on('*', (type,str:string) => { //监听所有 type为事件名称
    console.log(type,str,'B组件')   
});
instance?.proxy?.$Bus.off('on-click',bus)//清除监听
instance?.proxy?.$Bus.all.clear()//清除所有
</script>
<style scoped>

</style>
```

