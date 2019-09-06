"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dwollaV = _interopRequireDefault(require("dwolla-v2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var client = new _dwollaV.default.Client({
  key: 'Vt4rGcTxdUv2dHhlKtIHprYXNtUgptv1ajDI7tFy73wexcdb6H',
  secret: 'yEVrC7i4OSlVnSvHTIOfGPEjb3eXFb3aJEyiSviiYAFF4mKdUs',
  environment: 'sandbox'
});
var appToken = new client.Token({
  access_token: 'Q0jaHfCkqFFdW1i82FrTUGUxD4bWQYOTBMc2unFfeylE5mlKGo'
});

var createCustomer =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var requestBody;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            requestBody = {
              firstName: 'Jane',
              lastName: 'Merchant',
              email: 'jmerchant@nomail.net'
            };
            _context.next = 3;
            return appToken.post('customers', requestBody).then(function (res) {
              return res.status(200).json({
                data: res
              }); // res.headers.get('location'); // => 'https://api-sandbox.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747'
            }).catch(function (error) {
              return res.status(400).json({
                data: error
              });
            });

          case 3:
            console.log(appToken);
            return _context.abrupt("return", res.status(200).json({
              data: appToken
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createCustomer(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var createCutomerToken =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var customerId, customerUrl;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            customerId = req.body.customerId;
            customerUrl = "https://api-sandbox.dwolla.com/customers/".concat(customerId);
            _context2.next = 4;
            return appToken.post("".concat(customerUrl, "/iav-token")).then(function (result) {
              return res.status(200).json({
                token: result.body.token
              });
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createCutomerToken(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var customerSources =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var customerId, customerUrl;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            customerId = req.params.customerId;
            customerUrl = "https://api-sandbox.dwolla.com/customers/".concat(customerId);
            console.log(customerUrl);
            _context3.next = 5;
            return appToken.get("".concat(customerUrl, "/funding-sources")).then(function (result) {
              // res.body._embedded['funding-sources'][0].name
              return res.status(200).json({
                data: result.body._embedded['funding-sources']
              });
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function customerSources(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  createCustomer: createCustomer,
  createCutomerToken: createCutomerToken,
  customerSources: customerSources
};
exports.default = _default;