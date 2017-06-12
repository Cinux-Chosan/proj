import Ember from 'ember';
import { task } from  'ember-concurrency';
import { getJSON, tip } from 'jizhang/utils/util';
const { run: { later } } = Ember;

export default Ember.Component.extend({

  userInfo: {},
  didInsertElement() {
    this._super(...arguments);
    later(() => this.$('.login-form').addClass('show-animate'));
  },

  login: task(function * () {
    let userInfo = this.get('userInfo');
    let result = yield getJSON('/login', userInfo, 'post');
    if (result.state) {
      tip('登陆成功!');
      this.get('appController').transitionToRoute('apps.jizhang.edit', 0);
    }
  }).drop()
});
