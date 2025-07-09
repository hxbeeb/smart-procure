
# MongoDB Atlas connection

from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import os
import re  # Import the regular expression module
import pymongo  # Import pymongo for MongoDB interaction
from bson import ObjectId
from datetime import datetime  # Import datetime for timestamp
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# MongoDB Atlas connection
MONGO_URI = os.getenv("MONGODB_URL")
client = pymongo.MongoClient(MONGO_URI)
db = client['flipkartnew']  # Use the default database specified in the URI
collection = db['flipkart_products']  # Name of the collection to store data

# Custom JSON encoder to handle MongoDB's ObjectId
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)  # Convert ObjectId to string
        return super().default(obj)

def run_flipkart_scraper(search_query):
    """Scrapes Flipkart for a specific search query and saves data to a JSON file and MongoDB."""
    data = []
    driver = webdriver.Chrome()  # Ensure ChromeDriver is set up correctly
    try:
        driver.get('https://www.flipkart.com')

        # Close the login popup
        try:
            close_button = driver.find_element(By.XPATH, '//button[text()="✕"]')
            close_button.click()
        except Exception as e:
            print("No login popup found or failed to close it.")

        # Perform a search query on Flipkart
        search_box = driver.find_element(By.CLASS_NAME, 'Pke_EE')
        search_box.send_keys(search_query)
        search_box.submit()

        # Wait for results to load
        driver.implicitly_wait(5)

        # Define the possible structures to handle
        possible_structures = [
            '.slAVV4',
            '.cPHDOP',  # First structure  # Second structure
        ]

        # Iterate through each structure
        for structure in possible_structures:
            for item in driver.find_elements(By.CSS_SELECTOR, structure)[:10]:
                try:
                    # Try to extract data using the first set of classes
                    try:
                        title = item.find_element(By.CLASS_NAME, "wjcEIp").text
                        price = item.find_element(By.CLASS_NAME, "Nx9bqj").text
                        rating = item.find_element(By.CLASS_NAME, "XQDdHH").text
                        url = item.find_element(By.CLASS_NAME, "wjcEIp").get_attribute('href')
                    except Exception:
                        # If the first set fails, fall back to alternative classes
                        title = item.find_element(By.CSS_SELECTOR, '.KzDlHZ').text
                        price = item.find_element(By.CSS_SELECTOR, '._4b5DiR').text
                        rating = item.find_element(By.CSS_SELECTOR, '.XQDdHH').text
                        url = item.find_element(By.CSS_SELECTOR, 'a.CGtC98').get_attribute('href')

                    # Clean the price to remove currency symbols and commas
                    price = re.sub(r'[^\d.]', '', price)  # Remove non-numeric characters except the dot
                    price = float(price)  # Convert the price to float

                    # Get the current timestamp
                    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                    # Prepare the data dictionary with the timestamp field
                    product_data = {
                        'title': title,
                        'price': price,
                        'rating': rating or "No rating available",  # Handle missing rating
                        'source': 'Flipkart',
                        'url': url,
                        'timestamp': timestamp  # Add timestamp to the product data
                    }

                    # Append the scraped data to the list
                    data.append(product_data)

                    # Save to MongoDB
                    collection.insert_one(product_data)

                except Exception as e:
                    print(f"Error scraping item in structure {structure}: {e}")

    except Exception as e:
        print(f"Error scraping Flipkart: {e}")
    finally:
        driver.quit()

    # Save data to JSON
    output_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'flipkart.json')
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4, cls=CustomJSONEncoder)  # Use custom encoder


# Example usage
if __name__ == "__main__":
    search_query = input("Enter your search query: ")
    run_flipkart_scraper(search_query)
