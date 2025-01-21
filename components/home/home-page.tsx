import Image from "next/image";
import { CineflicksLogo } from "../common/cineflicks-logo";

export default async function HomePage({
  couponCode,
  image,
}: {
  couponCode?: string;
  image?: string;
}) {
  return (
    <main className="relative overflow-hidden h-full flex flex-col">
      {/* Movie Grid Background */}
      <Image
        src={image ?? "/campaign_hero_bg.avif"}
        alt="campaign_hero_bg"
        fill
        priority
        className="absolute inset-0 object-cover"
      />
      {/* Dark overlay for background image */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 pointer-events-none" />

      {/* Content */}
      <div className="container w-full mx-auto px-4 relative z-10">
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 py-12 text-center max-w-4xl mx-auto space-y-10">
          {/* Sign In Button */}

          {/* Main Content */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <CineflicksLogo />

            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Join the Revolution in Entertainment!
            </h1>
            <p className="text-gray-100 text-xl max-w-xl mx-auto">
              {" "}
              Complete the below social tasks{" "}
            </p>
            <p className="text-gray-100 text-base max-w-xl mx-auto">
              Stay connected with us across all our social platforms and be the first to
              hear about the amazing things we have in store for you!
            </p>

            {/* Referral Code */}
            <div className="bg-[#DC7000B2]/70 text-xl text-white border border-[#F2AA4C] rounded-lg px-8 py-3 flex items-center gap-4 font-medium">
              <span>Referral code: </span>
              <span className="font-bold">{couponCode ?? "No Code"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-0 left-0 px-4 py-2 bg-gray-900 text-white z-10"
      >
        Skip to content
      </a>
    </main>
  );
}
