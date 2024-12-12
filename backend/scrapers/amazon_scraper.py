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

def run_amazon_scraper(search_query):
    """Scrapes Amazon for a specific search query and saves data to a JSON file."""
    data = []
    driver = webdriver.Chrome()  # Ensure ChromeDriver is set up correctly
    try:
        driver.get('https://www.amazon.in')

        # Perform a search query on Amazon
        search_box = driver.find_element(By.ID, 'twotabsearchtextbox')
        search_box.send_keys(search_query)
        search_box.submit()

        # Scrape product information from search results
        for item in driver.find_elements(By.CSS_SELECTOR, '.s-main-slot .s-result-item')[:4]:
            try:
                title = item.find_element(By.CSS_SELECTOR, 'h2 .a-link-normal').text

                # Extract price information
                try:
                    price_whole = item.find_element(By.CSS_SELECTOR, '.a-price-whole').text
                    price_fraction = item.find_element(By.CSS_SELECTOR, '.a-price-fraction').text
                    price = f"{price_whole}.{price_fraction}"
                except Exception:
                    price = "N/A"  # Handle cases where price is not available

                url = item.find_element(By.CSS_SELECTOR, 'h2 .a-link-normal').get_attribute('href')

                # Convert price to INR if available
                price_in_inr = convert_to_inr(price) if price != "N/A" else 0

                data.append({
                    'title': title,
                    'price': price_in_inr,  # Numeric INR value or 0 if not available
                    'rating': 'no rating',  # Optional, can be added if available
                    'source': 'Amazon',
                    'url': url,
                })
            except Exception as e:
                print(f"Error scraping item: {e}")

    except Exception as e:
        print(f"Error scraping Amazon: {e}")
    finally:
        driver.quit()

    # Save data to JSON
    output_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'amazon.json')
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)
        print(f"Data saved to {output_file}")

# Example usage
if __name__ == "__main__":
    search_query = input("Enter your search query: ")
    run_amazon_scraper(search_query)
