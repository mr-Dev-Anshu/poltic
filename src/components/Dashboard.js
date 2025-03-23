import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { Loader } from "./Loader";
import { useReels } from "../features/reel/customeHooks";
import { captureFrameFromVideo } from "../utils/captureFrameFromVideo";
import img from '../assets/image2.png'

const Dashboard = () => {
    const { data: user } = useSelector((state) => state.auth); 
    const {
      data: reels,
      isLoading: isReelsLoading,
      isError,
      error,
      refetch,
    } = useReels(user?._id, {
      enabled: false,
    });
    const [thumbnails, setThumbnails] = useState({});
    useEffect(() => {
      if (user) {
        refetch(); 
      }
    }, [user, refetch]);

  


        // useEffect(() => {
        //     const fetchThumbnails = useCallback( async () => {
        //         if (reels?.length) {
        //             const generatedThumbnails = {};
        //             const thumbnailPromises = reels.map(async (reel) => {
        //                 if (!reel.thumbnail) {
        //                     const frame = await captureFrameFromVideo(reel.video);
        //                     generatedThumbnails[reel._id] = frame;
        //                 }
        //             });
        //             await Promise.all(thumbnailPromises);
        //             console.log("Generated Thumbnails:", generatedThumbnails);
        
        //             setThumbnails((prev) => ({
        //                 ...prev,
        //                 ...generatedThumbnails,
        //             }));
        //             console.log(thumbnails);   
        //         }
        //     } , [reels]); 
        //     fetchThumbnails();
        // }, [reels ]);


        const fetchThumbnails = useCallback(async () => {
            if (!reels?.length) return; 
            const generatedThumbnails = {};
            const thumbnailPromises = reels.map(async (reel) => {
                if (!reel.thumbnail) {
                    const frame = await captureFrameFromVideo(reel.video);
                    generatedThumbnails[reel._id] = frame;
                }
            });
        
            await Promise.all(thumbnailPromises);
            console.log("Generated Thumbnails:", generatedThumbnails);
        
            setThumbnails((prev) => {
                const newThumbnails = { ...prev, ...generatedThumbnails };
                return newThumbnails;
            });
        }, [reels]); 
        
        useEffect(() => {
            fetchThumbnails();
        }, [fetchThumbnails])

        if (isReelsLoading   || thumbnails?.length<0  ) return <p>Loading...</p>;
        if(error?.status===404) return  <p>Your haven't uploaded any reels yet </p>
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
                                    src={short.thumbnail || thumbnails[short._id] || img }
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