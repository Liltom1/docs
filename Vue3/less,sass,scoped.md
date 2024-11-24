#### less,sass,scoped

##### 1.``bem``架构

`BEM`实际上是`block`、`element`、`modifier`的缩写

块级，元素，修饰符

```html
<div class="el-input" style="width: 240px;">
    <div class="el-input__wrapper" tabindex="-1">
        <input class="el-input__inner el-input--suffix" type="text" autocomplete="off" tabindex="0" placeholder="Please input"  id="el-id-1024-113">
    </div>
</div>
```

`el-input` el表示是`namespace`， `el-input`整体则表示一个 block块

`el-input__wrapper` 用双下划线链接则是 这个整体就是一个`element` 元素

`el-input--suffix` 用双横杠链接后面的单词就是一个修饰符`modifier`

##### 2.`sass`语法

###### 2.1嵌套规则

写法

```scss
#main p { //#main代表id
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
```

编译后

```scss
#main p {
  color: #00ff00;
  width: 97%;
}

#main p .redbox {
  background-color: #ff0000;
  color: #000000;
}
```

###### 2.2父选择器 &

```scss
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }//&就代表父级的类名
  body.firefox & { font-weight: normal; }
}


#main { //一层一层向下传递
  color: black;
  a {
    font-weight: bold;
    &:hover { color: red; }
  }
}
```

编译后

```scss
a {
  font-weight: bold;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

body.firefox a {
  font-weight: normal;
}
```

```scss
#main {
  color: black;
}

#main a {
  font-weight: bold;
}

#main a:hover {
  color: red;
}
```

*`&` 必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器*

###### 2.3 变量 $

```scss
$width: 5em;
```

调用

```css
#main {
  width: $width;
}
```

###### 2.4 插值语句

通过 `#{}` 插值语句可以在选择器或属性名中使用变量：

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: blue;
}
```

编译后

```css
p.foo {
  border-color: blue; }
```

###### 2.5 @at-root

跳出嵌套

```scss
.parent {
  ...
  @at-root .child { ... }
}
```

编译后

```css
.parent { ... }
.child { ... }
```

###### 2.6 混入

混合指令的用法是在 `@mixin` 后添加名称与样式

```scss
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
```

混合样式的引入

使用 `@include` 指令引用混合样式，格式是在其后添加混合名称

```scss
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

编译为

```css
.page-title {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  padding: 4px;
  margin-top: 10px; }
```

混合样式中也可以包含其他混合样式，比如

```scss
@mixin compound {
  @include highlighted-background;
  @include header-text;
}
@mixin highlighted-background { background-color: #fc0; }
@mixin header-text { font-size: 20px; }
```

混合样式中也传入参数

```scss
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue, 1in); }
```

编译后

```css
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed; }
```

##### 3.实现`bem`架构

全局bem.scss文件

```scss
$namespace:'xm' !default;
$block-sel:'-' !default;
$elem-sel:'__' !default;
$mod-sel:'--' !default;

@mixin b($block){
    $B:#{ $namespace + $block-sel + $block };
    .#{$B}{
        @content; //占位符
    }
}

@mixin e($el){
    $selector:&;
    @at-root{
        #{$selector + $elem-sel + $el}{
            @content;
        }
    };
}

@mixin m($m){
    $selector:&;
    @at-root{
        #{$selector + $mod-sel + $m}{
            @content;
        }
    };
}
```

引入,在vite配置文件中添加

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css:{// [!code focus:6]
    preprocessorOptions:{
      scss:{
        additionalData:'@import "./src/bem.scss";'
      }
    }
  }
})

```

使用

```vue
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue';
let flag = ref<boolean>(true)
const onChange = ()=>{
  flag.value = !flag.value
}
</script>

<template>  <!-- // [!code focus:20]-->
  <div class="xm-aa" >关闭销毁
    <div class="xm-aa__inner">123
      <div class="xm-aa--danger">456
      </div>
    </div>
  </div>
  
  <HelloWorld msg="Vite + Vue" v-if="flag" />
</template>

<style lang="scss" scoped>
@include b(aa){
  color: blue;
  @include e(inner){
    color:green;
  }
  @include m(danger){
    color: red;
  }
}
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>

```

