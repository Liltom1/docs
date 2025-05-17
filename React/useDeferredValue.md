### useDeferredValue

#### 用法

用于延迟状态的更新，主渲染完成之后执行，useDeferredValue，关注于单个值的延迟更新，允许把特定状态标记为优先级更低。

```js
const deferredValue = useDeferredValue(value)
```

- value 是需要延迟跟新的值
- deferredValue 延迟更新的值

#### 用例

```ts
import React, { useState, useDeferredValue } from 'react'

import { Input, List } from 'antd'

import mockjs from 'mockjs'

//定义搜索数据的格式
interface item {
  name:number
  address:string
}

export const UseDeferredApp = () => {
  const [val,setVal] = useState('')
  //模拟数据
  const [list] = useState<item[]>(()=>{
    return mockjs.mock({
      'list|10000':[
        {
          'id|+1':1,
          name:'@natural',
          'address':'@county(true)'
        }
      ]
    }).list
  })

  const deferredQuery =  useDeferredValue(val)
  const isChange = deferredQuery !== val

  const findItem = () =>{
    return list.filter(Item => Item.name.toString().includes(deferredQuery))
  }


  return (<>
    <div>
      <Input value={val} onChange={(e)=>setVal(e.target.value)} ></Input>
      <List style={{ opacity: isChange ? '0.2' : '1', transition: 'all 1s' }} dataSource={findItem()} renderItem={
        (item) => <List.Item>
          <List.Item.Meta title={item.name} description={item.address} ></List.Item.Meta>
        </List.Item>
      }>
      </List>
    </div>
  </>)
}

export default UseDeferredApp
```

#### 注意

- `useDeferredValue` 并不是防抖,防抖是需要一个固定的延迟时间，譬如1秒后再处理某些行为，但是useDeferredValue并不是一个固定的延迟，它会根据用户设备的情况进行延迟，当设备情况好，那么延迟几乎是无感知的