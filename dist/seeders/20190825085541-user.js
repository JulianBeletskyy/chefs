"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var admin = {
  userId: (0, _v.default)(),
  firstName: 'Admin',
  email: 'admin@chefs.com',
  password: _bcryptjs.default.hashSync(process.env.ADMIN_PASSWORD, process.env.SALT_ROUNDS * 1),
  phone: '0508617135',
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
};
var chef = {
  userId: (0, _v.default)(),
  firstName: 'Chef',
  email: 'chef@chefs.com',
  password: _bcryptjs.default.hashSync(process.env.CHEF_PASSWORD, process.env.SALT_ROUNDS * 1),
  phone: '0508617136',
  role: 'chef',
  createdAt: new Date(),
  updatedAt: new Date()
};
var client = {
  userId: (0, _v.default)(),
  firstName: 'Client',
  email: 'client@chefs.com',
  password: _bcryptjs.default.hashSync(process.env.CLIENT_PASSWORD, process.env.SALT_ROUNDS * 1),
  phone: '0508617137',
  role: 'client',
  createdAt: new Date(),
  updatedAt: new Date()
};
var _default = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [admin, chef, client]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
exports.default = _default;