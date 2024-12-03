---
prev:
  text: 'vue3定义全局函数与变量'
  link: '../TypeScript/vue3定义全局函数与变量'
next:
  text: 'eventLoop&nextTick'
  link: '../Vue3/eventLoop&nextTick'
---
##### `css` Style完整新特性

##### 子组件改变插槽中的样式

父组件

```vue
<template>
  <div>
    <Abc>
      <div class="a" >12355</div>
    </Abc>
  </div>
</template>
```

子组件

:slotted(.a)方式更改插槽的样式

```vue
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="App">

</script>

<style scoped>
 :slotted(.a) {
    color:red
}
</style>
```

##### 全局选择器

```css
<style lang="less" scoped>
:global(div){
    color:red
}
</style
```

`:global` 不会受scoped的影响

##### 动态 CSS

css中可以使用v-bind

```vue
<template>
    <div class="div">
       123
    </div>
</template>
 
<script lang="ts" setup>
import { ref } from 'vue'
const red = ref<string>('red')
</script>
 
<style lang="less" scoped>
.div{
   color:v-bind(red)
}
 
</style>
```

##### css `module`

一个 `<style module>` 标签会被编译为 [CSS Modules](https://github.com/css-modules/css-modules) 并且将生成的 CSS class 作为 `$style` 对象暴露给组件

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

自定义注入名称

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

```ts
import { useCssModule } from 'vue'

// 在 setup() 作用域中...
// 默认情况下，返回 <style module> 的 class
useCssModule()

// 具名情况下，返回 <style module="classes"> 的 class
useCssModule('classes')
```

