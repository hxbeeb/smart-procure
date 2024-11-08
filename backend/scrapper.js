// const express = require('express');
// const puppeteer = require('puppeteer');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();
// const port = 5000;

// app.use(cors());

// // Endpoint to fetch data from eBay with a search term passed as a query parameter
// app.get('/scrape', async (req, res) => {
//   const searchTerm = req.query.search || 'laptop'; // Default to 'laptop' if no search term is provided

//   try {
//     const browser = await puppeteer.launch({
//       headless: true,
//     });

//     const page = await browser.newPage();
//     await page.setUserAgent(
//       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
//     ); // Set a user agent to avoid detection

//     // URL with dynamic search term from the query parameter
//     const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(searchTerm)}&_ipg=240`;
//     await page.goto(url, {
//       waitUntil: 'domcontentloaded',
//       timeout: 60000,
//     });

//     // Scrape product data from the eBay search results page
//     const products = await page.evaluate(() => {
//       return Array.from(document.querySelectorAll('.s-item'))
//         .slice(0, 10) // Limit to 10 products
//         .map(product => ({
//           price: product.querySelector('.s-item__price') ? product.querySelector('.s-item__price').innerText : 'No price',
//           ratings: product.querySelector('.x-star-rating') ? product.querySelector('.x-star-rating').innerText : 'No ratings',
//           link: product.querySelector('.s-item__link') ? product.querySelector('.s-item__link').href : '' // Link to fetch feedback
//         }));
//     });

//     // Array to hold feedback data
//     const feedbacks = [];

//     // Loop over each product link and extract feedback
//     for (let product of products) {
//       const productPage = await browser.newPage();
//       await productPage.goto(product.link, { waitUntil: 'domcontentloaded', timeout: 60000 });

//       // Scrape feedback data from the product page
//       const productFeedbacks = await productPage.evaluate(() => {
//         return Array.from(document.querySelectorAll('.fdbk-container__details__comment'))
//           .slice(0, 10) // Get up to 10 feedbacks per product
//           .map(feedback => feedback.innerText);
//       });

//       feedbacks.push(productFeedbacks[0] || 'No feedback available'); // Add only the first feedback for each product
//       await productPage.close();
//     }

//     await browser.close();

//     // Prepare data to send to the Python server
//     const data = products.map((product, index) => ({
//       price: product.price,
//       ratings: product.ratings,
//       feedback: feedbacks[index]
//     }));

//     // Send data to Python server
//     await axios.post('http://localhost:8000/receive-data', { products: data });

//     res.json({ message: 'Data sent to Python server successfully' });
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
const axios = require('axios');

const app = express();
const port = 5000;

app.use(cors());

// Endpoint to fetch data from eBay with a search term passed as a query parameter
app.get('/scrape', async (req, res) => {
  const searchTerm = req.query.search || 'laptop'; // Default to 'laptop' if no search term is provided

  try {
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    ); // Set a user agent to avoid detection

    // URL with dynamic search term from the query parameter
    const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(searchTerm)}&_ipg=240`;
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // Scrape product data from the eBay search results page
    const products = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.s-item'))
        .slice(0, 10) // Limit to 10 products
        .map(product => ({
          title: product.querySelector('.s-item__title') ? product.querySelector('.s-item__title').innerText : 'No title',
          description: product.querySelector('.s-item__subtitle') ? product.querySelector('.s-item__subtitle').innerText : 'No description',
          image: product.querySelector('.s-item__image-img') ? product.querySelector('.s-item__image-img').src : 'No image',
          price: product.querySelector('.s-item__price') ? product.querySelector('.s-item__price').innerText : 'No price',
          ratings: product.querySelector('.x-star-rating') ? product.querySelector('.x-star-rating').innerText : 'No ratings',
          link: product.querySelector('.s-item__link') ? product.querySelector('.s-item__link').href : '' // Add the product link
        }));
    });

    // Array to hold feedback data
    const feedbacks = [];

    // Loop over each product link and extract feedback
    for (let product of products) {
      const productPage = await browser.newPage();
      await productPage.goto(product.link, { waitUntil: 'domcontentloaded', timeout: 60000 });

      // Scrape feedback data from the product page
      const productFeedbacks = await productPage.evaluate(() => {
        return Array.from(document.querySelectorAll('.fdbk-container__details__comment'))
          .slice(0, 10) // Get up to 10 feedbacks per product
          .map(feedback => feedback.innerText);
      });

      feedbacks.push(productFeedbacks[0] || 'No feedback available'); // Add only the first feedback for each product
      await productPage.close();
    }

    await browser.close();

    // Prepare data to send to the Python server
    const data = products.map((product, index) => ({
      price: product.price,
      ratings: product.ratings,
      feedback: feedbacks[index],
      title: product.title,
      description: product.description,
      image: product.image,
      link: product.link
    }));

    // Send data to Python server for reliability prediction
    // Send data to Python server for reliability prediction
const pythonResponse = await axios.post('http://localhost:8000/receive-data', { products: data });

// Add reliability prediction to each product
const enrichedProducts = data.map((product, index) => ({
  ...product,
  reliability: pythonResponse.data.reliabilities ? pythonResponse.data.reliabilities[index] : 'Not Reliable', // Default to 'Not Reliable' if no response
}));

// Send the enriched data with reliability results to the client
res.json({ products: enrichedProducts });


  } catch (error) {
    console.error('Error scraping website:', error);
    res.status(500).json({ error: 'Failed to scrape website' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
