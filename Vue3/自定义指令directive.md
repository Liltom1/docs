#### 自定义指令directive

除了 Vue 内置的一系列指令 (比如 `v-model` 或 `v-show`) 之外，Vue 还允许你注册自定义的指令 (Custom Directives)。

##### 指令的钩子函数

```ts
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```

##### 关于参数

- `el`：指令绑定到的元素。这可以用于直接操作 DOM。
- `binding`：一个对象，包含以下属性。
  - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
  - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
  - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
  - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
  - `instance`：使用该指令的组件实例。
  - `dir`：指令的定义对象。
- `vnode`：代表绑定元素的底层 VNode。
- `prevVnode`：代表之前的渲染中指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

##### 使用方式一

```vue
<template>
  <div v-move class="box">
      <div class="header">

      </div>
  </div>
</template>

<script setup lang="ts" name="App">
import Hello from './Hello.vue';
//认识 ref,reactive Ref
import type { Ref } from 'vue'
import { ref,reactive, isRef, shallowRef, triggerRef , customRef, readonly , shallowReactive , toRef , toRefs , toRaw } from 'vue' 
import type { Directive } from 'vue';

// [!code focus:30]
//生成拖拽指令vmove 固定模式v开头指令名字大写 
const vMove:Directive = { 
  mounted(el:HTMLElement){
    let moveEl = el.firstElementChild as HTMLElement
    const mouserOn = (e:MouseEvent)=>{
      let X = e.clientX - el.offsetLeft
      let Y = e.clientY - el.offsetTop
      const move =(e:MouseEvent)=>{
        let left = e.clientX - X
        let top = e.clientY - Y
        el.style.left = left + 'px'
        el.style.top = top + 'px'
      }
      document.addEventListener('mousemove',move)
      document.addEventListener('mouseup',()=>{
        document.removeEventListener('mousemove',move)
      })
    }
    moveEl.addEventListener('mousedown',mouserOn)
  }
}

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

##### 简写方式

```vue
<template>
    <div>
        <div v-for="item in arr">
            <img height="500" :data-index="item" v-lazy="item" width="360" alt="">
        </div>
    </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import type { Directive } from 'vue'
const images: Record<string, { default: string }> = import.meta.globEager('./assets/images/*.*')
let arr = Object.values(images).map(v => v.default)
 
let vLazy: Directive<HTMLImageElement, string> = async (el, binding) => {
    let url = await import('./assets/vue.svg')
    el.src = url.default;
    let observer = new IntersectionObserver((entries) => {
        console.log(entries[0], el)
        if (entries[0].intersectionRatio > 0 && entries[0].isIntersecting) {
            setTimeout(() => {
                el.src = binding.value;
                observer.unobserve(el)
            }, 2000)
        }
    })
    observer.observe(el)
}
 
</script>
 
<style scoped lang='less'></style>
```

