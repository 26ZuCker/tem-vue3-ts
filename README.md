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
