import React, { useRef, useEffect, useState } from "react";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoUnmute } from "react-icons/go";
import { AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import ReelPage from "./ReelPage";
import { useDispatch, useSelector } from "react-redux";
import { getReels } from "../features/reel/reelThunk";
import { Loader } from "./Loader";

const Reels = () => {
  const { data: reels, loading: reelsLoading, error: reelsError } = useSelector((state) => state.reels)
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef([]);
  const dispatch = useDispatch();

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
  }, [reels]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const captureFrameFromVideo = async (videoUrl) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.crossOrigin = "anonymous"; // Ensure cross-origin compatibility
      video.muted = true;

      video.onloadedmetadata = () => {
        const randomTime = Math.random() * video.duration; // Random timestamp
        video.currentTime = randomTime;
      };

      video.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      };


      video.onerror = () => {
        resolve("/default-placeholder.png"); // Fallback image
      };

    })
  }

  useEffect(() => {
    dispatch(getReels())
  }, [])

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.5,
    };
  useEffect(() => {
    const fetchThumbnails = async () => {
      const generatedThumbnails = {};
      for (const reel of reels) {
        if (!reel.thumbnail) {
          const frame = await captureFrameFromVideo(reel.videoUrl);
          generatedThumbnails[reel._id] = frame;
        }
      }
      setThumbnails(generatedThumbnails);
    };

    if (reels?.length > 0) fetchThumbnails();
  }, [reels]);

  if (reelsLoading) {
    return <Loader />;
  }

  if(reels && reels.length===0){
     return <div>No Reels uploaded yet</div>
  }

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
          {reels && reels.length>0 && reels?.map((reel, index) => (
            <div className="flex sm:gap-2">
              <div>
                <ReelPage
                  key={reel._id}
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
