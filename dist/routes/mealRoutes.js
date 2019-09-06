"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _MealController = _interopRequireDefault(require("../controllers/MealController"));

var _asyncWrapper = _interopRequireDefault(require("./asyncWrapper"));

var _multer = _interopRequireDefault(require("multer"));

var _Authorization = _interopRequireDefault(require("../middlewares/Authorization"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './static/uploads/tmp');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

var upload = (0, _multer.default)({
  storage: storage
});
var Auth = new _Authorization.default(['chef']);

var mealRoutes = _express.default.Router();

mealRoutes.use(Auth.authorize, Auth.authRole);
mealRoutes.get('/', _MealController.default.getMeals);
mealRoutes.post('/', upload.single('imgUrl'), _MealController.default.create);
mealRoutes.post('/:mealId', upload.single('imgUrl'), _MealController.default.update);
var _default = mealRoutes;
exports.default = _default;