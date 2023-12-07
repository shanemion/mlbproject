 
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import math

app = Flask(__name__)
CORS(app)

class_probs = {'field_out': 0.643976897689769, 'single': 0.22882288228822883, 'double': 0.08085808580858085, 'force_out': 0.037953795379537955, 'triple': 0.008113311331133114, 'home_run': 0.000275027502750275}
feature_probs = {'pitch_type_CU': {'double': -2.2335828882173163, 'field_out': -2.349125138114784, 'single': -2.3865308242308663, 'force_out': -2.2881864984476703, 'triple': -2.691228332894609, 'home_run': -13.815510557964274}, 'pitch_type_FF': {'double': -0.6662979835057851, 'field_out': -0.6895216092813652, 'single': -0.6764582948737916, 'force_out': -0.985669197879454, 'triple': -0.551175183996946, 'home_run': -0.6931451805619453}, 'pitch_type_SL': {'double': -1.1563679444469748, 'field_out': -1.0658402277767447, 'single': -1.0660910006566693, 'force_out': -0.7762116060325738, 'triple': -1.1330953594809425, 'home_run': -0.6931451805619453}}

def load_and_preprocess(filename):
    df = pd.read_csv(filename)

    # Define the columns to be used
    numerical_columns = [ # these had close to 0 impact on our model's performance, so we removed them. only pitch type really changed it. 
        # 'release_speed', 'release_spin_rate', 'release_pos_x', 'release_pos_z', 
        # 'pfx_x', 'pfx_z', 'plate_x', 'plate_z', 'zone'
    ]
    categorical_columns = ['pitch_type']
    target_column = 'events'

    # Select only the relevant columns
    selected_columns = numerical_columns + categorical_columns + [target_column]
    df = df[selected_columns]

    # Handle missing values
    df = df.dropna(subset=selected_columns)

    # Standardize numerical features
    for col in numerical_columns:
        df[col] = (df[col] - df[col].mean()) / df[col].std()

    # Encode categorical variables
    df = pd.get_dummies(df, columns=categorical_columns, drop_first=True)

    return df
# Proceed hehe hi hi 


# Splitting data into training and testing sets
def train_test_split(df, test_size=0.2):
    test_indices = np.random.rand(len(df)) < test_size
    train_data = df[~test_indices]
    test_data = df[test_indices]
    return train_data, test_data

def naive_calculate_accuracy(y_true, y_pred):
    # Convert both to numpy arrays if they aren't already, to ensure compatibility with the '==' operator
    y_true = np.array(y_true)
    y_pred = np.array(y_pred)
    
    # Check if the prediction matches the truth
    correct_predictions = (y_true == y_pred)
    
    # Calculate the accuracy as the mean of correct predictions
    accuracy = correct_predictions.mean()
    
    return accuracy


# Naive Bayes Classifier
class NaiveBayesClassifier:
    def __init__(self):
        self.class_probs = {}
        self.feature_probs = {}

    def fit(self, X, y):
        # Convert y to string if it's not already
        if not isinstance(y, pd.Series):
            y = pd.Series(y)
        self.class_probs = y.value_counts(normalize=True).to_dict()
        unique_classes = y.unique()

        for feature in X.columns:
            self.feature_probs[feature] = {}
            for class_value in unique_classes:
                class_series = X[feature][y == class_value]
                # Assuming binary features after preprocessing
                p_feature_given_class = (class_series == 1).mean()
                self.feature_probs[feature][class_value] = np.log(p_feature_given_class + 1e-6)

    def predict_proba(self, X):
        predictions_proba = []
        for _, row in X.iterrows():
            class_log_scores = {}
            for class_value in self.class_probs.keys():
                class_log_scores[class_value] = self.class_probs[class_value]
                for feature in X.columns:
                    if row[feature] == 0:
                        # When the feature is absent, use the log complement rule more robustly
                        feature_log_prob = self.feature_probs[feature].get(class_value, np.log(1e-6))
                        log_complement_prob = np.log1p(-np.exp(feature_log_prob))
                        class_log_scores[class_value] += log_complement_prob
                    else:
                        # When the feature is present, simply add the log probability
                        feature_log_prob = self.feature_probs[feature].get(class_value, np.log(1e-6))
                        class_log_scores[class_value] += feature_log_prob

            # Normalize the log scores to get probabilities
            max_log_score = max(class_log_scores.values())
            log_prob_norm = [log_score - max_log_score for log_score in class_log_scores.values()]
            scores = np.exp(log_prob_norm)
            total = np.sum(scores)
            class_probabilities = {class_value: score / total for class_value, score in zip(class_log_scores.keys(), scores)}

            predicted_class = max(class_probabilities, key=class_probabilities.get)
            predicted_prob = class_probabilities[predicted_class]
            predictions_proba.append((predicted_class, predicted_prob))

        return predictions_proba

    def predict(self, X):
        return [pred_class for pred_class, _ in self.predict_proba(X)]

def main():
    # Load and preprocess the data
    data = load_and_preprocess('/Users/shanemion/Downloads/pset6data/savant_data.csv')

    # Split data
    train_data, test_data = train_test_split(data)

    # Prepare data for Naive Bayes
    X_train_nb = train_data.drop('events', axis=1)
    y_train_nb = train_data['events']
    X_test_nb = test_data.drop('events', axis=1)
    y_test_nb = test_data['events']

    # Create and train Naive Bayes model
    nb_model = NaiveBayesClassifier()
    nb_model.fit(X_train_nb, y_train_nb)

    # Predict on test set using Naive Bayes and calculate test accuracy
    naive_predictions = nb_model.predict(X_test_nb)
    naive_test_accuracy = naive_calculate_accuracy(y_test_nb, naive_predictions)
    print(f"Naive Test Accuracy: {naive_test_accuracy}")

    # Predict probabilities on the test set using Naive Bayes
    naive_predictions_proba = nb_model.predict_proba(X_test_nb)

    # Display some predictions with probabilities
    for i, (predicted_class, prob) in enumerate(naive_predictions_proba):
        if i < 10:  # Display the first 10 predictions
            print(f"Predicted type of hit: {predicted_class} with probability {prob:.2f}")

    naive_predictions_proba_sorted = sorted(naive_predictions_proba, key=lambda x: x[1], reverse=True)

    # Display some predictions with probabilities, starting with the highest
    for i, (predicted_class, prob) in enumerate(naive_predictions_proba_sorted):
        if i < 10:  # Display the first 10 predictions
            print(f"Predicted type of hit: {predicted_class} with probability {prob:.2f}")



@app.route('/predict-naive-bayes', methods=['POST'])
def predict_naive_bayes():
    data = request.json

    # Create a feature array similar to your preprocessing
    features = {
        'pitch_type_CU': 1.0 if data['pitchType'] == 'curveball' else 0.0,
        'pitch_type_FF': 1.0 if data['pitchType'] == 'fastball' else 0.0,
        'pitch_type_SL': 1.0 if data['pitchType'] == 'slider' else 0.0
        # Add other features as needed
    }

    # Calculate probabilities
    class_scores = {class_value: math.log(prob) for class_value, prob in class_probs.items()}
    for feature, feature_value in features.items():
        for class_value in class_scores:
            prob = feature_probs[feature].get(class_value, math.log(1e-6))
            class_scores[class_value] += prob if feature_value == 1 else math.log1p(-math.exp(prob))

    # Determine the class with the highest probability
    predicted_class = max(class_scores, key=class_scores.get)
    print(predicted_class)
    return jsonify({'prediction': predicted_class})

if __name__ == "__main__":
    app.run(debug=True, port=5002) 


# if __name__ == "__main__":
#     main()
