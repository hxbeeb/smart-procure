from flask import Flask, request, jsonify
import pandas as pd
from textblob import TextBlob
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)

# Sample data to train the logistic regression model
data = pd.DataFrame({
    'price': [100, 200, 150, 300, 250],
    'feedback': [
        "Great product, very satisfied",
        "Not worth the price",
        "Good quality, would recommend",
        "Average product, could be better",
        "Excellent quality, highly recommend"
    ],
    'rating': [4, 3, 4, 4, 4.5],
    'reliable_vendor': [1, 0, 1, 0, 1]  # 1 = Reliable, 0 = Not reliable
})

# Function to calculate sentiment score
def get_sentiment(text):
    blob = TextBlob(text)
    return blob.sentiment.polarity  # Polarity ranges from -1 (negative) to 1 (positive)

# Apply sentiment analysis to feedback
data['feedback_sentiment'] = data['feedback'].apply(get_sentiment)

# Splitting data into features and target
X = data[['price', 'feedback_sentiment', 'rating']]
y = data['reliable_vendor']

# Standardizing features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Splitting the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Training a logistic regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Endpoint to receive data from Node.js server and predict reliability
@app.route('/receive-data', methods=['POST'])
def receive_data():
    data = request.get_json()  # Receive the JSON data
    if not data:
        return jsonify({"status": "error", "message": "No data received"}), 400
    
    products = data.get("products", [])
    results = []
    reliabilities = []

    for product in products:
        # Extract and process the price
        price_str = product.get("price", "0").replace('$', '').replace(',', '')
        if "to" in price_str:
            try:
                low, high = map(float, price_str.split(" to "))
                price = (low + high) / 2
            except ValueError:
                price = 0  # Default to 0 if parsing fails
        else:
            try:
                price = float(price_str)
            except ValueError:
                price = 0  # Default to 0 if parsing fails

        feedback = product.get("feedback", "")
        
        # Handle missing or non-numeric ratings
        rating_str = product.get("ratings", "0")
        if rating_str == "No ratings":
            rating = 3.0  # Default to neutral rating if no ratings are found
        else:
            rating = rating_str.replace(' out of 5 stars', '').strip()
            try:
                rating = float(rating)
            except ValueError:
                rating = 3.0  # Default to a neutral rating if conversion fails

        # Predict vendor reliability
        reliability = predict_vendor_reliability(price, feedback, rating)

        # Append the reliability to the list to send back
        reliabilities.append(reliability)

        results.append({
            "price": product["price"],
            "ratings": product["ratings"],
            "feedback": feedback,
        })

    # Send back reliabilities along with the data
    return jsonify({
        "status": "success",
        "products": results,
        "reliabilities": reliabilities  # Add reliabilities here
    }), 200


# Prediction function for vendor reliability
def predict_vendor_reliability(price, feedback_text, rating):
    sentiment_score = get_sentiment(feedback_text)
    
    # Wrap input data in a DataFrame with the same columns as used for fitting
    input_data = pd.DataFrame([[price, sentiment_score, rating]], columns=['price', 'feedback_sentiment', 'rating'])
    
    # Transform the data using the same scaler
    scaled_input = scaler.transform(input_data)
    prediction = model.predict(scaled_input)
    
    return "Reliable" if prediction[0] == 1 else "Not Reliable"

if __name__ == '__main__':
    app.run(port=8000)



















































