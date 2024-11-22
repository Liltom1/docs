#### watch,watchEffect

##### 1.监听Ref 

```vue
<template>
  <h2 style="color: red;">你好！{{ p }}</h2>
  <button @click="onChange">改变</button>
</template>

<script setup lang="ts">
import { computed, reactive, ref , watch  } from 'vue'
let p =  reactive({// [!code focus:17]
  nav:{
    bar:{
      name:'hello'
    }
  }
})

function onChange() {
  p.nav.bar.name = 'world'
}
watch(p,(newVal,oldVal)=>{
  console.log(newVal,oldVal)
},{
  immediate:true,
  deep:true
})

</script>

```

##### 2.监听多个值

```vue
<template>
  <h2>{{ p }}</h2>
  <button @click="onChange">改变</button>
</template>

<script setup lang="ts">
import { computed, reactive, ref , watch  } from 'vue'
let p =  reactive({ // [!code focus:20]
  nav:{
    bar:{
      name:'hello'
    }
  }
})

let a = ref(1)

function onChange() {
  p.nav.bar.name = 's'
  a.value++
}
watch([a,p],(newVal,oldVal)=>{
  console.log(newVal,oldVal)
},{
  // immediate:true,
  deep:true
})

</script>

```

##### 3.监听reactive

```ts
import { computed, reactive, ref , watch  } from 'vue'
let p =  reactive({
  nav:{
    bar:{
      name:'hello'
    }
  }
})

let a = ref(1)

function onChange() {
  p.nav.bar.name = 's'
  a.value++
}

watch(p,(newVal,oldVal)=>{
  console.log(newVal,oldVal)
},{
  // immediate:true,
  deep:true
})

//监听单一值的情况
watch(()=>p.nav.bar.name,(newVal,oldVal)=>{
  console.log(newVal,oldVal)
},{
  // immediate:true,
  deep:true
})
```

##### 4.watchEffect

立即执行传入的一个函数，同时[响应式](https://so.csdn.net/so/search?q=响应式&spm=1001.2101.3001.7020)追踪其依赖，并在其依赖变更时重新运行该函数。只能监听ref包装过的数据。

```vue
<template>
  <input type="text" v-model="a">
  <input type="text" v-model="b">
  <button @click="onChange">改变</button>
  <button @click="onChange1">改变2</button>
</template>

<script setup lang="ts">
import { computed, reactive, ref , watch ,watchEffect } from 'vue'
let p =  reactive({
  nav:{
    bar:{
      name:'hello'
    }
  }
})

let a = ref(1)// [!code focus:17]
let b = ref(8)

function onChange() {
  p.nav.bar.name = 's'
  a.value++
}

function onChange1() {
  b.value++
}
//先调用oninvalidate函数再触发监听
watchEffect((oninvalidate)=>{
  oninvalidate(()=>{
    console.log('message',p.nav.bar.name,a.value,b.value);
  })
  console.log('message2', p ,a.value ,b.value);
},{
    //pre  组件更新前执行 sync  强制效果始终同步触发   post  组件更新后执行
    flush:"post",// 一般使用post , onTrigger会在oninvalidate之前执行
    onTrigger () {
      console.log('onTrigger')
    }
})
</script>
```

