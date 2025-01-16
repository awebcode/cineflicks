import { Img } from "./common/Img"; // Assuming Img is an optimized image component
import HeroVideoDialog from "./ui/hero-video-dialog";

const HowToSetupHelperWallet = () => {
  return (
    <div className="bg-[#1A1A1A] flex flex-col items-center p-8 relative overflow-hidden">
      {/* Title */}
      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold my-8 text-center">
        How To Setup Helper Wallet
      </h1>

      {/* Main Card */}
      <div className="relative">
        {/* Decorative dots at the bottom of the image */}
        <div className="absolute -top-8 md:-top-12 -right-4 md:-right-6 grid grid-cols-10 gap-2 md:gap-3">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="w-[5px] md:w-[7px] h-[5px] md:h-[7px] rounded-full bg-[#DC700059]"
            />
          ))}
        </div>

        <div className="relative z-[500]">
          {/* Use Next.js Image for optimization */}
          <Img
            src="/setup-wallet.png"
            width={1164}
            height={519}
            alt="Step-by-step guide on setting up the Helper Wallet"
            className="object-contain hidden"
          />
          <div>
            <HeroVideoDialog
              className=" block "
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="/setup-wallet.png"
              thumbnailAlt="Hero Video"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToSetupHelperWallet;
