import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import VideoPlayer from "./VideoPlayer";

const Partners = () => {
  return (
    <section className="bg-[#262626] py-12 lg:py-20 ">
      <div className="container relative overflow-hidden">
        <h2 className="text-3xl text-left lg:text-5xl xl:text-6xl font-bold">
          Partners
        </h2>
        <div className="pt-5">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-[#202020] py-4 border border-[#262626]">
                      <CardContent className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-[92px] h-[90px] rounded-[8px]">
                            <AvatarImage
                              className="w-full h-full"
                              src="https://avatars.githubusercontent.com/u/92237522?v=4"
                            />
                            <AvatarFallback className="w-[92px] h-[90px] rounded-[8px]">
                              CN
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-xl lg:text-2xl font-medium">
                              Ajaneesh Abc
                            </h4>
                            <a
                              className="text-sm lg:text-base font-medium text-[#999]"
                              href="http://"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Link:{" "}
                              <span className="text-[#D48641]">
                                https://www.figma.com/design/wck
                              </span>
                            </a>
                          </div>
                        </div>
                        <p className="text-sm lg:text-base 2xl:text-xl text-[#999999]">
                          Temporibus autem quibusdam et aut officiis debitis aut
                          rerum necessitatibus saepe eveniet, ut et voluptates
                        </p>
                        <VideoPlayer url="https://videos.pexels.com/video-files/7626711/7626711-hd_1920_1080_24fps.mp4" />
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

export default Partners;
