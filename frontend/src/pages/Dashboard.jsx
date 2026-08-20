import { useEffect, useState } from 'react'
import CardTile from '../components/cards/CardTile'
import { getCards, getOffers } from '../services/api'
import CardDetails from './CardDetails'

function Dashboard() {
    const [cards, setCards] = useState([])
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedCard, setSelectedCard] = useState(null)

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true)

                const [cardsData, offersData] = await Promise.all([
                    getCards(),
                    getOffers(),
                ])

                setCards(cardsData)
                setOffers(offersData)
            } catch (err) {
                console.error(err)
                setError('Unable to load card data.')
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    function getMaxDiscount(cardId) {
        const cardOffers = offers.filter(
            (offer) => offer.cardId === cardId
        )

        if (cardOffers.length === 0) {
            return 0
        }

        return Math.max(
            ...cardOffers.map((offer) => Number(offer.discount))
        )
    }

    if (selectedCard) {
        return (
            <CardDetails
                card={selectedCard}
                onBack={() => setSelectedCard(null)}
            />
        )
    }

    return (
        <main className="min-h-screen bg-[#0B0E13] p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-[#E6E8EB]">
                    Find your perfect card
                </h1>

                <p className="mt-2 text-[#9AA3AE]">
                    Discover the best credit card discounts and offers.
                </p>
            </div>

            {/* Search */}
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search cards, banks or outlets..."
                    className="w-full rounded-xl border border-white/10 bg-[#11151C] px-5 py-4 text-[#E6E8EB] outline-none placeholder:text-[#9AA3AE] focus:border-[#6366F1]"
                />
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="flex min-h-64 items-center justify-center">
                    <p className="text-[#9AA3AE]">
                        Loading cards...
                    </p>
                </div>
            ) : (
                <section>

                    {/* Section heading */}
                    <div className="mb-5 flex items-end justify-between">

                        <div>
                            <h2 className="text-xl font-semibold text-[#E6E8EB]">
                                Popular Cards
                            </h2>

                            <p className="mt-1 text-sm text-[#9AA3AE]">
                                Explore cards with the best available discounts.
                            </p>
                        </div>

                        <span className="text-sm text-[#9AA3AE]">
                            {cards.length} cards
                        </span>

                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                        {cards.map((card) => (
                            <CardTile
                                key={card.id}
                                card={card}
                                maxDiscount={getMaxDiscount(card.id)}
                                onViewOffers={() => setSelectedCard(card)}
                            />
                        ))}

                    </div>

                </section>
            )}

        </main>
    )
}

export default Dashboard