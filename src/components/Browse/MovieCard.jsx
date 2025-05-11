import React from "react";
import { IMG_CDN_URL } from "../../utils/constants";

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className="w-32 sm:w-36 md:w-48 lg:w-56 pr-4 transition-all duration-300">
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
