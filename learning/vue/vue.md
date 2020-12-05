目录结构 -> 数据响应式 -> 异步更新 -> DOM&diff

### 目录结构

### 异步更新

> eventLoop 简易流程：执行完一个宏任务 -> 执行完所有的微任务 -> UI RENDER -> 执行下一个宏任务

注意：已经完成的某些异步的回调就是微任务队列内所要执行的，而微任务指的是他们的整个异步任务

vue 通过 obj.then(flushQueue)实现异步更新 dom，其中 obj 是经过 resolve()的 promise

- 异步：只要侦听到数据变化，vue 即开启一个队列并缓冲当前轮次 eventLoop 内所有的数据变更
- 批量：每一轮 eventLoop 内将所有的 watcher 都存入 queue 内且同一个 watcher 只会被推入 queue 内一次并去重以避免不必要的样式计算和重绘，然后在下一轮 eventLoop 的 tick 中再一起 UI render
- 策略：默认使用原生的 Promise.then，否则按照顺序代替 MutationObserver -> setImmediate，以上三者都不支持才使用宏任务 setTimeout(fn, 0)代替

watcher 去重参考 observer/scheduler 的 queueWatcher，根据 watcher 的 id 保证相同绑定了同一 data 的标签只进行一次 dom 更新，但数据会持续变化即以最新为准

先执行一或多次 watcher.js 内的 update()，最终执行一次其 run()

### nextTick

目录 utils/next-tick

```js
// timerFunc启动微任务，其后跟的else语句即按照上述的兼容性替代微任务执行函数
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
    if (isIOS) setTimeout(noop);
  };
  isUsingMicroTask = true;
}

// 此方法就是我们平时使用的nextTick方法
export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;
  callbacks.push(() => {
    //...
  });
  if (!pending) {
    pending = true;
    // 异步执行callbacks中的任务
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}
```

### vdom

优点：

1. 高性能：通过 diff 以最小代价执行 UI RENDER 更新 dom 以提高性能，注意通过 vdom 操作 dom 最终效率不一定比直接操作 dom 更佳，参考https://www.zhihu.com/question/31809713/answer/53544875
2. 轻量：只需要通过一行命令式函数的操作就可以更新复杂的元素结点而非执行很多次原生的 api 以操作 dom 如`patch(oldVNode,newVNode)`
3. 兼容性：增加兼容性代码实现操作 dom 的原生 api
4. 跨平台：只要保存一套数据结构即 vdom 可以根据传入 init()不同参数以获的不同的 patch 功能

#### snabbdom

vue 和 react 都基于 snabbdom 实现 vdom 和 patch

```js
//<div id="app"></div>
//保存标签和逻辑的映射即view和model的对应关系
const obj = {};
//init获取patch以对比两个vdom并命令式执行dom操作
//h相当于render即只是为了返回vdom结构
const { init, h } = snabbdom;
//获取patch，根据init传入的参数获取不同平台操作dom的函数
const patch = init([snabbdom_style.default]);
//保存旧的vdom
let vnode;
//view层，执行patch进行dom更新，比对两个vdom并返回最新的vdom
function update() {
  //app.innerText=obj.foo
  //vnode = patch(vnode, h('div#app', obj.foo));
  vnode = patch(vnode, h('div#app', { style: { color: 'red' } }, obj.foo));
}
//响应式Object.defineProperty，vm层
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal;
        update();
      }
    },
  });
}
//初始化
defineReactive(obj, 'foo', new Date().toLocaleString());
//执行patch
vnode = patch(app, h('div#app', obj.foo));
//model层，更新目标标签对应的逻辑
setInterval(() => {
  obj.foo = new Date().toLocaleString();
}, 1000);
```

#### patch 前 95

执行`vm.$mount`时

```js
//core\instance\lifecycle.js
mountComponent(){
  //...
  //watcher执行run()都会执行一次updateComponent
  updateComponent = () => {
    //_render()相当于执行上述snabbdom的patch
    vm._update(vm._render(), hydrating);
  };
}
```

先执行`vm._render()`以获取最新的 vdom

```js
//core\instance\render.js
Vue.prototype._render = function(): VNode {
  const vm: Component = this;
  //获取父结点和render
  const { render, _parentVnode } = vm.$options;
  //...
  vm.$vnode = _parentVnode;
  let vnode;
  try {
    currentRenderingInstance = vm;
    //执行render()以获得vnode
    vnode = render.call(vm._renderProxy, vm.$createElement);
  }
  //...
};
```

根据 render 传入的 vdom 由`vm._update()`进行实际的 dom 操作即`vm.__patch__`

```js
//core\instance\lifecycle.js
Vue.prototype._update = function(vnode: VNode, hydrating?: boolean) {
  //...
  //检测是否存在旧的vdom，存在则进行初始化，否则进行更新但都需要执行vm.__patch__
  const prevVnode = vm._vnode;
  vm._vnode = vnode;
  if (!prevVnode) {
    //初始化实际dom
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  } else {
    //更新
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
  //...
};
```

执行`vm.__patch__`即操作真实 dom，以下从最开始的 runtime/index.js 即入口开始寻找该实例方法

