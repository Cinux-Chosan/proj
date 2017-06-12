import Ember from 'ember';
import { observes } from 'ember-computed-decorators';
import { getJSON } from 'jizhang/utils/util';

export default Ember.Component.extend({
  async getRecordById(_id) {
    _id = _id ? _id : this.get('model.bill_id');
    let r = await getJSON('/getRecordById', { _id });
    if (r.state) {
      let data = r.data;
      let inComes = data.incomes;
      let outComes = data.outcomes;
      let sum = data.sum;
      this.set('total', {inComes, outComes, sum});
      this.set('recordData', data);
    }
  },
  didInsertElement() {
    this._super(...arguments);
    this.getRecordById();
  },
  @observes('model.bill_id')
  idChanged() {
    this.getRecordById();
  }
});
