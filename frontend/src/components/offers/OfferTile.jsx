function OfferTile({ offer }) {
    return (
        <div className="group rounded-2xl border border-white/[0.06] bg-[#11151C] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-[#171C24]">

            {/* Top */}
            <div className="flex items-start justify-between gap-4">

                <div>
                    <p className="text-lg font-semibold text-[#E6E8EB]">
                        {offer.outlet}
                    </p>

                    <p className="mt-1 text-sm text-[#9AA3AE]">
                        {offer.bank}
                    </p>
                </div>

                {/* Discount */}
                <div className="shrink-0 rounded-xl bg-[#22C55E]/10 px-3 py-2 text-right">
                    <p className="text-2xl font-bold leading-none text-[#22C55E]">
                        {offer.discount}%
                    </p>

                    <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[#22C55E]/70">
                        OFF
                    </p>
                </div>

            </div>

            {/* Card */}
            <div className="mt-5">

                <p className="text-xs font-medium uppercase tracking-wider text-[#9AA3AE]">
                    Card
                </p>

                <p className="mt-1 text-sm text-[#E6E8EB]">
                    {offer.cardName}
                </p>

            </div>

            {/* Category + validity */}
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">

                <span className="rounded-lg bg-[#0B0E13] px-3 py-1.5 text-xs text-[#9AA3AE]">
                    {offer.category}
                </span>

                <span className="text-xs text-[#9AA3AE]">
                    Until {offer.validity}
                </span>

            </div>

        </div>
    )
}

export default OfferTile