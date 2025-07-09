# # scraper.py

# import pandas as pd
# import time
# import logging
# import os
# import random
# import json
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.chrome.options import Options
# from webdriver_manager.chrome import ChromeDriverManager  # Automatically manages Chromedriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC

# # ---------------------------- Configuration ---------------------------- #

# # Log File Path
# LOG_FILE = os.path.join("logs", "scraper.log")

# # Create logs directory if it doesn't exist
# os.makedirs("logs", exist_ok=True)

# # ---------------------------- Logging Setup ---------------------------- #

# logging.basicConfig(
#     filename=LOG_FILE,
#     level=logging.INFO,
#     format='%(asctime)s %(levelname)s:%(message)s'
# )


# # ---------------------------- Selenium Setup ---------------------------- #

# def init_driver():
#     """Initialize and return a Selenium WebDriver with desired options."""
#     chrome_options = Options()
#     chrome_options.add_argument("--headless")  # Run in headless mode
#     chrome_options.add_argument("--disable-gpu")
#     chrome_options.add_argument("--no-sandbox")
#     chrome_options.add_argument("--window-size=1920,1080")
#     chrome_options.add_argument("--disable-infobars")
#     chrome_options.add_argument("--disable-extensions")

#     # Randomize user-agent to mimic different browsers
#     user_agents = [
#         'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
#         ' Chrome/92.0.4515.159 Safari/537.36',
#         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)'
#         ' Version/14.0.3 Safari/605.1.15',
#         'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)'
#         ' Chrome/88.0.4324.150 Safari/537.36',
#         # Add more user agents as needed
#     ]
#     chrome_options.add_argument(f"user-agent={random.choice(user_agents)}")

#     # Initialize WebDriver using webdriver-manager for automatic driver management
#     driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
#     return driver


# # ---------------------------- Scraping Functions ---------------------------- #

# def scrape_indiamart(url):
#     """Scrape supplier details and their products from the given IndiaMART URL."""
#     suppliers_data = []

#     try:
#         driver = init_driver()
#         driver.get(url)
#         logging.info(f"Navigated to IndiaMART URL: {url}")

#         # Wait for the main content to load
#         wait = WebDriverWait(driver, 20)
#         content = wait.until(EC.presence_of_element_located((By.ID, "lay-lft")))
#         logging.info("IndiaMART main content loaded.")

#         # Scroll down to load dynamic content (if any)
#         driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
#         time.sleep(random.uniform(2, 4))  # Random sleep to mimic human behavior

#         # Locate supplier elements
#         suppliers = content.find_elements(By.CLASS_NAME, "lst_cl")
#         logging.info(f"Found {len(suppliers)} suppliers on the IndiaMART page.")

#         for supplier in suppliers:
#             try:
#                 # Extract Supplier Details
#                 company_name = supplier.find_element(By.CLASS_NAME, "lcname").text.strip()
#             except Exception:
#                 company_name = None

#             try:
#                 address = supplier.find_element(By.CLASS_NAME, "clg").text.strip()
#             except Exception:
#                 address = None

#             try:
#                 precise_address = supplier.find_element(By.CLASS_NAME, "to-txt").text.strip()
#             except Exception:
#                 precise_address = None

#             try:
#                 phone_no = supplier.find_element(By.CSS_SELECTOR, ".bo.color").text.strip()
#             except Exception:
#                 phone_no = None

#             # Extract Products
#             products = []
#             try:
#                 # Locate all product containers within the supplier
#                 product_containers = supplier.find_elements(By.CSS_SELECTOR, "div.cln-3.inner.smprd")
#                 for product in product_containers:
#                     try:
#                         product_name = product.find_element(By.CSS_SELECTOR, "a.smTle.elps").text.strip()
#                     except Exception:
#                         product_name = None

#                     try:
#                         product_href = product.find_element(By.CSS_SELECTOR, "a.smTle.elps").get_attribute("href")
#                     except Exception:
#                         product_href = None

#                     try:
#                         price = product.find_element(By.CLASS_NAME, "gtqte").text.strip()
#                     except Exception:
#                         price = None

#                     products.append({
#                         'Product Name': product_name,
#                         'Product Link': product_href,
#                         'Price': price
#                     })
#             except Exception:
#                 pass  # If no products found, leave the list empty

#             suppliers_data.append({
#                 'Company': company_name,
#                 'Address': address,
#                 'Precise Address': precise_address,
#                 'Phone No': phone_no,
#                 'Products': products
#             })

#         logging.info("Successfully scraped IndiaMART supplier and product data.")

#     except Exception as e:
#         logging.error(f"An error occurred during IndiaMART scraping: {e}")

#     finally:
#         driver.quit()
#         logging.info("WebDriver closed after IndiaMART scraping.")

#     return suppliers_data


# def scrape_tradeindia(url):
#     """Scrape product details from the given TradeIndia URL."""
#     products_data = []

#     try:
#         driver = init_driver()
#         driver.get(url)
#         logging.info(f"Navigated to TradeIndia URL: {url}")

