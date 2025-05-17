## useCallback

useCallback 用于优化性能，返回一个记忆化的回调函数，可以减少不必要的重新渲染，也就是说它是用于缓存组件内的函数，避免函数的重复创建。

在React中，函数组件的重新渲染会导致组件内的函数被重新创建，这可能会导致性能问题。useCallback 通过缓存函数，可以减少不必要的重新渲染，提高性能

```tsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 参数

入参

- callback：回调函数
- deps：依赖项数组，当依赖项发生变化时，回调函数会被重新创建，跟useEffect一样。

返回值

- 返回一个记忆化的回调函数，可以减少函数的创建次数，提高性能。

### 例子

```tsx
import { useCallback , useState } from 'react'

const functionMap = new WeakMap()

let counter = 1

const App : React.FC = () => {
  console.log('randerApp');
  const [search,setSearch]  = useState('')
  // const changeSearch = useCallback( (e:React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value)
  // },[])
  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  if (!functionMap.has(changeSearch)) {
    functionMap.set(changeSearch, counter++)
    console.log(functionMap,'functionMap');
  }

  return (<>
    <input type="text" value={search} onChange={changeSearch} />
  </>)
}

export default App
```

每当输入框输入值时search会发生变化，函数会发生重建，并计入到WeakMap中，用次来证明组件重新渲染时，函数也会新增一遍，造成性能浪费

### 总结

useCallback的使用需要有所节制，不要盲目地对每个方法应用useCallback，这样做可能会导致不必要的性能损失。useCallback本身也需要一定的性能开销。

useCallback并不是为了阻止函数的重新创建，而是通过依赖项来决定是否返回新的函数或旧的函数，从而在依赖项不变的情况下确保函数的地址不变。