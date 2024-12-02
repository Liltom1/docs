---
next:
  text: 'Transition(动画组件)'
  link: '../Vue3/Transition(动画组件)'
---
#### Teleport(传送组件)

使用vue中的内置组件`teleport`组件

`teleport` 组件包裹的模板可以渲染到我们指定的DOM节点下，不受父级的style样式，和v-show属性影响

```vue
<Teleport to="body">
    <Modal></Modal>
</Teleport>
```

`to`的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。

> [!TIP]
>
> `<Teleport>` 挂载时，传送的 to 目标必须已经存在于 DOM 中。理想情况下，这应该是整个 Vue 应用 DOM 树外部的一个元素。如果目标元素也是由 Vue 渲染的，你需要确保在挂载 `<Teleport>` 之前先挂载该元素。

另一个配置项`disabled` disabled 设置为 true则 to属性不生效 false 则生效

```vue
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

这里的 `isMobile` 状态可以根据 CSS media query 的不同结果动态地更新。

多个Teleport共享目标

```vue
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```

渲染Dom结果

```vue
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

