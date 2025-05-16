## useContext

提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。设计的目的就是解决组件树间数据传递的问题。

### 用法

```tsx
const MyThemeContext = React.createContext({theme: 'light'}); // 创建一个上下文

function MyComponent() {
    const themeContext = useContext(MyThemeContext); // 使用上下文
    return (<div>{themeContext.theme}</div>);
}

```

### 参数

- context ： 是 createContext 创建出来的对象，他不保持信息，他是信息的载体。声明了可以从组件获取或者给组件提供信息

- 返回值： 返回传递的Context的值，并且是只读的。如果 context 发生变化，React 会自动重新渲染读取 context 的组件

### 例子

```tsx
import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext<ThemeContextType>({} as ThemeContextType)

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const Child = () => {
  const themeContext = useContext(ThemeContext)
  const styles = {
    backgroundColor: themeContext.theme === 'light' ? 'white' : 'black',
    color: themeContext.theme === 'light' ? 'black' : 'white'
  }
  return (<>
    <div style={styles}>
      child
    </div>
  </>)
}

const Parent = () => {
  const themeContext = useContext(ThemeContext)
  const styles = {
    backgroundColor: themeContext.theme === 'light' ? 'black' : 'white',
    color: themeContext.theme === 'light' ? 'black' : 'white'
  }
  return (<>
    <div style={styles}>
      Parent
    </div>
    <Child></Child>
  </>)
}


function App() {
  const [theme, setTheme] = useState('light');
  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>切换主题</button>
      {/* React18写法
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Parent />
      </ThemeContext.Provider> */}
      React19写法
      <ThemeContext value={{ theme, setTheme }}>
        <Parent />
      </ThemeContext>
    </div >
  );
}

export default App;
```

### 注意

- 使用 ThemeContext 时，传递的key必须为`value`

- 可以使用多个Context

```tsx
const ThemeContext = React.createContext({theme: 'light'});

function App() {
   return (
      <ThemeContext value={{theme: 'light'}}>
         <ThemeContext value={{theme: 'dark'}}> {/* 覆盖了上面的值 */}
            <Parent />
         </ThemeContext>
      </ThemeContext>
   )
}
```

