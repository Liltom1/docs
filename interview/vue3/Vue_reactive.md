# reactive源码部分

reactive主要功能是对，对象的监听，监听对象获取属性，设置属性值get 与 set，利用proxy来代理

## 第一版

### 其中有两个需要注意的点

- 同一个对象代理多次，需要使用WeakMap存储，原对象与代理对象的一对一的映射 
- 被代理过的对象，如果再次代理，直接返回 

大致代码如下

reactive.ts

```ts

import { isObject } from '@vue/shared'
import { ReactiveFlags, mutableHandlers } from './baseHandler'

//用来判断是否有同一个对象进行重复proxy代理
const reactiveMap = new WeakMap()

function createReactiveObject(target){
  if (!isObject(target)) {
    return
  }

  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }

  const exitsProxy = reactiveMap.get(target)
  if (exitsProxy) {
    return exitsProxy
  }


  let proxy =  new Proxy(target,mutableHandlers)
  reactiveMap.set(target, proxy)
  return proxy
}

export function reactive(target) {
  return createReactiveObject(target)
}
```

baseHandler.ts文件

```ts
import { track } from './reactiveEffect'
//用来判断是否已经被代理过的对象，再次代理
export enum ReactiveFlags{
  IS_REACTIVE = "__v_isReactive"
}


//proxy 需要搭配 reflext 来使用， Reflect是在代码执行时，修改代码执行行为,
//在对象上有属性访问器时，需要使用Reflect方法，对属性访问器里面获取或者操作对象属性的this重新修改指向
export const mutableHandlers: ProxyHandler<any> = {
  get(target,key,reciver){
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true
    }

    //依赖收集

    track(target,key)
    return Reflect.get(target,key,reciver)
  },
  set(target, key, value, reciver){

    //触发更新
    return Reflect.set(target, key, value ,reciver)
  }
}
```

### 如何判断对象是否被代理过？

1.被proxy代理过的对象，是可以触发get方法的

2.在已经被代理过的proxy代理过的对象,再次代理之前，去访问属性，看是否可以触发get

```ts
if (target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }
```

3.如果触发了，看触发的key是否为__v_isReactive，此时就可证明，对象被代理过，直接返回原对象即可