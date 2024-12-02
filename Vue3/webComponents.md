---
next:
  text: 'computed'
  link: '../Vue3/computed'
---
#### webComponents

##### 原生封装

原生对视图层的封装能力， javaScript、css、html模板运行在以html标签为界限的局部环境中，不会影响到全局，组件间也不会相互影响，自定义标签的能力

```js

//Shadow DOM（影子DOM）：JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，开发者可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。

class Btn extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});//创建沙箱环境 进行隔离
        //原生模式
        // this.p = this.h('p');
        // this.p.innerText = 'hello world';
        // this.p.setAttribute('style','width: 100px;height: 100px;background: red;color: #fff;text-align: center;line-height: 100px;');
        // shadow.appendChild(this.p);
        //组件模式
        const template = this.h('template');
        template.innerHTML = `
        <style>
            .btn{
                width: 100px;
                height: 100px;
                background: blue;
                color: #fff;
                text-align: center;
                line-height: 100px;
            }
        </style>
        <div class="btn">hello world</div>
        `
        //其中的style标签样式也会被隔离
        shadow.appendChild(template.content.cloneNode(true));//克隆节点
    }
    h(el){
        return document.createElement(el);
    }
     /**
     * 生命周期
     */
    //当自定义元素第一次被连接到文档 DOM 时被调用。
    connectedCallback() {
        console.log('我已经插入了！！！嗷呜')
    }
 
    //当自定义元素与文档 DOM 断开连接时被调用。
    disconnectedCallback() {
        console.log('我已经断开了！！！嗷呜')
    }
 
    //当自定义元素被移动到新文档时被调用
    adoptedCallback() {
        console.log('我被移动了！！！嗷呜')
    }
    //当自定义元素的一个属性被增加、移除或更改时被调用
    attributeChangedCallback() {
        console.log('我被改变了！！！嗷呜')
    }
}

window.customElements.define('btn-component', Btn);//挂载到windows上
```

使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./btn.js" ></script>
</head>
<body>
    <btn-component></btn-component>
</body>
</html>
```

vue结合webComponents

vite.config.ts文件中

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue({ // [!code focus:6]
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('tom-') //排除tom开头标签不必被vite编译
      }
    }
  }),vueJsx(),AutoImport({
    imports:['vue'],
    dts:'src/auto-imports.d.ts'
  })],
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:"@import './src/bem.scss';"
      }
    }
  }
})

```

父组件

```vue
<template> 
  <div>
     <tom-btn></tom-btn>
  </div>
</template>

<script setup lang="ts">

import { defineCustomElement } from 'vue';
import TomBtnCe from './components/TomBtn.ce.vue';  //子组件 文件名称有规定要求 以.ce.vue结尾

const TomBtn = defineCustomElement(TomBtnCe);
console.log('customElements', customElements);
customElements.define('tom-btn', TomBtn)

</script>

<style lang="scss">

</style>

```

**子组件 文件名称有规定要求 以.ce.vue结尾**

```vue
<template>

 <div>12313</div>

</template>

<script setup lang='ts'>
import { ref,reactive} from 'vue'

</script>
<style scoped>

</style>
```

