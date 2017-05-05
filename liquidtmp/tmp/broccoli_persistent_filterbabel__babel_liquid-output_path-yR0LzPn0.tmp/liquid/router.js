define('liquid/router', ['exports', 'ember', 'liquid/config/environment'], function (exports, _ember, _liquidConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _liquidConfigEnvironment['default'].locationType,
    rootURL: _liquidConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('posts');
  });

  exports['default'] = Router;
});