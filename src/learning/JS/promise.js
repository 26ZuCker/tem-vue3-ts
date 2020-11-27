//储存状态名称避免打错，实际开发可忽略
const states=['pending','fulfilled','rejected']
/*
constructor同步执行，而resolve()和reject()同步调用但其内部的一系列操作是异步执行
即改变state的操作为异步，即then的调用也是异步，因为只有当状态变为fulfilled才会被调用，进而执行其中的回调
当状态被异步改变了，需要执行的任务会被加入task队列
*/
class myPromise{
    //executor即需要异步执行的任务，使用setTimeout实现状态改变
    constructor(executor){
        //初始状态
        this.state=states[0]
        //fulfilled返回信息
        this.value=undefined
        //rejected拒绝原因
        this.reason=undefined
        //因为then为链式调用，所以可能会储存多个回调函数，最终遍历以调用
        //储存多个当状态变为fulfilled时执行的回调函数onFulfilled队列
        this.onFulFilledCallbacks=[]
        this.onRejectedCallbacks=[]
        //两种状态执行的各自回调函数
        let resolve=(result)=>{
            //确保state只能由pending转变，且只能改变一次
            if(this.state===states[0]){
                //使用setTimeout确保onFulfilled和onRejected异步执行改变状态这一操作
                //且应该在then方法被调用的那一轮事件循环之后的新执行栈中执行
                setTimeout(()=>{
                    this.state=states[1]
                    this.value=result
                    //cb即callback
                    //为实现链式调用，需要return this
                    this.onFulFilledCallbacks.forEach(cb=>cb(this.value))
                },0) }            
        }
        let reject=(error)=>{
            if(this.state===states[0]){
                setTimeout(()=>{
                    this.state=states[2]
                    this.reason=error
                    this.onRejectedCallbacks.forEach(er=>er(this.reason))
                },0) }
        }
        //捕获在executor调用中抛出的异常
        try {executor(resolveFn,rejectFn)} 
        //假如有异常信息，则转换为reject并执行onRejected函数
        catch (err){reject(err)}
    }//延迟对象
    static deferred(){
        let defer={}
        defer.promise=new myPromise((resolve,reject)=>{})
    }
    static all(promises=[]){
        let i=0,res=[]
        return new Promise((resolve,reject)=>{
            for(let i in promises){
                promises[i].then(val=>{
                    i++
                    res[i]=val
                    (i===promises.length)&&resolve(res)
                },reject) }
        })
    }
    static race(){

    }
    static resolvePromise(promise,x,resolve,reject){

    }
}
/* 
官方的then加在原型上，使用 prototype定义的方法相当于类的实例方法，必须new后才能使用
ES6可以直接在类中添加原型方法，其实原理也是加在原型链上
then即promise的回调函数，返回promise，每次调用需返回this实例对象以实现链式调用
 */
myPromise.prototype.then=function(onFulFilled,onRejected){
    //判断本轮回调是终点还是还有下一轮，负责接收上一轮的回调函数或返回值
    onFulFilled=typeof onFulFilled==='function'?onFulFilled:value=>{value}
    onRejected=typeof onRejected==='function'?onRejected:reason=>{throw reason}
    //self即全局window指向不像this会变
    switch(self.status){
        
        case states[0]:
            return promise2=new myPromise((resolve,reject)=>{
                this.onFulFilledCallbacks.push(()=>{
                    //新的
                    try{this.resolvePromise(
                        promise2,onFulFilled(this.value),
                        resolve,reject)}
                    catch(err){reject(err)}
                })
                this.onRejectedCallbacks.push(()=>{
                    try{this.resolvePromise(promise2,onRejected(this.reason),resolve,reject)}
                    catch(err){reject(err)}
                })
            })
        break
        // 当异步调用resolve()或rejected()时 将onFulfilled和onRejected函数收集暂存到集合中
        case states[1]:{

        }
        case states[2]:{

        }
    }
    return this
}
myPromise.prototype.catch=function(){

}
function myAsync(func,...values){

}