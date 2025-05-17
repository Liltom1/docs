### useRef

处理dom元素，需要组件多次渲染时保持持久性数据，用useRef

#### 操作Dom

```tsx
import { useRef } from "react"
function App() {
  //首先，声明一个 初始值 为 null 的 ref 对象
  let div = useRef(null)
  const heandleClick = () => {
    //当 React 创建 DOM 节点并将其渲染到屏幕时，React 将会把 DOM 节点设置为 ref 对象的 current 属性
    console.log(div.current)
  }
  return (
    <>
      {/*然后将 ref 对象作为 ref 属性传递给想要操作的 DOM 节点的 JSX*/}
      <div ref={div}>dom元素</div>
      <button onClick={heandleClick}>获取dom元素</button>
    </>
  )
}
export default App

```

*注意*

改变 ref.current 属性时，React 不会重新渲染组件。React 不知道它何时会发生改变，因为 ref 是一个普通的 JavaScript 对象。

除了 初始化 外不要在渲染期间写入或者读取 ref.current，否则会使组件行为变得不可预测

#### 数据存储

例子

```tsx
import React, { useLayoutEffect, useRef, useState } from 'react';


const UseRef = () => {
  console.log('render')
  let timer = useRef<null | NodeJs.Timeout >(null) 
  let [count, setCount] = useState(0)
  const handledBegin = () => {
    timer.current = setInterval(()=>{
      setCount(count => count + 1)
    },300)
  }
  const handledEnd = () => {
    console.log(timer);
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
  }
  return (<>
    <button onClick={ handledBegin} >开始计时</button>
    <button onClick={ handledEnd} >结束计时</button>
    <div>count:{count}</div>
  </>)
}

export default UseRef

```

组件在重新渲染的时候，useRef的值不会被重新初始化。

改变 ref.current 属性时，React 不会重新渲染组件。React 不知道它何时会发生改变，因为 ref 是一个普通的 JavaScript 对象。

useRef的值不能作为useEffect等其他hooks的依赖项，因为它并不是一个响应式状态。

useRef不能直接获取子组件的实例，需要使用forwardRef。