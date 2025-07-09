from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from pymongo import MongoClient
import time
from dotenv import load_dotenv
import os

load_dotenv()
# MongoDB setup
def setup_db():
    # Connect to MongoDB (local or Atlas)
    client = MongoClient(os.getenv("MONGODB_URL"))  # Use MongoDB Atlas connection string from .env
    db = client['google_shopping']  # Create or use the database 'google_shopping'
    collection = db['products']  # Create or use the 'products' collection
    return collection

# Setup Chrome driver
def setup_driver():
    chrome_options = Options()
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--headless')  # Run in headless mode if you don't need a UI
    driver = webdriver.Chrome(options=chrome_options)
    return driver

# Function to insert product data into MongoDB
def insert_product(collection, title, price, shipping, rating, url):
    product = {
        "title": title,
        "price": price,
        "shipping": shipping,
        "rating": rating,
        "url": url
    }
    # Insert the product data into the collection
    collection.insert_one(product)

# Main scraping function
def scrape_google_shopping(search_query):
    driver = setup_driver()
    collection = setup_db()  # Connect to MongoDB

    try:
        base_url = "https://www.google.com/search?tbm=shop&q="
        url = base_url + search_query.replace(' ', '+')
        
        print(f"Searching for: {search_query}")
        driver.get(url)
        
        # Handle potential consent form (if prompted)
        try:
            consent_button = driver.find_element(By.XPATH, '//*[@id="L2AGLb"]')  # Consent button XPATH
            consent_button.click()
            time.sleep(2)
        except NoSuchElementException:
            print("No consent form found.")
        
        # Wait for page to load
        time.sleep(3)
        
        # Collect product elements on the page
        products = driver.find_elements(By.XPATH, '//div[@class="sh-dgr__content"]')

        # Loop through product elements and scrape relevant details
        for product in products:
            try:
                title = product.find_element(By.XPATH, './/h4').text
            except NoSuchElementException:
                title = 'No title available'

            try:
                price = product.find_element(By.XPATH, './/span[@class="a8Pemb OFFNJ"]').text
            except NoSuchElementException:
                price = 'No price available'

            try:
                shipping = product.find_element(By.XPATH, './/span[@class="vKjv4b"]').text
            except NoSuchElementException:
                shipping = 'No shipping info'

            try:
                rating = product.find_element(By.XPATH, './/span[@class="j7vw4e"]/span').text
            except NoSuchElementException:
                rating = 'No rating available'

            # Get the product URL
            url = product.find_element(By.XPATH, './/a').get_attribute('href')

            # Insert the scraped product data into MongoDB
            insert_product(collection, title, price, shipping, rating, url)
            print(f"Inserted product: {title} - {price}")

    except Exception as e:
        print(f"An error occurred: {e}")
    
    finally:
        driver.quit()

# Run the scraper for a specific query
if __name__ == "__main__":
    search_query = input("Enter product to search for: ")
    scrape_google_shopping(search_query)
