import { Img } from "@/components/common/Img";

const HowCanUseToken = () => {
  return (
    <section className="bg-[#262626] py-10 ">
      <div className="container grid gap-10">
        <div className="grid lg:grid-cols-2 items-center gap-10">
          <div className="border border-[#E7E3FC] rounded-[27px] px-5 py-3 flex items-start gap-6">
            <div>
              <Img
                src="/pre.png"
                className="w-[80px] h-[100px] object-contain lg:w-[104px]"
                alt="pre.png"
                width={120}
                height={160}
              />
            </div>
            <div className="space-y-2">
              <span className="text-sm lg:text-base text-[#F2AA4C]">(01)</span>
              <h4 className="text-2xl uppercase lg:text-3xl text-white font-normal">
                premium content
              </h4>
              <p className="text-lg lg:text-xl">
                Lorem ipsum dolor amet dummy content here ...
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-3xl lg:text-4xl font-medium uppercase">
              How can I use
            </p>
            <p className="text-4xl lg:text-5xl font-medium uppercase">
              my <b className="text-[#F2AA4C]">$CNF tokens?</b>
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="grid gap-10">
            <div className="border border-[#E7E3FC] rounded-[27px] px-5 py-3 flex items-start gap-6">
              <div>
                <Img
                  src="/coin.png"
                  className="w-[80px] h-[100px] object-contain lg:w-[104px]"
                  alt="coin.png"
                  width={120}
                  height={160}
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm lg:text-base text-[#F2AA4C]">
                  (02)
                </span>
                <h4 className="text-2xl uppercase lg:text-3xl text-white font-normal">
                  exclusive features
                </h4>
                <p className="text-lg lg:text-xl">
                  Lorem ipsum dolor amet dummy content here ...
                </p>
              </div>
            </div>
            <div className="border border-[#E7E3FC] rounded-[27px] px-5 py-3 flex items-start gap-6">
              <div>
                <Img
                  src="/mic.png"
                  className="w-[80px] h-[100px] object-contain lg:w-[104px]"
                  alt="coin.png"
                  width={120}
                  height={160}
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm lg:text-base text-[#F2AA4C]">
                  (03)
                </span>
                <h4 className="text-2xl uppercase lg:text-3xl text-white font-normal">
                  special offers
                </h4>
                <p className="text-lg lg:text-xl">
                  Lorem ipsum dolor amet dummy content here ...
                </p>
              </div>
            </div>
          </div>
          <div className="border border-[#F0AA50] bg-[#202020] py-5 rounded-[27px] px-4 lg:px-8 flex flex-col gap-5 justify-between items-center">
            <Img src="/logo.png" alt="cineflix logo" width={460} height={107} />
            <p className="text-sm lg:text-base 2xl:text-xl">
              CNF can be used for premium content, exclusive features, and
              special offers, enhancing access to high-quality entertainment.
              Tokens will also be usable in promotional deals and offers, adding
              extra value to rewards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowCanUseToken;
