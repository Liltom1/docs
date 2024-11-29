#### 自定义hooks

官方的叫法组合式API

组合式 API (Composition API) 是一系列 API 的集合，使我们可以使用函数而不是声明选项的方式书写 Vue 组件

虽然这套 API 的风格是基于函数的组合，但**组合式 API 并不是函数式编程**。组合式 API 是以 Vue 中数据可变的、细粒度的响应性系统为基础的，而函数式编程通常强调数据不可

组合式 API 最基本的优势是它使我们能够通过组合函数来实现更加简洁高效的逻辑复用。在选项式 API 中我们主要的逻辑复用机制是 mixins，而组合式 API 解决了 mixins 的所有缺陷

##### 案例一（获取图片base64位地址）

```ts
import { onMounted } from "vue";

type Options = {
  el: string;
};

type Return = {
  Baseurl: string | null;
}

export default function (options: Options): Promise<Return> {
    return new Promise((resolve) => {
      onMounted(() => {
        const file:HTMLImageElement = document.querySelector(options.el) as HTMLImageElement
        console.log(file,'file')
        file.onload = () =>{
          resolve({
            Baseurl: toBase64(file)
          })
        }
      })

      const toBase64 = (file:HTMLImageElement) => {
        const canvas:HTMLCanvasElement = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.width = file.width
        canvas.height = file.height
        context?.drawImage(file, 0, 0, file.width, file.height)
        return canvas.toDataURL('image/jpeg')
      }
    })
}
```

```vue
<template>
  <div>
    <img ref="img1" src="../asset/image/123.jpeg" alt="">
  </div>
</template>

<script setup lang="ts" name="App">
// import Hello from './Hello.vue';
// //认识 ref,reactive Ref
// import type { Ref } from 'vue'
import { ref,reactive, isRef, shallowRef, triggerRef , customRef, readonly , shallowReactive , toRef , toRefs , toRaw } from 'vue' 
import type { Directive } from 'vue';
import useBase from './base';

type Options = {
  el: string;
};
const image:Options = {
  el:'img'
}

useBase(image).then(res => {
  console.log(res.Baseurl,'res')
})


//生成拖拽指令vmove


</script>

<style scoped >
.box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  
}
.header {
    height: 20px;
    background: black;
    cursor: move;
  }
</style>
```

