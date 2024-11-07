// const express = require('express');
// const puppeteer = require('puppeteer');
// const cors = require('cors');

// const app = express();
// const port = 5000;

// app.use(cors());

// // Endpoint to fetch data from eBay
// app.get('/scrape', async (req, res) => {
//   const searchTerm = req.query.search || 'laptop';
//   try {
//     const proxy = 'http://44.227.181.1:3128'; // Example proxy
//     console.log('Using proxy:', proxy);

//     // Launch Puppeteer with the proxy configuration
//     const browser = await puppeteer.launch({
//       headless: true, 
//       // args: [`--proxy-server=${proxy}`] // Uncomment if using proxy
//     });

//     const page = await browser.newPage();
//     await page.setUserAgent(
//       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
//     ); // Set a user agent to avoid detection

//     // Navigate to an eBay product listing page
//     await page.goto(`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(searchTerm)}&_ipg=240`, { 
//       waitUntil: 'domcontentloaded', 
//       timeout: 60000 
//     });

//     // Scrape data from the eBay page
//     const data = await page.evaluate(() => {
//       // Get the page title
//       const pageTitle = document.title;

//       // Get details for each product
//       const products = Array.from(document.querySelectorAll('.s-item')).map(product => ({
//         title: product.querySelector('.s-item__title') ? product.querySelector('.s-item__title').innerText : 'No title',
//         description: product.querySelector('.s-item__subtitle') ? product.querySelector('.s-item__subtitle').innerText : 'No description',
//         image: product.querySelector('.s-item__image-img') ? product.querySelector('.s-item__image-img').src : 'No image',
//         price: product.querySelector('.s-item__price') ? product.querySelector('.s-item__price').innerText : 'No price',
//         ratings: product.querySelector('.x-star-rating') ? product.querySelector('.x-star-rating').innerText : 'No ratings',
//       }));

//       return { pageTitle, products };
//     });

//     await browser.close();

//     // Send the scraped data back as JSON
//     res.json(data);
//   } catch (error) {
//     console.error('Error scraping website:', error);
//     res.status(500).json({ error: 'Failed to scrape website' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });














const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

// Endpoint to fetch data from eBay with a search term passed as a query parameter
app.get('/scrape', async (req, res) => {
  const searchTerm = req.query.search || 'laptop'; // Default to 'laptop' if no search term is provided

  try {
    // const proxy = 'http://44.227.181.1:3128'; // Example proxy
    // console.log('Using proxy:', proxy);

    // Launch Puppeteer with the proxy configuration
    const browser = await puppeteer.launch({
      headless: true, 
      // args: [`--proxy-server=${proxy}`] // Uncomment if using proxy
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    ); // Set a user agent to avoid detection

    // URL with dynamic search term from the query parameter
    const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(searchTerm)}&_ipg=240`;
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });

    // Scrape data from the eBay page
    const data = await page.evaluate(() => {
      // Get the page title
      const pageTitle = document.title;

      // Get details for each product
      const products = Array.from(document.querySelectorAll('.s-item')).map(product => ({
        title: product.querySelector('.s-item__title') ? product.querySelector('.s-item__title').innerText : 'No title',
        description: product.querySelector('.s-item__subtitle') ? product.querySelector('.s-item__subtitle').innerText : 'No description',
        image: product.querySelector('.s-item__image-img') ? product.querySelector('.s-item__image-img').src : 'No image',
        price: product.querySelector('.s-item__price') ? product.querySelector('.s-item__price').innerText : 'No price',
        ratings: product.querySelector('.x-star-rating') ? product.querySelector('.x-star-rating').innerText : 'No ratings',
        link: product.querySelector('.s-item__link') ? product.querySelector('.s-item__link').href : '' // Add the product link
      }));

      return { pageTitle, products };
    });

    await browser.close();

    // Send the scraped data back as JSON
    res.json(data);
  } catch (error) {
    console.error('Error scraping website:', error);
    res.status(500).json({ error: 'Failed to scrape website' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
