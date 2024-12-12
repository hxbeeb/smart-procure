from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def scrape_iframe_embed_link(search_query):
    """Scrapes PriceHistoryApp for the iframe embed link based on a search query."""
    iframe_url = None
    driver = webdriver.Chrome()  # Ensure ChromeDriver is set up correctly
    try:
        # Visit the main page of pricehistoryapp.com
        driver.get('https://www.pricehistoryapp.com')

        # Wait for the page to load
        time.sleep(2)  # Adjust the wait time as necessary

        # Close any pop-up or modal if present (adjust the selector if necessary)
        try:
            close_button = driver.find_element(By.XPATH, '//button[text()="✕"]')
            close_button.click()
            print("Closed pop-up successfully.")
        except Exception as e:
            print("No login popup found or failed to close it.")

        # Locate the search box using XPath and enter the search query
        search_box = driver.find_element(By.XPATH, '//input[contains(@class, "w-full") and contains(@class, "px-5")]')
        search_box.send_keys(search_query)
        
        # Submit the search form using XPath for the search button
        search_button = driver.find_element(By.XPATH, '//button[@title="Search Price History"]')
        search_button.click()

        # Wait for the search results to load (adjust as necessary)
        time.sleep(5)  # Adjust this based on the page load time

        # Click the next button (to load additional results) after the search button is clicked
        try:
            next_button = driver.find_element(By.XPATH, '//button[contains(@class, "px-4") and contains(@class, "py-2") and contains(@class, "bg-gray-400")]')
            next_button.click()
            print("Clicked next button to load more results.")
        except Exception as e:
            print(f"Error clicking next button: {e}")

        # Wait for the new content to load (adjust this time if necessary)
        time.sleep(5)

        # Extract iframe URL from the <span class="hljs-string"> element
        try:
            iframe_span = driver.find_element(By.CLASS_NAME, 'hljs-string')  # Locate span with the embed link
            iframe_url = iframe_span.text.strip('"')  # Extract and clean the URL
            print(f"Found iframe embed link: {iframe_url}")
        except Exception as e:
            print(f"Error finding iframe URL: {e}")

    except Exception as e:
        print(f"Error occurred: {e}")
    finally:
        driver.quit()

    return iframe_url

# Example usage
if __name__ == "__main__":
    # Example query to search; you can replace this with dynamic input
    search_query = input("Enter the product name or URL for PriceHistoryApp: ")
    iframe_embed_link = scrape_iframe_embed_link(search_query)

    if iframe_embed_link:
        print(f"Iframe Embed Link: {iframe_embed_link}")
    else:
        print("No iframe found or an error occurred.")
