import React from 'react'

const HowToSetupHelperWallet = () => {
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex flex-col items-center p-8 relative overflow-hidden">
      {/* Decorative dots pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 grid grid-cols-3 gap-2 p-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#D97706] opacity-40" />
        ))}
      </div>

      {/* Title */}
      <h1 className="text-white text-5xl font-bold mb-16 mt-8 text-center">
        How To Setup Helper Wallet
      </h1>

      {/* Main Card */}
      <div className="relative w-full max-w-3xl aspect-video bg-[#1E293B] rounded-2xl overflow-hidden">
        {/* Diagonal stripes */}
        <div className="absolute -left-4 top-0 w-32 h-full bg-black/20 transform -skew-x-12" />
        <div className="absolute -right-4 bottom-0 w-32 h-full bg-black/20 transform -skew-x-12" />

        {/* Plus decoration */}
        <div className="absolute top-4 right-4 text-[#D97706] text-4xl font-bold">+</div>

        {/* Centered video icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-[#D97706] rounded-xl flex items-center justify-center">
            <div className="text-black text-6xl">▶</div>
          </div>
        </div>

        {/* Yellow accent lines */}
        <div className="absolute left-8 top-8 w-12 h-1 bg-[#D97706]" />
        <div className="absolute right-8 bottom-8 w-12 h-1 bg-[#D97706]" />
      </div>
    </div>
  );
}

export default HowToSetupHelperWallet