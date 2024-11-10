from flask import Flask, request, jsonify
import pandas as pd
from textblob import TextBlob
import joblib

app = Flask(__name__)

# Load the pre-trained model and scaler
model = joblib.load('logistic_model.pkl')
scaler = joblib.load('scaler.pkl')

# Function to calculate sentiment score
def get_sentiment(text):
    blob = TextBlob(text)
    return blob.sentiment.polarity

# Prediction function for vendor reliability
def predict_vendor_reliability(feedback_text, rating):
    sentiment_score = get_sentiment(feedback_text)
    # Only use 'feedback_sentiment' and 'rating' for prediction
    input_data = pd.DataFrame([[sentiment_score, rating]], columns=['feedback_sentiment', 'rating'])
    scaled_input = scaler.transform(input_data)
    prediction = model.predict(scaled_input)
    return "Reliable" if prediction[0] == 1 else "Not Reliable"

# Endpoint to receive data and predict reliability
@app.route('/receive-data', methods=['POST'])
def receive_data():
    data = request.get_json()
    if not data:
        return jsonify({"status": "error", "message": "No data received"}), 400

    products = data.get("products", [])
    results = []
    reliabilities = []

    for product in products:
        feedback = product.get("feedback", "")
        rating_str = product.get("ratings", "0")
        
        # Check if rating_str is not "No ratings" and extract the number from "out of 5 stars"
        if rating_str == "No ratings":
            rating = 3.0  # Default to neutral rating if no ratings are found
        else:
            # Remove extra text like " out of 5 stars" and strip whitespace
            rating = rating_str.replace(' out of 5 stars', '').strip()
            rating=rating.strip('.')
            # Ensure we handle any unexpected format or conversion failure
            try:
                rating = float(rating)
            except ValueError:
                rating = 3.0  # Default to neutral rating if parsing fails

        print(f"Processed rating: {rating}")  # Add this line to debug the rating value

        # Predict vendor reliability based on feedback and rating
        reliability = predict_vendor_reliability(feedback, rating)
        reliabilities.append(reliability)

        results.append({
            "feedback": feedback,
            "ratings": product["ratings"],
        })

    # Return the results with reliability
    return jsonify({
        "status": "success",
        "products": results,
        "reliabilities": reliabilities
    }), 200

if __name__ == '__main__':
    app.run(port=8000)
