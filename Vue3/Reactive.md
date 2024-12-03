---
prev:
  text: 'ref,Ref,reactive'
  link: '../Vue3/ref,Ref,reactive'
next:
  text: 'vue3响应式原理'
  link: '../Vue3/vue3响应式原理'
---
#### Reactive

##### 1.reactive()

返回一个对象的响应式代理

- 类型

```ts
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```

- 示例

```ts
const a = reactive({
  name: '张三'
})
a.name = "大满"
```

- 数组类型

```ts
  let person = reactive<number[]>([])
  person = [1, 2, 3] //这样赋值触发不了跟新
  //利用push或者用对象包裹
  console.log(person);
```

- readonly

```ts
let person = reactive<object>({
  name: '张三',
  age: 18
})

const copy = readonly(person)
copy.name = '大满' //报错
```

##### 2.shallowReactive()

```ts
let obj = shallowReactive({
  d:1,
  t1:{
    a:1,
    t2:{
      b:2,
      t3:{
        c:3
      }
    },
  }
})

const changeMsg = () => {
  obj.d = 111
}
```

只能对浅层数据有作用，obj.d 可以 但是obj.t1.a赋值不会触发视图跟新，数据会改变
