### unocss原子化

优点

1.减少css体积，提高css复用

2.减少起名的复杂度

3.增加了记忆成本

使用

```cmd
npm i unocss -D
```

vite.config.ts

```ts
import unocss from 'unocss/vite'
 
 plugins: [vue(), vueJsx(),unocss({
      rules:[
        
      ]
  })],
```

main.ts引入

```
import 'uno.css'
```

配置静态css

```ts
import { fileURLToPath, URL } from 'node:url'
import { pxtoViewport } from './plugins/pxto-viewport'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import unocss from 'unocss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    unocss({ // [!code focus:5]
      rules:[
        ['flex11', { display: "flex" }]
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss:{
      plugins: [
        pxtoViewport()
      ]
    }
  }
})

```

配置动态css（使用正则表达式）

```
rules: [
  [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
  ['flex11', { display: "flex" }]
]
```

shortcuts 可以自定义组合样式

```ts
  plugins: [vue(), vueJsx(), unocss({
    rules: [
      [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
      ['flex', { display: "flex" }],
      ['pink', { color: 'pink' }]
    ],
    shortcuts: {
      btn: "pink flex"
    }
  })],
```

unoncss预设

```
presets:[presetIcons(),presetAttributify(),presetUno()]
```

1.presetAttributify 属性化模式支持

```html
<div class="flex11" font="black" > test</div>
```

在div中样式中会添加

```
font-weight:900
```

