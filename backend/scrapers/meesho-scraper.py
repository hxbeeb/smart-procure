import json
import time
import random  # Import random for random delays
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import quote

class JustdialSeleniumScraper:
    def __init__(self, search='', city=''):
        # Setup Chrome options with more human-like browsing
        options = Options()
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-gpu')
        options.add_argument('--window-size=1920,1080')
        
        # Disable automation flags that websites can detect
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        
        # Additional options to make browser more stealthy
        options.add_argument('--disable-blink-features=AutomationControlled')
        
        # Initialize the WebDriver
        self.driver = webdriver.Chrome(options=options)
        
        # Set up user agent to look more like a real browser
        self.driver.execute_cdp_cmd("Network.setUserAgentOverride", {
            "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        })
        
        # URL encode the search term and city
        encoded_search = quote(search)
        encoded_city = quote(city.lower() if city else 'Mumbai')
        
        # Construct the start URL
        self.start_url = f'https://www.justdial.com/{encoded_city}/{encoded_search}/nct-10192623' if search else 'https://www.justdial.com/Mumbai/Cold-Storage'
        
        # Prepare the data list to collect the business details
        self.business_data = []
        self.max_items = 50  # Maximum number of items to scrape

    def close(self):
        # Close the Selenium driver
        self.driver.quit()

    def scrape(self):
        # Navigate to the page
        self.driver.get(self.start_url)
        
        # Wait for initial page load
        time.sleep(5)
        
        # Advanced scrolling method
        self._advanced_scroll_and_scrape()

        # Save the collected data
        self.save_to_json()

    def _advanced_scroll_and_scrape(self):
        """
        Advanced scrolling method that mimics human-like scrolling
        """
        last_height = self.driver.execute_script("return document.body.scrollHeight")
        scroll_pause_time = 2  # Initial pause time
        
        while len(self.business_data) < self.max_items:
            # Scroll down by a small amount
            scroll_increment = random.randint(300, 600)  # Scroll between 300 to 600 pixels
            self.driver.execute_script(f"window.scrollBy(0, {scroll_increment});")
            
            # Wait for a random short duration to mimic human behavior
            time.sleep(random.uniform(1.5, 3.0))  # Wait between 1.5 to 3 seconds
            
            # Parse current page
            self.parse(self.driver.page_source)
            
            # Calculate new scroll height and compare with last scroll height
            new_height = self.driver.execute_script("return window.pageYOffset + window.innerHeight")
            total_height = self.driver.execute_script("return document.body.scrollHeight")
            
            if new_height >= total_height:
                # If we've reached the bottom, break the loop
                print("Reached the bottom of the page.")
                break

            # Optional: Add a maximum number of scrolls to prevent infinite loops
            if scroll_increment > total_height:
                break

    def parse(self, page_source):
        try:
            # Find all listing elements
            listings = self.driver.find_elements(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc.resultbox_info')
            
            for listing in listings:
                # Skip if we've already collected max items
                if len(self.business_data) >= self.max_items:
                    break

                try:
                    # Detailed extraction with multiple fallback methods
                    title = self._safe_extract(listing, 
                        lambda: listing.find_element(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc.resultbox_info div[role="none"][title]').get_attribute('title').strip(),
                        'Unknown Title'
                    )
                    
                    company_name = self._safe_extract(listing, 
                        lambda: listing.find_element(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc').text.strip(),
                        'Unknown Company'
                    )
                    
                    rating = self._safe_extract(listing, 
                        lambda: listing.find_element(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc.resultbox_totalrate').text.strip(),
                        'No Rating'
                    )
                    
                    address = self._safe_extract(listing, 
                        lambda: listing.find_element(By.CSS_SELECTOR, 'div.jsx-915cb403736563fc').text.strip(),
                        'No Address'
                    )
                    
                    phone = self._safe_extract(listing, 
                        lambda: listing.find_element(By.CSS_SELECTOR, 'span.jsx-915cb403736563fc.callcontent.callNowAnchor').text.strip(),
                        'No Phone'
                    )
                    
                    business_link = self._safe_extract(listing, 
                        lambda: listing.find_element(By.CSS_SELECTOR, 'a.jsx-915cb403736563fc.resultbox_title_anchorbox').get_attribute("href"),
                        ''
                    )

                    # Create a dictionary for the business data
                    business = {
                        'title': title,
                        'company_name': company_name,
                        'rating': rating,
                        'address': address,
                        'phone': phone,
                        'business_link': business_link,
                    }

                    # Append the business data to the list if not already present
                    if business not in self.business_data:
                        self.business_data.append(business)

                except Exception as e:
                    print(f"Error processing individual listing: {str(e)}")
                    continue

        except Exception as e:
            print(f"Error parsing listings: {str(e)}")

    def _safe_extract(self, element, extraction_method, default_value=''):
        """
        Safe method to extract data with fallback
        """
        try:
            return extraction_method()
        except Exception:
            return default_value

    def save_to_json(self):
        # Trim to max items if necessary
        final_data = self.business_data[:self.max_items]
        
        # Write the collected data to a JSON file
        with open('business_data.json', 'w', encoding='utf-8') as f:
            json.dump(final_data, f, ensure_ascii=False, indent=4)
        
        print(f"Data saved to 'business_data.json'. Total items: {len(final_data)}")

if __name__ == '__main__':
    search_term = 'Cold-Storage'  # Example search term
    city = 'Mumbai'  # Example city

    scraper = JustdialSeleniumScraper(search=search_term, city=city)
    try:
        scraper.scrape()
    except Exception as e:
        print(f"Scraping error: {str(e)}")
    finally:
        scraper.close()
        
