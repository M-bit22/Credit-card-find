function ChatWidget() {
    return (
        <aside className="flex h-screen w-80 flex-col border-l border-white/5 bg-[#11151C]">

            {/* Header */}
            <div className="flex h-20 items-center border-b border-white/5 px-5">

                <div>
                    <h2 className="font-semibold text-[#E6E8EB]">
                        AI Assistant
                    </h2>

                    <p className="text-xs text-[#9AA3AE]">
                        Find the right card & offer
                    </p>
                </div>

            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">

                {/* AI message */}
                <div className="rounded-xl bg-[#171C24] p-4">
                    <p className="text-sm leading-6 text-[#E6E8EB]">
                        Hi! I can help you find credit cards and discounts.
                    </p>
                </div>

                {/* User message */}
                <div className="ml-8 rounded-xl bg-[#6366F1] p-4">
                    <p className="text-sm leading-6 text-white">
                        Which card has the best dining discount?
                    </p>
                </div>

                {/* AI response */}
                <div className="rounded-xl bg-[#171C24] p-4">
                    <p className="text-sm leading-6 text-[#E6E8EB]">
                        I can help you compare dining offers across Pakistani banks.
                    </p>
                </div>

            </div>

            {/* Input */}
            <div className="border-t border-white/5 p-4">

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0B0E13] p-2">

                    <input
                        type="text"
                        placeholder="Ask about cards..."
                        className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-[#E6E8EB] outline-none placeholder:text-[#9AA3AE]"
                    />

                    <button className="rounded-lg bg-[#6366F1] px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
                        Send
                    </button>

                </div>

            </div>

        </aside>
    )
}

export default ChatWidget