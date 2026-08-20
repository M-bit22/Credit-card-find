const API_BASE_URL = 'http://localhost:5000'

export async function getCards() {
    const response = await fetch(`${API_BASE_URL}/api/cards`)

    if (!response.ok) {
        throw new Error('Failed to fetch cards')
    }

    const data = await response.json()

    return data.cards
}

export async function getOffers() {
    const response = await fetch(`${API_BASE_URL}/api/offers`)

    if (!response.ok) {
        throw new Error('Failed to fetch offers')
    }

    const data = await response.json()

    return data.offers
}
export async function getOffersByCard(cardId) {
    const response = await fetch(
        `${API_BASE_URL}/api/offers/card/${cardId}`
    )

    if (!response.ok) {
        throw new Error('Failed to fetch card offers')
    }

    const data = await response.json()

    return data.offers
}