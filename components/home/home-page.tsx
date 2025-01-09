
import AuthButton from "../common/auth-button";
import { CineflicksLogo } from "../common/cineflicks-logo";
import { MovieGrid } from "./movie-grid";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#1A1614] overflow-hidden">
      {/* Movie Grid Background */}
      {/* <div>
        <MovieGrid />
      </div> */}

      {/* Content */}
      <div className="relative z-10">
        {/* Sign In Button */}
        <div className="absolute top-4 right-8">
          <AuthButton />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center max-w-4xl mx-auto space-y-12">
          <CineflicksLogo />

          <h1 className="text-4xl md:text-6xl font-bold text-white mt-8">
            Try Our Social Task
          </h1>

          <p className="text-gray-300 max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetuer adipiscing elitlorem ipsum dolor sit
            amet consectetuer adipiscing elitlorem ipsum dolor sit amet consectetuer
            adipiscing elitlorem ipsum dolor sit amet consectetuer adipiscing elitlorem
            ipsum dolor sit amet consectetuer adipiscing elitlorem ipsum dolor sit amet
            consectetuer adipiscing elit.
          </p>

          {/* Referral Code */}
          <div className="bg-[#F5A64C] text-black rounded-lg px-8 py-4 flex items-center gap-4 font-medium">
            <span>Referral code :</span>
            <span className="font-bold">RA12C3</span>
          </div>

        
        </div>
      </div>
    </main>
  );
}
