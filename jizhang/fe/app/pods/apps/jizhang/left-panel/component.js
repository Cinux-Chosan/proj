import Ember from 'ember';
import { task } from 'ember-concurrency';
import { getJSON, formatDate, tip } from 'jizhang/utils/util';

export default Ember.Component.extend({
  histories: '',
  getAllRecords: task(function *(){
    let r = yield getJSON('/getAllRecords');
    if (r.state) {
      r.data.forEach(el => el.createTime = formatDate(el.create_time));
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
    },
    edit(history, e) {
      e.stopImmediatePropagation();
      this.get('appController').transitionToRoute('apps.jizhang.edit', history._id);
    },
    async delItem(history) {
      let { _id } = history;
      let result = await getJSON('/delRecord', { _id });
      if (result.state) {
        this.get('histories').removeObject(history);
        tip('删除成功!');
      }
    }
  }
});
