"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var puppeteer = require('puppeteer');
var fs = require('fs');
var readline = require('readline');
var _require = require('uuid'),
  uuidv4 = _require.v4; // Import uuid for generating keys
var _require2 = require('../replies/ReplyManager'),
  ReplyManager = _require2.ReplyManager; // Import ReplyManager

var cookiesPath = 'D:/webProjects/BOT/cookies.json';
var TRIAL_FILE = 'trial_info.json';
var PRIVATE_KEY = 'myFisrtAndLastEnd1300';
var LICENSE_KEY = '24f03d3a-c0f1-44c3-a6e3-696d1ff3b98b'; // Generate a new UUID as the license key
var TRIAL_DURATION = 10 * 60 * 1000; // 10 minutes

// Validate License Key Function
function validateLicenseKey() {
  var licenseData = {
    info: {
      name: 'User Name',
      email: 'user@example.com',
      trial: '10-minutes' // Trial information
    },
    prodCode: 'BOT123',
    appVersion: '1.0'
  };
  console.log('Validating License Key...');
  try {
    // Check if the license key is valid (UUID format)
    if (!validateLicense(LICENSE_KEY)) {
      throw new Error('Invalid license key. Please contact support.');
    }
    console.log('License validation result: Valid');
  } catch (error) {
    console.error('License validation failed:', error.message);
    process.exit(1);
  }
}

