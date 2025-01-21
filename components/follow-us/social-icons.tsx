import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaTelegramPlane,
  FaDiscord,
  FaMedium,
} from "react-icons/fa";

export const SocialIcons = () => {
  const icons = [
    // {
    //   id: 1,
    //   icon: <FaFacebookF className="h-6 w-6" />,
    //   link: "https://www.facebook.com/cineflicksorg/",
    // },
    {
      id: 2,
      icon: <FaInstagram className="h-6 w-6" />,
      link: "https://www.instagram.com/cineflicksorg/",
    },
    {
      id: 3,
      icon: <FaTwitter className="h-6 w-6" />,
      link: "https://x.com/cineflicksorg?t=M11ZrBzFuB-znP8u9poChg&s=08",
    },
    {
      id: 4,
      icon: <FaTelegramPlane className="h-6 w-6" />,
      link: "https://t.me/cineflickschat",
    },
    {
      id: 4.1,
      icon: <FaTelegramPlane className="h-6 w-6" />,
      link: "https://t.me/cineflicks_org",
    },
    //https://t.me/cineflicks_org
    {
      id: 5,
      icon: <FaDiscord className="h-6 w-6" />,
      link: "https://discord.gg/9x92KmBN",
    },
    {
      id: 6,
      icon: <FaMedium className="h-6 w-6" />,
      link: "https://medium.com/cineflicks",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-6">
      {icons.map(({ id, icon, link }) => (
        <a
          key={id}
          href={link}
          className="w-12 h-12 flex justify-center items-center bg-[#F2AA4C] text-white rounded-full hover:bg-[#f2aa4cdb] transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          {icon}
        </a>
      ))}
    </div>
  );
};
