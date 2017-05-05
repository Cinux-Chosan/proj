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