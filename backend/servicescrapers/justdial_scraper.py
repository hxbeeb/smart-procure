# import json
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.common.by import By
# import time
# from urllib.parse import quote
# import os


# class JustdialSeleniumScraper:
#     def __init__(self, search='', city=''):
#         # Setup Chrome options
#         options = Options()
#         options.add_argument('--no-sandbox')
#         options.add_argument('--disable-dev-shm-usage')
#         options.add_argument('--disable-gpu')
#         options.add_argument('--window-size=1920,1080')
#         # options.add_argument('--headless')  # Run in headless mode if needed

#         # Initialize the WebDriver
#         self.driver = webdriver.Chrome(options=options)
        
#         # URL encode the search term and city
#         encoded_search = quote(search)
#         encoded_city = quote(city.lower() if city else 'Mumbai')
        
#         # Construct the start URL
#         self.start_url = f'https://www.justdial.com/{encoded_city}/{encoded_search}/nct-10192623' if search else 'https://www.justdial.com/Mumbai/Cold-Storage'
        
#         # Prepare to save data to JSON
#         self.data = []
#         self.max_items = 50  # Maximum number of items to scrape

#     def close(self):
#         # Close the Selenium driver
#         self.driver.quit()

#     def scrape(self):
#         self.driver.get(self.start_url)
#         time.sleep(3)  # Initial page load wait

#         # Scroll and scrape
#         self._scroll_and_scrape()

#     def _scroll_and_scrape(self):
#         """
#         Scroll down the page in increments, scraping items along the way
#         until we reach the desired number of items or can't scroll further
#         """
#         last_height = self.driver.execute_script("return document.body.scrollHeight")
        
#         while len(self.data) < self.max_items:
#             # Scroll down by 7 items (approximately)
#             self.driver.execute_script("window.scrollBy(0, 1500);")
#             time.sleep(2)  # Wait for content to load

#             # Parse current page source
#             self.parse(self.driver.page_source)

#             # Calculate new scroll height and compare with last scroll height
#             new_height = self.driver.execute_script("return document.body.scrollHeight")
            
#             # If no more scrolling is possible, break
#             if new_height == last_height:
#                 break
            
#             last_height = new_height

#     def parse(self, page_source):
#         # Parse the HTML content using Selenium
#         try:
#             listings = self.driver.find_elements(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc.resultbox_info')
#             print(f"Found {len(listings)} business listings")

#             for listing in listings:
#                 # Skip if we've already collected max items
#                 if len(self.data) >= self.max_items:
#                     break

#                 try:
#                     # Extract business details
#                     title = listing.find_element(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc.resultbox_info div[role="none"][title]').get_attribute('title').strip()
#                     company_name = listing.find_element(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc').text.strip()
#                     rating = listing.find_element(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc.resultbox_totalrate').text.strip()
#                     address = listing.find_element(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc').text.strip()
#                     phone = listing.find_element(By.CSS_SELECTOR, 'span.jsx-915cb403736563fc.callcontent.callNowAnchor').text.strip()
#                     business_link = listing.find_element(By.CSS_SELECTOR, 'a.jsx-915cb403736563fc.resultbox_title_anchorbox').get_attribute("href")

#                     # Create a dictionary for the business data
#                     business = {
#                         'title': title,
#                         'price':'Price not available',
#                         # 'company_name': company_name,
#                         'rating': rating,
#                         # 'address': address,
#                         # 'phone': phone,
#                         'source':'justdial',
#                         'link': business_link,
#                     }

#                     # Append the business data to the list
#                     self.data.append(business)

#                 except Exception as e:
#                     print(f"Error processing individual listing: {str(e)}")
#                     continue

#         except Exception as e:
#             print(f"Error parsing listings: {str(e)}")

#     def save_to_json(self, output_file):
#         # Save the data to a JSON file
#         os.makedirs(os.path.dirname(output_file), exist_ok=True)
#         with open(output_file, 'w') as f:
#             json.dump(self.data, f, indent=4)
#         print(f"Data saved to {output_file}")


# # Example usage
# if __name__ == "__main__":
#     search_term = 'Cold-Storage'  # Example search term
#     city = 'Mumbai'  # Example city

#     # Initialize the scraper
#     scraper = JustdialSeleniumScraper(search=search_term, city=city)

#     try:
#         scraper.scrape()

#         # Save the scraped data to a JSON file
#         output_file = os.path.join(os.path.dirname(__file__), '..', 'servicedata', 'justdial.json')
#         scraper.save_to_json(output_file)

#     except Exception as e:
#         print(f"Scraping error: {str(e)}")
#     finally:
#         scraper.close()


from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import os
import time


def run_justdial_scraper(search_query, city='Mumbai'):
    """Scrapes Justdial for a specific search query and saves data to a JSON file."""
    data = []
    driver = webdriver.Chrome()  # Ensure ChromeDriver is set up correctly
    try:
        # Construct the Justdial search URL
        url = f"https://www.justdial.com/{city}/{search_query}/nct-10192623"

        driver.get(url)
        time.sleep(3)  # Allow time for page to load

        # Scroll to load more results (if any)
        driver.execute_script("window.scrollBy(0, 1500);")
        time.sleep(2)

        # Scrape product information from search results
        for item in driver.find_elements(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc.resultbox_info')[:5]:
            try:
                # Extract title
                title = item.find_element(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc.resultbox_info div[role="none"][title]').get_attribute('title').strip()
                rating = item.find_element(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc.resultbox_totalrate').text.strip()
                
                url = item.find_element(By.CSS_SELECTOR, 'a.jsx-915cb403736563fc.resultbox_title_anchorbox').get_attribute("href")

                # Append to the data list
                data.append({
                    'title': title,
                    'price':'Price not available',
                    'rating': rating,
                    'source': 'Justdial',
                    'url': url,
                })
            except Exception as e:
                print(f"Error scraping item: {e}")

    except Exception as e:
        print(f"Error scraping Justdial: {e}")
    finally:
        driver.quit()

    # Save data to JSON
    output_file = os.path.join(os.path.dirname(__file__), '..', 'servicedata', 'justdial.json')
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4)

    print(f"Data saved to {output_file}")


# Example usage
if __name__ == "__main__":
    search_query = input("Enter your search query: ")
    city = input("Enter city (default is Mumbai): ") or 'Mumbai'
    run_justdial_scraper(search_query, city)
