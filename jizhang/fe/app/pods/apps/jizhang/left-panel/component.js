import Ember from 'ember';
import { task } from 'ember-concurrency';
import { getJSON, formatDate } from 'jizhang/utils/util';

export default Ember.Component.extend({
  histories: [
    {date: new Date},
    {date: new Date},
    {date: new Date}
  ],
  getAllRecords: task(function *(){
    let r = yield getJSON('/getAllRecords');
    if (r.state) {
      r.data.forEach(el => el.createTime = formatDate(el.date));
      this.set('histories', r.data);
    }
  }),
  didInsertElement() {
    this._super(...arguments);
    this.get('getAllRecords').perform();
  },
  actions: {
    showDetail(history) {
      this.get('appController').transitionToRoute('apps.jizhang.detail', history._id);
    }
  }
});
