import { Link } from "react-router-dom";
import { getReelsByUserId } from "../features/reel/reelThunk";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";

const Dashboard = () => {
    const { data: user } = useSelector((state) => state.auth);
    const { data: reels, loading: reelsLoading } = useSelector((state) => state.reels);
    const [loading , setLoading ] = useState(false) ; 
    const dispatch = useDispatch();
    const [thumbnails, setThumbnails] = useState({});

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
        if (user) {
            dispatch(getReelsByUserId(user._id))
                .unwrap()
                .catch((error) => console.error("Error fetching reels:", error));
        }
    }, [dispatch, user]);

    useEffect(() => {
        const fetchThumbnails = async () => {
            setLoading(true) ; 
            if (reels?.length) {
                const generatedThumbnails = {};
                for (const reel of reels) {
                    if (!reel.thumbnail) {
                        const frame = await captureFrameFromVideo(reel.video);
                        generatedThumbnails[reel._id] = frame;
                    }
                }
                setThumbnails(generatedThumbnails);
            }
            setLoading(false) ; 
        };
        fetchThumbnails();
    }, [reels]);
    if( reels && reels.length===0 || loading) {
       return   <Loader/>
    }

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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center items-center mx-auto max-w-7xl">
                        {reels?.slice(0, 4).map((short) => (
                            <Link key={short._id} to={`/short/${short._id}`} className="flex flex-col">
                                <img
                                    src={short.thumbnail || thumbnails[short._id] || "/default-placeholder.png"}
                                    alt={short.title}
                                    className="h-[265px] w-[160px] object-cover rounded-lg"
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