## React-router

它的作用就是，根据不同的`URL`，匹配不同的组件，然后进行渲染。这样就可以实现在单页面应用中跳转页面

### 安装

react-router在最新版本`V7`中，设计了三种模式

- 框架模式

框架模式就是使用，React-router 提供的脚手架模板去安装，安装完成后会自带路由功能。

```bash
npx create-react-router@latest my-react-router-app # 创建项目
cd my-react-router-app # 进入项目
npm i # 安装依赖
npm run dev # 启动项目
```

- 数据模式

数据模式就是，我们可以使用自己的模板去创建`React`项目，比如使用`vite` `webpack` 等，然后自己安装`React-router`。

```bash
npm i react-router #V7不在需要 react-router-dom
```

```ts
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/about',
    Component: About,
  },
]);
```

- 声明模式

声明模式，也可以用自己的模板创建`React`项目，然后自己安装`React-router`。

```bash
npm i react-router #V7不在需要 react-router-dom
```

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app";
import About from '../about'
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="about" element={<About />} />
    </Routes>
  </BrowserRouter>
);
```

::: tip
数据模式和声明模式的区别，数据模式可以享用`React-router`所有的功能，包括数据处理。而声明模式只能享用`React-router`的一部分功能，比如路由跳转。

如果做一个小项目可以使用`声明模式`，如果要做企业级项目可以使用`数据模式`。
:::

### 基本使用

以数据模式举例

新建router文件夹，新增index.tsx文件

```tsx
import { createBrowserRouter } from 'react-router';
import MainLayout from "../laylouts/MainLayout"
import ManageLayout from "../laylouts/ManageLayout";
import QuertionsLayout from "../laylouts/QuertionsLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import List from "../pages/manage/List";
import Star from "../pages/manage/Star";
import Trash from "../pages/manage/Trash";
import Edit from "../pages/question/Edit";
import Stat from "../pages/question/Stat";


const router = createBrowserRouter([
      {
        path:'/',
        element: <MainLayout />,
        children:[
          {
            path:'/',
            element: <Home />
          },
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          },
          {
            path: 'manage',
            element: <ManageLayout />,
            children:[
              {
                path: 'List',
                element: <List />
              },
              {
                path: 'star',
                element: <Star />
              },
              {
                path: 'trash',
                element: <Trash />
              },
            ]
          },
          {
            path: '*',
            element: <NotFound />
          },
        ]
      },
      {
        path: 'question',
        element: <QuertionsLayout />,
        children:[
          {
            path: 'edit/:id',
            element: <Edit />
          },
          {
            path: 'stat/:id',
            element: <Stat />
          },
        ]
      }
]);

export default router;
```

App.tsx使用

```tsx
import { RouterProvider } from "react-router"
import routerConfig from './router'
function App() {
  return (
    <>
      <RouterProvider router={routerConfig} ></RouterProvider>
    </>
  )
}
export default App

```

### router的跳转

- 利用useNavigate React-router 的钩子

```tsx
import React from "react";
import { useNavigate } from "react-router";

const Home:React.FC = ()=>{
  const navigation = useNavigate()
  const login = () =>{
    navigation('/question')
  }
  return <>
      <div>
        Home
      <button onClick={login} >登录</button>   
    </div>
  </>
}
export default Home
```

- 利用Link组件

```tsx
import React from "react";
import { Link } from "react-router";
const Home:React.FC = ()=>{
  return <>
      <div>
        Home
      <Link to='/register?a=1231'>注册</Link>
    </div>
  </>
}
export default Home
```

获取router跳转中携带的参数

- 使用useParams

```tsx
import React from "react";
import { useParams } from "react-router"
const Edit:React.FC = ()=>{
  const params = useParams()
  console.log(params);
  return <>
      <div>
        Edit
    </div>
  </>
}
export default Edit
```

- useSearchParams

  例如 `http://localhost:5173/search?name=张三`

```tsx
import React from "react";
import { useSearchParams } from "react-router"
const Edit:React.FC = ()=>{
  let [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams.get('name'),'searchParams');
  return <>
      <div>
        Edit
    </div>
  </>
}
export default Edit
```

与useParams不同的是useSearchParams中的set函数可以修改url中所带的参数

```tsx
import React from "react";
import { useSearchParams } from "react-router"
const Edit:React.FC = ()=>{
  let [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams.get('name'),'searchParams');
  const setParams = () => {
        setSearchParams(prev => {
            prev.set('age', '30');
            prev.set('name', '小满zs');
            return prev;
        })
    }
  return <>
      <div>
        Edit
    </div>
    <button onClick={setParams}>change</button>
  </>
}
export default Edit
```

