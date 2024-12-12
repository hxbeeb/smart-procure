from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import os
import re  # Import the regular expression module

def run_flipkart_scraper(search_query):
    """Scrapes Flipkart for a specific search query and saves data to a JSON file."""
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

        # Wait for results to load (adjust the wait time if necessary)
        driver.implicitly_wait(5)

        # Scrape product information from search results
        for item in driver.find_elements(By.CSS_SELECTOR, '.cPHDOP')[:10]:
            try:
                title = item.find_element(By.CSS_SELECTOR, '.KzDlHZ').text  # Extract text for title
                price = item.find_element(By.CSS_SELECTOR, '._4b5DiR').text  # Extract text for price
                rating = item.find_element(By.CSS_SELECTOR, '.XQDdHH').text  # Extract text for rating
                url = item.find_element(By.CSS_SELECTOR, 'a.CGtC98').get_attribute('href')  # Extract URL

                # Clean the price to remove currency symbols and commas
                price = re.sub(r'[^\d.]', '', price)  # Remove non-numeric characters except the dot
                price = float(price)  # Convert the price to float

                data.append({
                    'title': title,
                    'price': price,
                    'rating': rating,  # Rating is now extracted as text
                    'source': 'Flipkart',
                    'url': url,
                })
            except Exception as e:
                print(f"Error scraping item: {e}")

    except Exception as e:
        print(f"Error scraping Flipkart: {e}")
    finally:
        driver.quit()

    # Save data to JSON
    output_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'flipkart.json')
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4)

# Example usage
if __name__ == "__main__":
    search_query = input("Enter your search query: ")
    run_flipkart_scraper(search_query)












