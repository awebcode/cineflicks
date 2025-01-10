import { Img } from "./Img";

export function CineflicksLogo() {
  return (
    <figure
      className="mt-[6.25rem] flex items-center justify-center w-full"
      aria-labelledby="cineflicks-logo-description"
    >
      {/* <Img
        src="/logo-c.png"
        width={89}
        height={92}
        alt="Cineflicks logo part one: letter C in the brand design"
        className="object-contain"
        loading="lazy"
      />
      <Img
        src="/logo-ineflicks.png"
        width={310}
        height={60}
        alt="Cineflicks logo part two: text 'ineflicks' in stylized font"
        className="object-contain"
        loading="lazy"
      /> */}

      <Img
        src="/logo.png"
        width={400}
        height={92}
        alt="Cineflicks logo part one: letter C in the brand design"
        className="object-contain"
        loading="lazy"
      />
      <figcaption id="cineflicks-logo-description" className="sr-only">
        Cineflicks logo showing a decorative letter &apos;C&apos; followed by the text
        &apos;ineflicks&apos;.
      </figcaption>
    </figure>
  );
}
