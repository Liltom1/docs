---
next:
  text: 'JWT'
  link: '../Network/JWT'
prev:
  text: 'navigator.sendBeacon'
  link: '../Network/navigator.sendBeacon'
---
#### HTTPS

##### 定义

是一种通过加密通道传输数据的安全协议。它是 HTTP 协议的安全版本，用于在 Web 浏览器和 Web 服务器之间进行安全的数据传输。HTTPS 在传输过程中使用了 SSL（Secure Sockets Layer）或 TLS（Transport Layer Security）协议来加密数据，确保敏感信息在传输过程中不会被窃取或篡改。

http缺点

- **通信使用明文(不加密)，内容可能会被盗用**

- **不验证通信方的身份，因此有可能遭遇伪装**

- **无法证明报文的完整性，所以有可能已遭篡改**

https

- 信息加密
- 完整性校验
- 身份验证

HTTPS = http + TLS/SSL

##### TLS SSL

TLS（Transport Layer Security）和 SSL（Secure Sockets Layer）是用于保护网络通信的安全协议。它们都提供了加密和认证机制，用于确保数据传输的机密性和完整性。

面试题

TLS和SSL是在那一层进行加密的？

传输层上面，应用层的下面，简称加密层

##### 常见的加密算法

1.AES DES（对称加密）

两端协商好怎么加密，解密

A段 ：AES加密+密钥（123123） + 明文（456456） =  789789

B段：AES + 密钥（123123） + 密文（789789） =  456456

2.RSA DSA(非对称加密)

公钥 所有人都知道 私钥只有管理员才知道

A段：RSA + 公钥 + 明文 （123123） = 密文（ 456456）

B段：RSA + 私钥 + 密文 （456456） = 123123 

TLS是将三种加密方式融合起来，对称加密 非对称加密 散列函数，提高安全性

##### openSSL 生成私钥

在 SSL/TLS 加密通信中，一般需要使用三个文件来完成证书相关操作

###### 1.生成私钥文件（例如 "private-key.pem"），用于对加密数据进行解密操作

命令

```
openssl genpkey -algorithm RSA -out private-key.pem -aes256
```

- openssl: OpenSSL 命令行工具的名称。
- genpkey: 生成私钥的命令。
- -algorithm RSA: 指定生成 RSA 私钥。
- -out private-key.pem: 将生成的私钥保存为 private-key.pem 文件。
- -aes256: 为私钥添加 AES 256 位加密，以保护私钥文件不被未经授权的人访问。

Enter PEM pass phrase qwe123 密码短语生成pem文件的时候需要

###### 2.证书签名请求文件（例如 "certificate.csr"），用于向 CA 申请 SSL/TLS 证书签名

命令

```
openssl req -new -key private-key.pem -out certificate.csr
```

- req: 表示使用 X.509 证书请求管理器 (Certificate Request Management) 功能模块。
- -new: 表示生成新的证书签名请求
- -key private-key.pem: 表示使用指定的私钥文件 "private-key.pem" 来加密证书签名请求中的密钥对
- -out certificate.csr: 表示输出生成的证书签名请求到文件 "certificate.csr" 中。该文件中包含了申请者提供的一些证书请求信息，例如公钥、授权主体的身份信息等。

每步操作需要填写的信息

Country Name (2 letter code) []:CN  国家

State or Province Name (full name) []:BJ 省份

Locality Name (eg, city) []:BJ 城市

Organization Name (eg, company)ZMY 组织或者是个人

Organizational Unit Name (eg, section) []:XMKJ 机构名称

Common Name (eg, fully qualified host name) []:localhost 域名

Email Address []: 邮箱地址

Please enter the following 'extra' attributes

to be sent with your certificate request

A challenge password []:  密码加盐 XMZSXMZSXMZS

###### 3.SSL/TLS 证书文件（例如 "certificate.pem"），用于对客户端发送的请求进行验证，以确保通信安全可靠

命令

```
openssl x509 -req -in certificate.csr -signkey private-key.pem -out certificate.pem
```

- x509: 表示使用 X.509 **证书管理器功能模块**
- -req: 表示从输入文件（这里为 "certificate.csr"）中读取证书签名请求数据。
- -in certificate.csr: 指定要读取的证书签名请求文件名。
- -signkey private-key.pem: 指定使用指定的私钥文件 "private-key.pem" 来进行签名操作。一般情况下，签名证书的私钥应该是和之前生成 CSR 的私钥对应的。
- -out certificate.pem: 表示将签名后的证书输出到文件 "certificate.pem" 中。该文件中包含了签名后的证书信息，包括签名算法、有效期、公钥、授权主体的身份信息等

Enter pass phrase for private-key.pem: 密码短语

后端

```ts
import https from 'node:https'
import fs from 'node:fs'
https.createServer({
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('certificate.pem'),
    //密码短语
    passphrase: 'qwe123'
}, (req, res) => {
    res.writeHead(200)
    res.end('success')
}).listen(443,()=>{
    console.log('server is running')
})
```

##### nginx配置https

**如果在windows使用nginx配置https 私钥不能设置密码**

openssl genrsa -out nginx.key 2048 （生成私钥）

openssl req -new -key nginx.key -out nginx.csr（生成签名文件）

openssl x509 -req -in nginx.csr -signkey nginx.key -out nginx.crt（生成证书）

```txt
    server {
       listen       443 ssl;
       server_name  localhost;

       ssl_certificate      nginx.crt;
       ssl_certificate_key  nginx.key;

       ssl_session_cache    shared:SSL:1m;
       ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

       location / {
           root   html;
           index  index.html index.htm;
       }
    }

```

