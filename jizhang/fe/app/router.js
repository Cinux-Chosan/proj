import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('apps', function() {
    this.route('login');
    this.route('jizhang', function(){
      this.route('edit', { path: 'edit/:edit_id'});
      this.route('detail', { path: 'detail/:detail_id'});
    });
    this.route('map', function() {
      this.route('api');
    });
  });
});

export default Router;