```js
//platforms\web\runtime\index.js
// 实现一个patch函数
Vue.prototype.__patch__ = inBrowser ? patch : noop;

//platforms\web\runtime\patch.js
//通过createPatchFunction()工厂函数获取上述的patch函数
export const patch: Function = createPatchFunction({ nodeOps, modules });

//core/vdom/patch.js
//获取当前平台特有的patch函数工厂，里面包含diff
export function createPatchFunction(backend) {
  //创建真实dom
  function createElm() {}

  //更新目标结点中的子结点
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {}

  //对比两个vdom
  function patchVnode() {}

  //仅用于浏览器可使用的服务端渲染，激活SSR
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {}

  //返回更新时调用的__patch__
  return function patch(oldVnode, vnode, hydrating, removeOnly) {};
}
```

#### diff 前后

patch 分为增删真实 dom 和比较两个 vdom 并将新 vdom 取代旧 vdom

patch 实现先进行树级别的比较，共三种情况：

- new vnode 不存在就删
- old vnode 不存在就增加
- 都存在则接着执行 diff 算法以进行 dom 更新

```js
//core\instance\lifecycle.js
//对于初始化和更新节点，patch接收两种参数
export function lifecycleMixin(Vue: Class<Component>) {
  //获取组件实例
  const vm: Component = this;
  const prevVNode = vm._vnode;

  //先判断是否已存在vnode，无则初始化传入真实dom
  if (!prevVnode) {
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  }
  //有则更新传入vdom
  else {
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
}

//core/vdom/patch.js
//获取当前平台特有的patch函数工厂，里面包含diff
export function createPatchFunction(backend) {
  //返回更新时调用的__patch__
  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    //新结点已经不存在就删
    if (isUndef(vnode)) {
      //删除旧结点
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode);
      return;
    }

    let isInitialPatch = false;
    //结点新增和更新即dom操作的流程相当于异步更新
    const insertedVnodeQueue = [];

    //旧结点不存在则增加，真正初始化该组件所要创建结点是进入下方else中的else的createElm()
    //注意此处的新增结点是非初始化即该vdom经历了两种状态：createElm() -> invokeDestroyHook()
    //由上方lifecycleMixin可知，非初始化patch只传入两个参数且第一个参数即oldVnode是vdom而非真实dom
    if (isUndef(oldVnode)) {
      //empty mount (likely as component), create new root element
      isInitialPatch = true;
      //由vdom创建真实dom
      createElm(vnode, insertedVnodeQueue);
    }

    //最后一种情况即执行diff
    else {
      //执行diff前仍需判断传入的旧结点是否是真实dom
      const isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        //patch存在的根节点即diff
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      }

      //初始化即新增结点，注意此处的新增不是上方的新增
      else {
        //由上方lifecycleMixin可知，初始化patch传入四个参数且第一个参数即oldVnode是真实dom而非vdom
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          //处理SSR
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            }
            //...
          }
          //非SSR或激活则新建代表一个空元素结点的vdom并代替传入的参数oldVnode
          oldVnode = emptyNodeAt(oldVnode);
        }

        /**
         * 下方操作解释初始化流程
         * oldElm指向#app的标签，parentElm指向<body></body>
         * patch实际是直接在parentElm内的尾部追加，然后再移除旧的，而非替换旧的真实dom，原因：把新结点当成一整棵树并在所有的真实dom都创建完后，再一次性追加到真实dom的父结点内而不是在diff的同时就替换真实dom
         * <body>
         *   <div id="app">
         *      <h1>vdom</h1>
         *      <p>{{foo}}</p>
         *   </div>
         * </body>
         *
         * 先会变成如下
         *
         * <body>
         *   <div id="app">
         *      <h1>vdom</h1>
         *      <p>{{foo}}</p>
         *   </div>
         *   <div id="app">
         *      <h1>vdom</h1>
         *      <p>foo</p>
         *   </div>
         * </body>
         *
         * 最后变成
         *
         * <body>
         *   <div id="app">
         *      <h1>vdom</h1>
         *      <p>foo</p>
         *   </div>
         * </body>
         */
        //新建vdom中的属性elm指向需要生成的整个vdom
        const oldElm = oldVnode.elm;
        //获取其父结点
        const parentElm = nodeOps.parentNode(oldElm);

        //传入四个参数，插入旧的真实dom
        //vdom -> 真实dom
        createElm(
          vnode,
          insertedVnodeQueue,
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          let ancestor = vnode.parent;
          const patchable = isPatchable(vnode);
          while (ancestor) {
            for (let i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (let i = 0; i < cbs.create.length; ++i) {
                cbs.create[i](emptyNode, ancestor);
              }
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              const insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (let i = 1; i < insert.fns.length; i++) {
                  insert.fns[i]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        //插入新的真实dom后移除旧的真实dom
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }
  };
}
```

#### diff 算法

```js
//core/vdom/patch.js
//获取当前平台特有的patch函数工厂，里面包含diff
export function createPatchFunction(backend) {
    return function patch(oldVnode, vnode, hydrating, removeOnly) {
    ///...
    else {
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        //patch存在的根节点即diff
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      }
    }
}

//core/vdom/patch.js
//比较两个虚拟dom
export function createPatchFunction(backend) {
    function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {}
}
```