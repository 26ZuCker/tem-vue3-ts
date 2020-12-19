## 自定义 webpack 步骤

## 60

- webpack 配置文件

  - 入口即项目入口模块的文件位置
  - 出口即输出 bundle 的文件位置

- webpack 打包对象

  - 入口函数：通过 webpack_require 实现模块化，所有代码都缓存在 installModules，以 key 路径：value 字符串形式代码，并将 value 内的 require 替换为 webpack_require
  - 接收配置文件 -> 分析出入口模块位置 -> 读取当前遍历的模块内容并分析 -> 分析依赖 -> 分析源码 -> 递归分析依赖 -> 获取上述对象格式的 value -> 创建 bundle -> 补充代码内出现的 module，exports，require 为浏览器可执行代码

- 目录分析：dist 即出口，src 即源代码，lib 即 webpack 打包工具库，bundle.js 即源代码入口

- lib
  - webpack.js：执行 webpack 入口
