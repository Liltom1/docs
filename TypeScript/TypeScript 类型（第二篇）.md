---
prev:
  text: 'TypeScript 类型 （第一篇）'
  link: '../TypeScript/TypeScript 类型 （第一篇）'
next:
  text: 'TypeScript 类型（第三篇）'
  link: '../TypeScript/TypeScript类型（第三篇）'
---
# TypeScript 类型 （第二篇）

#### 1.Object,object ,{} 区别

```ts
//大写Object  表示包含了所有类型 （原型链的顶端）
let a:Object = 123
let a1:Object = '123'
let a2:Object = []
let a3:Object = { }

//小写object  一般表示泛型约束 非原始类型的一个类型
let b:object = 123 //错误
let b1:object = '123' //错误
let b2:object = [] //正确
let b3:object = { } //正确

//{} 字面量  与一样的功能 但赋值成对象后不可添加属性或修改属性值，一般不使用
let c:{} = 123 //错误
let c1:{} = '123' //错误
let c2:{} = [] //正确
let c3:{} = { name:'tom' } //正确
c3.name = 'sasd' //错误
c3.age = 10 //错误
```

#### 2.Interface

```ts
// 1.接口中定义的属性，对象中必须要有，不能多，也不能少
interface Abc {
    a:string
    b:number
}

interface Abc {//定义两个相同的接口，那么用来限制的对象上属性必须是这两个接口的并集
    a:string
    c:number
}

let obj:Abc = {
    a:'23',
    b:123,
    c:456
}



// 2.[propName:string]:any 定义一个 对象可以添加任何属性的接口 写法 
interface Abc {
    a:string
    [propName:string]:any //可以用any也可用unknown ,如果不使用这两种，用number的话接口定义的第一个属性的类型就必须和 propName 定义的类型一致，不然会报错
}

let obj:Abc = {
    a:'23',
    b:123,
}

//3.readonly 用来定义属性只读，大多数用来限制后端接口数据返回id不去修改
interface Abc {
    readonly id:number
    readonly cb:()=>void
}

let obj:Abc = {
    id:23,
    cb:()=>{
        return
    }
}
obj.id = 2 //错误
obj.cb = ()=>{ //错误
    return true
}

// 4. b?:number 在接口定义的属性后加上?，可以用来表示对象上这个属性可有可无
interface Abc {
    a:string
    b?:number
}

let obj:Abc = {
    a:'23',
}

// 5. extends 接口继承
interface Abc extends Cba{
    a:string
    b?:number
}

interface Cba {
    a:string
    c:number
}

let obj:Abc = { //错误 类型 "{ a: string; }" 中缺少属性 "c"，但类型 "Abc" 中需要该属性
    a:'23',
}
let obj:Abc = {//正确
    a:'23',
    c:123
}
// 6. function 定义函数
interface Fn {
    (num:number):string
}

const a:Fn = function (num:number){
    return '123'
}  

```

#### 3.数组

```ts
//数组
//定义普通类型
let arr:number[] = [1,2,3]
let arr1:Array<number> = [1,2,3]

//定义对象数组
interface A {
    name:string
}

let arr2:A[] = [ {name:'23'}] 

//二维数组
let arr3:number[][] = [[2]]

//数组中元素不同的数组
let arr4:any[] = [2,'123']

//数组在函数中的使用
interface B {
    callee:Function
    length:number
    [index:number]:any
}

function fn(...args:number[]){
    console.log(args)//[ 1, 2, 3 ]
    console.log(arguments) //[Arguments] { '0': 1, '1': 2, '2': 3 } 类数组
    let a:IArguments = arguments
    let a1:B = arguments
}

fn(1,2,3)

```

#### 4.function 函数

```ts
//1.常规用法
function fn(name:string,age:number ):string {
    return name + age
}

const a = (name:string,age:number):void  => console.log(name+age)

//2.函数默认参数，可选参数
function fn(name:string = 'Tom', age?:number ):string {
    return name + age
}
console.log(fn('JET'))//JETundefined
console.log(fn()) //Tomundefined

//3.函数参数为对象
interface A{
    age:number
    name:string
}

function fn(user:A):A{
    return user
}

//4.函数this类型
interface Obj{
    age:number[]
    add(this:Obj,num:number):void
}

let obj:Obj = {
    age:[1,2,3],
    add(this:Obj,num:number):void {
        this.age.push(num)
    }
}

obj.add(5)
console.log(obj)//{ age: [ 1, 2, 3, 5 ], add: [Function: add] }

//5.函数重载
let arr:number[] = [1,2,3]
function fn(id:number):number[] //传入单个id,查询详情
function fn(add:number[]):number[] //传入数组做添加
function fn():number[] //不传返回全部
function fn(ids?:number[] | number):number[]{
    if (typeof ids === 'number') {
        return arr.filter(v=> v === ids)
    }else if(Array.isArray(ids)){
        arr.push(...ids)
        return arr
    }else{
        return arr
    }
}
console.log(fn(1)) //[ 1 ]
console.log(fn([4,5,6])) //[ 1, 2, 3, 4, 5, 6 ]
console.log(fn()) //[1,2,3]
```

#### 5.联合类型 | 类型断言 | 交叉类型

```ts
//1.联合类型
let phone:number|string = 1212313
phone = '12154646'

let fun = (num:number|boolean ):boolean => {
    return !!num
}
//2.交叉类型
interface A {
    name:string
    age:number
}

interface B {
    sex:string
}

let man = ( uesr : A & B ):void => {
    console.log(uesr)
}

man({
    name:'Tom',
    age:20,
    sex:'男'
})

//3.类型断言
let fn = function(num:number|string):void{
    console.log( (<string>num).length ) 
}
fn(1234)
fn('1234')

interface C {
    a:string
}
interface D {
    b:number
}

let fn1 = function(num:C|D):void{
    console.log( (<C>num).a ) 
}
```

#### 6.内置对象

```ts
//内置对象 
//js有三部分组成
//1.ecma
let n:Number = new Number(1)
let d:Date = new Date()
let x:XMLHttpRequest = new XMLHttpRequest()
//2.dom
let input:HTMLInputElement | null = document.querySelector('input')
let div:HTMLDivElement | null = document.querySelector('div')
let sec:HTMLElement | null = document.querySelector('header')
//3.bom
let local:Storage = localStorage
let loca:Location = location
let promise:Promise<number>  = new Promise((res)=> res(1))
let cookie:string  = document.cookie
promise.then(res => {
    
})
```

代码雨

```ts

let canvas:HTMLCanvasElement = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.width = screen.availWidth
canvas.height = screen.availHeight

let str:string[] = 'tomzxzxzxzx010101'.split('')
let Arr:number[] = Array(Math.ceil(canvas.width / 10)).fill(0)

const fn = () => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = '#0f0'
    Arr.forEach((item,index)=>{
       ctx.fillText(str[Math.floor(Math.random() * str.length)],index*10,item+10)
       Arr[index] = item > canvas.height || item > 10000 * Math.random() ? 0 : item + 10
    })
}

setInterval(fn,40)
```

