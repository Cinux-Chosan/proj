import Ember from 'ember';

export function isEq([...params]/*, hash*/) {
  return params.every((el, i) => el == params[ i ? i - 1 : 0]);
}

export default Ember.Helper.helper(isEq);
