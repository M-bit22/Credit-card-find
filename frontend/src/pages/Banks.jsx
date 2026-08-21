import { useEffect, useState } from 'react'
import { getCards, getOffers } from '../services/api'

function Banks() {
    const [cards, setCards] = useState([])
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

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
                setError('Unable to load bank data.')
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    const banks = [...new Set(cards.map((card) => card.bank))]

    function getBankCards(bank) {
        return cards.filter((card) => card.bank === bank)
    }

    function getBankOffers(bank) {
        return offers.filter((offer) => offer.bank === bank)
    }

    return (
        <main className="min-h-screen bg-[#0B0E13] p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-[#E6E8EB]">
                    Banks
                </h1>

                <p className="mt-2 text-[#9AA3AE]">
                    Explore credit cards and discounts offered by Pakistani banks.
                </p>
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
                        Loading banks...
                    </p>
                </div>
            ) : (
                <>
                    {/* Bank count */}
                    <div className="mb-5">
                        <h2 className="text-xl font-semibold text-[#E6E8EB]">
                            Available Banks
                        </h2>

                        <p className="mt-1 text-sm text-[#9AA3AE]">
                            {banks.length} banks available
                        </p>
                    </div>

                    {/* Banks */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {banks.map((bank) => {
                            const bankCards = getBankCards(bank)
                            const bankOffers = getBankOffers(bank)

                            const initials = bank
                                .split(' ')
                                .map((word) => word[0])
                                .join('')
                                .slice(0, 2)
                                .toUpperCase()

                            return (
                                <div
                                    key={bank}
                                    className="rounded-2xl border border-white/[0.06] bg-[#11151C] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-[#171C24]"
                                >

                                    {/* Bank identity */}
                                    <div className="flex items-center gap-3">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6366F1]/10 text-sm font-bold text-[#818CF8]">
                                            {initials}
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold text-[#E6E8EB]">
                                                {bank}
                                            </h3>

                                            <p className="mt-1 text-sm text-[#9AA3AE]">
                                                {bankCards.length} card{bankCards.length !== 1 ? 's' : ''}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Statistics */}
                                    <div className="mt-5 grid grid-cols-2 gap-3">

                                        <div className="rounded-xl border border-white/[0.06] bg-[#0B0E13] p-3">
                                            <p className="text-xs text-[#9AA3AE]">
                                                Cards
                                            </p>

                                            <p className="mt-1 text-xl font-semibold text-[#E6E8EB]">
                                                {bankCards.length}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-white/[0.06] bg-[#0B0E13] p-3">
                                            <p className="text-xs text-[#9AA3AE]">
                                                Offers
                                            </p>

                                            <p className="mt-1 text-xl font-semibold text-[#22C55E]">
                                                {bankOffers.length}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Card names */}
                                    <div className="mt-5 border-t border-white/[0.06] pt-4">

                                        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#9AA3AE]">
                                            Available cards
                                        </p>

                                        <div className="space-y-2">
                                            {bankCards.map((card) => (
                                                <div
                                                    key={card.id}
                                                    className="text-sm text-[#E6E8EB]"
                                                >
                                                    {card.name}
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                </div>
                            )
                        })}

                    </div>
                </>
            )}

        </main>
    )
}

export default Banks