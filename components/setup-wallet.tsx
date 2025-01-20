"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroVideoDialog from "./ui/hero-video-dialog";

const HowToSetupHelperWallet = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="bg-[#1A1A1A] flex flex-col items-center py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 lg:mb-16 text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How To Setup Helper Wallet
      </motion.h1>

      <div className="relative max-w-5xl w-full">
        {/* Decorative dots */}
        <div className="absolute -top-8 md:-top-12 -right-4 md:-right-6 grid grid-cols-10 gap-1 md:gap-2">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#DC700059]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.01, duration: 0.2 }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 rounded-lg overflow-hidden shadow-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isClient && (
            <HeroVideoDialog
              className="w-full shadow-2xl aspect-video"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/H52xfW-8YZE"
              thumbnailSrc="/setup-wallet.png"
              thumbnailAlt="How to Setup Helper Wallet"
            />
          )}
          {!isClient && (
            <div className="w-full shadow-2xl aspect-video bg-gray-900 animate-pulse" />
          )}
        </motion.div>
      </div>

      {/* Additional information or steps could be added here */}
      <motion.div
        className="mt-10 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-lg md:text-xl mb-4">
          Follow our step-by-step guide to set up your Helper Wallet
        </p>
        <a
          href="#"
          className="inline-block bg-[#F5A64C] text-black font-semibold py-2 px-6 rounded-full hover:bg-[#E89539] transition-colors duration-300"
        >
          Get Started
        </a>
      </motion.div>
    </section>
  );
};

export default HowToSetupHelperWallet;
