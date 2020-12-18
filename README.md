模块化组件设计思想：

1. 页面只是容器即布局，不应注入过多的逻辑处理，除非有关组件布局的切换，组件是否展示，当前页面是否鉴权允许进入，接收路由传参并传递给具体组件
2. 组件应具备完整的视图，只与该视图有关的样式，只与该视图有关的逻辑
3. 尽管.vue 文件允许以上三者共存于同一文件内，但建议拆分为三个，即使使用 JSX
4. 组件逻辑大致可分为两种：与视图更新有关的响应式数据和钩子，与视图更新所需的响应式数据有关的数据和函数，该两种逻辑必须严格分开即解耦
5. 前者逻辑：
6. 后者逻辑：
7. 除了部分包含简单逻辑的生命周期钩子外，所有的函数必须写清楚注释即其使用目的，并且严格区分上述两种逻辑：比如后者函数只能表明**返回 xxx **而不是**获取 xxx**
8. 存放页面文件夹的直接子目录应该**按业务区分**为多个 module，而后者的直接子目录才是真正的页面，即上述的容器
9. 所谓的事件监听：监听者监听目标所暴露的状态来派发即执行其绑定在监听者内的回调，换而言之，对于一个事件，派发者即监听者
10. 与 api 有关的参数常用下划线命名，只与当前视图或逻辑有关的参数采用驼峰命名
11. 一定要考虑入口文件的统一出口函数设计是否能实现 tree-shaking

- ES
  - context
    - VO
      - AO
    - [[Scope]]
      - 提升
        - 函数
        - 变量
    - this
      - 判断
      - 五种
  - prototype
    - 原型链
    - class
    - extends
    - create
    - 拷贝
      - shadow
      - deep
  - 类型
    - let & const
    - null & undefined
    - Number
      - parseInt & float
      - 精度丢失
      - NaN
      - Bigint
    - String
    - Array
    - Symbol
    - Map & Set
    - WeakMap
    - 类型转换
  - eventLoop
  - iterable
    - for & -in & -of
    - [[enumerable]]即 iterable
  - async
    - Generator
    - Promise
    - async & await
  - proxy
  - HOC
    - curry
    - compose
  - 设计思想
    - 设计模式
      - 创建型
        - 工厂
        - 单例
        - 原型
      - 行为型
        - 观察者
        - 发布订阅
        - 策略
        - 迭代器
        - 中介者
        - 访问者
      - 结构型
        - 代理
        - 外观
        - 装饰者
        - 适配者
    - 四大原则
    - 编程模式
      - IOC
      - OOP
      - AOP & COP
      - FP
  - TS
    - 新增关键字
    - Generic
    - Decorator
- node 即中台
  - 原生模块
  - eventLoop
  - nginx
  - docker
  - redis
  - 中台
- 算法
  - re
  - bfs
  - dp
  - LRU
- 框架
  - vue
    - 示例
    - tsx
    - 鉴权
    - nuxt
    - 优化
    - 源码
  - react
- 工程化
  - 规范
    - eslint
    - gitflow
    - 命名
    - 目录结构
  - webpack 即打包
    - 优化参考下方
    - rollup & vite
    - module-federation
    - tree-shaking
    - HMR
    - plugin & loader
  - babel
    - @babel
    - babel-plugin-import
  - 测试
    - e2e
    - unit
  - micro-frontend
  - 独立发布
  - CI & CD
  - 多端
- 网络 & 浏览器
  - css
    - scss <- sass
      - 选择器
        - 关系
        - 伪类
        - 伪元素
      - 特性
    - 布局
      - 水平
      - 居中
    - BFC
    - shallow
  - http
  - 渲染
  - 安全
  - 事件机制
- 工具 & 优化
  - 正则
  - canvas
  - 小程序 & taro
  - UI 库
    - ant
    - element
  - 监控
    - 性能
    - 错误
      - 监察
      - 上报
  - 埋点
  - pre-render
  - lodash
  - dayjs
  - zlib
  - brotli
  - vuelidate
  - 大文件
    - 切片
    - 合并
    - 秒传
  - 单点登录
  - SSR
  - 静态资源
    - 图片
    - 静态页面
  - 时间切片
  - 长列表
    - 分页
    - 虚拟列表
    - 瀑布流
  - 懒加载
  - event-bus
