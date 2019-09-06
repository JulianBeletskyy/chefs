"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _Authorization = _interopRequireDefault(require("../middlewares/Authorization"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRoutes = _express.default.Router();

var Auth = new _Authorization.default(['chef', 'client']);
userRoutes.use(Auth.authorize, Auth.authRole);
userRoutes.put('/', _UserController.default.update);
var _default = userRoutes;
exports.default = _default;