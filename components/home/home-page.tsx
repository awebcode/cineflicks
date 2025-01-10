import { cookies } from "next/headers";
import AuthButton from "../common/auth-button";
import { CineflicksLogo } from "../common/cineflicks-logo";
import { MovieGrid } from "./movie-grid";

export default async function HomePage({couponCode}: {couponCode?: string}) {

  return (
    <main className="relative overflow-hidden h-full flex flex-col">
      {/* Movie Grid Background */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <MovieGrid />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 py-12 text-center max-w-4xl mx-auto space-y-10">
        {/* Sign In Button */}
        <div className="absolute top-4 right-8">
          <AuthButton />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center space-y-8">
          <CineflicksLogo />

          <h1 className="text-4xl md:text-6xl font-bold leading-[87px] text-white">
            Try Our Social Task
          </h1>

          <p className="text-gray-300 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetuer adipiscing elit. Lorem ipsum dolor sit
            amet consectetuer adipiscing elit. Lorem ipsum dolor sit amet consectetuer
            adipiscing elit.
          </p>

          {/* Referral Code */}
          <div className="bg-[#F5A64C] text-black rounded-lg px-8 py-4 flex items-center gap-4 font-medium">
            <span>Referral code: </span>
            <span className="font-bold">{couponCode ?? "Cineflicks"}</span>
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
