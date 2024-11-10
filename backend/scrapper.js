import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { createCanvas, loadImage } from 'canvas';

const app = express();
const port = 5000;
app.use(cors());
const model = await cocoSsd.load();
// Set up multer for file upload
const upload = multer({ dest: 'uploads/' });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Endpoint to search by image
app.post('/scrape-image', upload.single('image'), async (req, res) => {
  const imagePath = path.join(__dirname, 'uploads', req.file.filename);

  if (!fs.existsSync(imagePath)) {
    return res.status(400).json({ error: 'Image not found' });
  }

  try {
    // Load the image and create a canvas
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    // Convert the image to a Tensor for TensorFlow.js
    const tensor = tf.browser.fromPixels(canvas);

    // Detect objects in the image using coco-ssd model
    const detectedObjects = await model.detect(tensor);

    const searchTerm = detectedObjects.length > 0 ? detectedObjects[0].class : 'laptop'; // Default to 'laptop' if no object detected
 

    console.log('Detected classe:', searchTerm);

    // Use Puppeteer to scrape eBay based on the search term
    const browser = await puppeteer.launch({ headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // Runs Chrome in a single process.
        '--disable-gpu'
      ],
      executablePath: '/usr/bin/google-chrome-stable' });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(searchTerm)}&_ipg=240`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const data = await page.evaluate(() => {
      const products = Array.from(document.querySelectorAll('.s-item')).map(product => ({
        title: product.querySelector('.s-item__title') ? product.querySelector('.s-item__title').innerText : 'No title',
        description: product.querySelector('.s-item__subtitle') ? product.querySelector('.s-item__subtitle').innerText : 'No description',
        image: product.querySelector('.s-item__image-img') ? product.querySelector('.s-item__image-img').src : 'No image',
        price: product.querySelector('.s-item__price') ? product.querySelector('.s-item__price').innerText : 'No price',
        ratings: product.querySelector('.x-star-rating') ? product.querySelector('.x-star-rating').innerText : 'No ratings',
        link: product.querySelector('.s-item__link') ? product.querySelector('.s-item__link').href : ''
      }));
      return { pageTitle: document.title, products };
    });

    await browser.close();

    // Clean up uploaded image
    fs.unlinkSync(imagePath);

    res.json(data);
  } catch (error) {
    console.error('Error processing image:', error);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath); // Ensure image exists before deleting
    res.status(500).json({ error: 'Failed to process image' });
  }
});



// Endpoint to fetch data from eBay with a search term passed as a query parameter
app.get('/scrape', async (req, res) => {
  const searchTerm = req.query.search || 'laptop'; // Default to 'laptop' if no search term is provided

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    const url = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(searchTerm)}&_ipg=240`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const data = await page.evaluate(() => {
      const pageTitle = document.title;
      const products = Array.from(document.querySelectorAll('.s-item')).map(product => ({
        title: product.querySelector('.s-item__title') ? product.querySelector('.s-item__title').innerText : 'No title',
        description: product.querySelector('.s-item__subtitle') ? product.querySelector('.s-item__subtitle').innerText : 'No description',
        image: product.querySelector('.s-item__image-img') ? product.querySelector('.s-item__image-img').src : 'No image',
        price: product.querySelector('.s-item__price') ? product.querySelector('.s-item__price').innerText : 'No price',
        ratings: product.querySelector('.x-star-rating') ? product.querySelector('.x-star-rating').innerText : 'No ratings',
        link: product.querySelector('.s-item__link') ? product.querySelector('.s-item__link').href : ''
      }));
      return { pageTitle, products };
    });

    await browser.close();

    res.json(data);
  } catch (error) {
    console.error('Error scraping website:', error);
    res.status(500).json({ error: 'Failed to scrape website' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
