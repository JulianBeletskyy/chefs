"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    bussinesName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    role: {
      type: DataTypes.ENUM('client', 'chef', 'admin'),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      defaultValue: ''
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passwordTokenExpiry: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCreate: function beforeCreate(user) {
        return User.hashPassword(user);
      }
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Meal, {
      foreignKey: 'userId',
      as: 'meals'
    });
  };

  User.hashPassword =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(user) {
      var hash;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _bcryptjs.default.hash(user.password, process.env.SALT_ROUNDS * 1);

            case 2:
              hash = _context.sent;
              return _context.abrupt("return", user.setDataValue('password', hash));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return User;
};

exports.default = _default;