import Ember from 'ember';

export default Ember.Component.extend({
  tools: [{
    title: '新增',
    iconCls: 'icon-add',
    action: function () { this.get('appController').transitionToRoute('apps.jizhang.edit', 0); }
  }, {
    title: '查询',
    iconCls: 'icon-search',
    action: () => null
  }]
});
