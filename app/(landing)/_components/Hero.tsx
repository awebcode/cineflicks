import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="lg:min-h-screen h-[60vh] lg:h-full relative overflow-hidden bg-[url('/imgs/home/hero-bg.png')] bg-cover bg-center w-full">
      <Image
        layout="fill"
        src="/imgs/home/movies.png"
        alt="movies"
        className="absolute hidden lg:block object-cover w-full h-full z-0 inset-0"
      />

      <div className="container min-h-screen h-full relative">
        <div className="pt-4 lg:pt-10 xl:pt-16 2xl:pt-20">
          <Image
            src={"/imgs/home/logo.png"}
            alt="cineflics logo"
            width={514}
            height={120}
            className="w-[180px] lg:w-[280px] xl:w-[340px] 2xl:w-[360px]"
          />
        </div>
        {/* Bottom-Centered Button */}
        <div className="absolute lg:bottom-6 lg:translate-y-0 bottom-1/2 left-1/2 transform -translate-x-1/2 top-[25%] md:top-auto ">
          <Button
            className="flex items-center gap-2 flex-1 bg-[#F5A64C] hover:bg-[#E89539] text-black font-medium rounded-full transition-all duration-300 "
            asChild
          >
            <Link href="/campaign">
              Go to Campaign <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
        <div className="lg:max-w-[700px] absolute left-8 bottom-1/2 translate-y-1/2 lg:translate-y-[10px] lg:bottom-24 2xl:bottom-28 max-w-[600px]">
          <p className="text-3xl xl:text-5xl font-normal">
            The{" "}
            <span className="font-bold bg-yellow-600/45 rounded-full py-0.5 px-5">
              Blockchain-based
            </span>{" "}
          </p>
          <p className="text-3xl pt-2 lg:pt-5 xl:text-4xl font-normal">
            Streaming Revolution Has Arrived
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
