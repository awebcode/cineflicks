import { Img } from "../common/Img";

const WalletStepsImage = () => {
  return (
    <div className="bg-[#1A1A1A] flex flex-col items-center p-8 relative overflow-hidden">
      <Img
        src="/wallet-steps.png"
        width={1311}
        height={1053}
        alt="Steps to connect wallet"
        className="object-contain max-w-[900px] block mx-auto"
      />
    </div>
  );
};

export default WalletStepsImage;
