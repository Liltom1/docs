### useEffect

理解useEffect之前需要理解两个概念，副作用函数，与纯函数

#### 纯函数

1.相同的输入得到相同的输出，函数行为可以预测

2.不会修改外部状态，也不会依赖外部可变状态

##### 举例

```js
const add = (x,y) => x + y
```

#### 副作用函数

1.执行时会改变外部依赖或者状态的函数

2.可预测性降低，副作用带来的效果才是我们所期待的

3.高耦合度函数非常依赖外部的变量状态紧密

- 操作引用类型
- 操作本地存储例如`localStorage`
- 调用外部API，例如`fetch` `ajax`
- 操作`DOM`
- 计时器

```js
let globalVariable = 0;

function calculateDouble(number){  
  globalVariable += 1; //修改函数外部环境变量

  localStorage.setItem('globalVariable', globalVariable); //修改 localStorage

  fetch(/*…*/).then((res)=>{ //网络请求
   //…  
  }); 

  document.querySelector('.app').style.color = 'red'; //修改 DOM element

  return number *2
}
```

#### useEffect

```js
useEffect(setup, dependencies?)
```

- setup:Effect处理函数,可以返回一个清理函数。组件挂载时执行setup,依赖项更新时先执行cleanup再执行setup,组件卸载时执行cleanup

- dependencies:setup中使用到的响应式值列表(props、state等)。必须以数组形式编写如[dep1, dep2]。不传则每次重渲染都执行Effect

```js
let a = useEffect(()=>{})
console.log(a);//undefined
```

#### 基本用法

```jsx
import { useEffect } from 'react'

const EffectApp = () =>{
  const dom = document.getElementById('data')
  console.log(dom);
  useEffect(()=>{
    const dom = document.getElementById('data')
    console.log(dom);
  },[])
  return (
    <>
    <div id='name'>Tom</div>
    </>
  )
}
export default EffectApp
```

#### 执行时机

从上面例子观察到，在组件挂载时执行过一次。组件更新时也会触发。

##### 无依赖项更新

就是useEffect方法不填写第二个参数

```jsx
import { useEffect , useState} from 'react'
import { Descriptions , Button, Col, Row, Statistic } from 'antd';
import type { DescriptionsProps } from 'antd';

const EffectApp = () =>{
  const [count, setCount] = useState(0)
  const [name, setName] = useState('tom')
  const item: DescriptionsProps['items'] = [
    {
      key:'1',
      label:'username',
      children: <p>{name}</p>
    }
  ]
  useEffect(()=>{
    console.log('触发了',count,name);
  })
  return (
    <>
      <Statistic title="Active Users" value={count} />
      <Button type="primary" onClick={() => setCount(count+1)}>增加</Button>
      <Descriptions title="User Info" items={item} />;
      <Button type="primary" onClick={() => setName('jerry')}>修改名称</Button>
    </>
  )
}


export default EffectApp
```

当有响应值发生变化时，useEffect都会去执行

##### 有依赖项更新

```jsx
import { useEffect , useState} from 'react'
import { Descriptions , Button, Col, Row, Statistic } from 'antd';
import type { DescriptionsProps } from 'antd';

const EffectApp = () =>{
  const [count, setCount] = useState(0)
  const [name, setName] = useState('tom')
  const item: DescriptionsProps['items'] = [
    {
      key:'1',
      label:'username',
      children: <p>{name}</p>
    }
  ]
  useEffect(()=>{
    console.log('触发了',count,name);
  }, [count])
  return (
    <>
      <Statistic title="Active Users" value={count} />
      <Button type="primary" onClick={() => setCount(count+1)}>增加</Button>
      <Descriptions title="User Info" items={item} />;
      <Button type="primary" onClick={() => setName('jerry')}>修改名称</Button>
    </>
  )
}


export default EffectApp
```

当有依赖项发生变化时，useEffect才会去执行

##### 依赖项空值

依赖项为空数组时，`useEffect`的副作用函数只会执行一次，也就是组件挂载时执行。

##### 组件卸载时也会执行

卸载组件时执行useEffect，会返回一个清理函数，确切说清理函数就是副作用函数运行之前，会清楚上一次的副作用函数。