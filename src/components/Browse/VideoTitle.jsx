import React from "react";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="font-bold text-2xl md:text-6xl">{title}</h1>
      <p className="hidden md:block py-6 text-lg w-1/3">{overview}</p>
      <div className="flex">
        <button className=" flex items-center gap-2 cursor-pointer bg-white text-black p-3 px-8 text-xl rounded-lg transition hover:opacity-80">
          <FaPlay />
          Play
        </button>
        <button className="hidden md:block flex items-center gap-2 cursor-pointer mx-2 bg-gray-500/50 text-white p-3 px-8 text-xl rounded-lg hover:bg-opacity-80 transition hover:opacity-80">
          <AiOutlineInfoCircle />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
