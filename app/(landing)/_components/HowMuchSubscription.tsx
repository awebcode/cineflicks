const HowMuchSubscription = () => {
  return (
    <section className="relative   py-16 ">
      <div className="container z-10 lg:min-h-[500px] 2xl:min-h-[721px] relative">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center">
          How much is a Cineflicks subscription?
        </h2>
        <div className="w-full o  pt-10 lg:pt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-6   2xl:max-w-[700px]  px-8   text-center lg:text-right space-y-4 max-w-[600px] xl:max-w-[680px] ">
          <p className="text-xl lg:text-2xl xl:text-3xl font-medium text-[#F2AA4C]">
            <b>Free!</b> Yes, you read that right!
          </p>
          <p className="text-xl pt-1 lg:text-2xl xl:text-3xl  font-normal  !leading-[130%] ">
            Simply{" "}
            <b className="lg:bg-[#8B5D2BD4] rounded-full lg:px-4 lg:py-0.5 bg-opacity-75">
              connect your wallet,
            </b>
            sign up and <b className="text-[#F2AA4C]"> start streaming.</b>
            There will be premium features and content coming in the future, but
            there is
            <b className="text-[#F2AA4C]"> no subscription cost.</b>
          </p>
        </div>
      </div>
      <div className="flex lg:absolute lg:top-0 lg:xl:top-6 2xl:-top-20 left-0 z-0 flex-col lg:flex-row">
        <div>
          <img
            src="/imgs/home/wth 1.png"
            className="w-full md:max-w-[22rem] xl:max-w-[30rem] 2xl:max-w-max"
            alt="wth 1.png"
          />
        </div>
      </div>
    </section>
  );
};

export default HowMuchSubscription;
