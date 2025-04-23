
from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Load training data
with open("data/faqs.json") as f:
    data = json.load(f)

@app.route("/chat", methods=["POST"])
def chat():
    message = request.json.get("message", "").lower()
    
    # First check in personality
    for key in data["personality"]:
        if key.lower() in message:
            return jsonify({"reply": data["personality"][key]})
    
    # Then check FAQs
    for key in data["faqs"]:
        if key.lower() in message:
            return jsonify({"reply": data["faqs"][key]})
    
    return jsonify({"reply": "I'm not sure about that, but I'm learning more every day!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
