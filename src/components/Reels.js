import React, { useRef, useEffect, useState } from "react";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoUnmute } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import ReelPage from "./ReelPage";
import { useDispatch, useSelector } from "react-redux";
import { getReels } from "../features/reel/reelThunk";
import { Loader } from "./Loader";

const Modal = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-[500px] p-6">
        {children}
      </div>
    </div>
  );
};

const Reels = () => {
  const { data: reels, loading: reelsLoading, error: reelsError } = useSelector((state) => state.reels);
  const [isMuted, setIsMuted] = useState(true);
  const [thumbnails, setThumbnails] = useState({});
  const videoRefs = useRef([]);
  const [currentReelId, setCurrentReelId] = useState(null);
  const dispatch = useDispatch();
  const { data: user, error: userError } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch reels data 
    setTimeout(() => {
      if(user){
        dispatch(getReels(user._id));
      }
    }, 100)
  }, [dispatch]);

  const observerRef = useRef(null);

  useEffect(() => {
    if (reels && reels.length > 0) {
      if (!observerRef.current) {
        const options = { root: null, threshold: 0.5 };
        observerRef.current = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
              video.play().catch((error) => {
                console.warn("Autoplay blocked:", error.message);
                video.muted = true;
                video.play();
              });
              setCurrentReelId(video.dataset.reelId);
            } else {
              video.pause();
            }
          });
        }, options);
      }

      videoRefs.current.forEach((video) => {
        if (video) observerRef.current.observe(video);
      });

      return () => {
        videoRefs.current.forEach((video) => {
          if (video) observerRef.current.unobserve(video);
        });
      };
    }
  }, [reels]);


  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const captureFrameFromVideo = (videoUrl) =>
    new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      video.muted = true;

      video.onloadedmetadata = () => {
        const randomTime = Math.random() * video.duration;
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
        resolve("/default-placeholder.png");
      };
    });
  useEffect(() => {
    // Generate thumbnails
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

  if (reels && reels.length === 0) {
    return <div>No Reels uploaded yet</div>
  }

  if (reelsLoading) {
    return <Loader />;
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
        {reels && reels?.length > 0 && reels?.map((reel, index) => (
          <div key={reel._id} className="flex sm:gap-2">
            <div>
              <ReelPage
                reel={reel}
                isMuted={isMuted}
                reelI={reel._id}
                isPlaying={currentReelId === reel._id}
                vid={(el) => (videoRefs.current[index] = el || videoRefs.current[index])}
              />

            </div>
            <div className="hidden sm:flex flex-col justify-between my-5">
              <div className="p-2">
                <CiMenuKebab size={28} />
              </div>
              <div>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;