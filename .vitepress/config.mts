import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dumbledore's Pensieve",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'TypeScipt', link: '../TypeScript/TypeScript 类型 （第一篇）' }
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
        text: 'TypeScipt',
        items: [
          { text: 'TypeScript 类型 （第一篇）', link: '../TypeScript/TypeScript 类型 （第一篇）' },
          { text: 'TypeScript 类型（第二篇）', link: '../TypeScript/TypeScript 类型（第二篇）' },
          { text: 'TypeScript类型（第三篇）', link: '../TypeScript/TypeScript类型（第三篇）' },
          { text: 'TypeScript元组', link: '../TypeScript/TypeScript元组' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  outDir:"docs",
  base:'/docs/'
})
