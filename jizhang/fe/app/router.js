import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('apps', function() {
    this.route('jizhang');
    this.route('login');
    this.route('edit');
  });
});

export default Router;
