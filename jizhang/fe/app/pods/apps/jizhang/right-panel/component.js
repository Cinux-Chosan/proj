import Ember from 'ember';

export default Ember.Component.extend({
  tools: [{
    title: '新增',
    iconCls: 'icon-add'
  }, {
    title: '查询',
    iconCls: 'icon-search'
  }]
});
