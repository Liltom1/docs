## Redux

**Redux 是一个使用叫做 “action” 的事件来管理和更新应用状态的模式和工具库** 它以集中式 Store（centralized store）的方式对整个应用中使用的状态进行集中管理，其规则确保状态只能以可预测的方式更新。

**Redux 提供的模式和工具使你更容易理解应用程序中的状态何时、何地、为什么、state 如何被更新，以及当这些更改发生时你的应用程序逻辑将如何表现**. Redux 指导你编写可预测和可测试的代码，这有助于你确信你的应用程序将按预期工作。

在以下情况下使用 Redux：

- 应用中有很多 state 在多个组件中需要使用
- 应用 state 会随着时间的推移而频繁更新
- 更新 state 的逻辑很复杂
- 中型和大型代码量的应用，很多人协同开发

**并非所有应用程序都需要 Redux。 花一些时间思考你正在构建的应用程序类型，并决定哪些工具最能帮助解决你正在处理的问题。**

### Redux 库和工具

Redux 是一个小型的独立 JS 库。 但是，它通常与其他几个包一起使用：

#### React-Redux

Redux 可以集成到任何的 UI 框架中，其中最常见的是 React 。[**React-Redux**](https://react-redux.js.org/) 是我们的官方包，它可以让 React 组件访问 state 片段和 dispatch actions 更新 store，从而同 Redux 集成起来。

#### Redux Toolkit

[**Redux Toolkit**](https://redux-toolkit.js.org/) 是我们推荐的编写 Redux 逻辑的方法。 它包含我们认为对于构建 Redux 应用程序必不可少的包和函数。 Redux Toolkit 构建是我们建议的最佳实践中，简化了大多数 Redux 任务，预防了常见错误，并使编写 Redux 应用程序变得更加容易。

### Redux DevTools 扩展

[**Redux DevTools 扩展**](https://github.com/zalmoxisus/redux-devtools-extension) 可以显示 Redux 存储中状态随时间变化的历史记录。这允许你有效地调试应用程序，包括使用强大的技术，如“时间旅行调试”。

**[Redux Toolkit](https://redux-toolkit.js.org/)** 是 Redux 官方强烈推荐，开箱即用的一个高效的 Redux 开发工具集。它旨在成为标准的 Redux 逻辑开发模式，我们强烈建议你使用它。

它包括几个实用程序功能，这些功能可以简化最常见场景下的 Redux 开发，包括配置 store、定义 reducer，不可变的更新逻辑、甚至可以立即创建整个状态的 “切片 slice”，而无需手动编写任何 action creator 或者 action type。它还自带了一些最常用的 Redux 插件，例如用于异步逻辑 Redux Thunk，用于编写选择器 selector 的函数 Reselect ，你都可以立刻使用。

### 目的

Redux 核心库是故意设计成非定制化的样子（unopinionated）。怎么做完全取决于你，例如配置 store，你的 state 存什么东西，以及如何构建 reducer。

有些时候这样挺好，因为有很高的灵活性，但我们又不总是需要这么高的自由度。有时，我们只是想以最简单的方式上手，并想要一些良好的默认行为能够开箱即用。或者，也许你正在编写一个更大的应用程序并发现自己正在编写一些类似的代码，而你想减少必须手工编写的代码量。

**Redux Toolkit** 它最初是为了帮助解决有关 Redux 的三个常见问题而创建的：

- "配置 Redux store 过于复杂"
- "我必须添加很多软件包才能开始使用 Redux"
- "Redux 有太多样板代码"

我们不可能解决所有场景的问题，但是受到 [`create-react-app`](https://github.com/facebook/create-react-app) 和 [`apollo-boost`](https://dev-blog.apollodata.com/zero-config-graphql-state-management-27b1f1b3c2c3) 的启发，我们可以提供一组官方推荐的工具，旨在减少决策的同时提供能够处理最通用的用例。

### Redux Toolkit 包含：

- [`configureStore()`](https://redux-toolkit.js.org/api/configureStore)：封装了`createStore`，简化配置项，提供一些现成的默认配置项。它可以自动组合 slice 的 reducer，可以添加任何 Redux 中间件，默认情况下包含 `redux-thunk`，并开启了 Redux DevTools 扩展。
- [`createReducer()`](https://redux-toolkit.js.org/api/createReducer) 帮你将 action type 映射到 reducer 函数，而不是编写 switch...case 语句。另外，它会自动使用 [`immer` 库](https://github.com/immerjs/immer)来让你使用普通的 mutable 代码编写更简单的 immutable 更新，例如 `state.todos[3].completed = true`。
- [`createAction()`](https://redux-toolkit.js.org/api/createAction) 生成给定 action type 字符串的 action creator 函数。该函数本身已定义了 `toString()`，因此可以代替常量类型使用。
- [`createSlice()`](https://redux-toolkit.js.org/api/createSlice) 接收一组 reducer 函数的对象，一个 slice 切片名和初始状态 initial state，并自动生成具有相应 action creator 和 action type 的 slice reducer。
- [`createAsyncThunk`](https://redux-toolkit.js.org/api/createAsyncThunk): 接收一个 action type 字符串和一个返回值为 promise 的函数, 并生成一个 thunk 函数，这个 thunk 函数可以基于之前那个 promise ，dispatch 一组 type 为 `pending/fulfilled/rejected` 的 action。
- [`createEntityAdapter`](https://redux-toolkit.js.org/api/createEntityAdapter): 生成一系列可复用的 reducer 和 selector，从而管理 store 中的规范化数据。
- [`createSelector`](https://redux-toolkit.js.org/api/createSelector) 来源于 [Reselect](https://github.com/reduxjs/reselect) 库，重新 export 出来以方便使用。