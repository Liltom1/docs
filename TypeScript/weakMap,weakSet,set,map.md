---
prev:
  text: 'TypeScript(装饰器)'
  link: '../TypeScript/TypeScript(装饰器)'
next:
  text: '封装LocalStorage并支持过期时间'
  link: '../TypeScript/封装LocalStorage并支持过期时间'
---
#### ```weakMap```，```weakSet```，set，map

- set

```ts
//1.set(集合，和数组相似)
let set1:Set<number> = new Set([1,2,3,4,5,5,2,1])
console.log(set1,'set1')
//Set(5) { 1, 2, 3, 4, 5 } set1 可以去重
//方法
set1.add(6) //添加
set1.delete(1) //删除
set1.has(1) //判断是否存在
set1.clear() //清空
console.log(set1.size,'set1')//长度

```

- map

类似对象，但是键可以是任意类型包括对象

```ts
let map1:Map<object,number> = new Map()
let objm = { name: '1' }
let map: Map<object, number> = new Map()
map.set(objm, 589)//添加
map.get(objm)
console.log(map.get(objm),'map.get(objm)')
map.has(objm)//判断是否存在
console.log(map,map.size, 'map')
map.delete(objm)
//589 map.get(objm)
//Map(1) { { name: '1' } => 589 } 1 map
```

- #### ``WeakSet`` 和 ``WeakMap``

```weakSet``` 和 ``weakMap`` 的键是弱引用，不会被计入垃圾回收

```ts
let obj:any = {name:'小满zs'} //1
let aahph:any = obj //2
let wmap:WeakMap<object,string> = new WeakMap()
 
wmap.set(obj,'爱安徽潘慧') //2 他的键是弱引用不会计数的
 
obj = null // -1
aahph = null;//-1
//v8 GC 不稳定 最少200ms
 
setTimeout(()=>{
    console.log(wmap)
},500)
```

