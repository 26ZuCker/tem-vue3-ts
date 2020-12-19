### 正则

```js
//基本使用
```

#### 匹配模式

#### 执行原理

传统正则引擎分为 NFA 即非确定性有限状态自动机和 DFA 即确定性有限状态自动机

java 和 javascript 的正则都是 NFA

参考：

- https://juejin.cn/post/6844903889687281677
- https://es6.ruanyifeng.com/#docs/regex

##### DFA

实际就是把正则表达式转换成一个图的邻接表，然后通过跳表的形式判断一个字符串是否匹配该正则

```js
/**
 * 模拟实现
 */
function machine(input) {
  if (typeof input !== 'string') {
    console.log('输入有误');
    return;
  }
  // 比如正则：/abc/ 转换成DFA之后
  // 这里我们定义了4种状态，分别是0,1,2,3，初始状态为0
  const reg = {
    0: {
      a: 1,
    },
    1: {
      b: 3,
    },
    2: {
      isEnd: true,
    },
    3: {
      c: 2,
    },
  };
  let status = 0;
  for (let i = 0; i < input.length; i++) {
    const inputChar = input[i];
    status = reg[status][inputChar];
    if (typeof status === 'undefined') {
      console.log('匹配失败');
      return false;
    }
  }
  const end = reg[status];
  if (end && end.isEnd === true) {
    console.log('匹配成功');
    return true;
  } else {
    console.log('匹配失败');
    return false;
  }
}

const input = 'abc';
machine(input);
```

##### NFA

实际就是在语法解析的时候，构造出的一个有向图，然后通过 dfs 的方式，去一条路径一条路径的递归尝试

```js
```

#### 性能优化

一般情况下正则效率优于字符串方法

由于 js 使用 NFA 则以下基于后者进行优化参考https://zhuanlan.zhihu.com/p/32896848

少写模糊匹配，越精确越好

模糊，贪婪，惰性匹配都会带来回溯问题
