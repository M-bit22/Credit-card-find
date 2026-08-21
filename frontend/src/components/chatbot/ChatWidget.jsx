import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'


function ChatWidget() {
    const messagesEndRef = useRef(null)
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: 'Hi! I can help you find credit cards and discounts.',
        },
    ])

    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        })
    }, [messages, loading])

    async function sendMessage() {
        const question = input.trim()

        if (!question || loading) {
            return
        }

        setMessages((prev) => [
            ...prev,
            {
                role: 'user',
                text: question,
            },
        ])

        setInput('')
        setLoading(true)

        try {
            const response = await fetch(
                'http://localhost:5000/api/chatbot/ask',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question,
                    }),
                }
            )

            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Unable to get response.')
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    text: data.answer,
                },
            ])
        } catch (error) {
            console.error(error)

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    text: 'Sorry, I could not connect to the AI assistant.',
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

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

                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={
                            message.role === 'user'
                                ? 'ml-8 rounded-xl bg-[#6366F1] p-4'
                                : 'rounded-xl bg-[#171C24] p-4'
                        }
                    >
                        {message.role === 'assistant' ? (
                            <div className="text-sm leading-6 text-[#E6E8EB]">
                                <ReactMarkdown>
                                    {message.text}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <p className="text-sm leading-6 text-white">
                                {message.text}
                            </p>
                        )}


                    </div>
                ))}

                {/* Loading */}
                {loading && (
                    <div className="rounded-xl bg-[#171C24] p-4">
                        <p className="text-sm text-[#9AA3AE]">
                            Thinking...
                        </p>
                    </div>

                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/5 p-4">

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0B0E13] p-2">

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about cards..."
                        disabled={loading}
                        className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-[#E6E8EB] outline-none placeholder:text-[#9AA3AE] disabled:opacity-50"
                    />

                    <button
                        type="button"
                        onClick={sendMessage}
                        disabled={loading || !input.trim()}
                        className="rounded-lg bg-[#6366F1] px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Send
                    </button>

                </div>

            </div>

        </aside>
    )
}

export default ChatWidget