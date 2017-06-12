import Ember from 'ember';

export let tip = function(msg, type = 'success') {
  toastr.options.progressBar = true;
  toastr[type](msg);
};

export let getJSON = (url, data, type = 'get', dataType = 'json') => {
  let error = (xhr, eStr, e) => tip(eStr + ' : ' + e, 'error');
  let success = data => data.state ? data : tip(data.msg, 'error');
  return Ember.$.ajax({
    dataType,
    url,
    data,
    type,
    error,
    success
  });
}

export let formatDate = (time, split = '/') => {
  let date = new Date(time);
  return '' + date.getFullYear() + split + String(date.getMonth() + 1).padLeft(2, '0') + split + String(date.getDate()).padLeft(2, '0');
}
