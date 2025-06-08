## 自定义hooks

在实际开发中，React的内置hooks并不能满足我们所有的需求，比如一些复杂的业务逻辑，或者是一些使用场景，需要我们自己来使用自定义hooks实现。

### 自定义hooks的规则

1. 自定义hooks必须以`use`开头
2. 自定义hooks可以调用其他hooks(内置的hooks和自定义的hooks)

### 案例

```tsx
import { useEffect , useState } from "react";

export interface WartermarkOptions {
  content:string //水印文本
  width?:number//水印宽度
  height?:number //水印高度
  fontSize?:number //水印字体大小
  fontColor?:string //水印字体颜色
  zindex?:number //水印层级
  rotate?:number //水印旋转角度
  gapX?:number //水印横向间隔
  gapY?:number //水印纵向间隔
}

const defaultOptions = (): Partial<WartermarkOptions>  =>{
  const { height, width } = document.documentElement.getBoundingClientRect()
  return {
    content: "水印",
    fontSize: 20,
    fontColor: "#000000",
    zindex: 1000,
    rotate: -30,
    gapX: 100,
    gapY: 50,
    ...{ height, width }
  }
}

export const useWartermark = (options: WartermarkOptions) => {
  const [watermarkOptions, setWatermarkOptions] = useState<WartermarkOptions>(options)
  const opts = Object.assign({},defaultOptions(), watermarkOptions)
  const updateWatermark = (newOptions: Partial<WartermarkOptions>) => {
    setWatermarkOptions(prev => ({
      ...prev,
      ...newOptions
    }))
  }

  useEffect(() => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    canvas.width = opts.gapX!
    canvas.height = opts.gapY!
    //默认
    ctx.translate(opts.gapX! / 2, opts.gapY! / 2)
    ctx.rotate((opts.rotate! * Math.PI) / 180)
    ctx.font = `${opts.fontSize}px sans-serif`
    ctx.textAlign = 'center'
    ctx.fillStyle = opts.fontColor!
    ctx.globalAlpha = 0.15
    ctx.fillText(opts.content, 0, 0)
    const watermarkDiv = document.createElement('div')
    watermarkDiv.id = 'watermark'
    watermarkDiv.style.position = 'fixed'
    watermarkDiv.style.top = '0'
    watermarkDiv.style.left = '0'
    watermarkDiv.style.width = `${opts.width}px`
    watermarkDiv.style.height = `${opts.height}px`
    watermarkDiv.style.pointerEvents = 'none'
    watermarkDiv.style.zIndex = `${opts.zindex}`
    watermarkDiv.style.overflow = 'hidden'
    watermarkDiv.style.backgroundImage = `url(${canvas.toDataURL()})`
    watermarkDiv.style.backgroundSize = `${opts.gapX}px ${opts.gapY}px`
    document.body.appendChild(watermarkDiv)
    return () => {
      document.body.removeChild(watermarkDiv)
    }
  }, [opts])

  return [updateWatermark, opts] as const
}
```

### 使用

```tsx
 import { useWartermark } from './components/FreeHooks' 
 
 const [ updateWatermark ,opts] = useWartermark({
    content: 'TOm',
  })

  const update = () => {
    updateWatermark({
      content: 'Tom1231',
    })
  }
  
  return (<>
  	<button onClick={update}>更新水印</button>
  </>)
```

