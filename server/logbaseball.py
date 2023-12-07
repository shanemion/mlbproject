 
import numpy as np
import pandas as pd

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

hardcoded_thetas = [-0.75882234,  0.02802454, -0.02408761,  0.00108827, -0.02847524, -0.08562155,
 -0.21532068,  0.09516804, -0.13506167, -0.04805247, -0.14796846,  0.31359849,
  0.0538774]

def load_and_preprocess(filename):
    df = pd.read_csv(filename)

    # Define the columns to be used
    numerical_columns = [
        'release_speed', 'release_spin_rate', 'release_pos_x', 'release_pos_z', 
        'pfx_x', 'pfx_z', 'plate_x', 'plate_z', 'zone'
    ]
    categorical_columns = ['pitch_type']
    target_column = 'events'

    # Select only the relevant columns
    selected_columns = numerical_columns + categorical_columns + [target_column]
    df = df[selected_columns]

    # Convert 'events' into binary outcome (hit vs. field_out)
    df[target_column] = df[target_column].apply(lambda x: 0 if x == 'field_out' else 1)

    # Handle missing values
    df = df.dropna(subset=selected_columns)

    # Standardize numerical features
    for col in numerical_columns:
        df[col] = (df[col] - df[col].mean()) / df[col].std()

    # Encode categorical variables (one-hot encoding)
    df = pd.get_dummies(df, columns=categorical_columns, drop_first=True)

    return df
# Proceed with the rest of your data processing and logistic regression training


# Splitting data into training and testing sets
def train_test_split(df, test_size=0.2):
    test_indices = np.random.rand(len(df)) < test_size
    train_data = df[~test_indices]
    test_data = df[test_indices]
    return train_data, test_data


# Logistic regression functions (same as you provided)
# ... (sigmoid, gradient, gradient_ascent, predict, calculate_accuracy)

# Sigmoid function
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# Log likelihood function
def log_likelihood(X, y, theta):
    z = np.dot(X, theta)
    ll = np.sum(y * np.log(sigmoid(z)) + (1 - y) * np.log(1 - sigmoid(z)))
    return ll

# Gradient of the log-likelihood
def gradient(X, y, theta):
    # Number of training examples
    m = len(y)
    # Number of features
    n = X.shape[1]
    # Initialize gradient as a zero vector with the same length as theta
    grad = np.zeros(n)
    
    # Loop over each feature
    for j in range(n):
        # Sum the gradient over all training examples for feature j
        gradient_sum = 0
        for i in range(m):
            # Compute the predicted probability for training example i
            prediction = sigmoid(np.dot(X[i], theta))
            # Update the gradient sum with the current example's contribution
            gradient_sum += (y[i] - prediction) * X[i][j]
        # Assign the computed sum to the gradient for feature j
        grad[j] = gradient_sum
    
    return grad

# Gradient ascent algorithm with checkpoints
def gradient_ascent(X, y, learning_rate, steps):
    theta = np.zeros(X.shape[1])
    for step in range(steps):
        g = gradient(X, y, theta)
        theta += learning_rate * g
        if step % 100 == 0:  # Checkpoint every 100 steps
            print(step)
            ll = log_likelihood(X, y, theta)
            print(f"Log likelihood after {step+1} steps: {ll}")
    return theta

def predict(X, theta):
    probability = sigmoid(np.dot(X, theta))
    return [1 if x >= 0.5 else 0 for x in probability]

# Calculate accuracy
def calculate_accuracy(y_true, y_pred):
    correct_predictions = np.sum(y_true == y_pred)
    return correct_predictions / len(y_true)


# Confusion Matrix for Logistic Regression
from sklearn.metrics import confusion_matrix

def print_confusion_matrix(y_true, y_pred):
    cm = confusion_matrix(y_true, y_pred)
    print("Confusion Matrix:")
    print(cm)


def main():
    # Load and preprocess the data
    data = load_and_preprocess('/Users/shanemion/Downloads/pset6data/savant_data.csv')

    # Split data
    train_data, test_data = train_test_split(data)

    # Prepare data for Naive Bayes
    X_train = train_data.drop('events', axis=1)
    y_train = train_data['events']
    X_test = test_data.drop('events', axis=1)
    y_test = test_data['events']

    X_train = np.array(X_train, dtype=float)
    y_train = np.array(y_train, dtype=float)
    X_test = np.array(X_test, dtype=float)
    y_test = np.array(y_test, dtype=float)

    # Add intercept term to X
    X_train = np.insert(X_train, 0, 1, axis=1)
    X_test = np.insert(X_test, 0, 1, axis=1)


    # Train logistic regression model
    theta = gradient_ascent(X_train, y_train, 0.0001, 1000)
    print("Theta values:")
    print(theta)  # This will print the theta values

    # Predict on test set
    log_y_pred_test = predict(X_test, theta)

    # Calculate and print test accuracy
    test_accuracy = calculate_accuracy(y_test, log_y_pred_test)
    print(f"Logistic Test Accuracy: {test_accuracy}")

    print_confusion_matrix(y_test, log_y_pred_test)



@app.route('/predict-logistic', methods=['POST'])
def predict_logistic():
    data = request.json
    # Ensure correct mapping of features and one-hot encoding
    features = np.array([
        float(data['pitchSpeed']),
        float(data['spinRate']),
        float(data['xpos']),
        float(data['ypos']),
        float(data['plateX']),
        float(data['plateZ']),
        float(data['pfxX']),
        float(data['pfxZ']),
        float(data['zone']),
        # One-hot encoding for pitch type
        1.0 if data['pitchType'] == 'fastball' else 0.0,
        1.0 if data['pitchType'] == 'changeup' else 0.0,
        1.0 if data['pitchType'] == 'curveball' else 0.0,
        1.0 if data['pitchType'] == 'slider' else 0.0,
    ]).reshape(1, -1)

    prediction = predict(features, np.array(hardcoded_thetas))
    print(prediction[0])
    return jsonify({'prediction': prediction[0]})

if __name__ == "__main__":
    app.run(debug=True, port=5001)  # Run on a different port

# if __name__ == "__main__":
#     main()

