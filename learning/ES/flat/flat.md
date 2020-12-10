#### 数组扁平

参考https://juejin.cn/post/6844904025993773063

实现流程：

1. 遍历
2. 判断当前遍历元素是否为数组
3. 数组则展开一层
4. 对于展开的数组进行重复 1

##### 遍历方式

遍历方式：

- for & for-in & for-of
- forEach()
- entries()
- keys()
- values()
- reduce()
- map()

##### 类型判断

判断当前遍历的元素类型，注意处理空位

- instanceof
- constructor
- Object.prototype.toString.call
- Array.isArray

空位处理

##### 展开

控制拉平程度，默认为 1
