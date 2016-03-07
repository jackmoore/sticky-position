/*!
	sticky-position 1.0.0
	license: MIT
	http://www.jacklmoore.com/sticky-position
*/
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.stickyPosition = mod.exports;
  }
})(this, function (exports, module) {
  'use strict';

  module.exports = function () {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$primary = _ref.primary;
    var primary = _ref$primary === undefined ? null : _ref$primary;
    var _ref$placeholder = _ref.placeholder;
    var placeholder = _ref$placeholder === undefined ? null : _ref$placeholder;
    var _ref$wrapper = _ref.wrapper;
    var wrapper = _ref$wrapper === undefined ? null : _ref$wrapper;
    var _ref$computeWidth = _ref.computeWidth;
    var computeWidth = _ref$computeWidth === undefined ? true : _ref$computeWidth;
    var _ref$isSupported = _ref.isSupported;
    var isSupported = _ref$isSupported === undefined ? null : _ref$isSupported;

    var top = null;
    var isSticky = false;
    isSupported = isSupported ? null : isSupported;

    /*
     * @description If default.isSupported is anything except `null` the polyfill will use the JS method.
     */
    var nativeSupport = (function () {
      if (this.isSupported !== null) {
        return this.isSupported;
      } else {
        var style = document.createElement('test').style;
        style.cssText = ['-webkit-', '-ms-', ''].map(function (prefix) {
          return 'position: ' + prefix + 'sticky';
        }).join(';');
        this.isSupported = style.position.indexOf('sticky') !== -1;
        return this.isSupported;
      }
    }).bind({ isSupported: isSupported });

    function stick() {
      if (isSticky === true) return;
      primary.style.position = 'fixed';
      isSticky = true;
    }

    function unstick() {
      if (isSticky === false) return;
      primary.style.position = 'relative';
      primary.style.width = '';
      primary.style.top = '';
      primary.style.left = '';
      placeholder.style.height = '';
      placeholder.style.width = '';
      isSticky = false;
    }

    function init() {
      // positioning necessary for getComputedStyle to report the correct z-index value.
      wrapper.style.position = 'relative';

      var style = window.getComputedStyle(wrapper, null);

      top = parseInt(style.top) || 0;
      primary.style.zIndex = style.zIndex;
      primary.style.position = 'relative';
      wrapper.style.top = 0;
      // Giving the placeholder an overflow of 'hidden' or 'auto' will allow it to clear any bottom margin extending beneath the primary element.
      // Clearing that margin is needed so that it's contribution to the wrapper element's height can be measured with getBoundingClientRect.
      placeholder.style.overflow = 'hidden';

      update();
      window.addEventListener('load', update);
      window.addEventListener('scroll', update);
      window.addEventListener('resize', update);
    }

    function update() {
      var rect = wrapper.getBoundingClientRect();
      var sticky = rect.top < top;

      if (sticky) {
        placeholder.style.height = rect.height + 'px';

        if (computeWidth) {
          placeholder.style.width = rect.width + 'px';
        }

        var parentRect = wrapper.parentNode.getBoundingClientRect();

        primary.style.top = Math.min(parentRect.top + parentRect.height - rect.height, top) + 'px';
        primary.style.width = computeWidth ? rect.width + 'px' : '100%';
        primary.style.left = rect.left + 'px';

        stick();
      } else {
        unstick();
      }
    }

    function destroy() {
      window.removeEventListener('load', update);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      unstick();
    }

    if (nativeSupport()) {
      return {
        update: function update() {},
        destroy: function destroy() {}
      };
    } else {
      init();

      return {
        update: update,
        destroy: destroy
      };
    }
  };
});