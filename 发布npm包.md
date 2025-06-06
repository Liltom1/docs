## 发布npm包

以发布vue包举例

### 一，vite构建项目

#### 1.npm create vite bigfile，将vite自带的一些样式，.vue文件删除

#### 2.封装组件

在src文件夹中的components文件夹下新建我们需要封装的组件，每个组件单独一个文件夹，每个文件夹下需要有index.vue

举例

```vue
<template>
  <div>
    <input type="file" id="file" :multiple="true" @change="handleChange" @click.stop>
    <!-- <button id="upload" @click="upload">上传</button> -->
  </div>
</template>
<script lang='js' setup name="BigFileUpload">
import { ref, reactive, defineProps, defineOptions } from 'vue'
defineOptions({
  name: 'BigFileUpload'
})
const worker = new Worker('../worker.js')
const chunks = [];
const props =  defineProps({
  options: {
    type: Object,
    default: () => {
      return {
        checkFileUrl: '',
        uploadFileUrl: '',
        mergeFileUrl: '',
        chunkSize: 1024 * 1024 * 5, // 5MB
      }
    },
  },
})

console.log(props.options);

const handleChange = (e) => {
  // console.log(e.target.files[0]);
  const files = e.target.files[0];
  // console.log(Array.from(files));
  const fs = files; //读取文件内容
  const total = Math.ceil(fs.size / props.options.chunkSize); //切割的总数 也就是我们要掉23次接口
  console.log(total,'total');
  
  //0-5 5-10 10-15 15-20 20-25 将文件分装成5M的块 并放入chunks数组中
  chunks.push(...Array.from({ length: total }, (_, i) => fs.slice(i * props.options.chunkSize, (i + 1) * props.options.chunkSize)));
  
  console.log(chunks, 'chunks');
  //将切片数组传到web worker，多线程脚本运行上传到后端
  //向worker.js发送消息  worker.js会接收这个消息
  worker.postMessage({
    chunks,
    filename: fs.name,
  });
  
  console.log(worker,'worker');
}

worker.onmessage = async function (e) {
  console.log(e,'e');
  const { filename, hash } = e.data;
  const res = await fetch(`${props.options.checkFileUrl}?hash=${hash}`)
  const { files } = await res.json(); //接收后端反文件，如果后端已存在文件直接将文件返回，如果没有就返回空数组
  const set = new Set(files)
  //这一步是用来做断点续传使用，假如分片上传了一部分，后端会将已上传的分片返回给前端，前端就可以根据这个数组来判断哪些分片已经上传过了
  //tasks就是剩余还需要上传的分片
  const tasks = chunks.map((chunk, index) => ({ chunk, index })).filter(({ index }) => {
    return !set.has(`${filename}-${index}`)
  })

  // const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  for (const { chunk, index } of tasks) {
    const formData = new FormData();
    formData.append("filename", filename);
    formData.append("hash", hash);
    formData.append("index", index);
    formData.append("file", chunk);
    await fetch(props.options.uploadFileUrl, {
      method: "POST",
      body: formData
    })

    // await sleep(2000)
  }

  //所有分片上传完毕，开始合并
  await fetch(`${props.options.mergeFileUrl}?hash=${hash}&filename=${filename}`)
}


</script>
<style lang='less' scoped></style>
```

**其中需要注意的是，要把组件名字写上**

```vue
defineOptions({
  name: 'BigFileUpload'
})
```

#### 3.暴露组件

封装完成后需要暴露出去，在components下新建index.js文件

```js
import BigFileUpload from './BigFileUpload/index.vue'
const component = [BigFileUpload]; // 将来如果有其它组件，都可以写到这个数组里

const install = function(Vue){
  component.forEach((com) => {
    Vue.component(com.name, com);
  });
};

export default { install };

```

#### 4.打包组件

修改打包配置文件

```js
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

console.log('path', path.resolve(__dirname, './src/packages/index.js'));

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', //输出文件名称
    lib: {
      entry: path.resolve(__dirname, './src/packages/index.js'), //指定组件编译入口文件
      name: 'bigFileUpload',// name 是暴露的全局变量
      fileName: 'bigFileUpload', //是软件包输出文件的名称
    }, //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    }, // rollup打包配置
  },
})

```

#### 5.验证打包后组件是否可用

然后使用npm run dev打包，打包完后，验证打完包后是否使用，在main.js中去引用如下

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import BigFileUpload from 'bigfilesupload'
import BigFileUpload from '../dist/bigFileUpload.js'


export const app = createApp(App)
app.use(BigFileUpload)
app.mount('#app')

```

引用完后在任意vue文件中去使用这个组件

```vue
<template>
  <BigFileUpload :options="options"></BigFileUpload>
</template>

<script setup>
import { ref, reactive } from 'vue'
const options = ref({
  checkFileUrl: 'http://localhost:3000/verify',
  uploadFileUrl: 'http://localhost:3000/upload',
  mergeFileUrl: 'http://localhost:3000/merge',
  chunkSize: 1024 * 1024 * 5, // 5MB
})
</script>

```

#### 6.验证完成后，推送到npm官网

1）首先在npm官网注册账号

2）在打包后的文件夹下执行 npm init -y 命令 ，（一般是dist）生成package.json文件 有以下配置项

```json
{
  "name": "bigfilesupload", //包名
  "version": "1.0.1", //版本号
  "main": "bigFileUpload.js", // 提交的文件
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],//npm官网搜索的关键词
  "author": "",
  "license": "ISC",
  "description": "" //描述
}
```

3）发布npm包

- 执行npm login,输入邮箱，密码登录
- npm publish

发包注意事项：

1. 发布前保证npm上没有跟你相同的包名，否则无法发布。（去npm官网查询自己上传的报名，看是否已存在）
2. 同一个包名，每次发布的版本号不可重复。

与npm相关命令

更新npm包：（更新成功会输出版本号，版本号自动加一，此更新只针对本地）

`npm version ptch` （补丁号，修复bug，小变动，如 v1.0.0->v1.0.1）

`npm version minor` （次版本号，增加新功能，如 v1.0.0->v1.1.0）

`npm version major` （主版本号，不兼容的修改，如 v1.0.0->v2.0.0）

删除npm包：`npm unpublish 包名` （撤销已发布的版本）

删除指定npm包：`npm unpublish 包名@1.0.2`（删除成功会输出删除的本地版本号，对应服务器也会删除）

#### 7.下载npm包验证

npm install bigfilesupload

全局注册组件

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import BigFileUpload from 'bigfilesupload'//引用
// import BigFileUpload from '../dist/bigFileUpload.js'


export const app = createApp(App)
app.use(BigFileUpload)
app.mount('#app')

```

使用

```vue
<template>
  <BigFileUpload :options="options"></BigFileUpload>
</template>

<script setup>
import { ref, reactive } from 'vue'
const options = ref({
  checkFileUrl: 'http://localhost:3000/verify',
  uploadFileUrl: 'http://localhost:3000/upload',
  mergeFileUrl: 'http://localhost:3000/merge',
  chunkSize: 1024 * 1024 * 5, // 5MB
})
</script>
```

#### 8.踩坑

在编写组件时，一定需要把vue组件名加上

```vue
<template>
  <div>
    <input type="file" id="file" :multiple="true" @change="handleChange" @click.stop>
  </div>
</template>
<script lang='js' setup name="BigFileUpload">
import { ref, reactive, defineProps, defineOptions } from 'vue'
defineOptions({ // [!code focus:3]
  name: 'BigFileUpload'
})
</script>
```

