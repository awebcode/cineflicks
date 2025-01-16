import Image from "next/image";

const Hero = () => {
  return (
    <section className="min-h-screen h-full relative overflow-hidden bg-[url('/imgs/home/hero-bg.png')] bg-cover bg-center w-full">
      <Image
        layout="fill"
        src="/imgs/home/movies.png"
        alt="movies"
        className="absolute hidden lg:block object-cover w-full h-full z-0 inset-0"
      />

      <div className="container h- min-h-screen h-full  relative">
        <div className="pt-4 lg:pt-10  xl:pt-16 2xl:pt-20">
          <Image
            src={"/imgs/home/logo.png"}
            alt="cineflics logo"
            width={514}
            height={120}
            className="w-[180px] 2xl:w-[240px]"
          />
        </div>
        <div className="lg:max-w-[500px] absolute left-8 bottom-1/2 translate-y-1/2 lg:translate-y-[10px] lg:bottom-20 2xl:bottom-10 max-w-[600px]">
          <p className="text-3xl xl:text-4xl  font-normal">
            The{" "}
            <span className="font-bold bg-yellow-600 rounded-full py-0.5 px-5">
              Blockchain-based
            </span>{" "}
            Streaming Revolution Has Arrived
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
