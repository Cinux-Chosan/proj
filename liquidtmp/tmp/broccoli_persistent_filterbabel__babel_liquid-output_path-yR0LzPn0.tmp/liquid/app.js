define('liquid/app', ['exports', 'ember', 'liquid/resolver', 'ember-load-initializers', 'liquid/config/environment'], function (exports, _ember, _liquidResolver, _emberLoadInitializers, _liquidConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _liquidConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _liquidConfigEnvironment['default'].podModulePrefix,
    Resolver: _liquidResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _liquidConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});