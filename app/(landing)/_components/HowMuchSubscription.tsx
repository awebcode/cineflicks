const HowMuchSubscription = () => {
  return (
    <section className="relative  overflow-hidden  py-10 lg:py-16">
      <div className="container relative">
        <h2 className="text-3xl text-center lg:text-5xl xl:text-6xl font-bold">
          How much is a Cineflicks subscription?
        </h2>
        <div className="w-full pt-6 lg:absolute lg:right-8 lg:top-[22rem] 2xl:max-w-[900px] 2xl:top-[32rem] px-8 max-w-[700px] xl:max-w-[800px] text-center lg:text-right ">
          <p className="text-2xl lg:text-3xl 2xl:text-4xl !leading-[130%]  font-medium ">
            Simply{" "}
            <b className="lg:bg-[#F2AA4C] rounded-full lg:px-4 lg:py-2 bg-opacity-75">
              connect your wallet,
            </b>
            sign up and{" "}
            <b className="text-[#F2AA4C]">
              {" "}
              <br className=" hidden lg:block" /> start streaming.
            </b>
            <br />
            There will be premium features and content coming in the future, but
            there is
            <b className="text-[#F2AA4C]">
              {" "}
              <br className=" hidden lg:block" />
              no subscription cost.
            </b>
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div>
          <img
            src="/imgs/home/wth 1.png"
            className="max-w-[22rem] xl:max-w-[30rem] 2xl:max-w-max"
            alt="wth 1.png"
          />
        </div>
      </div>
      <img
        src="/imgs/home/quete.png"
        alt="quete.png"
        className="absolute w-full max-w-[26rem] xl:max-w-xl 2xl:max-w-5xl top-[22rem] lg:top-40 left-0 lg:left-[30%]"
      />
    </section>
  );
};

export default HowMuchSubscription;
