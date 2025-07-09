import os
from dotenv import load_dotenv
import time
import pymongo
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

load_dotenv()
client = pymongo.MongoClient(os.getenv("MONGODB_URL"))
db = client["sulekha"]  # Name of the database
collection = db["businesses"]  # Name of the collection

# Configure Selenium WebDriver
options = Options()
options.add_argument('--headless')  # Run in headless mode
options.add_argument('--disable-gpu')  # Disable GPU for headless performance
options.add_argument('--no-sandbox')  # Bypass OS security model
options.add_argument('--disable-dev-shm-usage')  # Overcome limited resources in containerized environments

# Initialize WebDriver with WebDriver Manager
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Target URL
url = "https://www.sulekha.com/fire-insurance/hyderabad"

# Open the website
driver.get(url)
time.sleep(5)  # Allow time for the page to load

# Scrape data and insert into MongoDB
try:
    # Find all business cards (adjust the class name as necessary)
    businesses = driver.find_elements(By.CLASS_NAME, 'sk-card')
    
    for business in businesses:
        # Extract business name
        try:
            name = business.find_element(By.CSS_SELECTOR, 'h3.title-xlarge').text
        except:
            name = "N/A"
        
        # Extract address
        try:
            address = business.find_element(By.CSS_SELECTOR, 'div.locality > span').text
        except:
            address = "N/A"
        
        # Extract contact info (phone or email, or both depending on the structure)
        try:
            contact = business.find_element(By.CSS_SELECTOR, 'div.business > div.name a').text
        except:
            contact = "N/A"
        
        # Prepare data to be inserted into MongoDB
        business_data = {
            "name": name,
            "address": address,
            "contact": contact
        }

        # Insert the data into MongoDB
        collection.insert_one(business_data)

        # Print the extracted details (you could save this data to a file or database)
        print(f"Business Name: {name}")
        print(f"Address: {address}")
        print(f"Contact: {contact}")
        print('-' * 50)

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    # Close the Selenium driver
    driver.quit()
