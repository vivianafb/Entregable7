"use strict";

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var puerto = 3000;
var app = (0, _express["default"])();
var server = app.listen(puerto, function () {
  return console.log('Server Up en puerto', puerto);
});
server.on('error', function (err) {
  console.log('ERROR =>', err);
});
var visitas = 0;
var arrays = [{
  "id": "1",
  "titulo": "Anillos"
}, {
  "id": "2",
  "titulo": "Computadores"
}, {
  "id": 3,
  "titulo": "Mouse"
}];
app.get('/items', function (request, response) {
  visitas++;
  var items = {
    items: [],
    cantidad: 0
  };

  var _iterator = _createForOfIteratorHelper(arrays),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var a = _step.value;
      items.items.push(a.titulo);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  items.cantidad = arrays.length;
  response.json({
    items: items
  });
});
app.get('/item-random', function (request, response) {
  visitas++;
  var path = './src/productos.txt';

  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  var producto = JSON.parse(_fs["default"].readFileSync(path, 'utf-8'));
  var random = aleatorio(0, producto.length);
  response.json({
    producto: producto[random]
  });
});
app.get('/visitas', function (request, response) {
  visitas++;
  response.json({
    mensaje: "Visita numero ".concat(visitas)
  });
});