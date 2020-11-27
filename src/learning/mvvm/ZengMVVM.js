/* 
view-DOM VM-Vue M-Javascript
Dep,Observer,Watcher,Compile,compileUtil
实际先解析HTML文件即解析模板为render，再进行监听即数据劫持
最后由patch渲染页面，data更新会被set监听到，则set内部执行update从而触发render，后者通过diff再次执行patch
class中默认'use strict'即this永远不会指向window而指向该实例本身
待实现功能：computed,v-for,v-bind
*/
class ZengMvvm {
  constructor(options) {
    //挂载el和data在实例上
    this.$el = options.el
    this.$data = options.data
    //假如从已有编译的模板则开始编译，按照以下顺序排列仅是为了方便理解，从vue声明周期而言 created > mounted > updated
    if (this.$el) {
      //数据劫持，即为data内所有属性添加get和set
      new Observer(this.$data)
      //数据代理到实例上，便于直接访问
      this.proxyData(this.$data)
      //用目标el和整个MVVM实例进行模板编译
      new Compile(this.$el, this)
    }
  }
  //数据代理，可以直接vm.a，否则还需要vm.$data.a才能访问data内的属性
  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(data, key, {
        configurable: false, //不可删除，属性描述符不可变
        enumerable: true, //可枚举
        get() {
          console.log('通过get方法获取了' + key + '属性的值')
          return data[key]
        },
        //set内部可以放updata回调，重新触发render
        set(newVal) {
          if (newVal === data[key]) return
          console.log(key + '属性的值发生了变化')
          console.log('可以在这个回调函数中做其他事件，例如更新页面dom等')
          data[key] = newVal
        },
      })
      /* Object.defineProperty(this,key,{
                configurable:false,enumerable:true,
                get(){return data[key]},
                set(newVal){data[key]=newVal} }) */
    })
  }
  //vue内部把计算属性定义在实例上
  computed(func) {}
}
/*
从vue实例的生命周期理解，先created初始化el，data和vnode，再进行mounted挂载DOM
只能对对象进行劫持，对数组无效，所以需要vue3的proxy
data 内的所有层级的数据都添加get和set，但不能新增不存在的属性因为其没有get和set，不能被监控
get监听不能省略，因为从逻辑上而言，假如需要set，前提也要先get才能set，而没有定义的属性对其set也没有意义
observe把每个数据执行defineReactive()以定义为响应式
通过发布订阅者的dep.notify()来通知watcher触发update进而更新视图
最终是通过Diff算法来对比新老Vnode的差异，并把差异更新到Dom视图上
*/
class Observer {
  constructor(data) {
    this.observe(data)
  }
  //添加数据监听，把结果传递给watcher
  observe(data) {
    //验证data
    if (!data || typeof data !== 'object') return
    //
    //数据劫持同时获取value，数据代理只获取key
    Object.keys(data).forEach((key) => {
      //实现响应式
      this.defineReactive(data, key, data[key])
      //深度挟持，每次赋予一个新对象时会给这个新对象增加数据劫持
      //将 Object.defineProperty 的逻辑抽象为 observe 函数，递归实现
      this.observe(data[key])
    })
  }
  //将对象定义为响应式
  defineReactive(obj, key, value) {
    //绑定this因为下面的set会改变this指向为Object，这样就无法指向调用其的实例
    let _this = this
    //每个变化的属性都对应一个存放所有更新的操作的数组
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      //定义响应式本质即把该值加入订阅者Dep的被观察的对象数组中，一旦这个数组内的值变化，将通知所有watcher
      //
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      //
      set(newVal) {
        if (newVal !== value) {
          //若为对象则进行深度挟持，通过递归实现，因为每次挟持只能把一层加入Dep，而对象可能有多层
          //if(typeof obj===Object)
          _this.observe(newVal)
          value = newVal
          //通知所有watcher，出现数据更新
          dep.notify()
        }
      },
    })
  }
}
/* 
获取元素节点，进行视图更新即编译元素节点
网页从获取到渲染也是先获取HTML到读取CSS和JS，SSR了解一下
最好使用骨架屏，防止网页渲染出问题，直接显示{{a}}而非渲染后的数据
VUE关于视图层的渲染步骤：compile,template>render,vnode>patch,diff
*/
class Compile {
  constructor(el, vm) {
    /* 
        el可能为'#app'，也可能是getElementByID获取的，后者获取的是一个完整的元素节点
        如果是元素节点则直接赋值，否则先创建一个元素节点
        此处不选用getElementByID，因为下面nodeFragment会直接改变el
        getXXXByXXX获取的是动态集合，querySelector获取的是静态集合，
        动态就是选出的元素会随文档改变，静态的取出来之后就和文档的改变无关
        如果只要一次查找就可得到元素时，首选getXXXByXXX
        如果需要经过多级查找，才能得到元素时，首选querySelector
        */
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    //vm为整个MVVM实例
    this.vm = vm
    //编译前提必须存在根元素节点,假如不存在根元素节点则不进行编译
    if (this.el) {
      //把真实DOM存入内存即fragment文档碎片中，减少直接操作DOM，最终只操作一次以提高性能
      let fragment = this.nodeFragment(this.el)
      //解析文档碎片以替换真实数据
      this.compile(fragment)
      //将编译完毕的文档碎片塞回页面
      this.el.appendChild(fragment)
    }
  }
  //判断是否为元素节点，因为不知道传入结点是真实DOM或是选择器
  isElementNode(node) {
    return node.nodeType === 1
  }
  //判断是否为指令，用于传递指令携带的参数的值
  isDirective(name) {
    return name.includes('v-')
  }
  //将根节点转移到文档碎片内，编译元素首先对其节点结构进行解析
  nodeFragment(el) {
    let fragment = document.createDocumentFragment() //创建文档碎片
    let firstChild //第一个子节点
    /* 
        直接操作DOM，循环转移根节点中的子节点并放入文档碎片中
        fragment.appendChild是move DOM操作，动态即每次假如el.firstChild有值，则删除el.firstChild[0]本身
        */
    while ((firstChild = el.firstChild)) fragment.appendChild(firstChild)
    return fragment
  }
  //操作文档碎片,替换内部指令和Mustache语法中变量对应的值
  //Mustache即用{{}}表示HTML中需要被代JS替的内容
  compile(fragment) {
    //当前父节点即右边的子节点
    let childNodes = fragment.childNodes
    Array.from(childNodes).forEach((node) => {
      //判断是否为元素节点，递归编译节点，因为即使是子元素节点，其下才是文本，属性，注释节点
      if (this.isElementNode(node)) {
        //递归编译子节点
        this.compile(node)
        //编译元素节点即每个HTML标签，每个HTML属性为一个属性节点
        this.compileElement(node)
      } //此处需要编译的节点有两种，元素和文本，后者包含在两个前者之间
      else this.compileText(node)
    })
  }
  //编译元素节点
  compileElement(node) {
    //取出当前节点的属性和类数组
    let attrs = node.attributes
    Array.from(attrs).forEach((attr) => {
      //获取属性名，直接根据名判断，因为在元素节点中属性具体值的保存要根据属性名这个键获取
      let attrName = attr.name
      //HTML属性节点可能包含指令
      if (this.isDirective(attrName)) {
        //获取指令指向的属性的变量在data内的对应值，并替换和更新到实际的元素节点中
        let exp = attr.value
        //解构赋值，取出指令对应的方法名
        let [, type] = attrName.split('-')
        //调用指令对应的方法，传入遍历取出的单个元素节点，目标DOM的MVVM实例，该指令所包含的指向值
        CompileUtil[type](node, this.vm, exp)
      }
    })
  }
  //编译文本节点
  compileText(node) {
    //exp，获取文本节点的内容
    let exp = node.contentText
    //创建匹配{{}}即Mustache语法的正则表达式，默认贪婪，因为可能存在多个连续{{}}{{}}
    let reg = /\{\{([^}+])\}\}/g
    //如果存在{{}}则使用text指令所对应的方法，此时不属于v-指令
    if (reg.text(exp)) CompileUtil['text'](node, this.vm, exp)
  }
}
/* 
CompileUtil.js文件内储存所有v-指令对应的更新方法，包括{{}}实现属性节点和文本节点与data绑定
CompileUtil本身应为一个储存对应各种指令的实现方法和回调函数的对象
解耦，因为除了模板编译compile模块，watcher也会与compile联系，负责接收其v-指令
指令本质都是通过对data读取，然后直接替换fragment文档碎片中对应节点的变量，再间接改变DOM且更新data
编译模板后处理v-model和{{}}时，其实都是用data中的数据替换掉fragment文档碎片中对应的节点中的变量
*/
CompileUtil = {
  //根据vm实例和变量名exp获取在vm.$data中的值
  getVal: function (vm, exp) {
    //将匹配的值根据.分开，如vm.data.a.b，再放回vm.$data中
    return exp.split('.').reduce((pre, cur) => {
      return pre[cur]
    }, vm.$data)
  },
  //先正则匹配文本中用{{}}绑定的变量名，再用getVal获取在data中对应值
  getTextVal: function (vm, exp) {
    return exp.replace(/\{\{([^}]+)\}\}/g, (...rest) => {
      return this.getVal(vm, rest[1])
    })
  },
  /* 
    由于获取的变量层级不定，可能是data.a或data.obj.a.b，所以都是使用归并
    区别在于setVal方法在归并过程中需要判断是不是归并到最后一级
    如果是则设置新值，而getTextVal就是在getVal外包了一层处理{{ }}的逻辑
    */
  setVal: function (vm, exp, newVal) {
    return exp.reduce((pre, cur, curI) => {
      //如果当前归并的为数组的最后一项，则将新值设置到该属性
      //return赋值表达式即返回赋值后的变量
      if (curI === exp.length - 1) return (pre[cur] = newVal)
      //继续归并
      return pre[cur]
    }, vm.$data)
  },
  //更新节点，作为data更新后的回调函数传入watcher，当观察者watcher检测到data更新时执行
  updater: {
    //文本更新
    textUpdater(node, value) {
      node.textContent = value
    },
    //输入框更新即v-model
    modelUpdater(node, value) {
      node.value = value
    },
  },
  //处理文本节点{{}}绑定的变量
  text: function (node, vm, exp) {
    //调用updater中textUpdater
    let updateF = this.updater['textUpdater']
    //获取data中对应变量的值
    let value = this.getTextVal(vm, exp)
    //通过正则匹配到{{}}，取该数组第二个即变量名，用对应data中的值替换
    exp.replace(/\{\{([^}]+)\}\}/g, (...rest) => {
      /* 
            假如匹配到{{}}即需要获取data，给每个data都加上观察者watcher实例
            此处的newVal在watcher内的update中重新调用CompileUtil的getVal以获取
            使用&&？
            闭包updateF(node,newVal)保存node，等待watcher传递newVal
            */
      new Watcher(vm, rest[1], (newVal) => {
        updateF && updateF(node, newVal)
      })
    })
    //首次获取值
    updateF && updateF(node, value)
    //////////////////////////////////第二种方式
    let content = exp.replace(/\{\{([^}]+)\}\}/g, (...rest) => {
      new Watcher(vm, rest[1], (newVal) => {
        updateF(node, this.getTextVal(vm, exp))
      })
      return this.getVal(vm, rest[1].trim())
    })
    updateF(node, content)
  },
  /* 
    处理v-model，并在事件中实时的将新的value值更新到data中
    将输入事件新的值赋值给input节点的value值，然后值的改变，执行set函数，将视图改变。
    视图的改变，会执行wacther的回调函数，文本节点也会重新赋值 
    */
  model: function (node, vm, exp) {
    let updateF = this.updater['modelUpdater']
    //直接获取v-model='xxx'绑定的xxx的值
    let value = this.getVal(vm, exp)
    new Watcher(vm, exp, (newVal) => {
      updateF && updateF(node, newVal)
    })
    //由于v-model双向绑定，则需要对input添加事件监听，否则无法响应用户对HTML的操作而更新DOM和data
    node.addEventListener('input', (e) => {
      //获取输入的新值
      let newVal = e.target.value
      //复制到节点
      this.setVal(vm, exp, newVal)
    })
    //首次设置
    updateF && updateF(node, value)
  },
  /* 
    实现v-for,通过创建文档碎片实现操作DOM
    v-for只负责渲染，所以不用添加watcher
    同时需要实现:key='id'，这里暂时只实现绑定key而非完整的v-bind指令
    */
  for: function (node, vm, exp) {},
}
/* 
当DOM中出现v-指令或{{}}或：a='xxx'绑定data中的属性以操作DOM时和修改data时
作用：更新data，执行回调即compileUtil.updater，将自身实例放入订阅者的target中因为每个data对应一个watcher
 */
class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    //更改之前的值
    this.value = this.get()
  }
  get() {
    //将当前的watcher添加到Dep类的静态属性上
    Dep.target = this
    //通过实例和变量名获取实例中的值，以触发Observer数据劫持
    let value = Compile.getVal(this.vm, this.exp)
    //清空Dep上的watcher，以防下次触发watcher时会重复添加
    Dep.target = null
    return value
  }
}
/* 
观察者模式，非发布订阅，因为目标和观察者是直接联系起来
目标Dep类似于发布者，他让添加进subs的所有观察者都执行了update函数，而观察者watcher就像一个订阅者
*/
class Dep {
  //静态属性target绑定对应的watcher，新写法
  static target
  //储存观察每个data的多个watcher
  constructor() {
    this.subs = []
  }
  //添加订阅
  addSub(watcher) {
    this.subs.push(watcher)
  }
  //通知，执行watcher的更新
  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}
