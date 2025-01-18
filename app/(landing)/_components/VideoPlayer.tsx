"use client";

import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("react-player"), { ssr: false });

const VideoPlayerWrapper = ({ url }: { url: string }) => {
  return <VideoPlayer url={url} controls width="100%" height="100%" />;
};

export default VideoPlayerWrapper;
