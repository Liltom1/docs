---
prev:
  text: 'Transition(动画组件)'
  link: '../Vue3/Transition(动画组件)'
next:
  text: 'Mitt'
  link: '../Vue3/Mitt'
---
#### Provide/Inject(依赖注入)

由于父子组件嵌套过深导致利用defineProps传值不方便，提供方便传值方法

##### 1.Provide(提供)

父组件提供某些数据，任意子组件可以接收

```vue
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
    
const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

`provide()` 函数接收两个参数。第一个参数被称为**注入名**，可以是一个字符串或是一个 `Symbol`。后代组件会用注入名来查找期望注入的值。一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值。第二个参数是提供的值，值可以是任意类型，包括响应式的状态

##### 2.Inject(注入)

要注入上层组件提供的数据，需使用 [`inject()`](https://cn.vuejs.org/api/composition-api-dependency-injection.html#inject) 函数：

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

可以提前给注入数据设置默认值，当父组件没有提供传递数据时使用。

```js
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')
```

在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得。为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值:

```js
const value = inject('key', () => new ExpensiveClass(), true)
```

第三个参数表示默认值应该被当作一个工厂函数。

当使用字符串注入 key 时，注入值的类型是 `unknown`，需要通过泛型参数显式声明

```ts
const foo = inject<string>('foo') // 类型：string | undefined
```

