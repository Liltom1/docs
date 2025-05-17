### CICD

#### 1.准备配置文件

- config.js文件

```json
//配置文件 分布式 集群部署
//集群部署 多台服务器
//ssh 
const config = [
    {
        name:'项目-A',
        value:'项目-A',
        // 服务器地址
        ssh:{
            host:'8.140.249.87',//服务器ip
            port:22,//端口号
            username:'root',//用户名
            password:'asd123456789!',//密码
            passphrase:'',//密码短语 数字密码
        },
        targetDir:'E:/Project/webpack-demo/dist',//目标目录 (本地目录) 上传的目录
        targetFile:'dist.zip',//压缩之后的名称
        deployDir:'/root/Project/webpack-demo/dist',//远程目录 服务器目录
        releaseDir:'web',//发布目录
    }
]

export default config
```

#### 2.准备命令行工具脚本 helper.js

该文件用来选择，该部署那个项目，需要安装inquirer，调用命令行工具，，所有脚手架都是使用这个库	

```js
//命令行工具
import inquirer from "inquirer";//所有脚手架都是使用这个库
import config from "../config.js";
export default  async function commadLine() {
    console.log(process.argv,'argv');
    if(process.argv[2]) {
        return config.find(item => item.value === process.argv[2])
    }else{
        const res =  await inquirer.prompt([
            {
                type:'list',
                message:'请选择部署的项目',
                name:'project',
                choices:config,
            },
        ])
        console.log(res)
        return config.find(item => item.value === res.project)
    }
    
}
```

#### 3.准备压缩文件脚本 compressFile.js

需要安装archiver依赖

```js
//压缩文件


/**
 * @param {*} targetDir 压缩的目录
 * @param {*} localDir 输出目录 E:\Project\CICD
 * @return {Promise}
 */

import fs from 'node:fs';
import archiver from 'archiver';
export default function compressFile(targetDir, localFile) {
    return new Promise((resolve, reject) => {
        
        const output = fs.createWriteStream(localFile);
        
        const arch = archiver('zip', {
            zlib: { level: 9 } // 1-9等级越高 压缩率越高
        });
        output.on('close', () => {
           console.log( arch.pointer()/1024/1024 + 'MB');// 获取压缩后的大小
           
            resolve();
        });
        arch.pipe(output); // 管道流 压缩后写入目录
        arch.directory(targetDir, 'dist'); // 压缩目录
        arch.finalize(); // 结束压缩
    })
}
```

#### 4.链接服务器脚本 ssh.js

需要安装node-ssh依赖

```js
//链接ssh
import * as ssh from 'node-ssh';

const sshClient = new ssh.NodeSSH(); //

export async function connectSSH(sshconfig) {  
    return new Promise((resolve,reject)=>{
        sshClient.connect(sshconfig).then(res=>{
            console.log('ssh连接成功');
            resolve(res)
        })
    })

}

export default {
    sshClient,
    connectSSH
}
```

#### 5.调用ssh 执行linux脚本 handleCommand.js

```js
//调用ssh 运行linux命令


export default function Runcommad(ssh,command,path){
    return new Promise((resolve,reject)=>{
        ssh.execCommand(command,{
            cwd:path //指定目录
        }).then(res=>{
            console.log('执行成功');
            
            resolve(res)
        })
    })
}
```

#### 6.上传文件脚本 uploadFile.js

```js
//上传文件到服务器
/** 
  @param {*} ssh ssh连接对象
  @param {*} config 配置文件
  @param {*} target 上传的文件目录
*/

export default function uploadFile(ssh, config, target){
    return new Promise((resolve, reject) => {
        ssh.putFile(target,config.deployDir+config.releaseDir).then(res=>{
            resolve(res)
        })
    })
}
```

#### 7.打包文件脚本 build.js

使用node自带child_process工具 

```js
//打包项目
//子进程
// execSync , span 执行shell 命令
// spawn 适合执行长时间运行的命令
// execSync 适合执行短时间运行的命令
// execSync 执行命令会阻塞主线程
// spawn 执行命令不会阻塞主线程
// spawn 执行命令会返回一个子进程对象

import { execSync , spawn } from 'child_process';

export default function build(path){
    return new Promise((resolve,reject)=>{
        execSync(`npm run build`,{
            cwd:process.cwd(), //指定目录
            stdio:'inherit', //继承父进程的输入输出 输出日志
            // shell:true //使用shell执行命令
        })
        resolve('build success')
    })
}
```

#### 8.各个脚本执行顺序

获取打包项目的信息 -> 执行打包命令 -> 将打包后的文件进行压缩 ->  链接服务器 -> 删除之前的包 -> 上传新的包 -> 解压当前包 -> 删除压缩包 -> 重新命名前端包

```js
import commadLine from "./utils/helper.js";
import compressFile from "./utils/compressFile.js";
import path from "node:path";
import SSH from "./utils/ssh.js";
import uploadFile from "./utils/uploadFile.js";
import Runcommad from "./utils/handleCommand.js";
import build from "./utils/build.js";

const main = async () =>{
   const config = await commadLine()
   await build(config.targetDir) //打包项目
   console.log(config);
   // // 获取当前目录 拼接压缩后的文件目录
   const loacl = path.resolve(process.cwd(), config.targetFile)
   await compressFile(config.targetDir, loacl)//将打完项目的dist 压缩到本目录下
   await SSH.connectSSH(config.ssh)
   await Runcommad(SSH.sshClient,`rm -rf ${config.releaseDir}`,config.deployDir) //删除之前的目录
   await uploadFile(SSH.sshClient, config, loacl)//上传web.zip
   await Runcommad(SSH.sshClient,`unzip ${config.releaseDir}`,config.deployDir)  //解压web.zip
   await Runcommad(SSH.sshClient,`rm -rf ${config.releaseDir}`,config.deployDir) //删除web 文件夹
   await Runcommad(SSH.sshClient,`mv dist ${config.releaseDir}`,config.deployDir) //重命名
   SSH.sshClient.dispose() //关闭ssh连接
}

main()
```

#### 9.关于husky

Husky插件是一个基于Git版本控制系统的钩子（hooks）管理器，它允许你在Git操作（如提交代码、推送到远程仓库等）之前或之后运行自定义的脚本或命令。这些脚本可以用于自动化代码规范检查、运行测试、构建项目或执行其他定制化的任务。

安装husky

*//添加钩子，使用版本是v8版本，只需要在.husky文件夹下配置钩子* 

npx husky **add** .husky/pre-commit

//在生成的文件夹里.husky\pre-commit，输入打印日志 

*#!/usr/bin/env sh* . "$(dirname -- "$0")/_/husky.sh" echo \"[Husky] pre-commit\"

可以直接在Husky中去执行 脚本文件

以下是示例 在pre-commit文件中

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

cd E:/Project/CICD

node app.js 项目-A
```

