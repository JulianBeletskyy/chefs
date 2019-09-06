"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _sequelize = require("sequelize");

var _upload = _interopRequireDefault(require("../services/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getMeals =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var authUser, meals;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authUser = req.authUser;
            _context.next = 3;
            return authUser.getMeals({
              attributes: ['mealId', 'name', 'price', 'imgUrl', 'description', 'ingredients', 'weight']
            });

          case 3:
            meals = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              meals: meals
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getMeals(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var create =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, name, price, description, ingredients, weight, file, authUser, imgUrl;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, price = _req$body.price, description = _req$body.description, ingredients = _req$body.ingredients, weight = _req$body.weight;
            file = req.file, authUser = req.authUser;
            imgUrl = '';

            if (file) {
              imgUrl = (0, _upload.default)(file, 'meals');
            }

            _context2.next = 6;
            return _models.Meal.create({
              userId: authUser.userId,
              name: name,
              price: parseFloat(price),
              description: description,
              ingredients: ingredients,
              weight: weight,
              imgUrl: imgUrl
            }).then(function (meal) {
              if (!meal) {
                return res.status(409).send({
                  error: 'Some error'
                });
              }

              return res.status(200).json({
                meal: meal
              });
            }).catch(function (error) {
              console.log(error);
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function create(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var update =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var mealId, file, authUser, _req$body2, name, price, description, ingredients, weight, imgUrl, newImgUrl;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            mealId = req.params.mealId;
            file = req.file, authUser = req.authUser;
            _req$body2 = req.body, name = _req$body2.name, price = _req$body2.price, description = _req$body2.description, ingredients = _req$body2.ingredients, weight = _req$body2.weight, imgUrl = _req$body2.imgUrl;
            newImgUrl = '';

            if (file) {
              newImgUrl = (0, _upload.default)(file, 'meals');
            }

            _context3.next = 7;
            return _models.Meal.findByPk(mealId).then(function (meal) {
              meal.update({
                name: name,
                price: price,
                description: description,
                ingredients: ingredients,
                weight: weight,
                imgUrl: newImgUrl || imgUrl.replace('http://localhost:3001/', '')
              }).then(function (meal) {
                return res.status(200).json({
                  meal: meal
                });
              }).catch(function (error) {
                console.log(error);
              });
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function update(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  create: create,
  update: update,
  getMeals: getMeals
};
exports.default = _default;