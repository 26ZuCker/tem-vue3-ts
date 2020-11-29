//let { vnodeType, childrenType } = require('./create')
//import { vnodeType, childrenType } from './create'

//需要导入vnodeType和childrenType识别规则
//渲染的目标vnode，存储该vnode的容器即父元素
function render(vnode, container) {
  //再次渲染需要经过diff算法
  //首次渲染先挂载一次组件
  mount(vnode, container)
}
//挂载
function mount(vnode, container) {
  let { flag } = vnode
  //区分渲染的节点类型，根据flag执行不同的渲染函数
  if (flag === vnodeType['HTML']) mountElement(vnode, container)
  else if (flag === vnodeType['TEXT']) mountText(vnode, container)
}
//普通HTML元素节点
function mountElement(vnode, container) {
  let { tag, data, children, childFlag } = vnode,
    node = document.createElement(tag)
  //设置已绑定的真实DOM节点
  vnode.el = node
  //递归挂载子元素节点
  if (childFlag !== childrenType['EMPTY']) {
    if (childFlag === childrenType['SINGLE']) mount(children, node)
    else if (childFlag === childrenType['MULTI']) {
      children.forEach((v) => {
        mount(v, node)
      })
    }
  }
  container.appendChild(node)
  console.log(node)
}
function mountText(vnode, container) {
  let node = document.createTextNode(vnode.children)
  vnode.el = node
  container.appendChild(node)
}
/* module.exports = {
  render,
} */
//export default render
