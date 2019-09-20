"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = [{
  id: 1,
  name: 'John',
  role: 'Programmer',
  admin: false
}, {
  id: 2,
  name: 'jane',
  role: 'Programmer',
  admin: false
}];
var app = (0, _express["default"])();
app.use(_express["default"].json()); // Routes

app.get('/status', function (req, res) {
  res.send({
    message: 'API running'
  });
});
app.get('/users', function (req, res) {
  res.status(200).json({
    status: 200,
    message: 'API running!!!!!',
    data: users
  });
});
app.post('/users', function (req, res) {
  var _req$body = req.body,
      id = _req$body.id,
      name = _req$body.name,
      role = _req$body.role,
      admin = _req$body.admin;
  res.status(201).json({
    status: 201,
    message: 'user added successfully',
    data: {
      id: id,
      name: name,
      role: role,
      admin: admin
    }
  });
});
app.listen(3000, function () {
  console.debug("Server running 3000");
});
var _default = app;
exports["default"] = _default;