vue生命周期

一个组件从创建到销毁的一个过程

```vue
<template>
  <div ref="h1">{{ a }}</div>
  <!-- <div ref="h1" >123</div> -->
  <button @click="onChange">改变</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onBeforeMount,onMounted , onBeforeUpdate, onUpdated,onBeforeUnmount,onUnmounted } from 'vue';
// const a:number[] = [1,2,3,4,5]
const a = ref<string>('12') 
const h1 = ref<HTMLDivElement>()
const onChange = ()=>{
  a.value = '50'
  console.log(h1.value)
}
//创建之前拿不到 dom对象
onBeforeMount(()=>{
  console.log()
  console.log('组件创建之前',h1.value) //组件创建之前 undefined
})
//创建之后可以取到 dom对象
onMounted(()=>{
  console.log('组件创建之后',h1.value) //组件创建之后 <div data-v-e17ea971>​12​</div>​
})
//组件修改之前 获取的是之前dom对象的值
onBeforeUpdate(()=>{
  console.log('组件修改之前',h1.value?.innerText) //组件修改之前 12
})
//组件修改之后 获取的是最新dom对象的值
onUpdated(()=>{
  console.log('组件修改之后',h1.value?.innerText)//组件修改之后 50
})
onBeforeUnmount(()=>{
  console.log('组件销毁之前') //组件销毁之前 50
})
onUnmounted(()=>{
  console.log('组件销毁之后')//组件销毁之后 undefined
})
</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>

```

