import { useEffect, useState } from 'react'
import { getCards, getOffers } from '../services/api'
import CardTile from '../components/cards/CardTile'
import CardDetails from './CardDetails'

function Cards() {
    const [cards, setCards] = useState([])
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
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
                setError('Unable to load cards.')
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

    const filteredCards = cards.filter((card) => {
        const search = searchTerm.toLowerCase().trim()

        if (!search) {
            return true
        }


        return (
            card.name.toLowerCase().includes(search) ||
            card.bank.toLowerCase().includes(search) ||
            card.type.toLowerCase().includes(search) ||
            card.category.toLowerCase().includes(search)
        )
    })
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
                    Credit Cards
                </h1>

                <p className="mt-2 text-[#9AA3AE]">
                    Browse all available credit cards and their benefits.
                </p>
            </div>

            {/* Search */}
            <div className="mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by card, bank, type or category..."
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
                <>

                    {/* Section heading */}
                    <div className="mb-5 flex items-end justify-between">

                        <div>
                            <h2 className="text-xl font-semibold text-[#E6E8EB]">
                                All Cards
                            </h2>

                            <p className="mt-1 text-sm text-[#9AA3AE]">
                                Compare cards from Pakistani banks.
                            </p>
                        </div>

                        <span className="text-sm text-[#9AA3AE]">
                            {filteredCards.length} cards
                        </span>

                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                        {filteredCards.map((card) => (
                            <CardTile
                                key={card.id}
                                card={card}
                                maxDiscount={getMaxDiscount(card.id)}
                                onViewOffers={() => setSelectedCard(card)}
                            />
                        ))}

                    </div>

                </>
            )}

        </main>
    )
}

export default Cards