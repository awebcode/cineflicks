import { SocialIcons } from "./social-icons";
import { CineflicksLogo } from "../common/cineflicks-logo";

export default function FollowPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center gap-12 p-4">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/follow-us.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-12">
        <h1 className="text-5xl md:text-7xl font-bold text-white">Follow us</h1>

        <SocialIcons />

        <CineflicksLogo />
      </div>
    </main>
  );
}
