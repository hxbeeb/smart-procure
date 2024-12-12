from flask import Flask, request, jsonify
import json
import os
import threading
from flask_cors import CORS
import re
from scrapers.amazon_scraper import run_amazon_scraper
# from scrapers.flipkart_scraper import run_flipkart_scraper
from scrapers.ebay_scraper import run_ebay_scraper
from scrapers.indiamart_scraper import run_indiamart_scraper
from scrapers.flipkart_scraper import run_flipkart_scraper
from scrapers.pricehistory_scraper import scrape_iframe_embed_link
# Import other scrapers as needed


import requests

BRIGHT_DATA_API_URL = "https://api.brightdata.com/scrape"
BRIGHT_DATA_API_KEY = "https://brd-customer-hl_b4ab347a-zone-scraping_browser1:p67nsc2d1vvr@brd.superproxy.io:9515"  # Replace with your API key

def scrape_with_bright_data(search_term):
    """
    Scrape using Bright Data API.
    """
    try:
        payload = {
            "target": "search_engine",
            "query": search_term
        }

        headers = {
            "Authorization": f"Bearer {BRIGHT_DATA_API_KEY}",
            "Content-Type": "application/json"
        }

        response = requests.post(BRIGHT_DATA_API_URL, headers=headers, json=payload)

        # Check if the request was successful
        if response.status_code == 200:
            return response.json()  # Return the JSON data from the API
        else:
            # Handle API errors
            return {"error": f"Bright Data API error: {response.status_code}, {response.text}"}
    except Exception as e:
        return {"error": str(e)}



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# Path to JSON files
DATA_DIR = os.path.join(os.path.dirname(__file__),'data')

def run_scrapers(search_term):
    """Run all scrapers with the given search term in separate threads."""
    threads = []
    scrapers = [lambda: run_ebay_scraper(search_term),lambda: run_indiamart_scraper(search_term),lambda:run_amazon_scraper]

    for scraper in scrapers:
        thread = threading.Thread(target=scraper)
        threads.append(thread)
        thread.start()
    for thread in threads:
        thread.join()



def combine_json_files(output_file='products.json'):
    """Combine all JSON files into one and save to products.json."""
    combined_data = []
    for filename in os.listdir(DATA_DIR):
        if filename.endswith('.json'):
            filepath = os.path.join(DATA_DIR, filename)
            with open(filepath, 'r') as file:
                try:
                    data = json.load(file)
                    if isinstance(data, list):
                        combined_data.extend(data)
                except json.JSONDecodeError:
                    print(f"Error decoding {filename}")
    
    # Save the combined data to products.json
    output_path = os.path.join(DATA_DIR, output_file)
    with open(output_path, 'w') as outfile:
        json.dump(combined_data, outfile, indent=4)
    print(f"Combined data saved to {output_path}")
    return combined_data  # Return the combined data directly



@app.route('/scrape', methods=['GET'])
def scrape():
    """Endpoint to trigger scrapers and return combined data."""
    search_query = request.args.get('search', '').strip()

    # Clean search query
    cleaned_query = re.sub(r'[^\w\s*]', '', search_query).strip()
    cleaned_query = re.sub(r'\s+', ' ', cleaned_query)

    if not cleaned_query:
        return jsonify({'error': 'Search query is required'}), 400

    # Clear existing data
    for file in os.listdir(DATA_DIR):
        file_path = os.path.join(DATA_DIR, file)
        if os.path.isfile(file_path):
            os.remove(file_path)

    try:
        # Use Bright Data API
        bright_data_results = scrape_with_bright_data(cleaned_query)

        # Run other scrapers if needed
        run_scrapers(cleaned_query)

        # Combine JSON results
        combined_results = combine_json_files()

        # Merge Bright Data results
        if isinstance(bright_data_results, list):
            combined_results.extend(bright_data_results)

        return jsonify(combined_results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/check-title', methods=['GET'])
def check_title():
    stored_url = None
    iframe_link = None

    title = request.args.get('title')  # Get 'title' from query parameters

    print(f"this is title : {title}")
    product_data = run_flipkart_scraper(title)
    # Read the product data from the JSON file (flipkart.json)
    try:
        with open('data/flipkart.json', 'r') as f:
            product_data = json.load(f)
        print(f"Product data received: {product_data}")  # Log product data
    except FileNotFoundError:
        return jsonify({'error': 'flipkart.json file not found'}), 404
    except json.JSONDecodeError:
        return jsonify({'error': 'Error decoding JSON data from flipkart.json'}), 500

    if not product_data:
        return jsonify({'error': 'No products found in the JSON file.'}), 404

    # Assuming the first product is what you want (as per your original code)
    stored_url = product_data[0]['url']
    print(f"Scraped product URL: {stored_url}")  # Log URL

    # Scrape the iframe embed link using the URL obtained
    iframe_link = scrape_iframe_embed_link(stored_url)
    print(f"Scraped iframe link: {iframe_link}")  # Log iframe link

    # Check if iframe link was found and return the response
    if iframe_link:
        return jsonify({
            'iframe_link': iframe_link
        }), 200
    else:
        return jsonify({'error': 'No iframe link found for the product.'}), 404




if __name__ == '__main__':
    os.makedirs(DATA_DIR, exist_ok=True)  # Ensure the data directory exists
    app.run(debug=True,port=5001)