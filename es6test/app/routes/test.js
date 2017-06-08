import Ember from 'ember';
import t1 from  'es6test/utils/test1';

export default Ember.Route.extend({
  model(){
    t1();
  }
});
