from flask import Flask, request, jsonify
import json
import os
import threading
from flask_cors import CORS
# from scrapers.amazon_scraper import run_amazon_scraper
# from scrapers.flipkart_scraper import run_flipkart_scraper
from scrapers.ebay_scraper import run_ebay_scraper
from scrapers.indiamart_scraper import run_indiamart_scraper
from scrapers.flipkart_scraper import run_flipkart_scraper
from scrapers.pricehistory_scraper import scrape_iframe_embed_link
from servicescrapers.justdial_scraper import run_justdial_scraper
from servicescrapers.tradeindia_scraper import run_tradeindia_scraper
# Import other scrapers as needed

app = Flask(__name__)
CORS(app, resources={r'/scrape': {"origins": ['http://localhost:5173']}})
# Path to JSON files
DATA_DIR = os.path.join(os.path.dirname(__file__),'data')
SERVICE_DATA_DIR = os.path.join(os.path.dirname(__file__), 'servicedata')

def run_scrapers(search_term):
    """Run all scrapers with the given search term in separate threads."""
    threads = []
    scrapers = [lambda: run_ebay_scraper(search_term),lambda: run_indiamart_scraper(search_term)]

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
    if not search_query:
        return jsonify({'error': 'Search query is required'}), 400
    
    for file in os.listdir(DATA_DIR):
        file_path = os.path.join(DATA_DIR, file)
        if os.path.isfile(file_path):
            os.remove(file_path)

    try:
        run_scrapers(search_query)
        combined_results = combine_json_files()
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





def combine_json_service_files(output_file='service_products.json'):
    """Combine all JSON files in servicedata into one and save to a final JSON file."""
    combined_data = []
    # Ensure the servicedata directory exists
    if not os.path.exists(SERVICE_DATA_DIR):
        os.makedirs(SERVICE_DATA_DIR)

    for filename in os.listdir(SERVICE_DATA_DIR):
        if filename.endswith('.json'):
            filepath = os.path.join(SERVICE_DATA_DIR, filename)
            with open(filepath, 'r') as file:
                try:
                    data = json.load(file)
                    if isinstance(data, list):
                        combined_data.extend(data)
                except json.JSONDecodeError:
                    print(f"Error decoding {filename}")
    
    # Save the combined data to service_products.json
    output_path = os.path.join(SERVICE_DATA_DIR, output_file)
    with open(output_path, 'w') as outfile:
        json.dump(combined_data, outfile, indent=4)
    print(f"Combined data saved to {output_path}")
    return combined_data  # Return the combined data directly


@app.route('/service-scrape', methods=['GET'])
def service_scrape():
    """Endpoint to run Selenium-based scrapers located in servicescrapers."""
    search_query = request.args.get('search', '').strip()
    print(search_query)
    if not search_query:
        return jsonify({'error': 'Search query is required'}), 400

    try:
        # Run all service scrapers in separate threads
        threads = [
            threading.Thread(target=run_justdial_scraper, args=(search_query,)),
            threading.Thread(target=run_tradeindia_scraper, args=(search_query,)),
        ]

        # Start each scraper in a separate thread
        for thread in threads:
            thread.start()

        # Wait for all threads to complete
        for thread in threads:
            thread.join()

        # After scraping, combine the results into one JSON file
        combined_results = combine_json_service_files(output_file='service_products.json')
        return jsonify(combined_results)

    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    os.makedirs(DATA_DIR, exist_ok=True)  # Ensure the data directory exists
    app.run(debug=True,port=5001)