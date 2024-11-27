import React, { useRef, useEffect, useState } from "react";
import { reels } from "../constants/Reels";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoUnmute } from "react-icons/go";

const Reel = ({ reel, isMuted, videoRef }) => {
  return (
    <div
      key={reel.id}
      className="reel w-fit h-[cal(100vh-100px)] flex items-center justify-center snap-start relative m-10 rounded-xl"
    >
      <video
        ref={videoRef}
        src={reel.video_url}
        loop
        muted={isMuted}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-8 left-8 text-white">
        <p className="font-bold">{reel.username}</p>
        <p>{reel.caption}</p>
      </div>
    </div>
  );
};

const Reels = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          video.play().catch((error) => {
            console.warn("Autoplay blocked by the browser:", error.message);
            video.muted = true;
            video.play();
          });
        } else {
          video.pause();
        }
      });
    }, options);

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div
      className="reels-container flex flex-col items-center justify-center h-auto overflow-y-scroll snap-y snap-mandatory"
      style={{ scrollBehavior: "smooth" }}
    >
      <button
        onClick={toggleMute}
        className="fixed top-20 right-8 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75 z-10"
      >
        {isMuted ? <IoVolumeMuteOutline size={24} /> : <GoUnmute size={24} />}
      </button>

      {reels.map((reel, index) => (
        <Reel
          key={reel.id}
          reel={reel}
          isMuted={isMuted}
          videoRef={(el) => (videoRefs.current[index] = el)}
        />
      ))}
    </div>
  );
}; 

export default Reels;
