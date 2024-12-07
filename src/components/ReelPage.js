import { AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";

const ReelPage = ({ reel, isMuted, videoRef }) => {
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
      key={reel._id}
      className="reel w-[100vw] md:w-[330px] md:h-[calc(100vh-83px)] flex items-center justify-center snap-start relative my-2 sm:my-0 sm:rounded-xl overflow-hidden"
    >
      <video
        ref={videoRef}
        src={reel.video}
        loop
        muted={isMuted}
        className="w-full md:rounded-xl h-[calc(100vh-97px)] md:h-h-[calc(100vh-83px)] object-cover cursor-pointer"
        onClick={togglePlayPause}
      />
      <div className="absolute bottom-8 flex gap-3 left-4 text-white">
        <div>
          <img
            src={reel.user?.profileImage || "https://via.placeholder.com/150/000000/FFFFFF/?text=Avatar"}
            alt="Profile"
            className="h-12 w-12 rounded-full my-2"
          />
        </div>
        <div>
          <p className="font-bold mt-1">{reel.user?.firstName + reel.user?.lastName}</p>
          <p>{reel.description}</p>
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


export default ReelPage