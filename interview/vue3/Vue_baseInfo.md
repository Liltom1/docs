# VUE

## 设计理念

申明式，只关注结果，不关注过程。

采用虚拟dom两个好处，实现diff算法，实现跨平台

## 区分编译时和运行时

vue先将模板解析为，js代码，再将代码生成视图

在构建时进行编译性能更高，不需要再运行的时候进行编译，而且vue3再编译中做了优化

运行时，是将js语法运行成虚拟dom在渲染，在浏览器中运行是运行时

## 设计思想

模块拆分，vue3.0注重模块上的拆分，模块可以独立使用

通过构建工具TREE-shaking机制实现按需引入，减少打包后的体积，组合式API

vue3允许自定义渲染器，扩展能力强，扩展更方便

RFC

## 整体架构

Monorepo管理项目

管理项目代码的一个方式，指再一个项目仓库中管理多个模块包，vue3采用Monorepo管理项目，将模块拆分到package目录中，作为一个个包来管理，这样职责划分更加明确。

核心是

vue -> @vue/runtime-dom -> @vue/runtime-core -> @vue/reactivity

@vue/reactivity:响应式模块

@vue/runtime-core :与平台无关的运行时核心

@vue/runtime-dom：运行时模块 ：针对浏览器的运行时，包括，DOM,API,属性，事件等

采用Typescript