//// 组件统一格式

// 禁用或启用元素
function disable($el, disabled) {
  this.$el[disabled ? 'addClass' : 'removeClass']('disabled')
  .find('input, textarea, select, button')
  .prop('disabled', disabled);
}

// 创建控件实例的构造函数
function WidgetName(options) {
  this.options = $.extend({}, this.defaults, options);
  // 初始化控件
  this.init();
  // 返回控件的示例
  return this;
}


// 默认配置

WidgetName.prototype.defaults = {
  width: 200;  // 默认配置
}

// 控件初始化逻辑
WidgetName.prototype.init = function() {
  this.$el = $(options.$el);
  this.bind();   // ??????
}

// 控件渲染逻辑
WidgetName.prototype.render = function() {
  // 在合适的时候触发合适的事件
  this.$el.trigger('rendered', [this]);
  return this;
}

// 使用声明和命名空间绑定事件
WidgetName.prototype.bind = function() {
  this.$el.on('click.cmp-name', function(e) {});
  return this;
}


// 解绑事件
WidgetName.prototype.unbind = function() {
  this.$el.off('click.cmp-name');
  return this;
}

// 关闭控件
WidgetName.prototype.disable = function() {
  disable(this.$el, true);
  return this;
}

// 开启控件
WidgetName.prototype.enable = function() {
  disable(this.$el, false);
  return this;
}

// 添加自定义销毁逻辑
WidgetName.prototype.destroy = function() {
  this.unbind();
  this.$el.remove();
}
