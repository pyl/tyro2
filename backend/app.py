from flask import Flask, jsonify, request
from ai_model.classify import classify_activity


app = Flask(__name__)

@app.route('/classify', methods=['POST'])
def classify():
    data = request.json
    activity_description = data['activity_description']
    goal = data['goal']
    result = classify_activity(activity_description, goal)
    return jsonify({"is_productive": result})

@app.route('/')
def home():
    return "Hello, Tyro!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)