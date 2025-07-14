## useReducer

`useReducer`是React提供的一个高级Hook,没有它我们也可以正常开发，但是`useReducer`可以使我们的代码具有更好的可读性，可维护性。

`useReducer` 跟 `useState` 一样的都是帮我们管理组件的`状态`的，但是呢与`useState`不同的是 `useReducer` 是`集中式`的管理状态的。

在组件的顶层调用 `useReducer` 以使用 [reducer。](https://react.nodejs.cn/learn/extracting-state-logic-into-a-reducer) 管理其状态

```ts
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

### 参数:

1. `reducer` 是一个处理函数，用于更新状态, reducer 里面包含了两个参数，第一个参数是 `state`，第二个参数是 `action`。`reducer` 会返回一个新的 `state`。
2. `initialArg` 是 `state` 的初始值。
3. `init` 是一个可选的函数，用于初始化 `state`，如果编写了init函数，则默认值使用init函数的返回值，否则使用`initialArg`。

### 返回值:

useReducer 返回一个由两个值组成的数组：

当前的 state。初次渲染时，它是 init(initialArg) 或 initialArg （如果没有 init 函数）。 dispatch 函数。用于更新 state 并触发组件的重新渲染

### todolist案例

```tsx
import { ChangeEvent, useReducer ,useState } from 'react';
//根据旧状态进行处理 oldState，处理完成之后返回新状态 newState
//reducer 只有被dispatch的时候才会被调用 刚进入页面的时候是不会执行的

const CountApp = () =>{
  const list = [
    {
      id:1,
      name:'asdasd',
    },
    {
      id: 2,
      name: 'sadas',
    },
  ]
  const reducer = (state,action) => {
    switch (action.type) {
      case 'add':
        return state.concat({
          id: state.length + 1,
          name: action.playload
        })
      case 'del':
        return state.filter(item => item.id !== action.playload )
      default: throw Error('err')
    }
    
    return state
  }
  const [inputState, setInputState] = useState('')
  const [todoList, dispatch] = useReducer(reducer, list)
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value)
  }
  const add = () => {
    dispatch({
      type:'add',
      playload: inputState
    })
  }
  const del = (id:any) =>{
    dispatch({
      type: 'del',
      playload: id
    })
  }
  return (<>
      <ul>
        {
         todoList.map(item=>{
           return <li key={item.id}>{item.name} <button onClick={() => del(item.id)}>删除 </button>		</li>
         })
        }
      </ul>
    <input type="text" value={inputState} onChange={(e) => handleInput(e)} />
    <button onClick={add}>新增todoList</button>
  </>)
}

export default CountApp
```

