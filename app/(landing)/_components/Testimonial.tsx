"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CelebrityData } from "@/constants/data";

const CelebrityThoughts = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Toggle expand/collapse
  const toggleExpand = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="bg-[#262626] py-16">
      <div className="container relative overflow-hidden">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold">
          Celebrity Thoughts!
        </h2>
        <div className="pt-6">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {CelebrityData.map((celebrity, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-[#202020] py-4 border border-[#262626]">
                      <CardContent className="flex flex-col gap-4">
                        <div className="flex justify-between items-center gap-4">
                          <div>
                            <h4 className="text-xl font-medium">{celebrity.name}</h4>
                            <span className="text-sm lg:text-base font-medium text-[#999]">
                              From India
                            </span>
                          </div>
                        </div>
                        <div
                          className={`text-sm lg:text-base text-[#999999] ${
                            expandedIndex === index ? "" : "line-clamp-4"
                          }`}
                        >
                          {celebrity.quote}
                        </div>
                        {celebrity.quote.length > 180 && (
                          <button
                            onClick={() => toggleExpand(index)}
                            className="text-sm inline text-[#1E90FF] mt-2"
                          >
                            {expandedIndex === index ? "See Less" : "See More"}
                          </button>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2" />
            <CarouselNext className="-right-2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CelebrityThoughts;
