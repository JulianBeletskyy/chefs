"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = exports.socketClient = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

var _cors = _interopRequireDefault(require("cors"));

var _socket = _interopRequireDefault(require("socket.io"));

var _http = _interopRequireDefault(require("http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)()); // app.use(pino);

var socketClient = null;
exports.socketClient = socketClient;
app.use('/api/v1', _routes.default);

var server = _http.default.createServer(app);

app.listen(3001, function () {
  console.log('Express server is running on localhost:3001');
});
server.listen(6001, function () {
  console.log('Socket listen on localhost:6001');
});

var dir = _path.default.join(__dirname, '../static');

var mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
};
app.get('/image/*', function (req, res, next) {
  var file = _path.default.join(dir, req.path.replace(/\/$/, '')).replace('image', 'uploads');

  if (file.indexOf(dir + _path.default.sep) !== 0) {
    return res.status(403).end('Forbidden');
  }

  var type = mime[_path.default.extname(file).slice(1)] || 'text/plain';

  var s = _fs.default.createReadStream(file);

  s.on('open', function () {
    res.set('Content-Type', type);
    s.pipe(res);
  });
  s.on('error', function () {
    res.set('Content-Type', 'text/plain');
    res.status(404).end('Not found');
  });
});
app.use(_express.default.static(_path.default.join(__dirname, '../build')));
app.get('/*',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.sendFile(_path.default.join(__dirname, '../build', 'index.html'));

          case 1:
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

var io = _socket.default.listen(server);

exports.io = io;
io.on('connection', function (socket) {
  // console.log('user connect')
  var token = socket.handshake.query.token;

  var _jwt$verify = _jsonwebtoken.default.verify(token, process.env.SECRET),
      id = _jwt$verify.id,
      role = _jwt$verify.role;

  socket.join(id);
  socket.join("".concat(role, "s")); // socketClient = socket

  socket.on('disconnect', function () {
    console.log('user disconnect');
  });
});