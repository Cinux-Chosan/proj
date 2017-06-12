
import Ember from 'ember';
// import { task } from 'ember-concurrency';
import computed, { observes } from 'ember-computed-decorators';
import { getJSON, tip } from 'jizhang/utils/util';

const { run: { later } } = Ember;

export default Ember.Component.extend({
  items: [{
    desc: '',
    money: '',
    type: 'out'
  }],
  title: '',
  jizhangController: Ember.inject.controller('apps.jizhang'),
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
  async getRecordById(_id) {
    _id = _id ? _id : this.get('model.bill_id');
    _id = _id == 0 ? 0 : _id;
    if (!_id) return;
    let r = await getJSON('/getRecordById', { _id });
    if (r.state) {
      this.set('title', r.data.title);
      this.set('items', r.data.records);
    }
  },
  @observes('model.bill_id')
  idChanged() {
    this.getRecordById();
  },
  didInsertElement() {
    this._super(...arguments);
    this.set('title', '');
    this.set('items', [{}]);
    this.getRecordById();
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
        let jizhangController = this.get('jizhangController');
        console.log(jizhangController);
        jizhangController.set('hideLeftPanel', true);
        later(() => jizhangController.set('hideLeftPanel', false));
        this.get('appController').transitionToRoute('apps.jizhang.detail', result.data._id);
      }
    }
  }
});
