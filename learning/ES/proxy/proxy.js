//包装Proxy
const defaults = function (tar, handlers, ...rest) {
  const args = rest
  return new Proxy(tar, handlers(args))
}
//拦截对象专用配置
const handlersObj = function (rest) {
  return {
    args: {
      de: rest[0],
    },
    validators: rest[1],
    //get：接收三个参数，目标对象，属性名，Proxy实例本身
    get(tar, key, proxy) {
      //私有属性访问即报错
      if (key[0] === '_') throw new Error(`${key} is private`)
      //访问不存在的属性则提供默认值
      if (!(key in tar)) {
        console.log(`${key} not in`)
        return this.args['de']
      }
      //访问proxy实例
      if (key === 'self') {
        console.log('return proxy')
        return proxy
      }
      console.log(`${key} in`)
      return Reflect.get(tar, key)
    },
    //假如该key已通过Object.defineProperty设为writable:false则set仍会执行但不会生效
    set(tar, key, value, proxy) {
      if (key === 'self') Reflect.set(tar, key, proxy)
      else {
        Reflect.set(tar, key, value)
        const validator = this.validators[key]
        //校验通过或未为该属性设置校验规则，则默认通过
        if (!validator || validator.validate(value)) Reflect.set(tar, key, value)
        //校验失败
        else console.log(validator.message || '')
      }
    },
  }
}
//制定表单验证规则
const validators = {
  name: {
    validate(value) {
      return value.length > 6
    },
    message: '用户名长度需超过6',
  },
  password: {
    validate(value) {
      return value.length > 10
    },
    message: '密码长度需超过10',
  },
  phone: {
    validate(value) {
      return /^1(3|5|7|8|9)[0-9]{9}$/.test(value)
    },
    message: '手机格式错误',
  },
}

//拦截函数配置
const handlersFn = function (rest) {
  return {
    _count: 0,
    //apply：用于拦截被函数调用，拦截的对象是函数即创建Proxy实例的是function，通过ctx和args获取该函数的数据
    //第二个参数为上下文对象this，第三个为参数数组
    //应用：统计函数被调用次数，打印函数执行消耗时间
    apply(tar, ctx, args) {
      console.log('进行检测')
      console.log(args)
      //通常对函数调用前进行参数的校验，环境的检测
      const [success, num] = args
      if (success) {
        console.time()
        tar.apply(ctx, args)
        console.timeEnd()
        this._count += 1
        console.log(`第${this._count}次被调用`)
      } else console.log('成功拦截函数调用')
    },
    //construct：用于拦截new操作符
    construct(tar, args, proxy) {
      return new tar(...args)
    },
  }
}

let obj = {
  a: {
    c: 1,
    d: 4,
  },
  _b: 2,
}
/* 
let fn = function (args) {
  console.log(args)
}

let fm = function (name, age) {
  this.name = name
  this.age = age
}
const proxyFn = toDeepProxy(fn, handlersFn)
const proxyFm = toDeepProxy(fm, handlersFn) */

/* const proxyObj = toDeepProxy(obj, handlersObj, 3, validators)
proxyObj.name = 'aa'
console.log(proxyObj.a.d) */

let isFirst = true
function noop() {}
let proxyVoid = get(undefined)
function get(obj) {
  if (obj === undefined) {
    if (!isFirst) {
      return proxyVoid
    }
    isFirst = false
  }
  // 注意这里拦截的是 noop 函数
  return new Proxy(noop, {
    // 这里支持返回执行的时候传入的参数
    apply(target, context, [arg]) {
      return obj === undefined ? arg : obj
    },
    get(target, prop) {
      if (obj !== undefined && obj !== null && obj.hasOwnProperty(prop)) {
        return get(obj[prop])
      }
      return proxyVoid
    },
  })
}
this.get = get

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  say() {
    console.log(`my name is ${this.name}, and my age is ${this.age}`)
  }
}
const proxyTrack = (targetClass) => {
  const prototype = targetClass.prototype
  Object.getOwnPropertyNames(prototype).forEach((name) => {
    targetClass.prototype[name] = new Proxy(prototype[name], {
      apply(target, context, args) {
        console.time()
        target.apply(context, args)
        console.timeEnd()
      },
    })
  })

  return new Proxy(targetClass, {
    construct(target, args) {
      const obj = new target(...args)
      return new Proxy(obj, {
        get(target, prop) {
          console.log(`${target.name}.${prop} is being getting`)
          return target[prop]
        },
      })
    },
  })
}

const MyClass = proxyTrack(Person)
const myClass = new MyClass('tom', 21)
myClass.say()
myClass.name
