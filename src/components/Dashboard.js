import { Link } from "react-router-dom";
import { getReelsByUserId } from "../features/reel/reelThunk";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { useReels } from "../features/reel/customeHooks";

const Dashboard = () => {
    const { data: user } = useSelector((state) => state.auth); // Get user from Redux
    const [loading , setLoading] = useState()
    const {
      data: reels,
      isLoading: isReelsLoading,
      isError,
      error,
      refetch,
    } = useReels(user?._id, {
      enabled: false, // Disable automatic fetching initially
    });
    const [thumbnails, setThumbnails] = useState({});
    // Use effect to refetch reels when the user becomes available
    useEffect(() => {
      if (user) {
        refetch(); // Refetch reels when user is set
      }
    }, [user, refetch]);

    const captureFrameFromVideo = (videoUrl) =>
        new Promise((resolve) => {
            const video = document.createElement("video");
            video.src = videoUrl;
            video.crossOrigin = "anonymous";
            video.muted = true;
            console.log(video,reels);
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
            const fetchThumbnails = async () => {
                if (reels?.length) {
                    const generatedThumbnails = {};
                    // Map each reel to a thumbnail generation promise
                    const thumbnailPromises = reels.map(async (reel) => {
                        if (!reel.thumbnail) {
                            const frame = await captureFrameFromVideo(reel.video);
                            generatedThumbnails[reel._id] = frame;
                        }
                    });
                    // Await all promises to resolve
                    await Promise.all(thumbnailPromises);
                    console.log("Generated Thumbnails:", generatedThumbnails);
        
                    setThumbnails((prev) => ({
                        ...prev,
                        ...generatedThumbnails,
                    }));
                    console.log(thumbnails);   
                }
            }; 
            fetchThumbnails();
        }, [reels]);
        if (isReelsLoading) return <p>Loading...</p>;
        if (isError) return <p>Error: {error.message}</p>;
    return (
        <div>
            <div>
                <div className="flex justify-evenly sm:justify-between w-full">
                    <div className="w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold"></p>
                        <p className="text-[17px] font-normal text-[#999999]">Total views</p>
                    </div>
                    <div className="w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold">{reels?.length && reels.length}</p>
                        <p className="text-[17px] font-normal text-[#999999]">Total videos</p>
                    </div>
                    <div className="hidden w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] sm:flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold"></p>
                        <p className="text-[17px] font-normal text-[#999999]">Total comments</p>
                    </div>
                    <div className="sm:hidden w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold">400k</p>
                        <p className="text-[17px] font-normal text-[#999999]">Subscribers</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="sm:m-4 font-roboto">
                    <p className="font-semibold text-[20px] py-2 font-inter mt-5">Top Performing News</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center items-center mx-auto max-w-7xl">
                        {reels?.slice(0, 4).slice().reverse().map((short) => (
                            <Link key={short._id} to={`/short/${short._id}`} className="flex flex-col">
                                <img
                                    src={short.thumbnail || thumbnails[short._id] || "/default-placeholder.png"}
                                    alt={short.title}
                                    className="h-[265px] w-[160px] sm:w-[200px] object-cover rounded-lg"
                                />
                                <div>
                                    <p className="font-light mt-2">{short.title}</p>
                                    <p className="text-[14px] font-light">{short.views}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;