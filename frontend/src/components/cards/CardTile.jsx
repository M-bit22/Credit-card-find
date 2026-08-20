function CardTile({ card, maxDiscount, onViewOffers }) {
    const bankInitials = card.bank
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    return (
        <div className="group rounded-2xl border border-white/[0.06] bg-[#11151C] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-[#171C24]">

            {/* Top section */}
            <div className="flex items-start justify-between gap-4">

                {/* Bank identity */}
                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6366F1]/10 text-sm font-bold text-[#818CF8]">
                        {bankInitials}
                    </div>

                    <div>
                        <p className="text-sm font-medium text-[#9AA3AE]">
                            {card.bank}
                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-[#E6E8EB]">
                            {card.name}
                        </h3>
                    </div>

                </div>

                {/* Discount */}
                {maxDiscount > 0 && (
                    <div className="shrink-0 rounded-xl bg-[#22C55E]/10 px-3 py-2 text-right">
                        <p className="text-2xl font-bold leading-none text-[#22C55E]">
                            {maxDiscount}%
                        </p>

                        <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[#22C55E]/70">
                            OFF
                        </p>
                    </div>
                )}

            </div>

            {/* Card information */}
            <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-lg border border-white/[0.06] bg-[#0B0E13] px-3 py-1.5 text-xs font-medium text-[#9AA3AE]">
                    {card.type}
                </span>

                <span className="rounded-lg border border-white/[0.06] bg-[#0B0E13] px-3 py-1.5 text-xs font-medium text-[#9AA3AE]">
                    {card.category}
                </span>

                <span className="rounded-lg border border-white/[0.06] bg-[#0B0E13] px-3 py-1.5 text-xs font-medium text-[#9AA3AE]">
                    Annual fee: PKR {card.annualFee.toLocaleString()}
                </span>

            </div>

            {/* Features */}
            <div className="mt-5">

                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#9AA3AE]">
                    Key benefits
                </p>

                <div className="flex flex-wrap gap-2">

                    {card.features.map((feature, index) => (
                        <span
                            key={index}
                            className="text-sm text-[#E6E8EB]"
                        >
                            {index > 0 && (
                                <span className="mx-2 text-[#9AA3AE]">
                                    •
                                </span>
                            )}

                            {feature}
                        </span>
                    ))}

                </div>

            </div>

            {/* Bottom action */}
            <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">

                <span className="text-xs text-[#9AA3AE]">
                    {maxDiscount > 0
                        ? `Up to ${maxDiscount}% discount`
                        : 'No active offers'}
                </span>

                <button
                    type="button"
                    onClick={onViewOffers}
                    className="rounded-lg bg-[#6366F1] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5558D9]"
                >
                    View offers
                </button>

            </div>

        </div>
    )
}

export default CardTile