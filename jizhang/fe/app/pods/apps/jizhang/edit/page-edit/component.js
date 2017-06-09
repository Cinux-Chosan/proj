
import Ember from 'ember';
// import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  items: [{
    desc: '',
    money: ''
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
    async sbumit() {
      let data = this.get('items');
      let result = await Ember.$.ajax({
        url: 'submitEdit',
        data: data,
        type: 'post'
      });
      if (result.state) {
        // 提交成功

      }
    }
  }
});
