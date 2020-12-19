# ES

## polyfill

参考https://mp.weixin.qq.com/s/xxsJ3xduNscWSvMkZIi-iw

1. new
2. bind & apply & call
3. instanceof
4. debounce & throttle
5. deepClone
6. Array
   - reduce
   - map
   - filter
7. promise
   - Promise
   - Promise.race
   - Promise.all
8. async
9. HOC
   - compose
   - curry
10. eventEmitter
11. offset

```js
const offset = (ele) => {
  let result = {
    top: 0,
    left: 0,
  };
  // 当前为 IE11 以下，直接返回 {top: 0, left: 0}
  if (!ele.getClientRects().length) {
    return result;
  }

  // 当前 DOM 节点的 display === 'none' 时，直接返回 {top: 0, left: 0}
  if (window.getComputedStyle(ele)['display'] === 'none') {
    return result;
  }

  result = ele.getBoundingClientRect();
  // ownerDocument 返回当前节点的顶层的 document 对象。
  // ownerDocument 是文档，documentElement 是根节点
  var docElement = ele.ownerDocument.documentElement;
  return {
    top: result.top + window.pageYOffset - docElement.clientTop,
    left: result.left + window.pageXOffset - docElement.clientLeft,
  };
};
```

12. Vue
    - keep-alive
    - 响应式
    - computed
13. Scheduler

```js
class Scheduler {
  constructor(num) {
    this.num = num; // 允许同时运行的异步函数的最大个数
    this.list = []; // 用来承载还未执行的异步
    this.count = 0; // 用来计数
  }

  async add(fn) {
    if (this.count >= this.num) {
      // 通过 await 阻塞 Promise 但是又不执行 resolve ,
      // 而是将 resolve 保存到数组当中去,
      // 这样就达到了当异步任务超过 max 个时线程就会阻塞在第一行.

      await new Promise((resolve) => {
        this.list.push(resolve);
      });
    }
    this.count++;
    const result = await fn();
    this.count--;
    if (this.list.length > 0) {
      // 每执行完一个异步任务就会去数组中查看一下有没有还处于阻塞当中的异步任务,
      // 如果有的话就执行最前面的那个异步任务.
      this.list.shift()();
    }
    return result;
  }
}
```

12. useFetch
13. useReducer
14. combineReducers
15. ErrorBoundary

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

16. Hook

```js
function useBind(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e.target.val);
  };
  return { value, onChange };
}

function InputBind() {
  const { value, onChange } = useBind('init');
  return (
    <div>
      <p>{value}</p>
      <input onChange={onChange} />
    </div>
  );
}
```
