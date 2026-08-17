from flask import Blueprint, jsonify, request
import json
import os

offers_bp = Blueprint('offers', __name__, url_prefix='/api/offers')

# Load offers data
base_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
offers_path = os.path.join(base_dir, 'data', 'offers.json')

with open(offers_path, 'r') as f:
    offers_data = json.load(f)

@offers_bp.route('/', methods=['GET'])
def get_all_offers():
    """Get all offers"""
    return jsonify({
        "success": True,
        "total": len(offers_data['offers']),
        "offers": offers_data['offers']
    }), 200

@offers_bp.route('/card/<card_id>', methods=['GET'])
def get_offers_by_card(card_id):
    """Get all offers for a specific card"""
    filtered = [
        o for o in offers_data['offers']
        if o['cardId'] == card_id
    ]
    return jsonify({
        "success": True,
        "cardId": card_id,
        "total": len(filtered),
        "offers": filtered
    }), 200

@offers_bp.route('/outlet/<outlet>', methods=['GET'])
def get_offers_by_outlet(outlet):
    """Get all card offers for a specific outlet"""
    filtered = [
        o for o in offers_data['offers']
        if o['outlet'].lower() == outlet.lower()
    ]
    return jsonify({
        "success": True,
        "outlet": outlet,
        "total": len(filtered),
        "offers": filtered
    }), 200

@offers_bp.route('/category/<category>', methods=['GET'])
def get_offers_by_category(category):
    """Get all offers in a specific category"""
    filtered = [
        o for o in offers_data['offers']
        if o['category'].lower() == category.lower()
    ]
    return jsonify({
        "success": True,
        "category": category,
        "total": len(filtered),
        "offers": filtered
    }), 200

@offers_bp.route('/bank/<bank>', methods=['GET'])
def get_offers_by_bank(bank):
    """Get all offers by bank name"""
    filtered = [
        o for o in offers_data['offers']
        if o['bank'].lower() == bank.lower()
    ]
    return jsonify({
        "success": True,
        "bank": bank,
        "total": len(filtered),
        "offers": filtered
    }), 200