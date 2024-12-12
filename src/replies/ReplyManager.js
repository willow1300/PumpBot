const { getAllReplies } = require('./scraper.js');
const { ReplyStorage } = require('./storage.js');
const { validateReply } = require('./validator.js');
const { logger } = require('../utils/logger.js');

class ReplyManager {
  constructor() {
    this.storage = new ReplyStorage();
  }

  async initialize() {
    try {
      await this.scrapeReplies();
      logger.info('Reply manager initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize reply manager:', error);
      throw error;
    }
  }

  async scrapeReplies() {
    try {
      const replies = await getAllReplies();
      replies.forEach(reply => {
        if (validateReply(reply)) {
          this.storage.addReply(reply);
        }
      });
      logger.info(`Loaded ${this.storage.getReplyCount()} valid replies`);
    } catch (error) {
      logger.error('Failed to scrape replies:', error);
      throw error;
    }
  }

  async getUniqueReply() {
    return this.storage.getUniqueReply();
  }
}

module.exports = { ReplyManager };
