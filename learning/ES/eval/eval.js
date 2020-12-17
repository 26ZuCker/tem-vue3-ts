/* 
参考https://juejin.cn/post/6844903713140637709
使用eval()也带来了安全隐患因为被执行的代码如从网络来，可能已被篡改
当处理Ajax请求得到的JSON相应的时候
在这些情况下，最好使用JavaScript内置方法来解析JSON相应，以确保安全和有效，若浏览器不支持JSON.parse()如使用来自JSON.org的库
同样重要的是要记住，给setInterval(), setTimeout()和Function()构造函数传递字符串，大部分情况下与使用eval()是类似的
在幕后JavaScript仍需要评估和执行你给程序传递的字符串
*/
