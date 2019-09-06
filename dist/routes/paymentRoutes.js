"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _PaymentController = _interopRequireDefault(require("../controllers/PaymentController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paymentRoutes = _express.default.Router();

paymentRoutes.get('/createCustomer', _PaymentController.default.createCustomer);
paymentRoutes.post('/createCutomerToken', _PaymentController.default.createCutomerToken);
paymentRoutes.get('/customerSources/:customerId', _PaymentController.default.customerSources);
var _default = paymentRoutes;
exports.default = _default;