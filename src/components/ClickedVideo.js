import React from "react";
import { useParams, Link } from "react-router-dom";
import VideosList from "../constants/VideoList";

const ClickedVideo = () => {
  const { id } = useParams();
  const short = VideosList.find((item) => item.id === parseInt(id));

  if (!short) {
    return <p>Short not found!</p>;
  }

  return (
    <div className="">
      <Link to="/" className="back-button">
        &larr; Back to Feed
      </Link>
      <h1 className="text-center text-xl font-bold">{short.title}</h1>
      <video
        src={short.video}
        controls
        autoPlay
        className=""
      ></video>
    </div>
  );
};

export default ClickedVideo;
