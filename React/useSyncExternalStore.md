### useSyncExternalStore

用于从外部存储（例如状态管理库、浏览器 API 等）获取状态并在组件中同步显示。这对于需要跟踪外部状态的应用非常有用

#### 使用场景

- 订阅外部 store 例如(redux,Zustand`德语`)
- 订阅浏览器API 例如(online,storage,location)等
- 抽离逻辑，编写自定义hooks
- 服务端渲染支持

#### 如何使用

**useSyncExternalStore**(subscribe, getSnapshot, getServerSnapshot?)

- subscribe 用来订阅数据源的变化，接收一个回调函数，在数据源更新时调用该回调函数
- getSnapshot 获取当前数据源的快照（当前状态）
- getServerSnapshot 在服务器端渲染时用来获取数据源的快照

#### 用例useStorage

getSnapshot 部分

从localStorage中获取数据 如果读不到返回默认值

```js
const getSnapshot = () => {
    return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null) || defaultValue
  }
```

subscribe 部分

去订阅storage改变事件

```js
const subscribe = (callback: () => void) => {
    window.addEventListener('storage', (e) => {
      console.log('触发了', e)
      callback()
    })
    return () => window.removeEventListener('storage', callback)
  }
```

#### 完整代码

```ts
import { useSyncExternalStore } from "react"

/**
 * 
 * @param key 存储到localStorage 的key
 * @param defaultValue 默认值
 */
export const useStorage = (key: any, defaultValue?: any) => {
  const subscribe = (callback: () => void) => {
    window.addEventListener('storage', (e) => {
      console.log('触发了', e)
      callback()
    })
    return () => window.removeEventListener('storage', callback)
  }
  //从localStorage中获取数据 如果读不到返回默认值
  const getSnapshot = () => {
    return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null) || defaultValue
  }
  //修改数据
  const setStorage = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new StorageEvent('storage')) //手动触发storage事件
  }
  //返回数据
  const res = useSyncExternalStore(subscribe, getSnapshot)

  return [res, setStorage]
}
```

