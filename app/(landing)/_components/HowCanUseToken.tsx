import { Img } from "@/components/common/Img";

const HowCanUseToken = () => {
  return (
    <section className="bg-[#111111] py-10 lg:py-16 2xl:py-20 ">
      <div className="container grid gap-10">
        <div className="grid lg:grid-cols-2 items-center gap-10">
          <Card
            index={1}
            imageSrc="/pre.png"
            imageAlt="premium content"
            title="premium content"
            description="Lorem ipsum dolor amet dummy content here ..."
          />
          <div className="space-y-2">
            <p className="text-lg lg:text-xl xl:text-5xl font-bold uppercase">
              How can I use
            </p>
            <p className="text-2xl lg:text-3xl xl:text-5xl  font-medium uppercase">
              my <b className="text-[#F2AA4C]">$CNF tokens?</b>
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="grid gap-10">
            <Card
              index={2}
              imageSrc="/coin.png"
              imageAlt="exclusive features"
              title="exclusive features"
              description="Lorem ipsum dolor amet dummy content here ..."
            />
            <Card
              index={3}
              imageSrc="/mic.png"
              imageAlt="special offers"
              title="special offers"
              description="Lorem ipsum dolor amet dummy content here ..."
            />
          </div>
          <div className="border border-[#F0AA50] bg-[#202020] py-5 rounded-[27px] px-4 lg:px-8 flex flex-col gap-5 justify-between items-center">
            <Img
              src="/logo.png"
              alt="cineflix logo"
              className="w-full max-w-[200px] xl:max-w-[300px] mx-auto block"
              width={460}
              height={107}
            />
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

const Card = ({
  imageSrc,
  imageAlt,
  index,
  title,
  description,
}: {
  imageSrc: string;
  imageAlt: string;
  index: number;
  title: string;
  description: string;
}) => {
  return (
    <div className="border border-[#E7E3FC] rounded-[14px] px-5 py-3 flex items-start gap-6">
      <div>
        <Img
          src={imageSrc}
          className="w-14 h-auto object-contain "
          alt={imageAlt}
          width={120}
          height={160}
        />
      </div>
      <div className="space-y-2">
        <span className="text-xs lg:text-sm text-[#F2AA4C]">
          ({index < 10 ? `0${index}` : index})
        </span>
        <h4 className="text-xl xl:text-2xl uppercase  text-white font-normal">
          {title}
        </h4>
        {/* <p className="text-sm lg:text-base">{description}</p> */}
      </div>
    </div>
  );
};
