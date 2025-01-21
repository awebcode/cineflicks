import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { prisma } from "@/lib/prisma";
import VideoPlayer from "./VideoPlayer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const getPartners = async () => {
  try {
    // Fetch partners from the database using Prisma
    const partners = await prisma.partner.findMany();
    return partners;
  } catch (error) {
    console.error("Error fetching partners:", error);
    return [];
  }
};

const Partners = async () => {
  // Fetch dynamic data on the server
  const partners = await getPartners();

  return (
    <section className="bg-[#262626] py-12 lg:py-20">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold">Our Partners</h2>
        <Button className="bg-[#F2AA4C] hover:bg-[#f2aa4cdb]" asChild>
          <Link href={"/partner/partners"}>
            View All <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
      <div className="container relative overflow-hidden">
        <div className="pt-6">
          {partners.length === 0 ? (
            <h1 className=" text-[#999999]">No partners found.</h1>
          ) : (
            <Carousel
              autoplay
              autoplayInterval={3000}
              orientation="horizontal"
              opts={{ align: "start" }}
              className="w-full"
            >
              <CarouselContent>
                {partners.map((partner) => (
                  <CarouselItem
                    key={partner.id}
                    className=" basis-full md:basis-1/2  lg:basis-1/3"
                  >
                    <div className="p-2 w-full h-full">
                      <div className="h-full space-y-4 flex flex-col justify-between p-5 rounded-[8px] bg-[#202020] py-4 border border-[#262626]">
                        <div className="space-y-3">
                          <div className="flex relative overflow-hidden w-full items-center gap-4">
                            <Avatar className="w-[92px] h-[90px] rounded-[8px]">
                              <AvatarImage
                                className="w-full h-full"
                                src={
                                  partner.photoUrl ||
                                  "https://avatars.githubusercontent.com/u/92237522?v=4"
                                }
                              />
                              <AvatarFallback className="w-[92px] h-[90px] rounded-[8px]">
                                {partner.title.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 ">
                              <p className="text-base lg:text-xl font-medium">
                                {partner.title}
                              </p>
                              <div className="flex-1">
                                {partner.link && (
                                  <a
                                    className="inline-flex items-center gap-1.5 text-sm lg:text-base text-[#999] hover:text-[#D48641] transition-colors truncate max-w-full group"
                                    href={partner.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="shrink-0">Link:</span>
                                    <span className="truncate text-[#D48641] group-hover:underline">
                                      {partner.link.replace(/^https?:\/\//, "")}
                                    </span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm w-full lg:text-base 2xl:text-xl text-[#999999]">
                            {partner.description}
                          </p>
                        </div>
                        <div className="aspect-video">
                          {partner.videoUrl && <VideoPlayer url={partner.videoUrl} />}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-2" />
              <CarouselNext className="-right-2" />
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default Partners;
