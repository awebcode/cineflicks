import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonial = () => {
  return (
    <section className="bg-[#262626] pb-16 ">
      <div className="container relative overflow-hidden">
        <h2 className="text-3xl text-left lg:text-5xl xl:text-6xl font-bold">
          Testimonial
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
                        <div className="flex justify-between items-center gap-4">
                          <div>
                            <h4 className="text-xl lg:text-2xl font-medium">
                              Ajaneesh Abc
                            </h4>
                            <span className="text-sm lg:text-base font-medium text-[#999]">
                              From India
                            </span>
                          </div>
                          <div className="bg-[#141414] px-3 py-2 flex gap-1">
                            <div className="inline-flex items-center gap-0.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                              >
                                <path
                                  d="M8.88098 0L11.9968 4.7114L17.4405 6.21885L13.9225 10.6381L14.171 16.2812L8.88098 14.301L3.59091 16.2812L3.83943 10.6381L0.321473 6.21885L5.76513 4.7114L8.88098 0Z"
                                  fill="#F2AA4C"
                                />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                              >
                                <path
                                  d="M8.88098 0L11.9968 4.7114L17.4405 6.21885L13.9225 10.6381L14.171 16.2812L8.88098 14.301L3.59091 16.2812L3.83943 10.6381L0.321473 6.21885L5.76513 4.7114L8.88098 0Z"
                                  fill="#F2AA4C"
                                />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                              >
                                <path
                                  d="M8.88098 0L11.9968 4.7114L17.4405 6.21885L13.9225 10.6381L14.171 16.2812L8.88098 14.301L3.59091 16.2812L3.83943 10.6381L0.321473 6.21885L5.76513 4.7114L8.88098 0Z"
                                  fill="#F2AA4C"
                                />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                              >
                                <path
                                  d="M8.88098 0L11.9968 4.7114L17.4405 6.21885L13.9225 10.6381L14.171 16.2812L8.88098 14.301L3.59091 16.2812L3.83943 10.6381L0.321473 6.21885L5.76513 4.7114L8.88098 0Z"
                                  fill="#F2AA4C"
                                />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                              >
                                <path
                                  d="M8.88098 0L11.9968 4.7114L17.4405 6.21885L13.9225 10.6381L14.171 16.2812L8.88098 14.301L3.59091 16.2812L3.83943 10.6381L0.321473 6.21885L5.76513 4.7114L8.88098 0Z"
                                  fill="#F2AA4C"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm lg:text-base 2xl:text-xl text-[#999999]">
                          Temporibus autem quibusdam et aut officiis debitis aut
                          rerum necessitatibus saepe eveniet, ut et voluptates
                        </p>
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

export default Testimonial;
