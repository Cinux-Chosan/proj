define("liquid-fire/components/liquid-measured", ["exports", "liquid-fire/mutation-observer", "ember", "liquid-fire/templates/components/liquid-measured"], function (exports, _mutationObserver, _ember, _liquidMeasured) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.measure = measure;
  exports.default = _ember.default.Component.extend({
    layout: _liquidMeasured.default,

    init: function init() {
      this._super.apply(this, arguments);
      this._destroyOnUnload = this._destroyOnUnload.bind(this);
    },


    didInsertElement: function didInsertElement() {
      var self = this;

      // This prevents margin collapse
      this.$().css({
        overflow: 'auto'
      });

      this.didMutate();

      this.observer = new _mutationObserver.default(function (mutations) {
        self.didMutate(mutations);
      });
      this.observer.observe(this.get('element'), {
        attributes: true,
        subtree: true,
        childList: true,
        characterData: true
      });
      this.$().bind('webkitTransitionEnd', function () {
        self.didMutate();
      });
      // Chrome Memory Leak: https://bugs.webkit.org/show_bug.cgi?id=93661
      window.addEventListener('unload', this._destroyOnUnload);
    },

    willDestroyElement: function willDestroyElement() {
      if (this.observer) {
        this.observer.disconnect();
      }
      window.removeEventListener('unload', this._destroyOnUnload);
    },

    transitionMap: _ember.default.inject.service('liquid-fire-transitions'),

    didMutate: function didMutate() {
      // by incrementing the running transitions counter here we prevent
      // tests from falling through the gap between the time they
      // triggered mutation the time we may actually animate in
      // response.
      var tmap = this.get('transitionMap');
      tmap.incrementRunningTransitions();
      _ember.default.run.next(this, function () {
        this._didMutate();
        tmap.decrementRunningTransitions();
      });
    },

    _didMutate: function _didMutate() {
      var elt = this.$();
      if (!elt || !elt[0]) {
        return;
      }
      this.set('measurements', measure(elt));
    },

    _destroyOnUnload: function _destroyOnUnload() {
      this.willDestroyElement();
    }
  });
  function measure($elt) {
    return $elt[0].getBoundingClientRect();
  }
});