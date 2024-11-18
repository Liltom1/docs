---
prev:
  text: 'TypeScript元组'
  link: '../TypeScript/TypeScript元组'
next:
  text: 'namespace(命名空间)'
  link: '../TypeScript/namespace(命名空间)'
---
##### Symbol

```ts
const symbol1 = Symbol('666')
const symbol2 = Symbol('777')
const obj1 = {
  [symbol1]: '小满',
  [symbol2]: '二蛋',
  age: 19,
  sex: '女'
}
// 1 for in 遍历
for (const key in obj1) {
  // 注意在console看key,是不是没有遍历到symbol1
  console.log(key)
}
// 2 Object.keys 遍历
Object.keys(obj1)
console.log(Object.keys(obj1))
// 3 getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1))
// 4 JSON.stringfy
console.log(JSON.stringify(obj1))
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
console.log(Object.getOwnPropertySymbols(obj1))

// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))

//Symbol的iterator 迭代器
const arr:number[] = [1,2,3]
let iterator = arr[Symbol.iterator]()

console.log(iterator.next(),'obj2')

function* gen() {
  yield '1'
}
const a = gen()
console.log(a.next())

let set:Set<number> = new Set([1,2,3,4,5,1,2,3,4,5])
console.log(set)

let map:Map<number| Array<string> ,string> = new Map()
let Arr = ['123','456' ,'789']
map.set(Arr,'小满')
map.set(21, '大满')
console.log(map.get(Arr),'map')

const fn1 = (value:any) =>{
  const it:any = value[Symbol.iterator]()
  let result:any = { done:false }
  while(!result.done){
    result = it.next()
    console.log(result)
    if(!result.done){
      console.log(result.value)
    }
  }
}
fn1(map)

```

#### 泛型

- 泛型函数

```ts
//传入什么类型就是什么类型
function add<T>(a:T, b:T):Array<T>{
  return [a,b]
} 

add<string>('1','2')
add(1,2)


```

- 泛型字面量

```ts
//泛型字面量
type A<T> = string | number | T
const a:A<boolean> = true
type b = {
  a:string
}
interface B<T> {
    mag:T
}

let man:B<string> = {
  mag:'123',
}
```

```ts
const axios = {
  get<T>(url:string):Promise<T>{
    return new Promise((resole, reject) =>{
        const xhr:XMLHttpRequest = new XMLHttpRequest()
        xhr.open('GET',url)
        xhr.onreadystatechange =()=>{
          if (xhr.readyState === 4 && xhr.status === 200 ) {
            resole(JSON.parse(xhr.responseText))
          }
        }
        xhr.send(null)
    })
  }
}

interface Data {
  message:string
  data:number
}

axios.get<Data>('./indes.ts').then(res=>{
  res.message
})
```

泛型接口与泛型约束

```ts
interface Data {
  length:number
}

function getLen<T extends Data>(str:T):number{
  return str.length
}

getLen<string>('123')

let obj = {
  a:1,
  b:'123'
}

type key = keyof typeof obj

function getProperty<T extends object, K extends keyof T>(obj: T, key: K){
  return obj[key]
}

getProperty(obj,'a')

interface C {
  a:number
  b:string
}

type option<T extends object> = {
  [key in keyof C]?: C[key]
}

type D = option<C>
```

