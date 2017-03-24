;(function (root, $) {
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // 构造函数：创建实例
  function Voltron(opts) {
    this.init(opts);
    return this;
  }

  // 默认设置
  Voltron.prototype.defaults = {};

  // 事件散列
  Voltron.prototype.events = {};

  // 初始化代码
  Voltron.prototype.init = function(opts) {
    this.options = $.extend({}, this.defaults, opts);
    this.$el = $(opts.$el);
    this.bind();
    return this;
  }

  Voltron.prototype.bind = function() {
    var events = this.options.events ? Voltron.result(this.options.events) : null;
    if (!events) {
      return this;
    }

    // 防止重复绑定事件
    this.unbind();

    for (var key in events) {
      if (events.hasOwnProperty(key)) {
        var method = events[key];

        // 如果method不是一个函数，则找到对应的实例方法
        if (!$.isFunction(method)) {
          method = this[events[key]];
        }

        // 如果方法不存在，跳出循环，处理 events 哈希对象中的下一个属性
        if (!method) {
          continue;
        }

        // 从属性中提取出事件的名称和选择器
        var match = key.match(delegateEventSplitter);
        var eventName = match[1];
        var selector = match[2];

        // 将事件回掉绑定到控件实例上
        method = $.proxy(method, this);

        if (selector.length) {
          this.$el.on(eventName, selector, method);
        } else {
          this.$el.on(eventName, method);
        }
      }
    }
  }

  // 解除事件绑定
  Voltron.prototype.unbind = function() {
    this.$el.off();
    return this;
  }

  // 销毁实例
  Voltron.prototype.destroy = function() {
    this.unbind();
    this.$el.remove();
  }

  // 静态工具方法，如果参数是一个函数，则返回函数执行的返回值，否则返回该参数
  Voltron.result = function(val) {
    return  $.isFunction(val) ? val() : val;
  }

  window.Voltron = window.Voltron || Voltron;
})(window, jQuery);




/////////////////////////////////// 对话框类：扩展自 Voltron

(function() {
  'use strict';

  // 设置该类的原型为基本控件、 设置类的构造函数
  Dialog.prototype = new Voltron({});
  Dialog.prototype.constructor = Dialog;
  function Dialog(opts) {
    Voltron.call(this, opts);
    return this;
  }

  // 默认值、如宽度高度
  Dialog.prototype.defaults = {};

  // 事件响应函数， 通过 Voltron.prototype.bind 绑定
  Dialog.prototype.events = {};

  // 根据模板生成内容，并插入 DOM
  Dialog.prototype.render = function() {};

  // 显示对话框
  Dialog.prototype.show = function() {};

  // 隐藏对话框
  Dialog.prototype.hide = function() {};

  window.Dialog = window.Dialog || Dialog;
})(window, jQuery, Voltron);
