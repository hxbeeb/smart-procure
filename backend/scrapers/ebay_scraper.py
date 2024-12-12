# from selenium import webdriver
# from selenium.webdriver.common.by import By
# import json
# import os

# def run_ebay_scraper(search_query):
#     """Scrapes eBay for a specific search query and saves data to a JSON file."""
#     data = []
#     driver = webdriver.Chrome()  # Ensure ChromeDriver is set up correctly
#     try:
#         driver.get('https://www.ebay.com')

#         # Perform a search query on eBay
#         search_box = driver.find_element(By.ID, 'gh-ac')
#         search_box.send_keys(search_query)
#         search_box.submit()

#         # Scrape product information from search results
#         for item in driver.find_elements(By.CSS_SELECTOR, '.s-item'):
#             try:
#                 title = item.find_element(By.CSS_SELECTOR, '.s-item__title span[role="heading"]').text
#                 price = item.find_element(By.CSS_SELECTOR, '.s-item__price').text
#                 url = item.find_element(By.CSS_SELECTOR, '.s-item__link').get_attribute('href')

#                 data.append({
#                     'title': title,
#                     'price': price,
#                      # Optional, can be added if available
#                     'rating':'no rating',
#                     'source': 'eBay',
#                     'url': url,
#                 })
#             except Exception as e:
#                 print(f"Error scraping item: {e}")

#     except Exception as e:
#         print(f"Error scraping eBay: {e}")
#     finally:
#         driver.quit()

#     data=data[2:]
#     # Save data to JSON
#     output_file = os.path.join(os.path.dirname(__file__),'..', 'data','ebay.json')
#     os.makedirs(os.path.dirname(output_file), exist_ok=True)
#     with open(output_file, 'w') as f:
#         json.dump(data, f, indent=4)

# # Example usage
# if __name__ == "__main__":
#     search_query = input("Enter your search query: ")
#     run_ebay_scraper(search_query)









from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import os

# Fixed USD to INR conversion rate (can be replaced with an API call for dynamic rate)
USD_TO_INR = 83

def convert_to_inr(price_in_usd):
    """Converts the price from USD to INR."""
    try:
        # Remove non-numeric characters (e.g., $, commas, etc.) and convert to float
        price_in_usd = float(price_in_usd.replace('$', '').replace(',', '').strip())
        price_in_inr = price_in_usd * USD_TO_INR
        return round(price_in_inr, 2)  # Returning rounded price
    except ValueError:
        return 0  # Return 0 if conversion fails

def run_ebay_scraper(search_query):
    """Scrapes eBay for a specific search query and saves data to a JSON file."""
    data = []
    driver = webdriver.Chrome()  # Ensure ChromeDriver is set up correctly
    try:
        driver.get('https://www.ebay.com')

        # Perform a search query on eBay
        search_box = driver.find_element(By.ID, 'gh-ac')
        search_box.send_keys(search_query)
        search_box.submit()

        # Scrape product information from search results
        for item in driver.find_elements(By.CSS_SELECTOR, '.s-item')[:4]:
            try:
                title = item.find_element(By.CSS_SELECTOR, '.s-item__title span[role="heading"]').text
                price = item.find_element(By.CSS_SELECTOR, '.s-item__price').text
                url = item.find_element(By.CSS_SELECTOR, '.s-item__link').get_attribute('href')

                # Convert price to INR and ensure numeric value only
                price_in_inr = convert_to_inr(price)

                data.append({
                    'title': title,
                    'price': price_in_inr,  # Numeric INR value
                    'rating': 'no rating',  # Optional, can be added if available
                    'source': 'eBay',
                    'url': url,
                })
            except Exception as e:
                print(f"Error scraping item: {e}")

    except Exception as e:
        print(f"Error scraping eBay: {e}")
    finally:
        driver.quit()

    # Slice the data to remove the first two items (if needed)
    data = data[2:]

    # Save data to JSON
    output_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'ebay.json')
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)
        print(f"Data saved to {output_file}")

# Example usage
if __name__ == "__main__":
    search_query = input("Enter your search query: ")
    run_ebay_scraper(search_query)