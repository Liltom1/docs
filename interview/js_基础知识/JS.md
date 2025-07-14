# JS

### 1.类型

- 值类型：string,number,布尔类型，symbol,undefined

- 引用类型：对象，数组，null，函数

  typeof可以判断所以的值类型 ，引用类型，只能判断函数 ，其他 null ['a','b],{x:100}都识别为‘object’

### 2.变量计算-类型转换

- 字符串拼接 10 + '12' = '1012'
- ==  : 0 == ''  , 0 == false false == '' null == undefined 100 == '100'
- if语句和逻辑运算

何时使用 == 

```js
const obj = { x : 100 }
if(obj.a == null) {}

//相当于
//if(obj.a === null || obj.a === undefined )
```

!!xxx === true 为 truly 变量

!!xxx === false 为 falsely 变量

if语句判断时，是判断的是否为truly或falsely变量