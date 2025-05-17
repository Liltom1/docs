### CICD

持续集成，持续部署

集群部署，全自动流程

nodejs linux nginx husky

#### ssh 链接服务器

命令 

1.ssh 账号@ip地址

2.输入密码

-  linux  ls命令 与 windows的dir命令一样的查看目录

- 切换目录 cd ..

- 创建目录 mkdir ..

- 创建文件 touch index.js  windows echo[内容] > [文件名称]

- 修改文件内容 vim编辑器  i编辑  :wq 保存并退出 

- 查看文件内容 cat[文件名称]

- 解压命令unzip [文件名称]

inquirer 库 可选操作命令

压缩的库  archiver

连接node-ssh

yum install unzip

nginx web服务器 启动web项目 yum install nginx

配置文件一定在etc目录下

sh 

location / {

​	root /home/cicd/web; #项目的目录

​	index index.html #index.html 文件

}

nginx -s reload

husky git 的钩子

提交之前 pre-commit

提交之后post-commit

提交代码之前pre-push

提交代码之后post-push

合并代码之前pre-merge

合并代码之后post-merge

面试官问 husky git 的钩子 可以用来干啥

执行es lint css lint检查代码格式 执行cicd脚本