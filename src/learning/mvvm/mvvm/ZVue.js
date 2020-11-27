class ZVue {
  constructor(options) {
    //存储配置和其中需要响应式的data
    this.$options = options
    this.$data = options.data

    //拦截data
    this.observe(this.$data)
    //执行其中定义的生命周期
    if (options.created) {
      options.created()
    }
    //注意mounted之后this指向
    if (options.mounted) {
      options.mounted.call(this)
    }
    /* new Watcher(this, 'a')
    this.a
    new Watcher(this, 'b.c')
    this.b.c */
  }

  observe(obj) {
    //目前不考虑传入return为function
    if (!obj || typeof obj !== 'object') {
      return
    }
    //遍历data
    Object.keys(obj).forEach((key) => {
      //添加响应式，整个data，data内具体属性，属性的值
      this.defineReactive(obj, key, obj[key])
      //添加代理
      this.proxyData(key)
    })
  }

  //为obj的每一个属性key定义拦截，对每一个对象进行劫持都新增一个Dep
  defineReactive(obj, key, val) {
    //递归挟持，形成保存val的闭包即拦截之后再访问obj[key]只会指向当前闭包内的val无法到达原先的地址，dep实例同理
    this.observe(val)
    //每拦截一个key即为其添加一个Dep即data中的key和Dep一对一，而Dep和Watcher一对多因为同一个值可以被多个组件使用
    //Watcher管理具体的单个组件
    const dep = new Dep()
    //每次获取即进行依赖收集，而每当有组件使用该key时就会挂载组件实例到Dep.target上
    Object.defineProperty(obj, key, {
      get() {
        //此处只用于初始化因为每创建watcher都会先执行一遍get以收集依赖
        Dep.target && dep.addWatcher(Dep.target)
        //因为使用了闭包，此处的val假如非引用类型则指向当前defineReactive作用域的val而非obj[key]
        //不使用obj[key]取值否则会一直循环触发get，因为这里挟持的obj.key就是要取的key的情况下不能直接return
        return val
      },
      set(newV) {
        if (newV !== val) {
          //由于上方形成闭包则此处只修改当前函数作用域内的val即可实现get取值的更改
          //假如使用obj[key]=newV会不断触发get而进入上方get的死循环
          val = newV
          dep.notify()
        }
      },
    })
  }

  //vue根实例上代理data
  proxyData(key) {
    //this即vue实例
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newV) {
        this.$data[key] = newV
      },
    })
  }
}
//object - property - Dep - {watcherA - nodeA, watcherB - nodeB}
//管理所有依赖即Watcher
class Dep {
  constructor() {
    this.watchers = []
  }
  addWatcher(watcher) {
    this.watchers.push(watcher)
  }
  //由于key和Dep一对一而Dep和Watcher一对多
  //当一个key变化，需要通知使用了该key的所有组件即Watcher发生变化
  notify() {
    this.watchers.forEach((watcher) => {
      watcher.update()
    })
  }
}

//保存data中具体值和被引用到哪些元素到页面中的对应关系
//即当JS更新时，能够帮助compile能够识别定位到具体哪个元素需要被更新
//compile中每发现一个元素节点依赖于变量则创建一个watcher实例此时就会挂载到Dep原型上
class Watcher {
  //保存具体组件实例，引用到data内的值，接收cb作为更新函数
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    //由于创建watcher和具体的dep实例没有直接关系所以挂载到dep原型上即可
    Dep.target = this
    //生成一个watcher后立刻触发依赖收集即执行observe内的get
    this.vm[this.key]
    //收集成功即添加进dep实例后清空避免和其他dep实例混淆因为target挂载到原型上
    Dep.target = null
  }
  //Dep通知它何时更新DOM，保证this指向当前vue实例
  update() {
    //通过绑定的组件实例调用该cb因为cb调用的updater绑定在组件实例上即updater的this指向需要维护
    //注意：必须使用key才能获取到最新的值因为保证通过地址即引用获取值而非可能只是基本类型的传参
    this.cb.call(this.vm, this.vm[this.key])
  }
}
