import img from "../assets/profileimg.png";
import { Link, useLocation } from "react-router-dom";
import { follow, isFollowed, unFollow } from "../features/follow/followThunk";
import { useDispatch } from "react-redux";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useReels } from "../features/reel/customeHooks";
import defaultThumbnail from '../assets/image2.png';

const Profile = () => {
    const location = useLocation();
    const { creatorId, firstName, lastName, userId } = location.state || {};
    const dispatch = useDispatch();
    const [optimisticFollow, setOptimisticFollow] = useState(false);
    const [isSubscribed, setIsSubscribe] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        data: reels,
        isLoading: isReelsLoading,
        isError,
        error,
        refetch,
    } = useReels(creatorId, {
        enabled: false,
    });

    useEffect(() => {
        if (creatorId) {
            refetch();
        }
    }, [creatorId, refetch]);

    useEffect(() => {
        const checkFollowStatus = async () => {
            try {
                if (creatorId && userId) {
                    const isUserFollowed = await isFollowed(creatorId, userId);
                    setIsSubscribe(isUserFollowed);
                }
            } catch (error) {
                console.error("Error fetching follow status:", error);
            }
        };
        checkFollowStatus();
    }, [creatorId, userId]);

    const captureFrameFromVideo = (videoUrl, reelId) => {
        return new Promise((resolve) => {
            console.log(`Starting thumbnail generation for reel ${reelId} with URL: ${videoUrl}`);

            const video = document.createElement("video");
            video.crossOrigin = "anonymous";
            video.muted = true;
            video.preload = "metadata";

            video.onerror = () => {
                console.error(`Error loading video for reel ${reelId}: ${videoUrl}`);
                resolve(defaultThumbnail);
            };

            video.onloadedmetadata = () => {
                console.log(`Metadata loaded for reel ${reelId}. Duration: ${video.duration}`);
                if (!video.duration || isNaN(video.duration)) {
                    console.warn(`Invalid duration for reel ${reelId}`);
                    resolve(defaultThumbnail);
                    return;
                }
                video.currentTime = Math.min(video.duration * 0.25, video.duration);
            };

            video.onseeked = () => {
                console.log(`Seeked to 25% for reel ${reelId}`);
                try {
                    const canvas = document.createElement("canvas");
                    canvas.width = 480;
                    canvas.height = 270;
                    const ctx = canvas.getContext("2d");

                    if (!ctx) {
                        console.warn(`Failed to get canvas context for reel ${reelId}`);
                        resolve(defaultThumbnail);
                        return;
                    }

                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const thumbnail = canvas.toDataURL("image/jpeg", 0.7);
                    console.log(`Thumbnail generated for reel ${reelId}`);
                    resolve(thumbnail);
                } catch (error) {
                    console.error(`Error capturing frame for reel ${reelId}:`, error);
                    resolve(defaultThumbnail);
                } finally {
                    video.remove();
                }
            };

            const timeout = setTimeout(() => {
                console.warn(`Thumbnail generation timed out for reel ${reelId}`);
                resolve(defaultThumbnail);
            }, 5000);

            video.oncanplay = () => {
                console.log(`Video can play for reel ${reelId}`);
                clearTimeout(timeout);
                if (video.currentTime === 0) {
                    video.currentTime = Math.min(video.duration * 0.25, video.duration);
                }
            };

            video.src = videoUrl;
            video.load();
        });
    };

    const [thumbnails, setThumbnails] = useState({});

    useEffect(() => {
        const fetchThumbnails = async () => {
            if (!reels?.length) return;

            const newThumbnails = { ...thumbnails };

            const thumbnailPromises = reels.map(async (reel) => {
                if (!reel.thumbnail && reel.video && !newThumbnails[reel._id]) {
                    try {
                        const frame = await captureFrameFromVideo(reel.video, reel._id);
                        newThumbnails[reel._id] = frame;
                    } catch (error) {
                        console.error(`Failed to generate thumbnail for reel ${reel._id}:`, error);
                        newThumbnails[reel._id] = defaultThumbnail;
                    }
                }
            });

            await Promise.all(thumbnailPromises);
            setThumbnails(newThumbnails);
            console.log("All generated thumbnails:", newThumbnails);
        };

        fetchThumbnails();
    }, [reels]);

    const handleFollow = async () => {
        try {
            setOptimisticFollow(true);
            await dispatch(follow({ creatorId, userId })).unwrap();
            console.log("Follow successful!");
        } catch (error) {
            console.error("Error following creator:", error);
            setOptimisticFollow(false);
        }
    };

    const handleUnFollow = async (id) => {
        try {
            setIsSubscribe(false);
            await unFollow(id);
            setIsSubscribe(false);
        } catch (error) {
            setIsSubscribe(true);
        }
    };

    if (isReelsLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div className="fixed top-0 w-full z-50">
                <Nav />
            </div>
            <div className="flex flex-1 pt-[53px] md:pt-[89px]">
                <div className="z-50 fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-scroll custom-scrollbar ml-0 md:ml-[227px] pt-6 px-5">
                    <div className="w-full flex flex-col items-center justify-center mx-auto p-5">
                        <div>
                            <img src={creatorId?.profileImage || img} alt="" />
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="md:text-[31px] text-[19px] uppercase">{firstName} {lastName}</p>
                            <p className="md:text-[25px] text-[16px] text-[#B7B7B7]"></p>
                            {isSubscribed || optimisticFollow ? (
                                <button
                                    className={`px-6 py-2 m-3 text-white rounded-md ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-500"}`}
                                    disabled={loading}
                                >
                                    {loading ? "Unsubscribing..." : "Unsubscribe"}
                                </button>
                            ) : (
                                <button
                                    className={`px-6 py-2 m-3 text-white rounded-md ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#065FD4]"}`}
                                    onClick={handleFollow}
                                    disabled={loading}
                                >
                                    {loading ? "Subscribing..." : "Subscribe"}
                                </button>
                            )}
                        </div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-5 gap-6 justify-center items-center mx-auto px-4 md:max-w-7xl">
                        {reels && reels.length > 0 && reels.map((short) => (
                            <Link
                                to={`/short/${short.id}`}
                                key={short.id}
                                className="flex flex-col w-full max-w-[200px] mx-auto"
                            >
                                <img
                                    src={short.thumbnail || thumbnails[short._id] || defaultThumbnail}
                                    alt={short.title}
                                    className="h-[200px] md:h-[265px] w-full object-cover rounded-lg"
                                />
                                <div className="text-center">
                                    <p className="font-light mt-2 truncate">{short.title}</p>
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

export default Profile;