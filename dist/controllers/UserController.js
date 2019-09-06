"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _sequelize = require("sequelize");

var _Authorization = _interopRequireDefault(require("../middlewares/Authorization"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _app = require("../app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var login =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, login, password, user, check, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, login = _req$body.login, password = _req$body.password;
            _context.next = 3;
            return _models.User.findOne({
              where: {
                email: login
              }
            });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Invalid Credentials'
            }));

          case 6:
            check = _bcryptjs.default.compareSync(password, user.password);

            if (check) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Invalid Password'
            }));

          case 9:
            if (user.role === 'client') {
              _app.io.to('chefs').emit('clientLogin', {
                message: 'Client login!!!'
              });
            }

            token = _Authorization.default.generateToken(user);
            return _context.abrupt("return", res.status(200).json({
              message: 'User succesfully login',
              data: {
                user: user,
                token: token
              }
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var signup =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, firstName, login, password, role;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, firstName = _req$body2.firstName, login = _req$body2.login, password = _req$body2.password, role = _req$body2.role;
            _context2.next = 3;
            return _models.User.findOrCreate({
              where: {
                email: login
              },
              defaults: {
                firstName: firstName,
                role: role,
                email: login,
                phone: login,
                password: password
              }
            }).then(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                  user = _ref4[0],
                  created = _ref4[1];

              if (!created) {
                return res.status(409).send({
                  error: 'Email already in use'
                });
              }

              var token = _Authorization.default.generateToken(user);

              return res.status(200).json({
                message: 'User created',
                data: {
                  user: user,
                  token: token
                }
              });
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signup(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var update =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body3, firstName, bussinesName, address, lat, lng, phone, authUser;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body, firstName = _req$body3.firstName, bussinesName = _req$body3.bussinesName, address = _req$body3.address, lat = _req$body3.lat, lng = _req$body3.lng, phone = _req$body3.phone;
            authUser = req.authUser;
            _context3.next = 4;
            return authUser.update({
              firstName: firstName,
              bussinesName: bussinesName,
              address: address,
              lat: lat,
              lng: lng,
              phone: phone
            }).then(function (user) {
              return res.status(200).json({
                user: user,
                message: 'User succesfully updated'
              });
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function update(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

var _default = {
  login: login,
  signup: signup,
  update: update
};
exports.default = _default;