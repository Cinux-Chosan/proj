import Ember from 'ember';

export let tip = function(msg, type = 'success') {
  toastr.options.progressBar = true;
  toastr[type](msg);
};

export let getJSON = (url, data, type = 'get') => {
  let error = (xhr, eStr, e) => tip(eStr + ' : ' + e, 'error');
  let success = data => data.state ? data : tip(data.msg, 'error');
  return Ember.$.ajax({
    dataType: 'json',
    url,
    data,
    type,
    error,
    success
  });
}
