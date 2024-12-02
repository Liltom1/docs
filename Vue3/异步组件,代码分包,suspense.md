---
next:
  text: 'Teleport(传送组件)'
  link: '../Vue3/Teleport(传送组件)'
---
#### 异步组件,代码分包,suspense

##### 1.异步组件

通过`defineAsyncComponent`方法将组件异步加载 通过`import`函数模式导入便可分包

```ts
const Com = defineAsyncComponent(() => import('../../components/Com/index.vue'))
  //完整配置项
  loader: () => import('./Foo.vue'),
  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,
 
  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
```

这样打包时会将`Com/index.vue`这个单独打包

其中有个顶层await

```vue
<script setup>
	const post = await axios.get<Data>('./data.json')
</script>
```

可以直接写await

##### 2.`suspense`

其中有两个插槽`#default `，本来要显示的组件，`#fallback`在默认组件显示之前显示的组件

```vue
 <Suspense>
        <template #default>
			<Com></Com> //异步组件，后显示
        </template>

        <template #fallback>
			<skeletonVue></skeletonVue>//不是异步的组件，先显示
        </template>
</Suspense>
```