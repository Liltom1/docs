#### ``vue3``响应式原理

1.监听数据的变化使用Proxy

``reactive.ts``文件

```ts
import { track , trigger } from "./effect"
const isObject = (target:any) => target != null && typeof target == 'object'
export const reactive = <T extends object>(target:T)=>{
    return new Proxy(target,{
        get(target, p, receiver){//监听get操作
            let res = Reflect.get(target, p, receiver)
            track(target,p as string) //将数据所管理的视图变化收集起来
            if (isObject(res)) {
                return reactive(res as object)
            }
            return res
        },
        set(target, p, newValue, receiver) {//监听set操作
            trigger(target, p as string)//触发关联是视图变化
            return Reflect.set(target, p, newValue, receiver)
        },
    })
}
```

##### 2.收集数据关联的视图变化，以及触发

``effect.ts``文件

```ts
let activeEffect:Function ;
export const effect1 = (fn:Function) => { //创建副作用函数
     const _effect = function () {
        activeEffect = _effect;
        fn()
     }
     _effect()
}

const targetMap = new WeakMap()
export const track = (target:object,key:string)=>{//收集依赖
    let depMap =  targetMap.get(target)
    if (!depMap) {
        depMap = new Map()
        targetMap.set(target,depMap)
    }
    let deps =  depMap.get(key)
    if (!deps) {
        deps = new Set()
        depMap.set(key,deps)
    }
    deps.add(activeEffect)
}

export const trigger = (target:object,key:string)=>{//触发依赖
    const depMap =  targetMap.get(target)
    const deps = depMap.get(key)
    deps.forEach((element:Function)=> {
        element()
    });
}   
```

html文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="#app">

    </div>
    <script type="module">
        import { reactive } from './reactive.js'
        import { effect1 }  from './effect.js'
        
        const user = reactive({
            name:'打满',
            age:19
        })  
        effect1(()=>{
            document.querySelector('#app').innerHTML = `${user.name}`-`${user.age}`
        })
    </script>
</body>
</html>
```

