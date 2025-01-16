import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { prisma } from "@/lib/prisma";
import VideoPlayer from "./VideoPlayer";

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
      <div className="container relative overflow-hidden">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold">Partners</h2>
        <div className="pt-6">
          {partners.length === 0 ? (
            <h1 className=" text-[#999999]">No partners found.</h1>
          ) : (
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent>
                {partners.map((partner) => (
                  <CarouselItem
                    key={partner.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card className="bg-[#202020] py-4 border border-[#262626]">
                        <CardContent className="flex flex-col gap-4">
                          <div className="flex items-center gap-4">
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
                            <div>
                              <h4 className="text-xl lg:text-2xl font-medium">
                                {partner.title}
                              </h4>
                              {partner.link && (
                                <a
                                  className="text-sm lg:text-base font-medium text-[#999]"
                                  href={partner.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Link:{" "}
                                  <span className="text-[#D48641]">
                                    {partner.link}
                                  </span>
                                </a>
                              )}
                            </div>
                          </div>
                          <p className="text-sm lg:text-base 2xl:text-xl text-[#999999]">
                            {partner.description}
                          </p>
                          {partner.videoUrl && (
                            <VideoPlayer url={partner.videoUrl} />
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Partners;
