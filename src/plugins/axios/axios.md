## axios

常用配置如下

```js
axios.get(url, {
  //自动添加在url之前
  baseURL,
  //自定义请求头
  headers,
  //get请求中隐式传递参数
  params,
  //专用于post请求中传递数据，但作为axios.post(url,data,config)的参数
  //data,
  //请求过期时间
  timeout,
  //发送跨域请求时发送者是否需要携带凭证即cookie
  withCredentials,
  //监听服务端文件传输进度
  onDownloadProgress,
  //监听客户端上传文件进度
  onUploadProgress,
  //中止请求
  cancelToken,

  //不常用的属性
  adapter,
  auth,
  xsrfCookieName,
  xsrfHeaderName,
  //响应类型
  responseType,
  //定义node环境下在执行http和https时使用的自定义代理
  httpAgent,
  httpsAgent,
});
```

### 封装

需求：

1. 根据环境请求不同 api
2. 调动 loading 等全局组件，单例且建议从 vuex 内调用
3. 请求
   - 注入 token
   - 发送失败自动重发
   - 拦截敏感 api 以避免暴露给外网
   - 跨域
   - 用户取消请求
   - 取消重复请求
   - 监听上传文件进度
4. 响应
   - 无效 url
   - 响应接收超时
   - 错误响应码翻译
   - 统一错误响应处理
   - 监听下载文件进度
5. 封装 get，post，delete，put 方法

#### 拦截器

```js
/**
 * 异常错误处理
 * @example
 * handleError ('我发生了错误', '后端约定message')
 * @param { string } error console错误信息
 * @param { string } msg 后端message捕获
 */
function handleError(/* @type { string } */ error, /* @type { string } */ msg) {
  if (getEnv() === 'dev') {
    tools.log.danger('>>>>>> HTTP Error >>>>>>');
    console.log(error, msg);
  } else {
    Store.dispatch('logs/push', {
      message: msg,
      type: 'danger',
    });
  }
}
```

### 流程

始终贯彻单一职责：获取响应结果 -> 分析两种响应结果即对和错 -> api 各自处理两种情况

1. api 管理
2. 获取响应结果
3. 分析两种响应结果即对和错
4. api 各自处理两种情况
