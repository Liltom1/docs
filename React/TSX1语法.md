TSX语法

- tsx绑定变量，绑定class需要使用classname

```tsx
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Test from './components/Test'
import Card from './components/Card'


function App() {
  //1.插值语句jsx tsx {} 里面可以包含的数据类型有，字符串，数字，数组（普通类型） 元素 ， 三元表达式 API调用
  //2.事件如何添加 onClick={fn} 事件名驼峰式命名，事件处理函数可以是一个函数，也可以是一个箭头函数,需要传参数时使用高阶函数，利用箭头函数包裹
  //3.支持泛型函数 <T>这个会被识别为元素 类似<div> 纠正泛型<T,>
  //4.绑定属性 id className style
  //5.添加html代码片段 dangerouslySetInnerHTML={{ __html: htmlElement }}
  //6.遍历dom元素 map
  //7.条件语句 三元表达式
  const num:number = 123 
  const fu = () => 'test'

  //绑定 class 与 id
  const className:string = 'class'

  //绑定样式
  const style:object = {
    color:'skyblue'
  } 

  //绑定事件
  const out:string = '456'
  const numAdd = (out: string) => { console.log(out);}

  //tsx使用泛型
  const name:string = 'Tom'
  const hi = <T,>(name:T) => { console.log(name);}

  //tsx渲染html代码片段
  const htmlElement:string = '<section style="color:red">Tom</section>'

  //tsx如何遍历dom元素
  const arr:Array<string> = ['1','2','3']

  //tsx写条件语句
  const flag:boolean = true

  const fn = (params:string) =>{
    console.log('父组件接收到了',params);
    
  }
  return (
    <>
      {num}
      {'123'}
      {fu()}
      { new Date().getTime() }
      {/* 单个class */}
      <div data-index={className} className={className} id={className} >{className}</div> 
      {/* 多个class */}
      <div className={`${className} class1`} >class</div>

      <div style={style}>color</div>

      <button onClick={() => { numAdd(out) }} >{num}</button>
      <button onClick={() => { hi(name) }} >{name}</button>

      <div dangerouslySetInnerHTML={{ __html: htmlElement }} ></div>

      {
        arr.map((item)=>{
          return <div>{item}</div>
        })
      }
      
      {
        flag ? <div>123</div> : <div>456</div>
      }

      
    </>
  )
}

export default App

```

*tsx注意事项*

{}插值语句内不允许编写switch if 变量声明 或者直接放入对象本体