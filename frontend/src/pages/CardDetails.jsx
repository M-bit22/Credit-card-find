import { useEffect, useState } from 'react'
import { getOffersByCard } from '../services/api'

function CardDetails({ card, onBack }) {
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadOffers() {
            try {
                setLoading(true)

                const data = await getOffersByCard(card.id)

                setOffers(data)
            } catch (err) {
                console.error(err)
                setError('Unable to load offers for this card.')
            } finally {
                setLoading(false)
            }
        }

        loadOffers()
    }, [card.id])

    return (
        <main className="min-h-screen bg-[#0B0E13] p-8">

            {/* Back button */}
            <button
                onClick={onBack}
                className="mb-6 text-sm text-[#9AA3AE] transition hover:text-[#E6E8EB]"
            >
                ← Back to dashboard
            </button>

            {/* Card header */}
            <section className="rounded-2xl border border-white/[0.06] bg-[#11151C] p-6">

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#6366F1]/10 text-lg font-bold text-[#818CF8]">
                            {card.bank
                                .split(' ')
                                .map((word) => word[0])
                                .join('')
                                .slice(0, 2)
                                .toUpperCase()}
                        </div>

                        <div>
                            <p className="text-sm text-[#9AA3AE]">
                                {card.bank}
                            </p>

                            <h1 className="mt-1 text-2xl font-semibold text-[#E6E8EB]">
                                {card.name}
                            </h1>

                            <p className="mt-1 text-sm text-[#9AA3AE]">
                                {card.type} · {card.category}
                            </p>
                        </div>

                    </div>

                    <div>
                        <p className="text-sm text-[#9AA3AE]">
                            Annual Fee
                        </p>

                        <p className="mt-1 text-xl font-semibold text-[#E6E8EB]">
                            PKR {card.annualFee.toLocaleString()}
                        </p>
                    </div>

                </div>

                {/* Features */}
                <div className="mt-6 border-t border-white/[0.06] pt-5">

                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#9AA3AE]">
                        Card benefits
                    </p>

                    <div className="flex flex-wrap gap-2">

                        {card.features.map((feature, index) => (
                            <span
                                key={index}
                                className="rounded-lg bg-[#0B0E13] px-3 py-2 text-sm text-[#E6E8EB]"
                            >
                                {feature}
                            </span>
                        ))}

                    </div>

                </div>

            </section>

            {/* Offers */}
            <section className="mt-8">

                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-[#E6E8EB]">
                        Available offers
                    </h2>

                    <p className="mt-1 text-sm text-[#9AA3AE]">
                        Discounts currently available with this card.
                    </p>
                </div>

                {loading && (
                    <p className="text-[#9AA3AE]">
                        Loading offers...
                    </p>
                )}

                {error && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {!loading && !error && offers.length === 0 && (
                    <div className="rounded-xl border border-white/[0.06] bg-[#11151C] p-6 text-[#9AA3AE]">
                        No offers are currently available for this card.
                    </div>
                )}

                {!loading && !error && offers.length > 0 && (

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                        {offers.map((offer) => (

                            <div
                                key={offer.offerId}
                                className="rounded-2xl border border-white/[0.06] bg-[#11151C] p-5 transition hover:bg-[#171C24]"
                            >

                                <div className="flex items-start justify-between gap-3">

                                    <div>
                                        <p className="text-lg font-semibold text-[#E6E8EB]">
                                            {offer.outlet}
                                        </p>

                                        <p className="mt-1 text-sm text-[#9AA3AE]">
                                            {offer.category}
                                        </p>
                                    </div>

                                    <span className="rounded-lg bg-[#22C55E]/10 px-3 py-2 text-lg font-bold text-[#22C55E]">
                                        {offer.discount}%
                                    </span>

                                </div>

                                <div className="mt-5 border-t border-white/[0.06] pt-4">

                                    <p className="text-xs text-[#9AA3AE]">
                                        Valid until
                                    </p>

                                    <p className="mt-1 text-sm text-[#E6E8EB]">
                                        {offer.validity}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </main>
    )
}

export default CardDetails