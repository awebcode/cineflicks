import Image from "next/image";

const WalletStepsImage = () => {
  return (
    <div className="bg-[#1A1A1A] flex flex-col items-center p-4 sm:p-6 md:p-8 relative overflow-hidden w-full">
      <div className="relative w-full max-w-[900px] aspect-[1311/1053]">
        <Image
          src="/wallet-steps.png"
          alt="Steps to connect wallet"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 900px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default WalletStepsImage;
