from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up Chrome options to block location
chrome_options = Options()

# Disable location permissions
chrome_options.add_argument("--disable-geolocation")

# Alternatively, you can use Chrome's prefs to block location requests
prefs = {
    "profile.default_content_setting_values.geolocation": 2  # 2 blocks geolocation
}
chrome_options.add_experimental_option("prefs", prefs)

# Initialize the WebDriver with the specified options
driver = webdriver.Chrome(options=chrome_options)

# Open the Croma page for "iPhone 15"
driver.get("https://www.croma.com/searchB?q=iphone%2015%3Arelevance&text=iphone%2015")

# Wait for the product containers to be loaded
products = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.cp-product.typ-plp.plp-srp-typ'))
)

# Loop through each product container and extract the title
for product in products:
    try:
        # Find the product title
        title = product.find_element(By.CSS_SELECTOR, ".product-title.plp-prod-title.999 a").text
        print(title)  # Print the title of each product
    except Exception as e:
        print(f"Error extracting title for a product: {e}")

# Close the browser after scraping
driver.quit()
