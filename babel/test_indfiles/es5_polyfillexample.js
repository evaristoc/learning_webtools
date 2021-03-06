"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//babel polyfill will find the correct source code for each operator / function
//at the core.js module and others in order to make that ES6 function translate
//into ES5
//See es5_polylfillexample.js
var func =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(arg1) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(arg1);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function func(_x) {
    return _ref.apply(this, arguments);
  };
}();

func('hello');
