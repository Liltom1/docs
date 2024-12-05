---
# prev:
#   text: '泛型工具2'
#   link: '../Vue3/泛型工具2'
next:
  text: 'Reactive'
  link: '../Vue3/Reactive'
---
#### 认识ref，Ref，isRef

##### 1.ref()

`ref()` 接收参数，并将其包裹在一个带有 `.value` 属性的 ref 对象中返回

```vue
<template>
  <div >
    <h2>我是App组件{{ x }}</h2>
  </div>
</template>

<script setup lang="ts" name="App">
//认识 ref,reactive Ref
import type { Ref } from 'vue'
import { ref,reactive } from 'vue' 

const x:Ref<number> = ref(12)
console.log(x) //Ref<12>
console.log(x.value) //12
</script>
```

##### 2.Ref

Ref TS对应的接口

```ts
interface Ref<T> {
  value: T
}
```

##### 3.isRef

判断是不是一个ref对象

```vue
<script setup lang="ts" name="App">
//认识 ref,reactive Ref
import type { Ref } from 'vue'
import { ref,reactive, isRef} from 'vue' 

let message: Ref<string | number> = ref("我是message")
let notRef:number = 123
const changeMsg = () => {
  message.value = "change msg"
  console.log(isRef(message)) //true
  console.log(isRef(notRef)) //false
}
changeMsg()
</script>
```

##### 4.shallowRef()

和 `ref()` 不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 `.value` 的访问是响应式的。

`shallowRef()` 常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成

```vue
<script setup lang="ts" name="App">
//认识 ref,reactive Ref
import type { Ref } from 'vue'
import { ref,reactive, isRef ,shallowRef} from 'vue' 

type User = {
  name: string,
}

let user:Ref<User> = shallowRef({
  name: "张三"
})
const changeMsg = () => {
  user.value.name = '满' //不会触发更改，视图不会变化
  user.value = {
    name: "李四" //会触发更改，视图变化 
  }
}
</script>
```

##### 5.triggerRef()

强制触发依赖于一个[浅层 ref](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 的副作用，这通常在对浅引用的内部值进行深度变更后使用。

类型

```ts
function triggerRef(ref: ShallowRef): void
```

用法

```vue
<script setup lang="ts" name="App">
import type { Ref } from 'vue'
import { ref,reactive, isRef, shallowRef, triggerRef} from 'vue' 

type User = {
  name: string,
}

let user:Ref<User> = shallowRef({
  name: "张三"
})
const changeMsg = () => {
  user.value.name = '满'
  triggerRef(user) //强制触发跟新
}
</script>
```

##### 6.customRef()

`customRef()` 预期接收一个工厂函数作为参数，这个工厂函数接受 `track` 和 `trigger` 两个函数作为参数，并返回一个带有 `get` 和 `set` 方法的对象。

一般来说，`track()` 应该在 `get()` 方法中调用，而 `trigger()` 应该在 `set()` 中调用。然而事实上，你对何时调用、是否应该调用他们有完全的控制权。

```vue
<script setup lang="ts" name="App">
import type { Ref } from 'vue'
import { ref,reactive, isRef, shallowRef, triggerRef ,customRef} from 'vue' 

function cus<T>(value: any) {
  let timeout:any
  return customRef((track, trigger) => {
    return{
       get(){
          track()
          return value
        },
       set(newValue){
         clearTimeout(timeout)
         timeout = setTimeout(() =>{
           value = newValue
           trigger()
         })
       }
    }
  })
}

const x = cus<string>('man')
const changeMsg = () => {
  x.value = 'woman'
}
</script>
```

