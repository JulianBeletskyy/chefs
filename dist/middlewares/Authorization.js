"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = require("../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var errors = {
  "401": "Unauthorized",
  "403": "You are not authorized to perform this action",
  "404": "Item Not Found",
  "500": "Internal Server Error"
};

var Authorization =
/*#__PURE__*/
function () {
  function Authorization(type) {
    _classCallCheck(this, Authorization);

    this.type = type;
    this.authRole = this.authRole.bind(this);
  }

  _createClass(Authorization, [{
    key: "authRole",
    value: function authRole(req, res, next) {
      if (!this.type.includes(req.authUser.role)) {
        return res.status(403).json({
          error: errors['403']
        });
      }

      next();
    }
  }, {
    key: "authorize",
    value: function authorize(req, res, next) {
      var token = Authorization.getToken(req);
      if (!token) return res.status(401).json({
        error: errors['401']
      });

      _jsonwebtoken.default.verify(token, process.env.SECRET,
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(err, decoded) {
          var user;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!err) {
                    _context.next = 4;
                    break;
                  }

                  if (!(err.name === 'TokenExpiredError')) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt("return", res.status(401).json({
                    error: 'User authorization token is expired'
                  }));

                case 3:
                  return _context.abrupt("return", res.status(401).json({
                    error: 'Failed to authenticate token'
                  }));

                case 4:
                  _context.next = 6;
                  return _models.User.findByPk(decoded.id);

                case 6:
                  user = _context.sent;

                  if (user) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt("return", res.status(401).json({
                    error: errors['401']
                  }));

                case 9:
                  req.authUser = user;
                  return _context.abrupt("return", next());

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }], [{
    key: "getToken",
    value: function getToken(req) {
      var bearerToken = req.headers.authorization;
      var token = bearerToken && bearerToken.replace('Bearer ', '');
      return token;
    }
  }, {
    key: "generateToken",
    value: function generateToken(user) {
      var token = _jsonwebtoken.default.sign({
        id: user.userId,
        role: user.role
      }, process.env.SECRET, {
        expiresIn: 172800
      });

      return token;
    }
  }, {
    key: "refreshToken",
    value: function () {
      var _refreshToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var token, _jwt$verify, id, user, newToken;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Authorization.getToken(req);

              case 2:
                token = _context2.sent;
                _jwt$verify = _jsonwebtoken.default.verify(token, process.env.SECRET), id = _jwt$verify.id;
                _context2.next = 6;
                return _models.User.findByPk(id);

              case 6:
                user = _context2.sent;

                if (user) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", res.status(401).json({
                  message: 'Invalid token'
                }));

              case 9:
                newToken = Authorization.generateToken(user);
                return _context2.abrupt("return", res.status(200).json({
                  user: user,
                  token: newToken
                }));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function refreshToken(_x3, _x4) {
        return _refreshToken.apply(this, arguments);
      }

      return refreshToken;
    }()
  }]);

  return Authorization;
}();

var _default = Authorization;
exports.default = _default;