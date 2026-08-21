function Sidebar({ activePage, setActivePage }) {
    return (
        <aside className="flex h-screen w-64 flex-col border-r border-white/5 bg-[#11151C]">

            {/* Logo */}
            <div className="flex h-20 items-center border-b border-white/5 px-6">
                <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6366F1] font-bold text-white">
                        C
                    </div>

                    <span className="text-lg font-semibold text-[#E6E8EB]">
                        CardFind
                    </span>

                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-3 py-6">

                {/* Dashboard */}
                <button
                    onClick={() => setActivePage('dashboard')}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${activePage === 'dashboard'
                        ? 'bg-[#171C24] text-[#E6E8EB]'
                        : 'text-[#9AA3AE] hover:bg-[#171C24] hover:text-[#E6E8EB]'
                        }`}
                >
                    <span>⌂</span>
                    Dashboard
                </button>

                {/* Cards */}
                <button
                    onClick={() => setActivePage('cards')}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm ${activePage === 'cards'
                            ? 'bg-[#171C24] text-[#E6E8EB]'
                            : 'text-[#9AA3AE] hover:bg-[#171C24] hover:text-[#E6E8EB]'
                        }`}
                >
                    <span>▣</span>
                    Cards
                </button>

                {/* Offers */}
                <button
                    onClick={() => setActivePage('offers')}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm ${activePage === 'offers'
                        ? 'bg-[#171C24] text-[#E6E8EB]'
                        : 'text-[#9AA3AE] hover:bg-[#171C24] hover:text-[#E6E8EB]'
                        }`}
                >




                    <span>％</span>
                    Offers
                </button>

                {/* Banks */}
                <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#9AA3AE] hover:bg-[#171C24] hover:text-[#E6E8EB]">
                    <span>◉</span>
                    Banks
                </button>

            </nav>

            {/* Settings */}
            <div className="border-t border-white/5 p-3">

                <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-[#9AA3AE] hover:bg-[#171C24] hover:text-[#E6E8EB]">
                    <span>⚙</span>
                    Settings
                </button>

            </div>

        </aside>
    )
}

export default Sidebar