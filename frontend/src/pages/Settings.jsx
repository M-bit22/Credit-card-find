function Settings() {
    return (
        <main className="min-h-screen bg-[#0B0E13] p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-[#E6E8EB]">
                    Settings
                </h1>

                <p className="mt-2 text-[#9AA3AE]">
                    Manage your CardFind preferences.
                </p>
            </div>

            {/* Settings cards */}
            <div className="max-w-3xl space-y-5">

                {/* Appearance */}
                <section className="rounded-2xl border border-white/[0.06] bg-[#11151C] p-6">

                    <h2 className="text-lg font-semibold text-[#E6E8EB]">
                        Appearance
                    </h2>

                    <p className="mt-1 text-sm text-[#9AA3AE]">
                        Customize how CardFind looks.
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-5">

                        <div>
                            <p className="text-sm font-medium text-[#E6E8EB]">
                                Dark mode
                            </p>

                            <p className="mt-1 text-xs text-[#9AA3AE]">
                                Use the dark interface across CardFind.
                            </p>
                        </div>

                        <div className="rounded-full bg-[#6366F1] px-4 py-2 text-xs font-medium text-white">
                            Enabled
                        </div>

                    </div>

                </section>

                {/* Account */}
                <section className="rounded-2xl border border-white/[0.06] bg-[#11151C] p-6">

                    <h2 className="text-lg font-semibold text-[#E6E8EB]">
                        Account
                    </h2>

                    <p className="mt-1 text-sm text-[#9AA3AE]">
                        Application information.
                    </p>

                    <div className="mt-5 space-y-4 border-t border-white/[0.06] pt-5">

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#9AA3AE]">
                                Application
                            </span>

                            <span className="text-sm font-medium text-[#E6E8EB]">
                                CardFind
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#9AA3AE]">
                                Version
                            </span>

                            <span className="text-sm font-medium text-[#E6E8EB]">
                                1.0.0
                            </span>
                        </div>

                    </div>

                </section>

            </div>

        </main>
    )
}

export default Settings