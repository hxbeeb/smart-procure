# import joblib
# import pandas as pd
# import numpy as np
# from textblob import TextBlob
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import StandardScaler
# from sklearn.linear_model import LogisticRegression

# # Load data and prepare the dataset as you've done before
# amazon_data = pd.read_csv('Reviews.csv')
# amazon_data = amazon_data[['Score', 'Text']].dropna()
# amazon_data = amazon_data.rename(columns={'Score': 'rating', 'Text': 'feedback'})

# np.random.seed(42)
# amazon_data['price'] = np.random.uniform(50, 500, size=len(amazon_data))
# amazon_data['reliable_vendor'] = amazon_data['rating'].apply(lambda x: 1 if x >= 4 else 0)
# amazon_data['feedback_sentiment'] = amazon_data['feedback'].apply(lambda x: TextBlob(x).sentiment.polarity)

# X = amazon_data[['price', 'feedback_sentiment', 'rating']]
# y = amazon_data['reliable_vendor']

# scaler = StandardScaler()
# X_scaled = scaler.fit_transform(X)
# X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42)

# model = LogisticRegression()
# model.fit(X_train, y_train)

# # Save model and scaler
# joblib.dump(model, 'logistic_model.pkl')
# joblib.dump(scaler, 'scaler.pkl')
# #















































import joblib
import pandas as pd
import numpy as np
from textblob import TextBlob
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# Load data and prepare the dataset
amazon_data = pd.read_csv('Reviews.csv')
amazon_data = amazon_data[['Score', 'Text']].dropna()
amazon_data = amazon_data.rename(columns={'Score': 'rating', 'Text': 'feedback'})

# Create a synthetic 'reliable_vendor' label based on rating
amazon_data['reliable_vendor'] = amazon_data['rating'].apply(lambda x: 1 if x >= 4 else 0)

# Sentiment analysis of feedback
amazon_data['feedback_sentiment'] = amazon_data['feedback'].apply(lambda x: TextBlob(x).sentiment.polarity)

# Features: Only 'rating' and 'feedback_sentiment' (removed 'price')
X = amazon_data[['feedback_sentiment', 'rating']]
y = amazon_data['reliable_vendor']

# Standardize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42)

# Train a Logistic Regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Save the trained model and scaler
joblib.dump(model, 'logistic_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

print("Model and scaler saved successfully.")
