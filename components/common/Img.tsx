"use client";

import Image from "next/image";
import * as React from "react";

interface ImgProps
  extends React.PropsWithChildren<React.ImgHTMLAttributes<HTMLImageElement>> {
  className?: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const Img: React.FC<React.PropsWithChildren<ImgProps>> = ({
  className,
  src = "defaultNoData.png",
  alt = "testImg",
  width,
  height,
  ...restProps
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      className={className}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      {...restProps}
      onError={() => {
        setImgSrc("/defaultNoData.png");
      }}
    />
  );
};

export { Img };
