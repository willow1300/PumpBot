"use strict";

var _require = require('../utils/logger.js'),
  logger = _require.logger;
function validateReply(reply) {
  if (!reply || typeof reply !== 'string') {
    logger.debug('Invalid reply: not a string');
    return false;
  }

  // Minimum length check
  if (reply.length < 10) {
    logger.debug('Invalid reply: too short');
    return false;
  }

  // Check for spam patterns
  if (/(.)\1{4,}/.test(reply)) {
    logger.debug('Invalid reply: spam pattern detected');
    return false;
  }

  // Check for excessive URLs
  var urlCount = (reply.match(/https?:\/\//g) || []).length;
  if (urlCount > 2) {
    logger.debug('Invalid reply: too many URLs');
    return false;
  }

  // Check for maximum length
  if (reply.length > 500) {
    logger.debug('Invalid reply: too long');
    return false;
  }

  // Check for common spam words
  var spamWords = ['buy now', 'click here', 'limited time', 'act now'];
  if (spamWords.some(function (word) {
    return reply.toLowerCase().includes(word);
  })) {
    logger.debug('Invalid reply: contains spam words');
    return false;
  }
  return true;
}
module.exports = {
  validateReply: validateReply
};