// Simple License Validation (UUID check)
function validateLicense(licenseKey) {
  // Check if the license key is a valid UUID
  return licenseKey && licenseKey.length === 36; // Check UUID format (length of UUID is 36)
}
function isTrialValid() {
  if (!fs.existsSync(TRIAL_FILE)) {
    // First time running: create trial file
    fs.writeFileSync(TRIAL_FILE, JSON.stringify({
      startTime: Date.now()
    }));
    return true;
  }
  var trialData = JSON.parse(fs.readFileSync(TRIAL_FILE));
  var startTime = trialData.startTime;
  var currentTime = Date.now();
  return currentTime - startTime <= TRIAL_DURATION;
}
function waitForUserConfirmation(_x) {
  return _waitForUserConfirmation.apply(this, arguments);
}
function _waitForUserConfirmation() {
  _waitForUserConfirmation = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(message) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve) {
            var rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout
            });
            rl.question("".concat(message, " Press Enter to continue..."), function () {
              rl.close();
              resolve();
            });
          }));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _waitForUserConfirmation.apply(this, arguments);
}
function saveCookies(_x2) {
  return _saveCookies.apply(this, arguments);
}
function _saveCookies() {
  _saveCookies = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(page) {
    var cookies;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return page.cookies();
        case 2:
          cookies = _context3.sent;
          fs.writeFileSync(cookiesPath, JSON.stringify(cookies, null, 2));
          console.log('Cookies saved successfully.');
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _saveCookies.apply(this, arguments);
}
function loadCookies(_x3) {
  return _loadCookies.apply(this, arguments);
}
function _loadCookies() {
  _loadCookies = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(page) {
    var cookiesData, cookies;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!fs.existsSync(cookiesPath)) {
            _context4.next = 7;
            break;
          }
          cookiesData = fs.readFileSync(cookiesPath, 'utf-8');
          if (!cookiesData.trim()) {
            _context4.next = 7;
            break;
          }
          cookies = JSON.parse(cookiesData);
          _context4.next = 6;
          return page.setCookie.apply(page, _toConsumableArray(cookies));
        case 6:
          console.log('Cookies loaded successfully.');
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _loadCookies.apply(this, arguments);
}
function deleteCookies() {
  return _deleteCookies.apply(this, arguments);
}
function _deleteCookies() {
  _deleteCookies = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          try {
            if (fs.existsSync(cookiesPath)) {
              fs.unlinkSync(cookiesPath);
              console.log('Cookies deleted successfully.');
            }
          } catch (error) {
            console.error('Error deleting cookies:', error.message);
          }
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _deleteCookies.apply(this, arguments);
}
function navigateToTokenPage(_x4, _x5) {
  return _navigateToTokenPage.apply(this, arguments);
}
function _navigateToTokenPage() {
  _navigateToTokenPage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(page, tokenAddress) {
    var tokenPageUrl;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          tokenPageUrl = "https://pump.fun/coin/".concat(tokenAddress);
          console.log("Navigating to: ".concat(tokenPageUrl));
          _context6.next = 4;
          return page["goto"](tokenPageUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 120000
          });
        case 4:
          console.log('Page loaded successfully!');
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _navigateToTokenPage.apply(this, arguments);
}
function postComment(_x6, _x7) {
  return _postComment.apply(this, arguments);
}
function _postComment() {
  _postComment = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(page, commentText) {
    var postButtonSelector, cardViewSelector, commentInputSelector, submitButtonXPath, postButton, submitButton, isDisabled;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          postButtonSelector = 'div.flex.items-center.mb-4.md\\:mb-1.mt-1 > div';
          cardViewSelector = '[role="dialog"][data-state="open"]';
          commentInputSelector = '#text';
          submitButtonXPath = '//*[@id="radix-:r3f:"]/button | //button[contains(@class, "bg-green-400") and contains(text(), "post reply")]';
          console.log('Waiting for the "Post a reply" button...');
          _context7.next = 8;
          return page.waitForSelector(postButtonSelector, {
            timeout: 60000
          });
        case 8:
          postButton = _context7.sent;
          if (postButton) {
            _context7.next = 11;
            break;
          }
          throw new Error("Post button not found for selector: ".concat(postButtonSelector));
        case 11:
          console.log('Clicking the "Post a reply" button...');
          _context7.next = 14;
          return postButton.click();
        case 14:
          console.log('Waiting for the card view (dialog) to appear...');
          _context7.next = 17;
          return page.waitForSelector(cardViewSelector, {
            timeout: 60000
          });
        case 17:
          console.log('Card view with text area and submit button is now visible.');
          console.log('Waiting for the comment input field...');
          _context7.next = 21;
          return page.waitForSelector(commentInputSelector, {
            timeout: 30000
          });
        case 21:
          console.log('Comment input field is now visible.');
          console.log('Typing comment...');
          _context7.next = 25;
          return page.type(commentInputSelector, commentText, {
            delay: 100
          });
        case 25:
          console.log('Waiting for the submit button to become enabled...');
          _context7.next = 28;
          return page.evaluateHandle(function (xpath) {
            var result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return result;
          }, submitButtonXPath);
        case 28:
          submitButton = _context7.sent;
          _context7.next = 31;
          return submitButton.evaluate(function (el) {
            return el.hasAttribute('disabled');
          });
        case 31:
          isDisabled = _context7.sent;
          if (isDisabled) {
            _context7.next = 38;
            break;
          }
          console.log('Submit button is enabled, clicking...');
          _context7.next = 36;
          return submitButton.click();
        case 36:
          _context7.next = 39;
          break;
        case 38:
          console.error('Submit button is still disabled');
        case 39:
          console.log('Comment posted successfully!');
          _context7.next = 45;
          break;
        case 42:
          _context7.prev = 42;
          _context7.t0 = _context7["catch"](0);
          console.error('Error posting comment:', _context7.t0.message);
        case 45:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 42]]);
  }));
  return _postComment.apply(this, arguments);
}
function main() {
  return _main.apply(this, arguments);
} // Invoke main
function _main() {
  _main = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
    var browser, page, replyManager, rl, tokenAddress, commentCount;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          console.log("Starting the bot...");

          // Validate license or trial
          if (!isTrialValid()) {
            console.error('Trial period expired. Please contact support for a valid license.');
            process.exit(1);
          }
          validateLicenseKey();
          _context9.next = 5;
          return puppeteer.launch({
            headless: false
          });
        case 5:
          browser = _context9.sent;
          console.log("Browser launched.");
          _context9.next = 9;
          return browser.newPage();
        case 9:
          page = _context9.sent;
          console.log("Navigating to Pump.fun...");
          _context9.next = 13;
          return page["goto"]('https://pump.fun', {
            waitUntil: 'domcontentloaded',
            timeout: 120000
          });
        case 13:
          _context9.next = 15;
          return loadCookies(page);
        case 15:
          if (fs.existsSync(cookiesPath)) {
            _context9.next = 21;
            break;
          }
          console.log('Please log in manually in the browser.');
          _context9.next = 19;
          return waitForUserConfirmation('Login complete?');
        case 19:
          _context9.next = 21;
          return saveCookies(page);
        case 21:
          replyManager = new ReplyManager();
          _context9.next = 24;
          return replyManager.initialize();
        case 24:
          rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          tokenAddress = '';
          commentCount = null;
          console.log("Waiting for token address and comment count...");
          rl.on('line', /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(input) {
              var i, commentText;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    input = input.trim();
                    if (!(input === 'delete_cookies')) {
                      _context8.next = 18;
                      break;
                    }
                    _context8.prev = 2;
                    _context8.next = 5;
                    return deleteCookies();
                  case 5:
                    console.log("Cookies deletion confirmed.");
                    _context8.next = 11;
                    break;
                  case 8:
                    _context8.prev = 8;
                    _context8.t0 = _context8["catch"](2);
                    console.error("Error during cookie deletion:", _context8.t0.message);
                  case 11:
                    console.log("Bot stopping. Cookies cleared.");
                    rl.close();
                    _context8.next = 15;
                    return browser.close();
                  case 15:
                    process.exit(0);
                    _context8.next = 49;
                    break;
                  case 18:
                    if (tokenAddress) {
                      _context8.next = 23;
                      break;
                    }
                    tokenAddress = input;
                    console.log("Token address received: ".concat(tokenAddress));
                    _context8.next = 49;
                    break;
                  case 23:
                    if (!(tokenAddress && commentCount === null)) {
                      _context8.next = 49;
                      break;
                    }
                    commentCount = parseInt(input, 10);
                    if (!(isNaN(commentCount) || commentCount <= 0)) {
                      _context8.next = 30;
                      break;
                    }
                    console.error('Invalid comment count. Please enter a positive number.');
                    commentCount = null;
                    _context8.next = 49;
                    break;
                  case 30:
                    console.log("Comment count received: ".concat(commentCount));
                    rl.close();
                    i = 0;
                  case 33:
                    if (!(i < commentCount)) {
                      _context8.next = 47;
                      break;
                    }
                    _context8.next = 36;
                    return navigateToTokenPage(page, tokenAddress);
                  case 36:
                    _context8.next = 38;
                    return replyManager.getUniqueReply();
                  case 38:
                    commentText = _context8.sent;
                    console.log("Posting comment: ".concat(commentText));
                    _context8.next = 42;
                    return postComment(page, commentText);
                  case 42:
                    _context8.next = 44;
                    return new Promise(function (resolve) {
                      return setTimeout(resolve, 5000);
                    });
                  case 44:
                    i++;
                    _context8.next = 33;
                    break;
                  case 47:
                    console.log("All comments posted successfully.");
                    console.log("Bot session is still active.");
                  case 49:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8, null, [[2, 8]]);
            }));
            return function (_x9) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 29:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _main.apply(this, arguments);
}
main()["catch"](/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(error) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.error("Fatal error:", error.message);
          _context.next = 3;
          return deleteCookies();
        case 3:
          // Ensure cookies are deleted on fatal errors
          process.exit(1);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x8) {
    return _ref.apply(this, arguments);
  };
}());