#         # Wait for the main content to load
#         wait = WebDriverWait(driver, 20)
#         content = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "main-padding")))
#         logging.info("TradeIndia main content loaded.")

#         # Scroll down to load dynamic content (if any)
#         driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
#         time.sleep(random.uniform(2, 4))  # Random sleep to mimic human behavior

#         # Locate product elements
#         product_containers = content.find_elements(By.CSS_SELECTOR, "div.sc-8388dd96-0.coeyzE")
#         logging.info(f"Found {len(product_containers)} products on the TradeIndia page.")

#         for product in product_containers:
#             try:
#                 # Extract Product Name
#                 product_name = product.find_element(By.CSS_SELECTOR, "p.sc-39506017-0.VsvSi").text.strip()
#             except Exception:
#                 product_name = None

#             try:
#                 # Extract Product Link
#                 product_link = product.find_element(By.TAG_NAME, "a").get_attribute("href")
#             except Exception:
#                 product_link = None

#             products_data.append({
#                 'Product Name': product_name,
#                 'Product Link': product_link
#             })

#         logging.info("Successfully scraped TradeIndia product data.")

#     except Exception as e:
#         logging.error(f"An error occurred during TradeIndia scraping: {e}")

#     finally:
#         driver.quit()
#         logging.info("WebDriver closed after TradeIndia scraping.")

#     return products_data



import pandas as pd
import time
import logging
import os
import random
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager  # Automatically manages Chromedriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pymongo import MongoClient  # Import MongoDB client
import re
from dotenv import load_dotenv

# ---------------------------- Configuration ---------------------------- #

# Log File Path
LOG_FILE = os.path.join("logs", "scraper.log")

# Create logs directory if it doesn't exist
os.makedirs("logs", exist_ok=True)

# Load environment variables from .env file
load_dotenv()

# MongoDB Client Setup (Replace with your actual MongoDB URI)
MONGO_URI = os.getenv("MONGODB_URL")
client = MongoClient(MONGO_URI)
db = client["indiamart_scraper"]  # Database name
collection = db["products"]  # Collection name where data will be stored

# ---------------------------- Logging Setup ---------------------------- #

logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format='%(asctime)s %(levelname)s:%(message)s'
)


# ---------------------------- Selenium Setup ---------------------------- #

def init_driver():
    """Initialize and return a Selenium WebDriver with desired options."""
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--disable-infobars")
    chrome_options.add_argument("--disable-extensions")

    # Randomize user-agent to mimic different browsers
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
    ]
    chrome_options.add_argument(f"user-agent={random.choice(user_agents)}")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    return driver


# ---------------------------- Helper Functions ---------------------------- #

def extract_clean_price(price_str):
    """Extracts and cleans the numeric value from a price string."""
    clean_price = re.sub(r'[^\d]', '', price_str)  # Remove non-numeric characters
    return int(clean_price) if clean_price else None


def save_to_mongodb(data):
    """Save the scraped data to MongoDB."""
    try:
        if data:
            collection.insert_many(data)
            logging.info(f"Inserted {len(data)} records into MongoDB.")
    except Exception as e:
        logging.error(f"Error inserting data into MongoDB: {e}")


# ---------------------------- Scraping Function ---------------------------- #

def run_indiamart_scraper(search_query):
    """Scrapes IndiaMart for a specific search query and saves data to MongoDB."""
    data = []
    driver = init_driver()  # Initialize the WebDriver
    try:
        driver.get('https://www.indiamart.com')

        # Perform a search query on IndiaMart
        search_box = driver.find_element(By.ID, 'search_string')
        search_box.send_keys(search_query)
        search_box.submit()

        # Wait for the results to load
        time.sleep(5)  # Wait for results to load, adjust as needed

        # Scrape product information from search results
        for item in driver.find_elements(By.CSS_SELECTOR, '.card.brs5'):
            try:
                # Extract title
                title = item.find_element(By.CSS_SELECTOR, '.producttitle a').text

                # Extract price
                price_element = item.find_element(By.CSS_SELECTOR, '.price')
                price = price_element.text if price_element else "Price not available"
                clean_price = extract_clean_price(price)

                # Extract rating (if available)
                rating_element = item.find_element(By.CSS_SELECTOR, '.ratings')
                rating = rating_element.text if rating_element else "No rating available"

                # Prepare data dictionary
                product_data = {
                    "title": title,
                    "price": clean_price,
                    "rating": rating,
                    "source": "IndiaMart",
                    "search_query": search_query,
                    "timestamp": time.time()  # Add timestamp for record tracking
                }

                # Append to data list
                data.append(product_data)

            except Exception as e:
                logging.error(f"Error processing item: {e}")

        # Save data to MongoDB
        save_to_mongodb(data)

    except Exception as e:
        logging.error(f"Error during scraping: {e}")
    finally:
        driver.quit()  # Close the driver after scraping


# ---------------------------- Main Execution ---------------------------- #

if __name__ == "__main__":
    # Search queries can be adjusted based on the data you're interested in
    search_query = "laptop"
    run_indiamart_scraper(search_query)

    logging.info(f"Scraping for query '{search_query}' completed.")
