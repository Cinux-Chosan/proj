import Ember from 'ember';
import { genArray } from 'ember-zbj-ext-lib';
import computed, {
  on
} from 'ember-computed-decorators';
export default Ember.Route.extend({
  number: 1,
  @computed('number')
  getNumber(n) {
    return n;
  },
  model() {
    let map = new Map();
    console.log(this.get('getNumber'));
    return genArray(1, 100);
  }
});
