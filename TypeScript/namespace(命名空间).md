---
next:
  text: '对象与类的混入'
  link: '../TypeScript/混入'
prev:
  text: 'Symbol与泛型'
  link: '../TypeScript/Symbol与泛型'
---
#### namespace(命名空间)

命名空间中通过`export`将想要暴露的部分导出

```ts
namespace M {
  export const Time: number = 1000
  export const fn = <T>(arg: T): T => {
    return arg
  }
  fn(Time)
}

M.Time
M.fn(1)
```

- 嵌套命名空间

```ts
//嵌套命名空间
namespace A {
  export namespace B {
    export const Time: number = 1000
    export const fn = <T>(arg: T): T => {
      return arg
    }
    fn(Time)
  }
}
A.B.Time
A.B.fn(1)
```

- 抽离命名空间

a.ts

```ts
export namespace V {
    export const a = 1
}
```

b.ts

```ts
import {V} from '../observer/index'
 
console.log(V);
{a:1}
```

- 合并命名空间

```ts
//命名空间合并
namespace A {
  export let a: number = 1
}

namespace A {
  export let b: number = 1
}

console.log(A.a, A.b)
```

- 简化命名空间

```ts
namespace A  {
    export namespace B {
        export const C = 1
    }
}
 
import X = A.B.C
 
console.log(X);
```

