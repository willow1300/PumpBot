"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require('../utils/logger.js'),
  logger = _require.logger;
var ReplyStorage = /*#__PURE__*/function () {
  function ReplyStorage() {
    _classCallCheck(this, ReplyStorage);
    this.replies = new Set();
    this.usedReplies = new Set();
  }
  return _createClass(ReplyStorage, [{
    key: "addReply",
    value: function addReply(reply) {
      this.replies.add(reply);
    }
  }, {
    key: "getUniqueReply",
    value: function getUniqueReply() {
      var _this = this;
      var availableReplies = _toConsumableArray(this.replies).filter(function (reply) {
        return !_this.usedReplies.has(reply);
      });
      if (availableReplies.length === 0) {
        logger.info('Resetting used replies pool');
        this.usedReplies.clear();
        return this.getUniqueReply();
      }
      var reply = availableReplies[Math.floor(Math.random() * availableReplies.length)];
      this.usedReplies.add(reply);
      logger.debug("Selected reply: ".concat(reply.substring(0, 50), "..."));
      return reply;
    }
  }, {
    key: "getReplyCount",
    value: function getReplyCount() {
      return this.replies.size;
    }
  }, {
    key: "clearUsedReplies",
    value: function clearUsedReplies() {
      this.usedReplies.clear();
    }
  }]);
}();
module.exports = {
  ReplyStorage: ReplyStorage
};