"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = function upload(file, dir, callback) {
  dir = _path.default.join("static/uploads/".concat(dir));
  var tempPath = file.path;

  var targetPath = _path.default.join("".concat(dir, "/").concat((0, _v.default)(), ".").concat(_path.default.extname(file.originalname).slice(1)));

  if (!_fs.default.existsSync(dir)) {
    _fs.default.mkdirSync(dir);
  }

  _fs.default.renameSync(tempPath, targetPath);

  return targetPath.replace('static/uploads', 'image');
};

var _default = upload;
exports.default = _default;