---
prev:
  text: 'TypeScript 类型（第二篇）'
  link: '../TypeScript/TypeScript 类型（第二篇）'
next:
  text: 'TypeScript元组'
  link: '../TypeScript/TypeScript元组'
---
# TypeScript(第三篇)

#### class(类)

- 1.基本用法 继承  用extends， 类型约束用 implements

```ts
//1.基本用法 继承  用extends， 类型约束用 implements
interface Option{
    el:string | HTMLElement
}

interface vuevls {
    option:Option
    init():void
}

interface Vdom{
    tag:string
    text?:string
    children?:Vdom[]
}

class Dom {
    //创建元素
    createE(el:string){
       return  document.createElement(el)
    }
    setText(el:HTMLElement,text:string|null){
        el.textContent = text
    }
    creatDom(data:Vdom){
        let root = document.createElement(data.tag)
        if (data.children && Array.isArray(data.children)) {
            data.children.forEach(element => {
                let child =  this.creatDom(element)
                // this.setText(child,element.text)   
                root.appendChild(child)
            });
        }else{
            this.setText(root,data.text)     
        }
        return root
    }
}

const fn = new Function()

class Vue extends Dom implements vuevls {
    option:Option
    constructor(option:Option){
        super()
        this.option = option
        this.init()
    }    
    init(){
        const data:Vdom = {
            tag:'div',
            children:[
                {
                    tag:'section',
                    text:'标签1',
                },
                {
                    tag:'section',
                    text:'标签1',
                    
                }
            ]
        } 
        let a = typeof this.option.el === 'string' ? document.querySelector(this.option.el) : this.option.el
        a.appendChild(this.creatDom(data))
    }
}

new Vue({
    el:'#app'
})


```

- 2.修饰符 readonly private  protected  public 一般用作类中的数据 

```ts
//2.修饰符 readonly private  protected  public 一般用作类中的数据 
//readonly 说明属性不可被修改
class vue1 {
   readonly options:Option, 
}
// private添加修饰符后 该方法只能在 class的内部使用，类创建的实例或者子类中都不可调用
class vue2 {
   private init():void,
}
// protected 添加修饰符后 该方法 class的内部使用，子类也可调用 （类创建的实例不可调用）
class vue3 {
   protected init():void, 
}
// public 添加修饰符后 该方法 class的内部使用，类创建的实例也调用，子类也可调用 
class vue3 {
   public init():void,
}
```

- 3.super()原理

super可以调用父类的属性或者方法 原理是super() 相当于父类prototype.constructor.call

- 4.静态方法

```ts
//直接通过构造函数去调用
class Test {
    static a = 10
    static init():void{

    }
}
//static修饰的函数中只能调用static修饰的属性
Test.a
Test.init()
```

- 5.get set 

```ts
class Test {
    static a = 10
    static init():void{

    }

    num:any
    constructor(value:any){
        this.num = value
    }
    get value(){
        return this.num
    }
    set value(newValue){
        this.num = newValue
    }
}
```

- 6.抽象类

```ts
//抽象类用 abstract 修饰
abstract class Test {
    static a = 10
    abstract init():void //不需要 写出实现方法或描述，子类继承需要重新该方法

    num:any
    constructor(value?:any){
        this.num = value
    }
}
const a = new Test()//错误 不可用构造函数创造实例

//可以用来继承 ，但是父类中用 abstract修饰过的函数，在子类中需要重写
class Test1 extends Test {
    num:any
    constructor(value:any){
        super()
        this.num = value
    }
    init(){

    }
}

```

