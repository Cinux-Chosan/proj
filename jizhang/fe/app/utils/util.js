import Ember from 'ember';

export let tip = function() {};

export let getJSON = function(url, data, type = 'get') {
  let error = e => tip(e.message);
  return Ember.$.ajax({
    url,
    data,
    type,
    error
  })
}
