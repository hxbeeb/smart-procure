from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import os
import re


def extract_clean_price(price_str):
    """Extracts and cleans the numeric value from a price string."""
    clean_price = re.sub(r'[^\d]', '', price_str)  # Remove non-numeric characters
    return int(clean_price) if clean_price else None


def run_tradeindia_scraper(search_query):
    """Scrapes TradeIndia for a specific search query and saves data to a JSON file."""
    data = []
    driver = webdriver.Chrome()  # Ensure ChromeDriver is set up correctly
    try:
        driver.get('https://www.tradeindia.com/')

        # Perform a search query on TradeIndia
        search_box = driver.find_element(By.CSS_SELECTOR, '.formInput')
        search_box.send_keys(search_query)
        search_box.submit()

        # Wait for the results to load
        driver.implicitly_wait(10)  # Adjust as needed

        # Scrape product information from search results
        for item in driver.find_elements(By.CSS_SELECTOR, 'div.col-md-3.mb-3')[:5]:
            try:
                # Extract product URL
                url = item.find_element(By.CSS_SELECTOR, 'a').get_attribute('href')

                # Extract product title
                title = item.find_element(By.CSS_SELECTOR, 'h2.card_title.Body3R').text.strip()

                # Extract product price (currently not available in the provided HTML structure)
                # Modify if you have access to price in the HTML, otherwise use a placeholder
                try:
                    price = item.find_element(By.CSS_SELECTOR, 'div.price_and_qty p').text.strip()
                except:
                    price = 'Price not available'

                # Append to the data list
                data.append({
                    'title': title,
                    'price': price,  # Placeholder for price
                    'rating': 'Not available',  # No rating information in the provided HTML
                    'source': 'TradeIndia',
                    'url': url,
                })
            except Exception as e:
                print(f"Error scraping item: {e}")

    except Exception as e:
        print(f"Error scraping TradeIndia: {e}")
    finally:
        driver.quit()

    # Save data to JSON
    output_file = os.path.join(os.path.dirname(__file__), '..', 'servicedata', 'tradeindia.json')
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4)

    print(f"Data saved to {output_file}")


# Example usage
if __name__ == "__main__":
    search_query = input("Enter your search query: ")
    run_tradeindia_scraper(search_query)




