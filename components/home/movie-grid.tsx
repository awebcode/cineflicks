"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Img } from "../common/Img";

// Generate array of 36 image paths
const moviePosters = Array.from({ length: 36 }, (_, i) => `/movie/${i + 1}.png`);

// Split moviePosters into 9 columns, each containing 4 images
const columns = Array.from({ length: 9 }, (_, i) =>
  moviePosters.slice(i * 4, (i + 1) * 4)
);

export function MovieGrid({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full ", className)}>
      {/* Movie Grid */}
      <div className="grid grid-cols-9 gap-2 p-4 max-w-screen-2xl mx-auto">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-4">
            {column.map((poster, index) => (
              <motion.div
                key={poster}
              
                className="relative  rounded-lg overflow-hidden"
              >
                <Img
                  src={poster}
                  width={146}
                  height={142}
                  alt={"Cineflicks-hero-image"+index}
                  className="w-[146px] h-[142px] object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />
    </div>
  );
}
