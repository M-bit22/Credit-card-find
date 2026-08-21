import { useEffect, useState } from 'react'
import { getOffers } from '../services/api'
import OfferTile from '../components/offers/OfferTile'


function Offers() {
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedBank, setSelectedBank] = useState('All')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedOutlet, setSelectedOutlet] = useState('All')
    const filteredOffers = offers.filter((offer) => {
        const bankMatch =
            selectedBank === 'All' || offer.bank === selectedBank

        const categoryMatch =
            selectedCategory === 'All' || offer.category === selectedCategory

        const outletMatch =
            selectedOutlet === 'All' || offer.outlet === selectedOutlet

        return bankMatch && categoryMatch && outletMatch
    })

    useEffect(() => {
        async function loadOffers() {
            try {
                setLoading(true)

                const data = await getOffers()

                setOffers(data)
            } catch (err) {
                console.error(err)
                setError('Unable to load offers.')
            } finally {
                setLoading(false)
            }
        }

        loadOffers()
    }, [])

    return (
        <main className="min-h-screen bg-[#0B0E13] p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-[#E6E8EB]">
                    All Offers
                </h1>

                <p className="mt-2 text-[#9AA3AE]">
                    Browse all available credit card discounts and offers.
                </p>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                </div>
            )}
            {/* Filters */}
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">

                {/* Bank */}
                <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="rounded-xl border border-white/10 bg-[#11151C] px-4 py-3 text-sm text-[#E6E8EB] outline-none focus:border-[#6366F1]"
                >
                    <option value="All">All Banks</option>

                    {[...new Set(offers.map((offer) => offer.bank))].map((bank) => (
                        <option key={bank} value={bank}>
                            {bank}
                        </option>
                    ))}
                </select>

                {/* Category */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="rounded-xl border border-white/10 bg-[#11151C] px-4 py-3 text-sm text-[#E6E8EB] outline-none focus:border-[#6366F1]"
                >
                    <option value="All">All Categories</option>

                    {[...new Set(offers.map((offer) => offer.category))].map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* Outlet */}
                <select
                    value={selectedOutlet}
                    onChange={(e) => setSelectedOutlet(e.target.value)}
                    className="rounded-xl border border-white/10 bg-[#11151C] px-4 py-3 text-sm text-[#E6E8EB] outline-none focus:border-[#6366F1]"
                >
                    <option value="All">All Outlets</option>

                    {[...new Set(offers.map((offer) => offer.outlet))].map((outlet) => (
                        <option key={outlet} value={outlet}>
                            {outlet}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={() => {
                        setSelectedBank('All')
                        setSelectedCategory('All')
                        setSelectedOutlet('All')
                    }}
                    className="rounded-xl border border-white/10 bg-[#11151C] px-4 py-3 text-sm font-medium text-[#9AA3AE] transition hover:border-[#6366F1]/50 hover:bg-[#171C24] hover:text-[#E6E8EB]"
                >
                    Clear Filters
                </button>

            </div>

            {/* Loading */}
            {loading ? (
                <div className="flex min-h-64 items-center justify-center">
                    <p className="text-[#9AA3AE]">
                        Loading offers...
                    </p>
                </div>
            ) : (
                <>
                    {/* Offer count */}
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-[#E6E8EB]">
                                Available Offers
                            </h2>

                            <p className="mt-1 text-sm text-[#9AA3AE]">
                                Find discounts from banks and popular outlets.
                            </p>
                        </div>

                        <span className="text-sm text-[#9AA3AE]">
                            {filteredOffers.length} offers
                        </span>
                    </div>

                    {/* Offers */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {filteredOffers.map((offer) => (
                            <OfferTile
                                key={offer.offerId}
                                offer={offer}
                            />
                        ))}
                    </div>
                </>
            )}

        </main>
    )
}

export default Offers