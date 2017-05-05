define('liquid/tests/helpers/resolver', ['exports', 'liquid/resolver', 'liquid/config/environment'], function (exports, _liquidResolver, _liquidConfigEnvironment) {

  var resolver = _liquidResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _liquidConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _liquidConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});