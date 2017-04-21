var Duvet = (function(global, $, jenga) {
  'use strict';

  // 默认配置
  var defaults = {
    alignToEl = null,
    align: 'M',
    fixed: true,
    offsets: {
      top: 0,
      right: 0,
      left: 0,
      buttom: 0
    }
  };

  // 浮层类
  function Duvet(el, options) {
    // 浮层元素引用
    this.el = el;
    this.$el = $(el);

    // 用于定义的配置覆盖默认配置
    this.setOptions(options);

    // 返回实例
    return this;
  }

  // 对浮层元素定位
  Duvet.prototype.position = function(options) {};

  // 设置实例属性
  Duvet.prototype.setOptions== function(options) {};

  // 清除任何用户定义的引用，保证没有元素遗留下来，防止内存泄露
  Duvet.prototype.destroy = function(options) {};

  return Duvet;
})(window, jQuery, genga);
