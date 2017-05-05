define("liquid-fire/components/liquid-versions", ["exports", "ember", "liquid-fire/ember-internals", "liquid-fire/templates/components/liquid-versions"], function (exports, _ember, _emberInternals, _liquidVersions) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var get = _ember.default.get;
  var set = _ember.default.set;

  exports.default = _ember.default.Component.extend({
    layout: _liquidVersions.default,
    tagName: "",

    transitionMap: _ember.default.inject.service('liquid-fire-transitions'),

    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);
      this.appendVersion();
    },
    appendVersion: function appendVersion() {
      var versions = this.versions;
      var firstTime = false;
      var newValue = this.getAttr('value');
      var oldValue;
      var versionEquality = this.get('versionEquality') || defaultEqualityCheck;

      if (!versions) {
        firstTime = true;
        versions = _ember.default.A();
      } else {
        if (versions[0]) {
          oldValue = versions[0].value;
        }
      }

      if (!firstTime && versionEquality(oldValue, newValue)) {
        if (versions[0] && versionEquality !== defaultEqualityCheck) {
          // When using custom equality checkers, we may consider values
          // equal for our purposes that are not `===`. In that case, we
          // still need to thread updated values through to our children
          // so they have their own opportunity to react.
          _ember.default.set(versions[0], 'value', newValue);
        }
        return;
      }

      this.notifyContainer('willTransition', versions);
      var newVersion = {
        value: newValue
      };
      versions.unshiftObject(newVersion);

      this.firstTime = firstTime;
      if (firstTime) {
        set(this, 'versions', versions);
      }

      if (!(newValue || this.get('renderWhenFalse') || firstTime)) {
        this._transition();
      }
    },


    _transition: function _transition() {
      var _this = this;

      var versions = get(this, 'versions');
      var transition;
      var firstTime = this.firstTime;
      this.firstTime = false;

      this.notifyContainer('afterChildInsertion', versions);

      transition = get(this, 'transitionMap').transitionFor({
        versions: versions,
        parentElement: _ember.default.$((0, _emberInternals.containingElement)(this)),
        use: get(this, 'use'),
        rules: get(this, 'rules'),
        matchContext: get(this, 'matchContext') || {},
        // Using strings instead of booleans here is an
        // optimization. The constraint system can match them more
        // efficiently, since it treats boolean constraints as generic
        // "match anything truthy/falsy" predicates, whereas string
        // checks are a direct object property lookup.
        firstTime: firstTime ? 'yes' : 'no'
      });

      if (this._runningTransition) {
        this._runningTransition.interrupt();
      }
      this._runningTransition = transition;

      transition.run().then(function (wasInterrupted) {
        // if we were interrupted, we don't handle the cleanup because
        // another transition has already taken over.
        if (!wasInterrupted) {
          _this.finalizeVersions(versions);
          _this.notifyContainer("afterTransition", versions);
        }
      }, function (err) {
        _this.finalizeVersions(versions);
        _this.notifyContainer("afterTransition", versions);
        throw err;
      });
    },

    finalizeVersions: function finalizeVersions(versions) {
      versions.replace(1, versions.length - 1);
    },

    notifyContainer: function notifyContainer(method, versions) {
      var target = get(this, 'notify');
      if (target) {
        target.send(method, versions);
      }
    },

    actions: {
      childDidRender: function childDidRender(child) {
        var version = get(child, 'version');
        set(version, 'view', child);
        this._transition();
      }
    }

  });


  // All falsey values are considered equal, everything else gets strict
  // equality.
  function defaultEqualityCheck(a, b) {
    return !a && !b || a === b;
  }
});