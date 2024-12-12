const { logger } = require('../utils/logger.js');

class ReplyStorage {
  constructor() {
    this.replies = new Set();
    this.usedReplies = new Set();
  }

  addReply(reply) {
    this.replies.add(reply);
  }

  getUniqueReply() {
    const availableReplies = [...this.replies].filter(reply => 
      !this.usedReplies.has(reply)
    );
    
    if (availableReplies.length === 0) {
      logger.info('Resetting used replies pool');
      this.usedReplies.clear();
      return this.getUniqueReply();
    }

    const reply = availableReplies[Math.floor(Math.random() * availableReplies.length)];
    this.usedReplies.add(reply);
    logger.debug(`Selected reply: ${reply.substring(0, 50)}...`);
    return reply;
  }

  getReplyCount() {
    return this.replies.size;
  }

  clearUsedReplies() {
    this.usedReplies.clear();
  }
}

module.exports = { ReplyStorage };
