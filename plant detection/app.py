from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS


# Load the trained model
model = joblib.load('crop_recommendation_model_new.pkl')

# Create the mapping dictionary
# Create the mapping dictionary
label_mapping = {
    0: "wheat",
    1: "barley",
    2: "corn",
    3: "cotton",
    4: "millet",
    5: "rice",
    6: "sorghum",
    7: "soybean",
    8: "sunflower",
    9: "rapeseed",
    10: "maize",
    11: "beans",
    12: "peas",
    13: "lentil",
    14: "chickpea",
    15: "alfalfa",
    16: "rye",
    17: "oats",
    18: "sugarcane",
    19: "potato",
    20: "sweet potato",
    21: "yam",
    22: "cassava",
    23: "tomato",
    24: "cabbage",
    25: "carrot",
    26: "onion",
    27: "garlic",
    28: "ginger",
    29: "turmeric",
    30: "pepper",
    31: "chili",
    32: "eggplant",
    33: "cucumber",
    34: "lettuce",
    35: "spinach",
    36: "broccoli",
    37: "cauliflower",
    38: "pumpkin",
    39: "squash",
    40: "melon",
    41: "watermelon",
    42: "apple",
    43: "banana",
    44: "mango",
    45: "papaya",
    46: "grape",
    47: "orange",
    48: "lemon",
    49: "lime",
    50: "pineapple",
    51: "coconut",
    52: "avocado",
    53: "peach",
    54: "plum",
    55: "pear",
    56: "apricot",
    57: "cherry",
    58: "strawberry",
    59: "raspberry",
    60: "blueberry",
    61: "blackberry",
    62: "cranberry",
    63: "kiwi",
    64: "pomegranate",
    65: "fig",
    66: "date",
    67: "olive",
    68: "almond",
    69: "walnut",
    70: "pecan",
    71: "hazelnut",
    72: "chestnut",
    73: "cashew",
    74: "pistachio",
    75: "macadamia",
    76: "tea",
    77: "coffee",
    78: "cocoa",
    79: "rubber",
    80: "tobacco",
    81: "hemp",
    82: "flax",
    83: "jute",
    84: "kenaf",
    85: "ramie",
    86: "coir",
    87: "sisal",
    88: "agave",
    89: "cottonseed",
    90: "linseed",
    91: "mustard",
    92: "peanut",
    93: "sunflower seed",
    94: "sesame",
    95: "soybean oil",
    96: "palm oil",
    97: "coconut oil",
    98: "olive oil",
    99: "castor oil"
}


# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Function to get top 3 crop predictions
def get_top_3_crops(model, input_data):
    probas = model.predict_proba([input_data])[0]
    top_3_indices = np.argsort(probas)[-3:][::-1]
    top_3_crops = [model.classes_[i] for i in top_3_indices]
    return top_3_crops

# Dummy functions to calculate expected values
def calculate_expected_yield(plant_variety, input_data):
    return round(np.random.uniform(5000, 10000), 2)

def calculate_cost_of_cultivation(plant_variety, input_data):
    return round(np.random.uniform(1000, 2000), 2)

def calculate_expected_market_price(plant_variety, input_data):
    return round(np.random.uniform(0.2, 0.5), 2)

def calculate_historical_profitability(plant_variety, input_data):
    return round(np.random.uniform(1500, 3000), 2)

# Define a route for the API
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    input_data = [
        data['N'],
        data['P'],
        data['K'],
        data['temperature'],
        data['humidity'],
        data['ph'],
        data['rainfall']
    ]
    top_3_encoded_crops = get_top_3_crops(model, input_data)
    top_3_crops = [label_mapping[int(crop)] for crop in top_3_encoded_crops]

    results = []
    for crop in top_3_crops:
        result = {
            'plantVariety': crop,
            'expectedYield': calculate_expected_yield(crop, input_data),
            'costOfCultivation': calculate_cost_of_cultivation(crop, input_data),
            'expectedMarketPrice': calculate_expected_market_price(crop, input_data),
            'historicalProfitability': calculate_historical_profitability(crop, input_data)
        }
        results.append(result)

    print(top_3_crops)
    return jsonify({'top_3_crops': top_3_crops, 'results': results})

if __name__ == '__main__':
    app.run(debug=True)