---
next:
  text: 'watch'
  link: '../Vue3/watch'
---
#### computed

计算属性依赖的属性的值发生变化的时候，才会触发他的更改，如果依赖的值，不发生变化的时候，使用的是缓存中的属性值

##### 1.函数形式

```ts
import { computed, reactive, ref } from 'vue'
let p = ref(12)
 
let m = computed<number>(()=>{
   return  p.value + 5
})
```

##### 2.对象形式

```ts
import { computed, reactive, ref } from 'vue'
let p = ref(12)
 
let m = computed<number>({
  get(){
    return p.value
  },
  set(newVal){
    p.value = newVal
  }
})
 
```

##### 3.练习

```vue
<template>
  <input placeholder="输入商品名称" type="text" v-model="searchName">
  <table>
    <thead>
      <tr>
        <th>物品</th>
        <th>单价</th>
        <th>数量</th>
        <th>总价</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in selectedData"> 
        <td align="center">{{ item.name }}</td>
        <td align="center">{{ item.price }}</td>
        <td align="center">
          <button @click="item.count > 1 ? item.count-- : null">-</button>
            <input v-model="item.count" type="number">
          <button @click="item.count < 99 ? item.count++ : null">+</button>
        </td>
        <td align="center">{{ item.price * item.count }}</td>
        <td>
          <button @click="goods.splice(index,1)">删除</button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
          <td colspan="5" align="right">
            <span>总价：{{ total }}</span>
          </td>
        </tr>
      </tfoot>
  </table>
</template>

<script setup lang="ts">
import { ref,reactive, isRef, shallowRef, triggerRef , customRef, readonly , shallowReactive , toRef , toRefs , toRaw ,computed,watch } from 'vue'

let searchName =  ref<string>('')

interface Goods {
  name: string
  price: number
  count: number
}

let goods = reactive<Goods[]>([
  {
    name: '苹果',
    price: 5,
    count: 1,
  },
  {
    name: '香蕉',
    price: 3,
    count: 1,
  }
])

let selectedData = computed(() => {
  return goods.filter(item => item.name.includes(searchName.value))
})

let total = computed(() => {
  return goods.reduce((total, item) => {
    return total + item.price * item.count
  }, 0)
})

</script>

<style scoped>

</style>
```

