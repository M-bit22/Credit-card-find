from flask import Blueprint, jsonify, request
import json
import os

cards_bp = Blueprint('cards', __name__, url_prefix='/api/cards')

# Load card data
base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
cards_path = os.path.join(base_dir, 'data', 'cards.json')

with open(cards_path, 'r') as f:
    cards_data = json.load(f)

@cards_bp.route('/', methods=['GET'])
def get_all_cards():
    """Get all credit cards"""
    return jsonify({
        "success": True,
        "total": len(cards_data['cards']),
        "cards": cards_data['cards']
    }), 200

@cards_bp.route('/type/<card_type>', methods=['GET'])
def get_cards_by_type(card_type):
    """Get cards by type - Visa or Mastercard"""
    filtered = [
        c for c in cards_data['cards']
        if c['type'].lower() == card_type.lower()
    ]
    return jsonify({
        "success": True,
        "type": card_type,
        "total": len(filtered),
        "cards": filtered
    }), 200

@cards_bp.route('/bank/<bank>', methods=['GET'])
def get_cards_by_bank(bank):
    """Get cards by bank name"""
    filtered = [
        c for c in cards_data['cards']
        if c['bank'].lower() == bank.lower()
    ]
    return jsonify({
        "success": True,
        "bank": bank,
        "total": len(filtered),
        "cards": filtered
    }), 200

@cards_bp.route('/<card_id>', methods=['GET'])
def get_card_by_id(card_id):
    """Get a specific card by ID"""
    card = next(
        (c for c in cards_data['cards'] if c['id'] == card_id),
        None
    )
    if not card:
        return jsonify({
            "success": False,
            "error": "Card not found"
        }), 404
    return jsonify({
        "success": True,
        "card": card
    }), 200