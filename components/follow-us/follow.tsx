import { Img } from "../common/Img";
import { SocialIcons } from "./social-icons";

export default function FollowPage() {
  return (
    <main className="relative flex flex-col items-center justify-center gap-12 py-16 px-6 bg-gray-900 text-white">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[79%]"
        style={{
          backgroundImage: "url('/follow-us.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-12">
        {/* Title */}
        <h1 className="text-3xl lg:text-5xl font-extrabold tracking-wide text-white drop-shadow-md">
          Follow Us
        </h1>

        {/* Social Icons */}
        <div className="w-full flex justify-center items-center">
          <SocialIcons />
        </div>

        {/* Logo */}
        <Img
          src="/logo.png"
          width={400}
          height={92}
          alt="Cineflicks logo part one: letter C in the brand design"
          className="object-contain w-[120px] xl:w-[240px] mx-auto drop-shadow-lg"
          loading="lazy"
        />

        {/* Footer Text */}
        <p className="text-sm lg:text-base text-gray-200">
          © {new Date().getFullYear()} Cineflicks. All rights reserved.
        </p>
      </div>
    </main>
  );
}
