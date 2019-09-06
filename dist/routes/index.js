"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _authRoutes = _interopRequireDefault(require("./authRoutes"));

var _userRoutes = _interopRequireDefault(require("./userRoutes"));

var _mealRoutes = _interopRequireDefault(require("./mealRoutes"));

var _paymentRoutes = _interopRequireDefault(require("./paymentRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiRoutes = _express.default.Router();

apiRoutes.get('/v1', function (req, res) {
  return res.status(200).json({
    message: 'Welcome to the API',
    v1: '/api/v1'
  });
});
apiRoutes.use('/auth', _authRoutes.default);
apiRoutes.use('/user', _userRoutes.default);
apiRoutes.use('/meals', _mealRoutes.default);
apiRoutes.use('/payment', _paymentRoutes.default);
var _default = apiRoutes;
exports.default = _default;