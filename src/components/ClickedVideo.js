import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideosList from "../constants/VideoList";

const ClickedVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const short = VideosList.find((item) => item.id === parseInt(id));

  if (!short) {
    return <p>Short not found!</p>;
  }

  return (
    <div className="">
      <button
        onClick={() => navigate(-1)}
        className="back-button text-blue-500 "
      >
        &larr; Back to Feed
      </button>
      <h1 className="text-center text-xl font-bold">{short.title}</h1>
      <video
        src={short.video}
        controls
        autoPlay
        className="w-fit mt-4"
      ></video>
    </div>
  );
};

export default ClickedVideo;
