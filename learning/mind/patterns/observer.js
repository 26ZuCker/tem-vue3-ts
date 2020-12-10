/**
 * 通过IIFE和闭包实现类
 */
var observer = (function() {
  var topics = [];
  return {
    /**
     * 订阅，为该被观察者即主体对象假如增加观察者
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
     * 发布，触发被观察者的状态变化回调即通知观察者
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
     * 为该被观察者即主体对象移除指定观察者
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
     * 为该被观察者即主体对象移除所有观察者
     * @param {*} topic
     */
    removeAll: function(topic) {
      if (topics.hasOwnProperty(topic)) {
        topics[topic].length = 0;
      }
    },
  };
})();

/**
 * 通过IIFE和闭包简易实现主体类
 */
var Subject = (function() {
  var observer_list = [];
  return {
    $add: function(obj) {
      observer_list.push(obj);
    },
    $remove: function(obj) {},
    $removeAll: function(obj) {
      for (var i = 0; i < observer_list.length; i++) {
        if (observer_list[i] === obj) {
          observer_list.splice(i, 1);
        }
      }
    },
    $notify: function() {
      var args = Array.prototype.slice.call(arguments, 0);
      for (var i = 0; i < observer_list.length; i++) {
        observer_list[i].update(args);
      }
    },
  };
})();
