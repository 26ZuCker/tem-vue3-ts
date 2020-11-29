//vnode=createElement('div',{id='a'},'这是文本')或如下形式
//vnode=createElement('div',{id='a'},[createElement('div',{id='aa'},'aa')])

//标签名，属性集，子元素集默认空即可直接省略
function createElement(tag, data, children = null) {
  let [flag, childFlag, isText] = judgeNT(tag, children)
  //创建文本节点
  if (isText) children = createTextNode.apply(this, children)
  //返回vnode对象，前提是确定最外层容器所以tag可以只为文本
  return {
    flag, //根据外部配置识别tag以确定vnode类型
    tag, //标签名称，纯文本则只传入字符串，组件则函数
    data,
    children,
    childFlag, //直接子元素类型
    //假如需要挂载子元素则存储挂载到DOM上的实际元素节点以便子元素获取以确定容器
    el: null,
  }
}
//定义tag识别
const vnodeType = {
  HTML: 'HTML',
  TEXT: 'TEXT',
  COMPONENT: 'COMPONENT',
  CLASS_COMPONENT: 'CLASS_COMPONENT',
}
//定义子元素识别，为空，或只传入文本，或多个包括一个非文本
const childrenType = {
  EMPTY: 'EMPTY',
  SINGLE: 'SINGLE',
  MULTI: 'MULTI',
}
//判断元素节点类型
function judgeNT(tag, children) {
  let flag,
    childFlag,
    isText = false
  //判断标签名，有子元素递归传入
  if (typeof tag === 'string') {
    //普通HTML标签
    flag = vnodeType['HTML']
  } else if (typeof tag === 'function') {
    //生成组件的函数
    flag = vnodeType['COMPONENT']
  } else {
    //默认不能直接加文本在最外层容器则这种情况只能用于创建文本子元素
    flag = vnodeType['TEXT']
  }
  //判断子元素传入，可能无也可能传入多个或纯文本
  if (!children) childFlag = childrenType['EMPTY']
  //还需要判断传入的第三个参数是否合法否则不进行操作，可以完善报错机制
  else if (Array.isArray(children)) {
    let size = children.length
    //参数包括空数组的情况
    if (size) childFlag = childrenType['MULTI']
    else childFlag = childrenType['EMPTY']
  } //传入第三个参数非空且非数组即纯文本
  else {
    childFlag = childrenType['SINGLE']
    isText = true
  }
  return [flag, childFlag, isText]
}
//对应创建文本节点
function createTextNode(children) {
  return {
    flag: vnodeType['TEXT'], //根据外部配置识别tag以确定vnode类型
    tag: null, //HTML标签，文本即只传入字符串，组件即传入函数
    data: null,
    children: children,
    childFlag: childrenType['EMPTY'],
  }
}

export default { createElement, vnodeType, childrenType }
