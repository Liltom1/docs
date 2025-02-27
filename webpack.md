## webpack

安装

需要安装包如下

webpack ，webpack-cli ，webpack-dev-server ，htmlWebpackPlugin ，ts-loader ，swc-loader ，css-loader ，style-loader ，less-loader ，url-loader ，file-loader ，vue-loader ，mini-css-extract-plugin ，VueLoaderPlugin

- webpack5 版本需要 webpack 与 webpack-cli一起装  关于-cli 的解释 -> 命令行工具

- webpack-dev-server 服务工具

### loader

xxx-loader 用来处理 xxx文件 ，loader写在webpack配置文件module.rules下

- ts-loader处理ts文件

```js
module:{
    rules:[
      {
        test:/\.ts$/,//匹配文件
         use:{
           loader: 'ts-loader',
           options:{
             appendTsSuffixTo: [/\.vue$/] //处理vue 文件中 ts代码
           }
         },//使用loader处理
        exclude:/node_modules/, //排除
      },
    ]
  },
```

- swc-loader 处理 ts,js文件速度比ts-loader 更快

```js
module:{
    rules:[
      {
        test:/\.ts$/,//匹配文件
        use:{
          loader:'swc-loader',
          options:{
            jsc:{
              parser:{
                syntax: 'typescript',
                tsx: true
              }
            }
          }
        },
        exclude:/node_modules/, //排除
      },
    ]
  },
```

- url-loader ，file-loader 用来处理图片文件

```js
module:{
    rules:[
      {
        test:/\.(png|jpg|gif|jpeg|svg|webp|ico)$/i,
        use:{
          loader: 'url-loader',
          options: {
            limit: 100024,//满足条件压缩成base64
            esModule: false,
            name: 'static/[name].[hash].[ext]',
          }
        },
      },
    ]
  },
```

- vue-loader 处理vue文件

```js
module:{
    rules:[
      {
        test:/\.vue$/,
        use:'vue-loader'
      },
    ]
  },
```

- css-loader ，style-loader ，less-loader 用来处理css文件

```js
module:{
    rules:[
      {
        test:/\.css$/,
        use: ['style-loader','css-loader'] //从右往左 先用css-loader 处理vue文件中的css 变为js代码 -> 再用style-loader生成style标签 插入到html中
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'] //从右往左 
      }
    ]
  },
```

### plugins

- htmlWebpackPlugin 指定html 自动注入打包后的 JS 和 CSS 文件

```js
plugins: [
    new htmlWebpackPlugin({template:'./index.html'}),
  ],
```

- MiniCssExtractPlugin 将 CSS 提取到单独文件 然后通过script标签引入到html

```js
module:{
    rules:[
      {
        test:/\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader'] //从右往左 先用css-loader 处理vue文件中的css 变为js代码 -> 再用style-loader生成style标签 插入到html中
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] //从右往左 
      }
    ]
  },
plugins: [
    new htmlWebpackPlugin({template:'./index.html'}),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin()
  ],
```

- VueLoaderPlugin 需要搭配vue-loader 使用 用来调度vue-loader处理.vue文件后的结果，交给不同的loader处理

```js
plugins: [
    new VueLoaderPlugin(),
  ],
```

处理流程

```
graph LR
    A[.vue 文件] --> B[VueLoader]
    B --> C[template]
    B --> D[script]
    B --> E[style]
    C --> F[vue-template-compiler]
    D --> G[babel-loader/ts-loader]
    E --> H[css-loader/style-loader]
```

### 其它配置项

```js
const { Configuration } = require('webpack');
const path = require('node:path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const moment = require('moment');
//js docs 扩充申明
/**
 * @type { Configuration }
 */
const config = {
  cache:{
    type:'filesystem',//文件存储 提高打包速度
  },
  mode:'development',
  entry:'./src/main.ts',//入口文件
  output:{ //出口文件配置
    filename:'[chunkhash].js',
    path: path.resolve(process.cwd(), 'dist'), //process.cwd()根路径
    clean:true,//每一次打包的时候清空上一次的打包结果
  },
  module:{
    rules:[
      {
        test:/\.ts$/,//匹配文件
        // use:{
        //   loader: 'ts-loader',
        //   options:{
        //     appendTsSuffixTo: [/\.vue$/] //处理vue 文件中 ts代码
        //   }
        // },//使用loader处理
        use:{
          loader:'swc-loader',
          options:{
            jsc:{
              parser:{
                syntax: 'typescript',
                tsx: true
              }
            }
          }
        },
        exclude:/node_modules/, //排除
      },
      {
        test:/\.(png|jpg|gif|jpeg|svg|webp|ico)$/i,
        use:{
          loader: 'url-loader',
          options: {
            limit: 100024,//满足条件压缩成base64
            esModule: false,
            name: 'static/[name].[hash].[ext]',
          }
        },
      },
      {
        test:/\.vue$/,
        use:'vue-loader'
      },
      {
        test:/\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader'] //从右往左 先用css-loader 处理vue文件中的css 变为js代码 -> 再用style-loader生成style标签 插入到html中
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] //从右往左 
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({template:'./index.html'}),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin()
  ],
  resolve:{
    extensions: ['.ts','.js','.vue'],//配置文件后缀
    alias:{
      "@": path.resolve(__dirname,'./src')//配置别名
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        moment: {
          name: 'moment',
          test: /[\\/]node_modules[\\/]moment/,
          chunks: 'all' //静态模块，以及动态模块，以及共享模块全部拆分
        },
        common:{
          name:'common',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
        }
      }
    }
  },
  //cdn
  externals:{
    vue:"Vue",
  }
}

//cjs commonjs require module.exports
//esm import export default
module.exports = config
```

### 总结

webpack 使用的 treeShaking 树摇技术

申明的变量，以及函数没有用到， 会被摇掉 永远走不进去的if 也会被摇掉，不会打到最后的包

webpack 天然支持js代码和json