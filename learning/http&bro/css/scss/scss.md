### scss

#### 选择器

#### 特性

1. 使用%placeholder 代替@mixin，因为前者编译为 css 是复用而后者是复制

```scss
%demo
  color: red
  font-size: 20px
  border: 1px solid red
 // end ...

.test1
  @extend %demo
// end ...

.test2
  @extend %demo
// end ...

.test3
  @extend %demo

//编译如下
.test1, .test2, .test3 {
  color: red
  font-size: 20px
  border: 1px solid red
}

//使用@include demo()则如下
.test1 {
  color: red
  font-size: 20px
  border: 1px solid red
}
.test2 {
  //同上
}
.test3 {
  //同上
}
```
