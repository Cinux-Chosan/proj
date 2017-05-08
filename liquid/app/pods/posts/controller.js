import Ember from 'ember';

export default Ember.Controller.extend({
  a: 1,

  actions: {
    change() {
      let a = this.get('a');
      this.set('a', parseInt(a) + 1);
    },
    higher() {
      // console.log(model);
      // model.set('post_id', parseInt(model.get('post_id')) + 1)
      // let model = this.get('model');
      this.transitionToRoute('posts', parseInt(this.get('model.post_id')) + 1);
      // this.set('model.post_id', parseInt(this.get('model.post_id')) + 1);
      console.log(this.get('model'));
    }
  }
});
