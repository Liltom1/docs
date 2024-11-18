import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dumbledore's Pensieve",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'TypeScript', link: '/TypeScript/TypeScript 类型 （第一篇）' }
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
    //本地搜索
    search:{
      provider:'local'
    },
    sidebar: [
      {
        text: 'TypeScript',
        items: [
          { text: 'TypeScript 类型 （第一篇）', link: '../TypeScript/TypeScript 类型 （第一篇）' },
          { text: 'TypeScript 类型（第二篇）', link: '../TypeScript/TypeScript 类型（第二篇）' },
          { text: 'TypeScript类型（第三篇）', link: '../TypeScript/TypeScript类型（第三篇）' },
          { text: 'TypeScript元组', link: '../TypeScript/TypeScript元组' },
          { text: 'TypeScript 泛型', link: '../TypeScript/TypeScript 泛型' },
          { text: 'namespace(命名空间)', link: '../TypeScript/namespace(命名空间)' },
          { text: '对象与类的混入', link: '../TypeScript/混入' },
          { text: 'TypeScript(装饰器)', link: '../TypeScript/TypeScript(装饰器)' },
          { text: 'weakMap,weakSet,set,map', link: '../TypeScript/weakMap,weakSet,set,map' },
          { text: '封装LocalStorage并支持过期时间', link: '../TypeScript/封装LocalStorage并支持过期时间' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  outDir:"docs",
  // rewrites: {
  //   '../TypeScript/TypeScript 类型 （第一篇）': 'TypeScript 类型 （第一篇）.md',
  // }

  base:'/docs/',
  // srcDir:''
})
