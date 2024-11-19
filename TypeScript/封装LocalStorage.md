---
prev:
  text: 'weakMap,weakSet,set,map'
  link: '../TypeScript/weakMap,weakSet,set,map'
# next:
#   text: '封装LocalStorage'
#   link: '../TypeScript/封装LocalStorage'
---
#### 封装LocalStorage

```ts
import { StorageCls, Key, expire, Data, Result } from './type'
import { Dictionaries } from './enmu'

//./enmu文件
//字典 Dictionaries    expire过期时间key    permanent永久不过期
// export enum Dictionaries {
//   expire = 'expire',
//   permanent = 'permanent'
// }

//./type文件
// import { Dictionaries } from "../enmu";
// export type Key = string  //key 类型
// export type expire = Dictionaries.permanent | number //有效时间类型

//格式化data类型
// export interface Data<T> {
//   value: T,
//   [Dictionaries.expire]: Dictionaries.expire | number
// }

// //返回值类型
// export interface Result<T> {
//   message: string,
//   value: T | null
// }

// export interface StorageCls {
//     set:<T>(Key:Key,value:T,expire:expire) => void
//     get:<T>(Key:Key) => Result<T | null>
//     remove(Key:Key):void
//     clear():void
// }



// set, get, remove, clear
export class Storage implements StorageCls {
  //存储接受 key value 和过期时间 默认永久
  public set<T = any>(key: Key, value: T, expire: expire = Dictionaries.permanent ): void {
    const data = {
      value,
      [Dictionaries.expire]: expire
    }
    localStorage.setItem(key, JSON.stringify(data))
  }
  public get<T = any>(key: Key): Result<T | null> {
    const value = localStorage.getItem(key)
    if (value) {
      const obj: Data<T> = JSON.parse(value)
      const now = new Date().getTime()
      if (typeof obj[Dictionaries.expire] == 'number' && obj[Dictionaries.expire] < now) {
          this.remove(key)
          return {
            message: `您的${key}已过期`,
            value: null
          }
       }else{
          return {
            message: '读取成功',
            value: obj.value
          }
        }
      }else{
        return {
          message: `您的${key}不存在`,
          value: null
      }
    }
  }
  public remove(Key: Key): void {
    localStorage.removeItem(Key)
  }
  public clear(): void {
    localStorage.clear()
  }
}
```

