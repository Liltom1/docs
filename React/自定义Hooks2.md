## 自定义Hooks

在实际开发中，React的内置hooks并不能满足我们所有的需求，比如一些复杂的业务逻辑，或者是一些使用场景，需要我们自己来使用自定义hooks实现。

### 自定义hooks的规则

1. 自定义hooks必须以`use`开头
2. 自定义hooks可以调用其他hooks(内置的hooks和自定义的hooks)

### 简单案例

获取鼠标的x，y偏移量，hooks写在ts文件中

在里面引入useState ,useEffect

```ts
import { useState ,useEffect } from "react";
```

用useState定义两个变量记录下x，y的值

```ts
const [x, setX] = useState(0);
const [y, setY] = useState(0);
```

在useEffect中用去监听鼠标的偏移量，并用setX，setY去对x，y赋值，最后将这两个值return出去

```ts
 useEffect(()=>{
    document.addEventListener("mousemove", (e) => {
      setX(e.pageX);
      setY(e.pageY);
    });
    return () =>{ 
      document.removeEventListener("mousemove", (e) => {
        setX(e.pageX);
        setY(e.pageY);
      });
    } 
  },[])
```

完整代码

```ts
import { useState ,useEffect } from "react";

function useFreeHookes() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(()=>{
    document.addEventListener("mousemove", (e) => {
      setX(e.pageX);
      setY(e.pageY);
    });
    return () =>{ 
      document.removeEventListener("mousemove", (e) => {
        setX(e.pageX);
        setY(e.pageY);
      });
    } 
  },[])
  return { x , y }
}

export default useFreeHookes;
```

最后在组件中使用

```tsx
import useFreeHookes from "./components/freeHooks/FreeHooks"
function App() {
  const { x, y } = useFreeHookes()
  return (
    <>
      <span>x:{x}</span>
      <span>y:{y}</span>
    </>
  )
}

export default App
```

在工作中不需要频繁造轮子，已经有很多现成的库可以使用，比如`ahooks`,`react-use`,`SWR`,`react-hook-form`等等，这些库都是经过社区验证的，可以放心使用。

ahoooks文档地址:https://ahooks.js.org/zh-CN/hooks/use-request/index