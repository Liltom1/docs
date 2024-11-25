import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dumbledore's Pensieve",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '知识类',
        items: [
          { text: 'TypeScript', link: '/TypeScript/基础类型' },
        ]
      },
      // { text: 'TypeScript', link: '/TypeScript/基础类型' }
    ],
    //页脚文字
    docFooter:{
      prev:'上一页',
      next:'下一页'
    },
    //右边栏目录
    outline: {
      level: [2, 6],
      label: "目录",
    },
    //最后修改时间
    lastUpdated:{
      text:'最后更改时间',
      formatOptions:{
        dateStyle:'full',
        timeStyle:'full'
      }
    },
    // 返回顶部label
    returnToTopLabel: "返回顶部",
    //本地搜索
    search:{
      provider:'local'
    },
    sidebar: [
      {
        text: 'TypeScript',
        collapsed: false,
        items: [
          { text: '基础类型', link: '../TypeScript/基础类型' },
          { text: '引用类型', link: '../TypeScript/引用类型' },
          { text: 'Class', link: '../TypeScript/Class' },
          { text: '元组、enum、type、never', link: '../TypeScript/元组、enum、type、never' },
          { text: 'Symbol与泛型', link: '../TypeScript/Symbol与泛型' },
          { text: 'namespace(命名空间)', link: '../TypeScript/namespace(命名空间)' },
          { text: '对象与类的混入', link: '../TypeScript/混入' },
          { text: '装饰器', link: '../TypeScript/装饰器' },
          { text: 'weakMap,weakSet,set,map', link: '../TypeScript/weakMap,weakSet,set,map' },
          { text: '封装LocalStorage', link: '../TypeScript/封装LocalStorage' },
          { text: 'Proxy,Reflect', link: '../TypeScript/Proxy,Reflect' },
          { text: '泛型工具1', link: '../TypeScript/泛型工具1' },
          { text: '泛型工具2', link: '../TypeScript/泛型工具2' },
        ]
      },
      {
        text: 'Vue3',
        collapsed: false,
        items: [
          { text: 'ref,Ref,reactive', link: '../Vue3/ref,Ref,reactive' },
          { text: 'Reactive', link: '../Vue3/Reactive' },
          { text: 'vue3响应式原理', link: '../Vue3/vue3响应式原理' },
          { text: 'computed', link: '../Vue3/computed' },
          { text: 'Watch', link: '../Vue3/watch' },
          { text: 'vue生命周期', link: '../Vue3/vue生命周期' },
          { text: 'less,sass,scoped', link: '../Vue3/less,sass,scoped' },
          { text: '父子间的传值', link: '../Vue3/父子间的传值' },
          { text: '全局组件,局部组件,递归组件', link: '../Vue3/全局组件,局部组件,递归组件' },
          { text: '动态组件', link: '../Vue3/动态组件' },
          { text: '插槽', link: '../Vue3/插槽' },
          { text: '异步组件,代码分包,suspense', link: '../Vue3/异步组件,代码分包,suspense' },
          { text: 'Teleport(传送组件)', link: '../Vue3/Teleport(传送组件)' },
          { text: 'Transition(动画组件)', link: '../Vue3/Transition(动画组件)' },
          { text: 'Provide/Inject(依赖注入)', link: '../Vue3/ProvideInject(依赖注入)' },
        ]
      }
    ],
    //侧边栏文字更改(移动端)
    sidebarMenuLabel: '目录',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },
  outDir:"docs",
  // rewrites: {
  //   '../TypeScript/基础类型': '基础类型.md',
  // }

  base:'/docs/',
  // srcDir:''
})
