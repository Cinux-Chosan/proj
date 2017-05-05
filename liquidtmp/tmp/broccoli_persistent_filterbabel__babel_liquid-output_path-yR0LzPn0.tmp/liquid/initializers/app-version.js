define('liquid/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'liquid/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _liquidConfigEnvironment) {
  var _config$APP = _liquidConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});