## useMemo

`useMemo` 是 React 提供的一个性能优化 Hook。它的主要功能是避免在每次渲染时执行复杂的计算和对象重建。通过记忆上一次的计算结果，仅当依赖项变化时才会重新计算，提高了性能，有点类似于Vue的`computed`。

### React.memo

`React.memo` 是一个 React API，用于优化性能。它通过记忆上一次的渲染结果，仅当 props 发生变化时才会重新渲染, 避免重新渲染。

### 用法

```tsx
import React, { memo } from 'react';
const MyComponent = React.memo(({ prop1, prop2 }) => {
  // 组件逻辑
});
const App = () => {
  return <MyComponent prop1="value1" prop2="value2" />;
};

```

### 案例

那些数据变化会导致数据的渲染

- 组件的 props 发生变化
- 组件的 state 发生变化
- useContext 发生变化

```tsx
import React,{ useMemo , useState }  from "react";

interface User { 
  name:string
  age:number
  email:string
}

interface CardProps {
  user:User
}

const Card = ({user}:CardProps) => {
  console.log('变化');
  
  const styles = {
    backgroundColor:'lightblue'
  }

  return <div style={styles}>
    <h1>{user.name}</h1>
    <p>{user.age}</p>
    <p>{user.email}</p>
  </div>
}


function App() {
  const [user,setUser] = useState<User>({
    name:'tom',
    age:18,
    email:'478@'
  })
  const [search,setSearch] = useState('')

  return ( <div>
    <h1>父组件</h1>
    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}  />
    <Card user={user}></Card>
  </div> )
}


export default App
```

当父组件执行setSearch时，search值发生改变，会触发子组件的跟新 ，子组件加上React.memo后，不会发生重复更新

```tsx
import React,{ useMemo , useState }  from "react";

interface User { 
  name:string
  age:number
  email:string
}

interface CardProps {
  user:User
}

const Card = React.memo(({user}:CardProps) => {
  console.log('变化');
  
  const styles = {
    backgroundColor:'lightblue'
  }

  return <div style={styles}>
    <h1>{user.name}</h1>
    <p>{user.age}</p>
    <p>{user.email}</p>
  </div>
})


function App() {
  const [user,setUser] = useState<User>({
    name:'tom',
    age:18,
    email:'478@'
  })
  const [search,setSearch] = useState('')

  return ( <div>
    <h1>父组件</h1>
    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}  />
    <div>
      <button onClick={() => setUser({
        name: '李四',
        age: Math.random() * 100,
        email: 'lisi@example.com'
      })}>更新user</button>
    </div>
    <Card user={user}></Card>
  </div> )
}


export default App
```



### React.memo 总结

1. **使用场景**：
   - 当子组件接收的 props 不经常变化时
   - 当组件重新渲染的开销较大时
   - 当需要避免不必要的渲染时
2. **优点**：
   - 通过记忆化避免不必要的重新渲染
   - 提高应用性能
   - 减少资源消耗
3. **注意事项**：
   - 不要过度使用，只在确实需要优化的组件上使用
   - 对于简单的组件，使用 `memo` 的开销可能比重新渲染还大
   - 如果 props 经常变化， `memo` 的效果会大打折扣

### useMemo

#### 用法

```tsx
import React, { useMemo, useState } from 'react';
const App = () => {
   const [count, setCount] = useState(0);
   const memoizedValue = useMemo(() => count, [count]);
   return <div>{memoizedValue}</div>;
}
```

参数

- 回调函数:Function：返回需要缓存的值

- 依赖项:Array：依赖项发生变化时，回调函数会重新执行`(执行时机跟useEffect类似)`

返回值

- 返回值：返回需要缓存的值`(返回之后就不是函数了)`

案例

```tsx
import React, { useMemo, useState } from 'react';

function App(){
  const [search,setSearch] = useState('')
  const [good, setGoods] = useState([
    { id: 1, name: '苹果', price: 10, count: 1 },
    { id: 2, name: '香蕉', price: 20, count: 1 },
    { id: 3, name: '橘子', price: 30, count: 1 },
  ])
  const handleAdd = (id:number) => {
    console.log(id,'id');
    setGoods(good.map(item => item.id === id ? { ...item, count: item.count + 1 } : item))
  }
  const handleSub = (id: number) => {
    setGoods(good.map(item => item.id === id ? { ...item, count: item.count - 1 } : item))
  }

  // const total = () => {
  //   console.log('total');
  //   return good.reduce((total, item) => total + item.price * item.count, 0)
  // }

  const total = useMemo(() => {
    console.log('total');
    return good.reduce((total, item) => total + item.price * item.count, 0)
  },[good]) 

  return (
    <div>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>名称</th>
            <th>价格</th>
            <th>数量</th>
          </tr>
        </thead>
        <tbody>
          {
            good.map(item => {
              return (<tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price * item.count}</td>
                <td>
                  <button onClick={() => handleAdd(item.id)}>+</button>
                  <span>{item.count}</span>
                  <button onClick={() => handleSub(item.id)}>-</button>
                </td>
              </tr>)
            })
          }
        </tbody>
      </table>
      <h2>总价：{total}</h2>
    </div>
  )
}

export default App
```

不加useMemo之前，改变search，会触发total函数 ， 增加useMemo，并且指定依赖项之后 ，只有+与-才会触发total的更新，改变search不会生效

### useMemo 执行时机(依赖项)

1. 如果依赖项是个空数组，那么 `useMemo` 的回调函数会执行一次
2. 指定依赖项，当依赖项发生变化时， `useMemo` 的回调函数会执行
3. 不指定依赖项，不推荐这么用，因为每次渲染和更新都会执行

### useMemo 总结

1. **使用场景**：
   - 当需要缓存复杂计算结果时
   - 当需要避免不必要的重新计算时
   - 当计算逻辑复杂且耗时时
2. **优点**：
   - 通过记忆化避免不必要的重新计算
   - 提高应用性能
   - 减少资源消耗
3. **注意事项**：
   - 不要过度使用，只在确实需要优化的组件上使用
   - 如果依赖项经常变化，useMemo 的效果会大打折扣
   - 如果计算逻辑简单，使用 useMemo 的开销可能比重新计算还大