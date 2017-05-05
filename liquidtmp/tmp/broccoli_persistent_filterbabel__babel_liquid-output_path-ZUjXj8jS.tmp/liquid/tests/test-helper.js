define('liquid/tests/test-helper', ['exports', 'liquid/tests/helpers/resolver', 'ember-qunit'], function (exports, _liquidTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_liquidTestsHelpersResolver['default']);
});