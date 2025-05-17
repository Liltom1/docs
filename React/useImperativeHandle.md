### useImperativeHandle

将子组件中的方法暴露给父组件，或者访问子组件的属性。 类似于Vue的`defineExpose`。

#### 用法

```tsx
useImperativeHandle(ref, ()=>{
    return {
        // 暴露给父组件的方法或属性
    }
}, [deps])
```

#### 参数

- ref 父组件传递的ref对象

- createHandle: 返回值，返回一个对象，对象的属性就是子组件暴露给父组件的方法或属性

- deps?:[可选] 依赖项，当依赖项发生变化时，会重新调用createHandle函数，类似于`useEffect`的依赖项

#### 执行时机

类似与useEffect

- 当deps不传时，组件初始化时会执行createHandle，当有状态更新时也会执行

- 当deps传，但是为【】时，只在组件初始化时会执行createHandle

- 当deps传，但是不为【】时，【】中状态更新时会执行createHandle ，组件初始化时也会执行createHandle

#### 用例

```tsx
import React, { useImperativeHandle, useRef, useState } from 'react';

interface ChildRef {
  name: string
  validate: () => string | true
  reset: () => void
}

const Child = ({ ref }:{ ref:React.Ref<ChildRef>}) => {
    const [from,setFrom] = useState({
      username:'',
      password:'',
      email:''
    })

    const validate = () => {
      if (!from.username) {
        return '用户名不能为空'
      }
      if (!from.password) {
        return '密码不能为空'
      }
      if (!from.email) {
        return '邮箱不能为空'
      }
      return true
    }

    const reset = () =>{
      setFrom({
        username: '',
        password: '',
        email: ''
      })
    }

  useImperativeHandle(ref,()=>{
    return {
      name:'Child',
      validate,
      reset
    }
  })

  return (<>
    <div style={{marginTop:'20px'}}>
      <h4>子组件</h4>
      <input value={from.username} onChange={(e) => setFrom({...from,username:e.target.value}) } placeholder='用户名' type="text" />
      <input value={from.password} onChange={(e) => setFrom({ ...from, password: e.target.value })} placeholder='密码' type="text" />
      <input value={from.email} onChange={(e) => setFrom({ ...from, email: e.target.value })} placeholder='邮箱' type="text" />
    </div>
  </>)
}


function App(){
  const childRef = useRef<ChildRef>(null)
  const showRefInfo = () => { 
    console.log(childRef.current);
  }

  const submit = () => {
    const res = childRef.current?.validate()
    console.log(res);
    
  }

  return (
    <div>
      <h2>我是父组件</h2>
      <button onClick={showRefInfo}>获取子组件信息</button>
      <button onClick={() => submit()}>校验子组件</button>
      <button onClick={() => childRef.current?.reset()}>重置</button>
      <hr />
      <Child ref={childRef}></Child>
    </div>
  );


}

export default App
```

