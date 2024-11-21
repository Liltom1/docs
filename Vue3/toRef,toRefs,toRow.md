#### toRef,toRefs,toRow

##### 1.toRef

如果对象是非响应式就不会更新视图 但是数据会改变

```ts
let obj = {
  a:1,
  b:55,
}

const state = toRef(obj,'a')
const changeMsg = () => {
  state.value = 222
}
```

如果原始对象是响应式的是会更新视图并且改变数据的

##### 2.toRefs

批量创建ref对象,主要是方便我们解构使用

```ts
let obj = {
  a:1,
  b:55,
}
const {  a, b } = toRefs(obj)
const changeMsg = () => {
  a.value = 222
}
```

##### 5.toRaw

将响应式对象转化为普通对象

```ts
let obj = {
  a:1,
  b:55,
}
const obj2 = reactive(obj)
const obj3 = toRaw(obj2)
```

