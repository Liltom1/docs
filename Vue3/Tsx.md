#### Tsx

安装

```
 npm install @vitejs/plugin-vue-jsx -D
```

vite.config.ts导入使用

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx(),AutoImport({
    imports:['vue'],
    dts:'src/auto-imports.d.ts'
  })],
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:"@import './src/bem.scss';"
      }
    }
  }
})

```

声明APP.tsx文件

```tsx
//1.第一种
// export default function(){
//   return (<div>小满</div>)
// }
//2.第二种 defineComponent  optionsApi
// import { defineComponent } from "vue"
// export default DefineComponent({
//   data (){
//     return {
//       name:"小满"
//     }
//   },
//   render(){
//     //取值用{}
//     return (<div>{this.name}</div>)
//   }
// })
//2.第三种 setup 
interface Prop{
  name?:string
}

import { defineComponent, ref } from "vue"
export default defineComponent({
  props: {
    name:String
  },
  emits:['ick'],
  setup(props:Prop,{emit}) {
    const flag = ref(true)
    // return () => (<div v-show={flag.value} >小满</div>)//使用ref 需要自动解包在模板里

    // return () => (<>
    //       <div>{ flag.value ? <div>小满</div> : <div>小满2</div>}</div>
    //   </>)

    const arr = [
      { id: 1, name: "小满" },
      { id: 2, name: "小满2" },
    ]
    const click = (item:any)=>{
      emit('ick',item)
      // console.log(item)
    }
    return () => (<div>
      <div>{props?.name}</div>
      <div>{
        arr.map(item =>  {
          return <div  key={item.id} name={item.name}  onClick={()=> click(item)} >{item.name}</div> //用map代替v-for 用{}代替v-bind 
        }) 
      }</div>
    </div>)

  }
})
```

其它文件引用

```
import jsXAPP from './App' 
```

