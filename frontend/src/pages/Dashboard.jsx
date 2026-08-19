function Dashboard() {
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

      {/* Featured Offers */}
      <div className="rounded-2xl border border-white/5 bg-[#11151C] p-8">

        <h2 className="text-xl font-semibold text-[#E6E8EB]">
          Featured Offers
        </h2>

        <p className="mt-2 text-[#9AA3AE]">
          Your card offers will appear here.
        </p>

      </div>

    </main>
  )
}

export default Dashboard