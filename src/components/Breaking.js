import Nav from "./Nav"
import Sidebar from "./Sidebar"
import img0 from "../assets/Rectangle 47.png"
import img1 from "../assets/Rectangle 49.png"
import img2 from "../assets/Rectangle 50.png"
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect, useState } from "react"
import { getReels } from "../features/reel/reelThunk"
import { Loader } from "./Loader"
import { captureFrameFromVideo } from "../utils/captureFrameFromVideo"
import { useReels } from "../features/reel/customeHooks"
import img from '../assets/image2.png'
import { p } from "framer-motion/client"

const Breaking = () => {
    const tags = ["Trending", "Cricket", "Politics"];
    const newsData = [
        { id: 1, imgSrc: img0 },
        { id: 2, imgSrc: img1 },
        { id: 3, imgSrc: img2 },
        { id: 4, imgSrc: img0 },
        { id: 5, imgSrc: img1 },
        { id: 6, imgSrc: img2 },
        { id: 7, imgSrc: img1 },
        { id: 8, imgSrc: img2 },
        { id: 9, imgSrc: img0 },
    ];

         const { data: reels, loading: reelsLoading, error: reelsError } = useSelector((state) => state.reels);
         const dispatch = useDispatch() ; 
          const [thumbnails, setThumbnails] = useState({});
          useEffect(() => {
              dispatch(getReels())
          }, [dispatch]);

    const fetchThumbnails = useCallback(async () => {
        if (!reels?.length) return;
        const generatedThumbnails = {};
        console.log("this is reels ", reels)
        const thumbnailPromises = reels.map(async (reel) => {
            if (!reel.thumbnail) {
                console.log(reels)
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


    if (reelsLoading   || thumbnails?.length<0  ) return <p> <Loader /> </p>;

    if (reelsError) return( 
         <p>
            Internal server Error 
         </p>
    )

    return (
        <div className="flex flex-col h-screen font-roboto">
            <div className="fixed top-0 w-full z-50">
                <Nav />
            </div>
            <div className="flex flex-1 pt-[53px] md:pt-[89px]">
                <div className="z-50 fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-scroll custom-scrollbar mt-[36px] sm:mt-0 ml-0 sm:ml-[227px] p-2 sm:px-5">
                    <div className="flex flex-col items-center space-y-4">
                        <input
                            type="text"
                            placeholder="Search for your favourite News"
                            className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex space-x-3">
                            {tags.map((tag, index) => (
                                <button
                                    key={index}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sm:m-4 grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center mt-2 sm:mt-6 items-center mx-auto max-w-7xl">
                        {reels?.length > 0 && reels.map((reel) => (
                            <div
                                key={reel.id}
                                className="relative"
                            >
                                <img
                                    src={thumbnails[reel._id] || img}
                                    alt={`News ${reel._id}`}
                                    className="h-[265px] w-[160px] rounded-lg object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-gray-800"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5.5 4.5l12.5 7-12.5 7v-14z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                        {[...Array(3 - (newsData.length % 3)).keys()].map((_, index) => (
                            <div key={index} className="w-[150px] sm:w-[200px] m-1 invisible"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Breaking