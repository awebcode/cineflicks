"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Parachute } from "./parachute-icon";

const steps = [
  {
    number: 1,
    title: "DOWNLOAD FROM PLAYSTORE",
    description:
      "Visit the cineflicks web or our playstore. You'll need playstore. Download it",
  },
  {
    number: 2,
    title: "CREATE NEW WALLET",
    description:
      "Click connect wallet, confirm wallet each transaction, visit wallet or another wallet if you choose",
  },
  {
    number: 3,
    title: "KEEP YOUR PHRASES SAFE",
    description: "If you do not have them check back to your wallet",
  },
  {
    number: 4,
    title: "GET YOUR REFOP ADDRESS",
    description: "Connect your wallet to get started",
  },
];

export function WalletSteps() {
  return (
    <div className="min-h-screen bg-[#1A1614] p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="relative space-y-8 md:space-y-12">
          {/* Connecting Line */}
          <div className="absolute left-[28px] md:left-[36px] top-[60px] bottom-[60px] w-0.5 bg-[#F5A64C]/30" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative flex gap-4 md:gap-6"
            >
              {/* Number Circle with Parachute */}
              <div className="relative z-10">
                <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-full bg-[#F5A64C] flex items-center justify-center text-black font-bold text-xl md:text-2xl">
                  {step.number}
                </div>
                <div className="absolute -top-4 -right-2">
                  <Parachute className="w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>

              {/* Content Card */}
              <Card className="flex-1 bg-[#F5A64C]/10 border-[#F5A64C]/20 p-4 md:p-6">
                <h3 className="font-bold text-lg md:text-xl text-[#F5A64C] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
