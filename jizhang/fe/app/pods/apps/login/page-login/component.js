import Ember from 'ember';
import { task } from  'ember-concurrency';
const { run: { later } } = Ember;

export default Ember.Component.extend({

  userInfo: {},
  didInsertElement() {
    this._super(...arguments);
    later(() => this.$('.login-form').addClass('show-animate'));
  },

  login: task(function * () {
    let userInfo = this.get('userInfo');
    let result = yield Ember.$.ajax({
      url: '/login',
      data: userInfo,
      dataType: 'json',
      type: 'post'
    });
    if (result.state) {
      this.get('appController').transitionToRoute('apps');
    }
  }).drop()
});
