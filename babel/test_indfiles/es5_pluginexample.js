"use strict";

var _ref, _hello;

//sometimes our code might include operators that are still in development
//the standard babel polyfill wont read those but we can install a pluging
//See es5_plugingexample.js
function doubleSay(str) {
  return str + ", " + str;
}

function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1);
}

var result = (_ref = (_hello = "hello" //"|>" is the proposed JS pipeline operator and will execute those functions in order over the string defined just above
, doubleSay(_hello)), capitalize(_ref));
console.log(result);
