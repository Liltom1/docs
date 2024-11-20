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

