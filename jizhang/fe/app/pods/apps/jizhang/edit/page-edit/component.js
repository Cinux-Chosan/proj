
import Ember from 'ember';
// import { task } from 'ember-concurrency';
import computed from 'ember-computed-decorators';
import { getJSON, tip } from 'jizhang/utils/util';

export default Ember.Component.extend({
  items: [{
    desc: '',
    money: '',
    type: 'out'
  }],
  title: '',
  @computed('items.@each.{money,type}')
  total(items) {
    let sum = 0, inComes = 0, outComes = 0;
    items.forEach(el => {
      let money = el.type == 'in' ? Number(el.money) : - Number(el.money);
      money = money ? money : 0;
      el.type == 'in' ? inComes += money : outComes += money});
    sum = inComes + outComes;
    return { inComes, outComes, sum };
  },
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
      let title = this.get('title');
      let record_id = this.get('model.bill_id');
      let result = await getJSON('/submitEdit', { records, record_id, title }, 'post');
      if (result.state) {
        tip('保存成功!');
      }
    }
  }
});
