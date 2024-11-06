// backend/scraper.js
const cheerio = require('cheerio');
const axios = require('axios');

const scrapePrice = async (query) => {
  const response = await axios.get(`https://example.com/search?q=${query}`);
  const $ = cheerio.load(response.data);
  
  const prices = [];
  $('.price-item').each((i, elem) => {
    prices.push({
      name: $(elem).find('.product-name').text(),
      price: $(elem).find('.product-price').text(),
    });
  });

  return prices;
};

module.exports = { scrapePrice };
