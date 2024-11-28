import React, { useRef, useEffect, useState } from "react";
import { reels } from "../constants/Reels";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoUnmute } from "react-icons/go";
import { AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";

const Reel = ({ reel, isMuted, videoRef }) => {
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div
      key={reel.id}
      className="reel w-full md:w-[330px] h-[calc(100vh-150px)] md:h-[calc(100vh-30px)] flex items-center justify-center snap-start relative sm:m-5 sm:rounded-xl overflow-hidden"
    >
      <video
        ref={videoRef}
        src={reel.video_url}
        loop
        muted={isMuted}
        className="w-full rounded-xl h-full object-cover cursor-pointer"
        onClick={togglePlayPause}
      />
      <div className="absolute bottom-8 flex gap-3 left-4 text-white">
        <div>
          <img src={reel.profile_pic} alt="" className="h-12 w-12 rounded-full my-2" />
        </div>
        <div>
          <p className="font-bold mt-1">{reel.username}</p>
          <p>{reel.caption}</p>
        </div>
      </div>
      <div className="absolute sm:hidden bottom-16 text-white right-4 flex flex-col justify-end my-5">
        <button className="flex flex-col items-center p-2">
          <AiOutlineHeart size={28} />
          <span className="text-xs">123</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <AiOutlineComment size={28} />
          <span className="text-xs">45</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <AiOutlineShareAlt size={28} />
          <span className="text-xs">Share</span>
        </button>
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
      className="reels-container custom-scrollbar flex flex-col items-center justify-center h-auto overflow-y-scroll snap-y snap-mandatory"
      style={{ scrollBehavior: "smooth" }}
    >
      <button
        onClick={toggleMute}
        className="fixed top-24 right-8 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75 z-10"
      >
        {isMuted ? <IoVolumeMuteOutline size={24} /> : <GoUnmute size={24} />}
      </button>

      <div>
        <div>
          {reels.map((reel, index) => (
            <div className="flex gap-2">
              <div>
                <Reel
                  key={reel.id}
                  reel={reel}
                  isMuted={isMuted}
                  videoRef={(el) => (videoRefs.current[index] = el)}
                />
              </div>
              <div className="hidden sm:flex flex-col justify-end my-5">
                <button className="flex flex-col items-center p-2">
                  <AiOutlineHeart size={28} />
                  <span className="text-xs">123</span>
                </button>
                <button className="flex flex-col items-center p-2">
                  <AiOutlineComment size={28} />
                  <span className="text-xs">45</span>
                </button>
                <button className="flex flex-col items-center p-2">
                  <AiOutlineShareAlt size={28} />
                  <span className="text-xs">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default Reels;
