
import Ember from 'ember';
// import { task } from 'ember-concurrency';
import { getJSON, tip } from 'jizhang/utils/util';

export default Ember.Component.extend({
  items: [{
    desc: '',
    money: '',
    type: 'out'
  }],
  actions: {
    addOne() {
      this.get('items').pushObject({});
    },
    delItem(item) {
      this.get('items').removeObject(item);
    },
    toggleType(item){
      let type = item.type == 'in' ? 'out' : 'in';
      Ember.set(item, 'type', type);
    },
    async submit() {
      let records = this.get('items');
      let result = await getJSON('/submitEdit', { records }, 'post');
      if (result.state) {
        // 提交成功
        tip('保存成功');
      }
    }
  }
});
