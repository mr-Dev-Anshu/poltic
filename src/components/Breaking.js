import Nav from "./Nav";
import Sidebar from "./Sidebar";
import img from '../assets/image2.png';
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getReels } from "../features/reel/reelThunk";
import { Loader } from "./Loader";
import { captureFrameFromVideo } from "../utils/captureFrameFromVideo";

const Breaking = () => {
    const tags = ["Trending", "Cricket", "Politics"];
    const { data: reels, loading: reelsLoading, error: reelsError } = useSelector((state) => state.reels);
    const dispatch = useDispatch();
    const [thumbnails, setThumbnails] = useState({});

    useEffect(() => {
        dispatch(getReels());
    }, [dispatch]);

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
        setThumbnails((prev) => ({ ...prev, ...generatedThumbnails }));
    }, [reels]);

    useEffect(() => {
        fetchThumbnails();
    }, [fetchThumbnails]);

    if (reelsLoading) return (
        <div className="flex items-center justify-center h-screen">
            <Loader />
        </div>
    );

    if (reelsError) return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-red-500 text-lg">Internal Server Error</p>
        </div>
    );

    return (
        <div className="min-h-screen  font-roboto">
            <div className="fixed top-0 w-full z-50 ">
                <Nav />
            </div>
            
            <div className="flex pt-[53px] md:pt-[89px]">
                <div className="hidden md:block fixed w-[227px] h-[calc(100vh-89px)] bg-white shadow-lg">
                    <Sidebar />
                </div>

                <main className="flex-1 ml-0 md:ml-[227px] p-4 md:p-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="space-y-6 mb-8">
                            <input
                                type="text"
                                placeholder="Search for your favorite news..."
                                className="w-full max-w-md mx-auto block p-3 border border-gray-300 rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    shadow-sm"
                            />
                            <div className="flex flex-wrap justify-center gap-3">
                                {tags.map((tag) => (
                                    <button
                                        key={tag}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-full 
                                            hover:bg-blue-700 transition-colors duration-200
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                            {reels?.map((reel) => (
                                <div
                                    key={reel._id}
                                    className="relative group rounded-lg overflow-hidden shadow-md 
                                        hover:shadow-xl transition-shadow duration-300"
                                >
                                    <img
                                        src={thumbnails[reel._id] || img}
                                        alt={`News ${reel._id}`}
                                        className="w-full h-[265px] md:h-[300px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 
                                        transition-opacity duration-300" />
                                    <button
                                        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md
                                            opacity-75 hover:opacity-100 transition-opacity duration-200"
                                    >
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
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Breaking;