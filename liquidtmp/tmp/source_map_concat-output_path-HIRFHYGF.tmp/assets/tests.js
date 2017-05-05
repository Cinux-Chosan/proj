'use strict';

define('liquid/tests/app.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('pods/application/controller.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/application/controller.js should pass ESLint\n\n');
  });

  QUnit.test('pods/application/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/application/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/index/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/index/route.js should pass ESLint\n\n');
  });

  QUnit.test('pods/posts/route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pods/posts/route.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('transitions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transitions.js should pass ESLint\n\n');
  });
});
define('liquid/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('liquid/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'liquid/tests/helpers/start-app', 'liquid/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _liquidTestsHelpersStartApp, _liquidTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _liquidTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _liquidTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('liquid/tests/helpers/resolver', ['exports', 'liquid/resolver', 'liquid/config/environment'], function (exports, _liquidResolver, _liquidConfigEnvironment) {

  var resolver = _liquidResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _liquidConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _liquidConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('liquid/tests/helpers/start-app', ['exports', 'ember', 'liquid/app', 'liquid/config/environment'], function (exports, _ember, _liquidApp, _liquidConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var attributes = _ember['default'].merge({}, _liquidConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    return _ember['default'].run(function () {
      var application = _liquidApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('liquid/tests/test-helper', ['exports', 'liquid/tests/helpers/resolver', 'ember-qunit'], function (exports, _liquidTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_liquidTestsHelpersResolver['default']);
});
define('liquid/tests/tests.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/application/controller-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/application/controller-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/application/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/application/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/index/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/index/route-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/pods/posts/route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/pods/posts/route-test.js should pass ESLint\n\n');
  });
});
define('liquid/tests/unit/pods/application/controller-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:application', 'Unit | Controller | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('liquid/tests/unit/pods/application/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('liquid/tests/unit/pods/index/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('liquid/tests/unit/pods/posts/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:posts', 'Unit | Route | posts', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
require('liquid/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
