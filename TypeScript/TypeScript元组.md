---
prev:
  text: 'TypeScript 类型（第三篇）'
  link: '../TypeScript/TypeScript类型（第三篇）'
next:
  text: 'TypeScript元组'
  link: '../TypeScript/TypeScript元组'
---
#### TypeScript元组

```ts
//元组数组的变种，元组中元素类型可以不同，并可以固定数量
let arry:[string,number] = ["213",10]
arry[0].length
arry[1].toFixed(2)
//元组数组中可以添加可选属性
let arry1: [x:string, y?:number] = ['123']
//越界元素
let arry2: [string,number] = ['123',10]
//越界的元素的类型只能为 联合类型，即string和number
arry2.push(10) //正确
arry2.push(false)//错误
```

#### 枚举

- 数字枚举

```ts
//枚举 用来定义一组命名常量 TypeScript 提供基于数字和基于字符串的枚举。
//数字枚举默认从0开始，也可以手动指定
enum Direction{
  Up,
  Down,
  Left,
  Right
}
// 当手动指定枚举值时，后续枚举值会递增，从定义的值开始
enum Direction1 {
  Up ,
  Down = 0,
  Left,
  Right
}
console.log(Direction1.Up,Direction1.Down,Direction1.Left,Direction1.Right)
//0 0 1 2
```

- 字符串枚举

```ts
//字符串枚举
//字符串枚举的每个成员必须手动赋值，在字符串枚举中，每个成员都必须使用字符串字面或另一个字符串枚举成员进行常量初始化
//主要用来提供一个运行时有意义的并且可读的值，
enum Direction2 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```

- 异构枚举

```ts
//异构枚举
//异构枚举的成员值是数字和字符串的混合
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}
```

- 接口枚举

```ts
//接口枚举
//枚举类型可以赋值给接口
enum Direction3 {
  Up,
  Down,
  Left,
  Right
}

interface Direction4 {
  Up: Direction3.Up;
  Down: Direction3.Down;
  Left: Direction3.Left;
  Right: Direction3.Right;
}

let obj:Direction4 = {
 //不能将类型“1”分配给类型“Direction3.Up”。 所需类型来自属性 "Up"，在此处的"Direction4" 类型上声明该属性
  Up: 1,//错误
  //但是直接写枚举值就行
  Up: 0,//正确
  Down: Direction3.Down,
  Left: Direction3.Left,
  Right: Direction3.Right
}
```

- const枚举

```ts
//为了避免在访问枚举值时支付额外生成的代码和额外的间接成本，可以使用 `const` 枚举。
onst enum 特别适用于以下场景：

当你只需要枚举的值，而不需要在运行时访问枚举对象本身时。
当你想要减少生成的 JavaScript 代码的大小，并提高运行时性能时。
当你确定枚举成员的值在编译时是已知的，并且不会在运行时改变时。
const enum Enum {
  A = 1,
  B = A * 2,
}
```

- 反向映射

```ts
//反向映射
//数字枚举具有反向映射，字符串枚举没有反向映射
enum Enum1 {
  X,
  Y,
  Z
}

let a1 = Enum1.X; // 0
let nameOfA = Enum1[a1]; // "X"
```

#### 类型推论与类型别名

- 类型推论

在 TypeScript 中，有几个地方在没有显式类型注释的情况下使用类型推断来提供类型信息。

TypeScript 会在没有明确指出类型的时候推测出一个类型，这就是类型推论,如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型

```ts
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7 //错误 不能将类型“number”分配给类型“string”

let myFavoriteNumber1; //let myFavoriteNumber1: any
myFavoriteNumber1 = 7;
myFavoriteNumber1 = '123';
```

- 类型别名

我们一直通过直接在类型注释中编写对象类型和联合类型来使用它们。这很方便，但通常希望多次使用同一个类型并用一个名称引用它,类型别名正是这样的 - 任何类型的名称

```ts
//定义类型别名
type name = string;
let Name: name = "123";
//联合类型别名
type name1 = string | number;
let Name2: name1 = 123;

//函数类型别名
type add = (x:number,y:number) => number;
let add1: add = function (x,y) {
  return x + y;
}

//值的别名
type Container = 0 | '123' | true ;
let m: Container = '123' 
```

- 类型别名与**interface** 的区别

interface可以继承 type 只能通过 & 交叉类型合并

```ts
type A = {
    name:string,
}

type B = A & {
  age: number,
}

interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}
```

type 可以定义 联合类型 和 可以使用一些操作符 interface不行

```ts
type name1 = string | number;
interface Animal {
  name: string ;
}
```

interface 遇到重名的会合并 type 不行

```ts
interface Window {
  title: string;
}

interface Window {
  ts: number;
}

let man: Window = { title: 'man', ts: 18 }
```

高级用法

条件类型（Conditional Type）的示例

当 `extends` 左边的类型可以赋值给右边的类型时，就会得到第一个分支（“true” 分支）的类型；否则，你将在后一个分支（“false” 分支）中获得类型。

```ts
type a = 1 extends number ? 1 : 0 //1
 
type a = 1 extends Number ? 1 : 0 //1
 
type a = 1 extends Object ? 1 : 0 //1
 
type a = 1 extends any ? 1 : 0 //1
 
type a = 1 extends unknow ? 1 : 0 //1
 
type a = 1 extends never ? 1 : 0 //0
```

#### never类型

`never` 类型表示从未观察到的值。在返回类型中，这意味着函数抛出异常或终止程序的执行。

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

never 与 `void` 的差异

```ts
//void类型只是没有返回值，但不会出错
function fn (x: number | string):void {
    console.log(x)
}
//会抛出异常没有返回值
function fail(msg: string): never {
  throw new Error(msg);
}
```

never在联合类型中会被直接移除

```ts
let x: void | number | never
type m = void | number | never
```

never应用场景

```ts

function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    return x; //用来抛出异常，兜底逻辑
  }
}
```

