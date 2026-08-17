from flask import Blueprint, jsonify, request
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
import json
import os

# Load environment variables FIRST before anything else
load_dotenv()

chatbot_bp = Blueprint('chatbot', __name__, url_prefix='/api/chatbot')

# Load data
base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
cards_path = os.path.join(base_dir, 'data', 'cards.json')
offers_path = os.path.join(base_dir, 'data', 'offers.json')

with open(cards_path, 'r') as f:
    cards_data = json.load(f)

with open(offers_path, 'r') as f:
    offers_data = json.load(f)

# Get Groq key AFTER loading .env
GROQ_KEY = os.getenv("GROQ_KEY")
print(f"Groq Key loaded: {bool(GROQ_KEY)}")

# Initialize Groq LLM
llm = ChatGroq(
    api_key=GROQ_KEY,
    model="openai/gpt-oss-120b"
)

# System prompt
system_prompt = """You are a helpful credit card advisor for Pakistani bank customers.
You help users find the best credit card discounts and offers.

You have access to the following credit cards and offers data:

CREDIT CARDS:
{cards}

AVAILABLE OFFERS:
{offers}

RULES:
1. Only answer questions related to credit cards, discounts, and offers
2. Always mention the card name and bank when recommending
3. Always mention the exact discount percentage
4. Always mention the outlet name
5. Be specific and helpful
6. If asked about something not in the data, say you don't have that information
7. Keep answers short and clear
8. Never give financial investment advice"""

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{question}")
])

chain = prompt | llm | StrOutputParser()

def prepare_context():
    """Prepare cards and offers as readable text"""
    cards_text = ""
    for card in cards_data['cards']:
        cards_text += f"- {card['name']} ({card['bank']}) | Type: {card['type']} | Annual Fee: Rs.{card['annualFee']} | Features: {', '.join(card['features'])}\n"

    offers_text = ""
    for offer in offers_data['offers']:
        offers_text += f"- {offer['cardName']} ({offer['bank']}): {offer['discount']}% discount at {offer['outlet']} | Category: {offer['category']}\n"

    return cards_text, offers_text

@chatbot_bp.route('/ask', methods=['POST'])
def ask():
    """Ask chatbot a question about credit cards"""
    try:
        data = request.get_json()

        if not data or 'question' not in data:
            return jsonify({
                "success": False,
                "error": "Please provide a question"
            }), 400

        user_question = data['question'].strip()

        if not user_question:
            return jsonify({
                "success": False,
                "error": "Question cannot be empty"
            }), 400

        # Prepare context
        cards_text, offers_text = prepare_context()

        # Get answer from LLM
        answer = chain.invoke({
            "question": user_question,
            "cards": cards_text,
            "offers": offers_text
        })

        return jsonify({
            "success": True,
            "question": user_question,
            "answer": answer
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500