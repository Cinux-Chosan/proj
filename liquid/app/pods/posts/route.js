import Ember from 'ember';

export default Ember.Route.extend({
  model(param) {
    return {post_id: param.post_id};
  }
});
