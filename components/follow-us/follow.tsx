import { Img } from "../common/Img";
import { SocialIcons } from "./social-icons";

export default function FollowPage() {
  return (
    <main className=" relative flex flex-col items-center justify-center gap-12 py-10 px-4">
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
        <h1 className="text-2xl xl:text-4xl  font-bold">Follow us</h1>

        <SocialIcons />

        <Img
          src="/logo.png"
          width={400}
          height={92}
          alt="Cineflicks logo part one: letter C in the brand design"
          className="object-contain w-[100px] xl:w-[200px] block mx-auto max-w-[]"
          loading="lazy"
        />
      </div>
    </main>
  );
}
