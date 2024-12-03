#### Proxy

##### 1.跨域

`https://xiaoman.blog.csdn.net:8080/`

一个请求的`url`与接受请求的地址（另一个提供服务的地址，接受方），两个地址存在差异

- 协议不同 `http` -> `https`

- 域名不同 `xiaoman.blog.csdn.net` -> `xiaoman111.blog.csdn.net`

- 端口不同 `xiaoman.blog.csdn.net:8080` -> `xiaoman.blog.csdn.net:5173`

以上三点任意一点不同就会造成跨域

##### 2.`jsopn`解决跨域

基本原理是利用了HTML里script元素标签没有跨域限制 动态创建script标签，将`src`作为服务器地址，服务器返回一个callback接受返回的参数

```js
function clickButton() {
    let obj, s
    obj = { "table":"products", "limit":10 }; //添加参数
    s =  document.createElement("script"); //动态创建script
    s.src = "接口地址xx"  + JSON.stringify(obj);
    document.body.appendChild(s);
 }
//与后端定义callback名称
function myFunc(myObj)  {
    //接受后端返回的参数
    document.getElementById("demo").innerHTML = myObj;
}
```

但是只能用于get请求，post请求无法使用

##### 3.利用`vite proxy`或者`webpack proxy`或者`node`代理

```ts
export default defineConfig({
  plugins: [vue()],
  server:{
     proxy:{
        '/api':{
            target:"http://localhost:9010/", //目标地址
            changeOrigin:true, //支持跨域
            rewrite:(path) => path.replace(/^\/api/, "")//重写路径,替换/api
        }
     }
  }
})
```

原理是请求会发送到代理服务器，由代理服务器转发到目标服务器