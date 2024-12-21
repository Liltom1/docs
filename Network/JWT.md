---
next:
  text: '网络状态&强网弱网'
  link: '../Network/网络状态&强网弱网'
prev:
  text: 'HTTPS'
  link: '../Network/HTTPS'
---
#### JWT

定义

鉴权用的，登录之后存储用户信息

生成令牌（token）格式`xxxxx.xxxxx.xxxxxx`

三部分组成

- 头部（header）

```json
{
  "alg": "HS256", //加密的算法 默认 RSA 非对称加密算法 代表所使用的签名算法，例如 HMAC SHA256（HS256）或 RSA 等。 
  "typ": "JWT" //代表令牌的类型，一般为 "JWT"
}
```

- 负载 （Payload）负载包含所要传输的信息，例如用户的身份、权限等。负载也是一个 JSON 对象，同样进行 Base64 URL 编码

```json
{
  "iss": "example.com",
  "exp": 1624645200,
  "sub": "1234567890",
  "username": "johndoe"
}
```

- 签名（Signature）：签名是使用私钥对头部和负载进行加密的结果。它用于验证令牌的完整性和真实性。

```
    HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secretKey
    )

```

demo

```ts
// import  express  from "express";
const express = require('express')
const cors = require('cors')
const jwt  = require('jsonwebtoken')


const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


let key = 'tomtom'
let user = {
    id:1,
    username: 'admin',
    password: '123456'
}

//1.返回前端token用于授权
app.post('/api/login',(req,res)=>{
    if(req.body.username === user.username && req.body.password === user.password){
        //jwt.sign 方法有三个参数 第一个是payload 第二个是私钥 密钥 第三个是过期时间
        const token = jwt.sign({id:user.id}, key, { expiresIn: '1h' })
        res.send({
            code:200,
            token
        })
    } else {
        res.send({
            code:401,
            message:'用户名或密码错误'
        })
    }

    res.send('sendBeacon')
})
//2.列表接口必须是授权状态才能访问，否则401
app.get('/api/list', (req, res) => {
    const token = req.headers['authorization']
    if (token) {
        //jwt.verify 方法有两个参数 第一个是token 第二个是私钥 密钥
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                res.send({
                    code:403,
                    message:'token过期'
                })
            } else {
                res.json({
                    list:[
                        {
                            id:1,
                            title:'标题1'
                        },
                        {
                            id:2,
                            title:'标题2'
                        }
                    ]
                })
            }
        })
    } else {
        res.send({
            code:403,
            message:'没有token'
        })
    }
})
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
```

