import { Img } from "./Img";

export function CineflicksLogo() {
  return (
    <div className="mt-[6.25rem] flex items-center justify-center w-full">
      <Img
        src="/logo-c.png"
        width={88}
        height={92}
        alt="Imagetwo"
        className="h-[5.75rem] object-contain "
      />
      <Img
        src="/logo-ineflicks.png"
        width={310}
        height={60}
        alt="Imagethree"
        className="h-[3.75rem]  object-contain"
      />
    </div>
  );
}
