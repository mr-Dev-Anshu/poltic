import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { reportReel } from "../features/report/reportThunk";
import { Loader } from "./Loader";
import { useNavigate } from "react-router-dom";

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

const ReelPage = ({ reel, vid, reelI , isMuted  }) => {
  const BASE_URL = "https://polity-backend.onrender.com/api/v1";
  const { data: user } = useSelector((state) => state.auth);
  const videoRef = useRef(null);
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(true);
  // const [isMuted, setIsMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [creatorId, setCreatorId] = useState()
  const [reporterId, setReporterId] = useState()
  const [reelId, setReelId] = useState()
  const dispatch = useDispatch()
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        console.log(reel, videoRef, vid, reelI);

      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    setCreatorId(reel?.userId)
    setReporterId(user?._id)
    setReelId(reel?._id)
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleReport = async () => {
    try {
      setCreatorId(reel?.userId)
      setReporterId(user?._id)
      setReelId(reel?._id)
      console.log(creatorId, reporterId, reelId)
      await dispatch(reportReel({ creatorId, reporterId, reelId })).unwrap().then(() => {
        console.log(creatorId, reporterId, reelId);
      }).catch((error) => {
        
      })
    } catch (error) {
      console.error("Error creating channel", error);
    }
  };

  if (!reel) {
    return <Loader />
  }


  return (
    <div
      key={reel._id}
      className="reel w-[100vw] md:w-[330px] md:h-[calc(100vh-83px)] flex items-center justify-center snap-start relative my-2 sm:my-0 sm:rounded-xl overflow-hidden"
    >
      <video
        ref={vid}
        src={reel.video}
        loop
        muted={isMuted}
        className="w-full md:rounded-xl h-[calc(100vh-97px)] object-cover cursor-pointer"
        // onClick={togglePlayPause}
      />
      <div className="absolute bottom-8 flex gap-3 left-4 text-white">
        <div>
          <img
            src={reel.user?.profileImage || "https://via.placeholder.com/150/000000/FFFFFF/?text=Avatar"}
            alt="Profile"
            className="h-12 w-12 rounded-full my-2"
            onClick={() =>
              navigate("/creator-profile", {
                state: {
                  creatorId: reel.user?._id,            
                  firstName: reel.user?.firstName,
                  lastName: reel.user?.lastName,
                  userId: user?._id
                },
              })
            }
          />
        </div>
        <div>
          <p className="font-bold mt-1">{`${reel.user?.firstName || ""} ${reel.user?.lastName || ""}`}</p>
          <p>{reel.description}</p>
        </div>
      </div>
      <div className="absolute sm:hidden h-full text-white right-4 flex flex-col justify-between">
        <div className="ml-4 mt-6">
          <CiMenuKebab size={28} onClick={() => setModalOpen(true)} />
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
      <Modal isOpen={modalOpen}>
        <div className="flex flex-col">
          <div className="flex justify-end">
            <button
              className="mb-4 text-xl"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
          </div>
          <div>
            <hr />
            <button className="" onClick={handleReport}>
              Report Video
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReelPage;
