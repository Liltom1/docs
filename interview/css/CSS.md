# CSS

### 1.核模型宽度计算

offsetWidth = 内容宽度+ 内边距+边框

如何使offsetWidth 为 元素属性width宽度 ，将box-sizing:border-box

margin-top和margin-bottom发生重叠取最大的

### 2.line-height如何继承

- 具体数字就继承该值
- 写比例，就继承该比例
- 写百分比，如200%，则继承计算出来的值

### 3.水平居中

- 块级元素 包含 内敛元素 ，给内敛元素加上 text-align:center属性
- 块级元素 包含 块级元素 ，给里面块级元素添加宽度，并加上margin：auto
- 块级元素 包含 块级元素 ，但子元素position:absolute,父元素position:relative ，此时子元素需要设position:50%，margin-left设置为负数-的子元素宽度一半

### 4.垂直居中

- 块级元素 包含 内敛元素 ，给内敛元素加上 text-align:center属性 并且行高设置为父元素高度
- 块级元素 包含 块级元素 ，但子元素position:absolute,父元素position:relative ，此时子元素需要设left:50%，margin-left设置为负数-的子元素`宽度`一半 ，高度Top:50%，margin-top设置为负数-的子元素`高度`一半
- 块级元素 包含 块级元素 ，但子元素position:absolute,父元素position:relative ，此时子元素需要设left:50%，高度Top:50%，此时 transform:translate(-50%,-50%)
- 块级元素 包含 块级元素 ，但子元素position:absolute,父元素position:relative ，此时子元素需要设left:0，高度Top:0，right:0,bottom:0,此时再设置`margin：auto`

注意第二个方法需要知道子元素的宽度与高度

### 5.定位

### 6.margin负值问题

margin-top和margin-left负值，元素向上，向左移动

margin-right 负值 ，右侧元素左移，自身不受影响

margin-bottom 负值，下方元素上移，自身不受影响

### 7.BFC

- Block format context , 块级格式化上下文
- 一块独立渲染区域，内部元素的渲染，不会影响边界以外的元素

BFC形成条件

- float不是none
- position 是 absolute 或 fixed
- overflow 不是 visible 
- display 是 flex inline-block

BFC应用：清除浮动

### 8.flex布局

常用语法

- flex-direction
- justify-content
- align-items
- flex-wrap
- align-self

### 9.float布局

- 圣杯布局
- 双飞翼布局

技术使用点

使用float布局，两侧使用margin负值，以便和中间内容横向重叠 ，防止中间类容被两侧覆盖，一个用padding,一个用margin

### 10.css响应式

- rem ,相对于根元素的的长度单位

- media-query 根据设备宽度设置 根元素的fontsize