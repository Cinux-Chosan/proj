define('ember-data/-private/instance-initializers/initialize-store-service', ['exports', 'ember-data/-private/debug'], function (exports, _debug) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = initializeStoreService;

  /*
    Configures a registry for use with an Ember-Data
    store.
  
    @method initializeStoreService
    @param {Ember.ApplicationInstance} applicationOrRegistry
  */
  function initializeStoreService(application) {
    var container = application.lookup ? application : application.container;
    // Eagerly generate the store so defaultStore is populated.
    container.lookup('service:store');

    var initializers = application.application.constructor.initializers;
    deprecateOldEmberDataInitializers(initializers);
  }

  var deprecatedInitializerNames = ['data-adapter', 'injectStore', 'transforms', 'store'];

  function matchesDeprecatedInititalizer(name) {
    return deprecatedInitializerNames.indexOf(name) !== -1;
  }

  function deprecateOldEmberDataInitializers(initializers) {
    // collect all of the initializers
    var initializersArray = Object.keys(initializers).map(function (key) {
      return initializers[key];
    });

    // filter out all of the Ember Data initializer. We have some
    // deprecated initializers that depend on other deprecated
    // initializers which may trigger the deprecation warning
    // unintentionally.
    var nonEmberDataInitializers = initializersArray.filter(function (initializer) {
      return !matchesDeprecatedInititalizer(initializer.name);
    });

    nonEmberDataInitializers.forEach(warnForDeprecatedInitializers);
  }

  function warnForDeprecatedInitializers(initializer) {
    var deprecatedBeforeInitializer = matchesDeprecatedInititalizer(initializer.before);
    var deprecatedAfterInitializer = matchesDeprecatedInititalizer(initializer.after);
    var deprecatedProp = deprecatedBeforeInitializer ? 'before' : 'after';

    (0, _debug.deprecate)('The initializer `' + initializer[deprecatedProp] + '` has been deprecated. Please update your `' + initializer.name + '` initializer to use use `' + deprecatedProp + ': \'ember-data\'` instead.', !(deprecatedBeforeInitializer || deprecatedAfterInitializer), {
      id: 'ds.deprecated-initializers',
      until: '3.0.0'
    });
  }
});