---
next:
  text: '泛型工具1'
  link: '../TypeScript/泛型工具1'
prev:
  text: '封装LocalStorage'
  link: '../TypeScript/封装LocalStorage'
---
#### Proxy Reflect

proxy 拦截对象  Reflect 反射对象也就是操作对象，两者参数也是一样

```ts
person.name
person.age = 15
let personProxy = new Proxy(person,{
    //取值
    get(target, p, receiver) {
        
    },
    //赋值
    //person name 15 receiver/person
    set(target, p, newValue, receiver) {
        return true
    },
    //拦截函数调用
    apply(){

    },
    //拦截in操作符
    // a in window
    has(target, p) {
        return true
    },
    //拦截
    // for(let key in xxx)
    ownKeys(target) {
        return ['1']
    },
    //拦截new 操作符
    construct(){
        return {}
    },
    //拦截删除操作
    deleteProperty(){
        return true
    }
})
```

Reflect可以直接对对象进行操作并返回一个boolean值

```ts
let personProxy = new Proxy(person,{
    get(target, p, receiver) {
        if (target.age <= 18) {
            return Reflect.get(target, p, receiver)
        }else{
            return 'ok'
        }
    },
})
console.log(Reflect.get(person,'name',person))
console.log(personProxy.age)
```

简单的观察者模式

```ts
const list:Set<Function> = new Set()

const autorun = (cb:Function)=>{
    if (!list.has(cb)) {
        list.add(cb)
    }
}
const obs =  <T extends object>(parmas:T)=>{
    return new Proxy(parmas,{
        set(target, p, newValue, receiver) {
            const result = Reflect.set(target, p, newValue, receiver)
            list.forEach(fn => fn())
            return result
        },
    })
}


let obj = obs(person)

autorun(()=>{
    console.log('变化！')
})
obj.name = 'jay'

```

