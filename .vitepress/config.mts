import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  
  title: "Dumbledore's Pensieve",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/Pensieve.png',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '知识类',
        items: [
          { text: 'TypeScript', link: '/TypeScript/基础类型' },
          { text: 'Vue3', link: '/Vue3/ref,Ref,reactive' },
          { text: '网络(Network)', link: '/Network/OSI七层网络参考模型' },
          { text: '聊天demo', link: '/聊天demo' },
          { text: '埋点', link: '/SDK/埋点相关知识' },
          { text: 'webpack', link: '/webpack' },
          { text: 'React', link: '/React/TSX语法' },
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
    sidebar: {
      '/TypeScript':[
        {
          text: 'TypeScript',
          collapsed: false,
          items: [
            { text: '基础类型', link: '/TypeScript/基础类型' },
            { text: '引用类型', link: '/TypeScript/引用类型' },
            { text: 'Class', link: '/TypeScript/Class' },
            { text: '元组、enum、type、never', link: '/TypeScript/元组、enum、type、never' },
            { text: 'Symbol与泛型', link: '/TypeScript/Symbol与泛型' },
            { text: 'namespace(命名空间)', link: '/TypeScript/namespace(命名空间)' },
            { text: '对象与类的混入', link: '/TypeScript/混入' },
            { text: '装饰器', link: '/TypeScript/装饰器' },
            { text: 'weakMap,weakSet,set,map', link: '/TypeScript/weakMap,weakSet,set,map' },
            { text: '封装LocalStorage', link: '/TypeScript/封装LocalStorage' },
            { text: 'Proxy,Reflect', link: '/TypeScript/Proxy,Reflect' },
            { text: '泛型工具1', link: '/TypeScript/泛型工具1' },
            { text: '泛型工具2', link: '/TypeScript/泛型工具2' },
          ]
        },
      ],
      '/Vue3':[
        {
          text: 'Vue3',
          collapsed: false,
          items: [
            { text: 'ref,Ref,reactive', link: '/Vue3/ref,Ref,reactive' },
            { text: 'Reactive', link: '/Vue3/Reactive' },
            { text: 'vue3响应式原理', link: '/Vue3/vue3响应式原理' },
            { text: 'computed', link: '/Vue3/computed' },
            { text: 'Watch', link: '/Vue3/watch' },
            { text: 'vue生命周期', link: '/Vue3/vue生命周期' },
            { text: 'less,sass,scoped', link: '/Vue3/less,sass,scoped' },
            { text: '父子间的传值', link: '/Vue3/父子间的传值' },
            { text: '全局组件,局部组件,递归组件', link: '/Vue3/全局组件,局部组件,递归组件' },
            { text: '动态组件', link: '/Vue3/动态组件' },
            { text: '插槽', link: '/Vue3/插槽' },
            { text: '异步组件,代码分包,suspense', link: '/Vue3/异步组件,代码分包,suspense' },
            { text: 'Teleport(传送组件)', link: '/Vue3/Teleport(传送组件)' },
            { text: 'Transition(动画组件)', link: '/Vue3/Transition(动画组件)' },
            { text: 'Provide/Inject(依赖注入)', link: '/Vue3/ProvideInject(依赖注入)' },
            { text: 'Mitt', link: '/Vue3/Mitt' },
            { text: 'Tsx', link: '/Vue3/Tsx' },
            { text: '自定义指令directive', link: '/Vue3/自定义指令directive' },
            { text: '自定义hooks', link: '/Vue3/自定义hooks' },
            { text: 'vue3定义全局函数与变量', link: '/Vue3/vue3定义全局函数与变量' },
            { text: 'cssStyle完整新特性', link: '/Vue3/css中Style完整新特性' },
            { text: 'eventLoop&nextTick', link: '/Vue3/eventLoop&nextTick' },
            { text: 'H5适配', link: '/Vue3/H5适配' },
            { text: 'unocss原子化', link: '/Vue3/unocss原子化' },
            // { text: '函数式编程(h函数)', link: '/Vue3/css中Style完整新特性' },
            // { text: 'vue3.3新增了一些语法糖和宏', link: '/Vue3/css中Style完整新特性' },
            { text: '环境变量', link: '/Vue3/环境变量' },
            { text: 'vue3性能优化', link: '/Vue3/性能优化' },
            { text: 'webComponents', link: '/Vue3/webComponents' },
            { text: 'proxy跨域', link: '/Vue3/Proxy' },
            { text: 'pinia', link: '/Vue3/Pinia' },
            { text: '面试相关', link: '/Vue3/第一阶段有关面试问题' },
          ]
        }
      ],
      '/Network':[
        {
          text: 'Network',
          collapsed: false,
          items: [
            { text: 'OSI七层网络参考模型', link: '/Network/OSI七层网络参考模型' },
            { text: 'Tcp', link: '/Network/Tcp' },
            { text: '实现HTTP服务', link: '/Network/实现HTTP服务' },
            { text: '跨域', link: '/Network/跨域' },
            { text: 'Ajax', link: '/Network/Ajax' },
            { text: 'Fetch', link: '/Network/Fetch' },
            { text: '浏览器输入URL会发生什么', link: '/Network/浏览器输入URL会发生什么' },
            { text: 'SSE', link: '/Network/SSE' },
            { text: 'WebSocket', link: '/Network/WebSocket' },
            { text: 'navigator.sendBeacon', link: '/Network/navigator.sendBeacon' },
            { text: 'HTTPS', link: '/Network/HTTPS' },
            { text: 'JWT', link: '/Network/JWT' },
            { text: '网络状态&强网弱网', link: '/Network/网络状态&强网弱网' },
            { text: 'XSS跨站脚本攻击', link: '/Network/XSS跨站脚本攻击' },
          ]
        }
      ],
      '/React':[{
        text: 'React',
        collapsed: false,
        items: [
          { text: 'TSX语法', link: '/React/TSX语法' },
          { text: 'Babel', link: '/React/Babel' },
          { text: '组件', link: '/React/组件' },
          { text: '组件间的通信', link: '/React/组件间的通信' },
          { text: 'useState', link: '/React/useState' },
        ]
      }]
    },
    //侧边栏文字更改(移动端)
    sidebarMenuLabel: '目录',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    //手机端深浅模式文字修改
    darkModeSwitchLabel: '深浅模式', 
    footer:{
      copyright: 'Copyright © 2024-2024 present Evan You', 
    }
  },
  
  outDir:"docs",
  base:'/docs/',
  ignoreDeadLinks: false //关闭忽略死链，不配置即可，非常不建议设置为true
  // srcDir:''
})
