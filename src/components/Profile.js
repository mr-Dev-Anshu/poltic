import img from "../assets/profileimg.png"
import { Link, useLocation } from "react-router-dom";
import { follow } from "../features/follow/followThunk";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { getReelsByUserId } from "../features/reel/reelThunk";

const Profile = () => {
    const location = useLocation()
    const { creatorId, firstName, lastName, userId } = location.state || {};
    console.log(lastName, creatorId, firstName, location.state);
    const dispatch = useDispatch()
    const { data: reels, loading: reelsLoading, reelerror } = useSelector((state) => state.reels)

    useEffect(() => {
        const fetchUserReels = () => {
            console.log("Fetching user", creatorId)
            dispatch(getReelsByUserId(creatorId)).unwrap().then((payload) => {
                console.log(payload);
                console.log("reels", reels);
            }).catch((error) => {
                console.log(error);
            })
        }
        fetchUserReels();
    }, [creatorId])

    const [thumbnails, setThumbnails] = useState({});

    const handleSubscribe = () => {
        try {
            console.log(creatorId, userId)
            dispatch(follow({ creatorId, userId })).unwrap().then((payload) => {
                console.log(creatorId, userId, payload);
            }).catch((error) => {
            })
        } catch (error) {
            console.error("Error following channel", error);
        }
    }

    const captureFrameFromVideo = (videoUrl) =>
        new Promise((resolve) => {
            const video = document.createElement("video");
            video.src = videoUrl;
            video.crossOrigin = "anonymous";
            video.muted = true;
            console.log( reels);

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
                const thumbnailPromises = reels.map(async (reel) => {
                    if (!reel.thumbnail) {
                        const frame = await captureFrameFromVideo(reel?.video);
                        generatedThumbnails[reel?._id] = frame;
                    }
                });
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

    return (
        <div >
            <div className="fixed top-0 w-full z-50">
                <Nav />
            </div>
            <div className="flex flex-1 pt-[53px] md:pt-[89px]">
                <div className="z-50 fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
                    <Sidebar />
                </div>
              <div className="flex-1 overflow-y-scroll custom-scrollbar ml-0 md:ml-[227px] pt-6 px-5">
              <div className=" w-full flex flex-col items-center justify-center mx-auto p-5">
                    <div>
                        <img src={img} alt="" />
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="md:text-[31px] text-[19px] uppercase">{firstName} {lastName}</p>
                        <p className="md:text-[25px] text-[16px] text-[#B7B7B7] ">@riyakinews</p>
                        <div className="flex gap-4 p-2 md:p-0">
                            <div >
                                <p className="text-[#065FD4] md:text-[32px] text-[22px] font-medium">400K</p>
                                <p className="md:text-[20px] text-[14px] ">Subscribers</p>
                            </div>
                            <div className="bg-gray-300 h-14 mx-8 md:mx-0 md:mt-3 w-[1px] " />
                            <div>
                                <p className="text-[#065FD4] md:text-[32px] text-[22px] font-medium">280</p>
                                <p className="md:text-[20px] text-[14px] ">News</p>
                            </div>
                        </div>
                        <button className="px-6 py-2 bg-[#065FD4] m-3 text-white rounded-md" onClick={() => handleSubscribe()}>Subscribe</button>
                    </div>
                </div>
                <hr />
                <div className="grid grid-cols-2 sm:grid-cols-4 mt-5 gap-6 justify-center items-center mx-auto md:max-w-7xl">
                    {reels && reels.length > 0 && reels.map((short) => (
                        <Link
                            to={`/short/${short.id}`}
                            key={short.id}
                            className="flex flex-col w-[200px] "
                        >
                            <img
                                src={short.thumbnail || thumbnails[short._id] || "/default-placeholder.png"}
                                alt={short.title}
                                className="h-[265px] object-cover rounded-lg "
                            />
                            <div className="">
                                <p className="font-light mt-2">{short.title}</p>
                                <p className="text-[14px] font-light">{short.views}</p>
                            </div>
                        </Link>
                    ))}
                </div>
              </div>
            </div>
        </div>
    )
}

export default Profile