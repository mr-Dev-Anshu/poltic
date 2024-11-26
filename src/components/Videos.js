import React from "react";
import { Link } from "react-router-dom";
import VideosList from "../constants/VideoList";

const Videos = () => {
  return (
    <div className="">
      <h1 className="text-center text-xl font-bold mb-4">Shorts</h1>
      <div className="">
        {VideosList.map((short) => (
          <Link to={`/short/${short.id}`} key={short.id} className="">
            <img
              src={short.thumbnail}
              alt={short.title}
              className="thumbnail"
            />
            <p className="title">{short.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Videos;
