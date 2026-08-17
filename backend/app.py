from flask import Flask, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from routes.cards import cards_bp
from routes.offers import offers_bp

load_dotenv()

app = Flask(__name__)
CORS(app)

# Environment Variables
MONGODB_URI = os.getenv("MONGODB_URI")
GEMINI_KEY = os.getenv("GEMINI_KEY")
GROQ_KEY = os.getenv("GROQ_KEY")

print("✓ Flask app started")
print(f"✓ MongoDB connected: {bool(MONGODB_URI)}")
print(f"✓ Gemini Key exists: {bool(GEMINI_KEY)}")
print(f"✓ Groq Key exists: {bool(GROQ_KEY)}")

# Register Routes
app.register_blueprint(cards_bp)
app.register_blueprint(offers_bp)

# Home Route
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "Credit Card Finder API is running!",
        "version": "1.0",
        "endpoints": {
            "/api/cards": "Get all credit cards",
            "/api/cards/type/Visa": "Get Visa cards",
            "/api/cards/type/Mastercard": "Get Mastercard cards",
            "/api/cards/bank/HBL": "Get HBL cards",
            "/api/offers": "Get all offers",
            "/api/offers/card/hbl_visa_platinum": "Get offers by card",
            "/api/offers/outlet/McDonalds": "Get offers by outlet",
            "/api/offers/category/Food & Dining": "Get offers by category",
            "/api/offers/bank/HBL": "Get offers by bank"
        }
    }), 200

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"}), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Route not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Server error"}), 500

if __name__ == '__main__':
    print("\n Starting Credit Card Finder API...\n")
    app.run(host='0.0.0.0', port=5000, debug=True)