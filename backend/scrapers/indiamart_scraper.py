from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import os
import re


def extract_clean_price(price_str):
    """Extracts and cleans the numeric value from a price string."""
    clean_price = re.sub(r'[^\d]', '', price_str)  # Remove non-numeric characters
    return int(clean_price) if clean_price else None


def run_indiamart_scraper(search_query):
    """Scrapes IndiaMart for a specific search query and saves data to a JSON file."""
    data = []
    driver = webdriver.Chrome()  # Ensure ChromeDriver is set up correctly
    try:
        driver.get('https://www.indiamart.com')

        # Perform a search query on IndiaMart
        search_box = driver.find_element(By.ID, 'search_string')
        search_box.send_keys(search_query)
        search_box.submit()

        # Wait for the results to load
        driver.implicitly_wait(10)  # Adjust as needed

        # Scrape product information from search results
        for item in driver.find_elements(By.CSS_SELECTOR, '.card.brs5')[:5]:
            try:
                # Extract title
                title = item.find_element(By.CSS_SELECTOR, '.producttitle a').text

                # Extract price
                price_element = item.find_element(By.CSS_SELECTOR, '.price')
                price = price_element.text if price_element else "Price not available"
                clean_price = extract_clean_price(price)

                # Extract rating (if available)
                rating_element = item.find_element(By.CSS_SELECTOR, '.fs13 .bo.color')
                rating = rating_element.text if rating_element else "No rating"

                # Extract product URL
                url_element = item.find_element(By.CSS_SELECTOR, '.producttitle a')
                url = url_element.get_attribute('href') if url_element else "URL not available"

                # Append to the data list
                data.append({
                    'title': title,
                    'price': clean_price, 
                    'rating': rating,
                    'source': 'IndiaMart',
                    'url': url,
                })
            except Exception as e:
                print(f"Error scraping item: {e}")

    except Exception as e:
        print(f"Error scraping IndiaMart: {e}")
    finally:
        driver.quit()

    # Save data to JSON
    output_file = os.path.join(os.path.dirname(__file__),'..', 'data','indiamart.json')
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4)

    print(f"Data saved to {output_file}")


# Example usage
if __name__ == "__main__":
    search_query = input("Enter your search query: ")
    run_indiamart_scraper(search_query)
