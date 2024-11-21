#### watch

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

