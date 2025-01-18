import Image from "next/image";

const Hero = () => {
  return (
    <section className="lg:min-h-screen  h-[60vh] lg:h-full relative overflow-hidden bg-[url('/imgs/home/hero-bg.png')] bg-cover bg-center w-full">
      <Image
        layout="fill"
        src="/imgs/home/movies.png"
        alt="movies"
        className="absolute hidden lg:block object-cover w-full h-full z-0 inset-0"
      />

      <div className="container  min-h-screen h-full  relative">
        <div className="pt-4 lg:pt-10  xl:pt-16 2xl:pt-20">
          <Image
            src={"/imgs/home/logo.png"}
            alt="cineflics logo"
            width={514}
            height={120}
            className="w-[180px] lg:w-[280px]  xl:w-[340px] 2xl:w-[360px]"
          />
        </div>
        <div className="lg:max-w-[800px] absolute left-8 bottom-1/2 translate-y-1/2 lg:translate-y-[10px] lg:bottom-24 2xl:bottom-10 max-w-[600px]">
          <p
            className="text-2xl xl:text-5xl font-normal"
            style={{
              lineHeight: "normal", // Default for smaller screens
              ...(typeof window !== "undefined" &&
                window.innerWidth >= 1024 && {
                  lineHeight: "80px", // Apply only for desktop (lg and above)
                }),
            }}
          >
            The{" "}
            <span className="bg-[#f2aa4c94] rounded-full font-bold tracking-[1.43px] px-2">
              Blockchain-based
            </span>{" "}
            <span className="my-1">Streaming Revolution Has Arrived</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
