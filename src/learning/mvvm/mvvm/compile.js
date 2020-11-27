//遍历DOM，解析指令和{{}}
class Compile {
  //传入模板的选择器名称和当前页面的vue实例
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el) //根据选择器获取dom
    //简易版暂不进行ast解析而转换为文档碎片
    this.$fragment = this.toFragment(this.$el)
    //解析文档碎片为原生dom
    this.compile(this.$fragment)
    //将解析后的文档碎片返回需要解析的父容器中
    this.$el.appendChild(this.$fragment)
  }
  //createDocumentFragment相当于新建一个容器
  toFragment(el) {
    const fragment = document.createDocumentFragment()
    let child
    //每次赋值相当于获取子元素然后判断是否存在
    while ((child = el.firstChild)) {
      //遍历父容器内所有元素节点并追加如文档碎片内
      //appendChild是变异操作及会移动完所有原父容器中元素节点，最终返回完全解析后的原生dom即可
      fragment.appendChild(child)
    }
    return fragment
  }
  //解析文档碎片
  compile(fragment) {
    const childNodes = fragment.childNodes
    //注意：元素节点为类数组
    Array.from(childNodes).forEach((node) => {
      //根据原生属性nodeType判断子节点为元素，带{{}}的文本，纯文本，注释
      if (node.nodeType === 1) {
        console.log(node.nodeName)
        this.compileElement(node)
      } else if (this.isInter(node)) {
        //判断是否为{{}}
        this.compileInter(node)
      } else if (node.nodeType === 3) {
        this.compileText(node)
      }
      //判断是否需要递归子节点
      if (node.children && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  //判断是否子节点为{{}}
  isInter(node) {
    //正则内分组得以通过RegExp.$1取出，textContent即节点纯文本
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  //解析元素节点的属性获取其中的v-指令并执行相应的dir方法
  compileElement(node) {
    const attrs = node.attributions
    Array.from(attrs).forEach((attr) => {
      //z-xxx='yyy'，暂不处理v-xxx:zzz='yyy'形式的zzz
      const name = attr.name //z-xxx
      const key = attr.value //yyy
      if (name.indexOf('z-') === 0) {
        const dir = name.substring(2)
        //执行指令，传入表达式即yyy，暂时不处理以v-on:click=""类型绑定的事件
        this[`${dir}Dir`] && this[`${dir}Dir`](node, key)
      } else if (name.indexOf('@') === 0) {
        //v-on缩写取出绑定的事件名
        const event = name.substring(1)
        this[`onDir`] && this[`onDir`](node, key, event)
      } else {
        //原生html属性或props
      }
    })
  }
  //解析{{}}节点
  compileInter(node) {
    const exp = RegExp.$1
    //因为{{}}更新和v-text同理则以此命名
    this.update(node, exp, 'text')
  }
  //解析纯文本节点
  compileText(node) {}

  //根据compile执行相应的dir即指令函数
  textDir(node, key) {
    this.update(node, key, 'text')
  }
  htmlDir(node, key) {
    this.update(node, key, 'html')
  }
  modelDir(node, key) {
    this.update(node, key, 'model')
    //保证this指向
    const vm = this.$el
    //暂时只考虑监听输入框表单的input事件
    node.addEventListener('input', (e) => {
      vm[key] = e.target.value
    })
  }
  //只识别@click绑定的事件，参数：节点node，回调key和绑定原生事件event，此处不考虑自定义的派发事件
  onDir(node, key, event) {
    //事件处理暂不涉及修饰符，为node添加事件监听
    const vm = this.$vm
    const fn = vm.$options && vm.$options.methods[key]
    if (event && fn) {
      node.addEventListener(event, fn.bind(vm))
    }
  }

  //根据dir执行相应的updater即更新函数，参数：节点node，指令绑定的值exp和指令名dir
  update(node, exp, dir) {
    const updater = this[`${dir}Updater`]
    //初始化时先执行一次元素节点的静态更新，下面再传入是为了之后更新key继而执行updater
    //注意：这里的updater是初始化所以直接传值不同于下面的cb
    updater && updater(node, this.$vm[exp])
    //创建watcher收集元素节点和data内的key依赖关系即动态更新，并为watcher的constructor指定回调函数
    //注意：既然是更新则只能传入key而非this.$vm[exp]，上面传入的exp是key即watcher需要联系vm实例和该变量exp
    //并且注意cb不应为箭头函数因为在watcher内通过this.cb调用会指向错误
    new Watcher(this.$vm, exp, function (key) {
      //已有定义则传入data内对应的key，然后watcher内已经注入vue实例可以保证this的指向
      updater && updater(node, key)
    })
  }
  textUpdater(node, val) {
    node.textContent = val
  }
  htmlUpdater(node, val) {
    this.textUpdater(node, val)
  }
  modelUpdater(node, val) {
    node.value = val
  }
}
