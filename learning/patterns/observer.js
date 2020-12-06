var observer = (function() {
  var topics = [];
  return {
    /**
     * 注册一个监听函数
     * @param {*} topic
     * @param {*} handler
     */
    subscribe: function(topic, handler) {
      if (!topics.hasOwnProperty(topic)) {
        topics[topic].length = 0;
      }
      topics[topic].push(handler);
    },
    /**
     * 发布即触发观察者的回调
     * @param {*} topic
     * @param {*} info
     */
    publish: function(topic, info) {
      if (topics.hasOwnProperty(topic)) {
        topics[topic].forEach(function(v) {
          v(info);
        });
      }
    },
    /**
     * 移除一个观察者的某个监听回调
     * @param {*} topic
     * @param {*} handler
     */
    remove: function(topic, handler) {
      if (!topics.hasOwnProperty(topic)) {
        return;
      }
      var handlerIndex = -1;
      topics[topic].forEach(function(v, i) {
        //假如是两个引用类型可以这样比较？
        if (v === handler) {
          handlerIndex = i;
        }
      });
      if (handlerIndex >= 0) {
        topics[topic].splice(handlerIndex, 1);
      }
    },
    /**
     * 移除一个观察者的所有监听回调
     * @param {*} topic
     */
    removeAll: function(topic) {
      if (topics.hasOwnProperty(topic)) {
        topics[topic].length = 0;
      }
    },
  };
})();

var root =
  (typeof self == 'object' && self.self == self && self) ||
  (typeof global == 'object' && global.global == global && global) ||
  this ||
  {};

if (typeof exports != 'undefined' && !exports.nodeType) {
  if (typeof module != 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = observer;
  }
  exports.observer = observer;
} else {
  root.observer = observer;
}
