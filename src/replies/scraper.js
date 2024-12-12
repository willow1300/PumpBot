const axios = require('axios');
const { load } = require('cheerio');
const { logger } = require('../utils/logger.js');

const SCRAPE_SOURCES = [
  {
    url: 'https://www.reddit.com/r/CryptoCurrency/comments.json',
    selector: 'data.children[*].data.body',
    transform: (text) => text.replace(/\[.*?\]/g, '').trim()
  },
  {
    url: 'https://www.reddit.com/r/NFT/comments.json',
    selector: 'data.children[*].data.body',
    transform: (text) => text.replace(/\[.*?\]/g, '').trim()
  }
];

async function scrapeFromSource(source) {
  try {
    const response = await axios.get(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const replies = [];
    
    if (source.url.includes('reddit')) {
      const comments = response.data.data.children;
      comments.forEach(comment => {
        const text = comment.data.body;
        if (text && typeof text === 'string') {
          replies.push(source.transform(text));
        }
      });
    } else {
      const $ = load(response.data);
      $(source.selector).each((_, element) => {
        const text = $(element).text();
        if (text) {
          replies.push(source.transform(text));
        }
      });
    }

    logger.info(`Scraped ${replies.length} replies from ${source.url}`);
    return replies;
  } catch (error) {
    logger.error(`Failed to scrape from source ${source.url}:`, error);
    return [];
  }
}

async function getAllReplies() {
  const allReplies = [];
  
  for (const source of SCRAPE_SOURCES) {
    try {
      const replies = await scrapeFromSource(source);
      allReplies.push(...replies);
    } catch (error) {
      logger.error(`Failed to get replies from ${source.url}:`, error);
      continue;
    }
  }

  return [...new Set(allReplies)]; // Remove duplicates
}

module.exports = { scrapeFromSource, getAllReplies };
