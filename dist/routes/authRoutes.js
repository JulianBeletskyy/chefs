"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _asyncWrapper = _interopRequireDefault(require("./asyncWrapper"));

var _Authorization = _interopRequireDefault(require("../middlewares/Authorization"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import authValidation from '../validations/authValidation';
// import ValidationHandler from '../middlewares/ValidationHandler';
// import TrimValues from '../middlewares/TrimValues';
var authRoutes = _express.default.Router(); // const validation = [ValidationHandler.validate, TrimValues.trim, ValidationHandler.isEmptyReq];


authRoutes.post('/login', _UserController.default.login);
authRoutes.post('/signup', _UserController.default.signup);
authRoutes.get('/refreshToken', _Authorization.default.refreshToken); // authRoutes.post('/signup', authValidation.register, validation, asyncWrapper(UserController.register));
// authRoutes.post('/signin', authValidation.login, validation, asyncWrapper(UserController.login));
// authRoutes.post('/forgot_password', authValidation.forgotPassword, validation, asyncWrapper(UserController.forgotPassword));
// authRoutes.post('/reset_password', authValidation.resetPassword, validation, asyncWrapper(UserController.resetPassword));
// authRoutes.get('/refresh_token', Authorization.authorize, asyncWrapper(Authorization.refreshToken));
// authRoutes.post(`/reset_location`, Authorization.authorize, asyncWrapper(UserController.resetLocation));
// authRoutes.get(`/logout`, Authorization.authorize, UserController.logout);

var _default = authRoutes;
exports.default = _default;