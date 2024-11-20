/* .vitepress\theme\index.ts */
import DefaultTheme from 'vitepress/theme'
import backtotop from "./components/backtotop.vue"
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(backtotop), // 使用doc-footer-before插槽
    })
  }
}