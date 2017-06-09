import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let { edit_id } = params;
    return { edit_id };
  }
});
