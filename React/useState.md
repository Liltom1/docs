### useState

`useState` 是一个 React Hook，允许函数组件在内部管理状态

useState接收一个参数，作为状态的初始值，返回一个数组，第一个为当前状态值，第二个为更改状态的函数

*注意*

useState只能在组件的顶层使用或者在自己的hook中调用它，不能在循环或条件语句中调用它。

在严格模式中，React 将 `两次调用初始化函数`，帮你找到意外的不纯性。这只是开发时的行为，不影响生产。

#### 用法

```tsx
import React, { JSX, useState } from "react"
const Test: React.FC<Props> = (props) => {
  const [name, setName] = useState('hello')
  const heandleName = () => {
    setName('world')
  }
  return <div>
    <div>{name}</div>
    <button onClick={heandleName} >clickState</button>
  </div>
}

export default Test
```

调用setName函数时会去修改 name 的值，重新触发组件的渲染。React 会存储新状态，使用新值重新渲染组件，并更新 UI。

##### 数组 

在React中你需要将数组视为只读的，不可以直接修改原数组，例如：不可以调用 `arr.push()` `arr.pop()` 等方法。

- concat,[...arr]展开语法   代替  --->   添加元素 push,unshift
- filter，slice   代替  --->  删除元素 pop，shift，splice
- map 代替  --->  替换元素 splice，arr[i] = ... 赋值
- 先将数组复制一份 --->  排序reverse，sort

##### 对象

useState可以接受一个函数，可以在函数里面编写逻辑，初始化值，注意这个只会执行一次，更新的时候就不会执行了。

在使用setObject的时候，可以使用Object.assign合并对象 或者 ... 合并对象，不能单独赋值，不然会覆盖原始对象。

```tsx
import React, { JSX, useState } from "react"
const Test: React.FC<Props> = (props) => {
  const [info, setName] = useState(()=>{
    return {
      name:'TOM',
      age:23,
    }
  })
  const heandleName = () => {
    setName({
      ...info,
      name:'xm',
      age:46
    })
      
    //setObject(Object.assign({}, obj, { name:'xm', age: 46 })) 第二种写法
  }
  return <div>
    <div>{info.name}</div>
    <button onClick={heandleName} >clickState</button>
  </div>
}

export default Test
```

##### useState更新机制

异步机制

```tsx
import React, { JSX, useState } from "react"
const Test: React.FC<Props> = (props) => {
  const [info, setName] = useState(()=>{
    return {
      name:'TOM',
      age:23,
    }
  })
  const heandleName = () => {
    setName({
      ...info,
      name:'xm',
      age:46
    })
    console.log(info,'info');
    
  }
  return <div>
    <div>{info.name}</div>
    <button onClick={heandleName} >clickState</button>
  </div>
}

export default Test
```

console.log(info,'info'); 打印的是之前的数据，并不是改过之后的，set函数是异步的所以后执行，这么做是为了性能优化，因为我们要的是结果而不是过程。

##### 内部机制

当我们多次以相同的操作更新状态时，React 会进行比较，如果值相同，则会屏蔽后续的更新行为。自带`防抖`的功能，防止频繁的更新

```tsx
import { useState } from "react"
function App() {
  let [index, setIndex] = useState(0)
  const heandleClick = () => {
    setIndex(index + 1) //1
    setIndex(index + 1) //1
    setIndex(index + 1) //1
    console.log(index,'index')
  }
  return (
    <>
       <h1>Index:{index}</h1>
      <button onClick={heandleClick}>更改值</button>
      
    </>
  )
}
export default App

```

结果是1并不是3，因为`setIndex(index + 1)`的值是一样的，后续操作被屏蔽掉了，阻止了更新。

为了解决这个问题，你可以向`setIndex` 传递一个更新函数，而不是一个状态。

```tsx
import { useState } from "react"
function App() {
  let [index, setIndex] = useState(0)
  const heandleClick = () => {
    setIndex(index => index + 1) //1
    setIndex(index => index + 1) //2
    setIndex(index => index + 1) //3
  }
  return (
    <>
      <h1>Index:{index}</h1>
      <button onClick={heandleClick}>更改值</button>

    </>
  )
}
export default App

```

1. index => index + 1 将接收 0 作为待定状态，并返回 1 作为下一个状态。
2. index => index + 1 将接收 1 作为待定状态，并返回 2 作为下一个状态。
3. index => index + 1 将接收 2 作为待定状态，并返回 3 作为下一个状态。

现在没有其他排队的更新，因此 React 最终将存储 3 作为当前状态。

按照惯例，通常将待定状态参数命名为状态变量名称的第一个字母，例如 prevIndex 或者其他你觉得更清楚的名称。