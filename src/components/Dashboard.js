import { Link } from "react-router-dom"
import { getReelsByUserId } from "../features/reel/reelThunk"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

const Dashboard = () => {
    const { data: user, loading: userLoading, error } = useSelector((state) => state.auth)
    const { data: reels, loading: reelsLoading, reelerror } = useSelector((state) => state.reels)

    const dispatch = useDispatch()
    const [thumbnails, setThumbnails] = useState({})
    console.log(user._Id, reels,reelerror);

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
        const fetchUserReels = () => {
            if (user?.email) {
                console.log(user._id);
                dispatch(getReelsByUserId(user?._id)).unwrap().then((payload) => {
                    console.log(payload);
                    console.log("reels", reels);
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
        fetchUserReels();
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

    return (
        <div>
            <div>
                <p className="font-semibold text-[20px] pb-2 font-inter ">Dashboard</p>
                <div className="grid grid-cols-3 gap-5  sm:gap-10">
                    <div className="w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold ">1.3M</p>
                        <p className="text-[17px] font-normal text-[#999999]  ">Total views</p>
                    </div>
                    <div className="w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold ">145</p>
                        <p className="text-[17px] font-normal text-[#999999]  ">Total videos</p>
                    </div>
                    <div className="hidden w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] sm:flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold ">42.5k</p>
                        <p className="text-[17px] font-normal text-[#999999] ">Total comments</p>
                    </div>
                    <div className="sm:hidden w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold ">400k</p>
                        <p className="text-[17px] font-normal text-[#999999] ">Subscribers</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="sm:m-4 font-roboto">
                    <p className="font-semibold text-[20px] py-2 font-inter mt-5">Top Performing News</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center items-center mx-auto max-w-7xl">
                        {reels.slice(0, 4).map((short) => (
                            <Link
                                to={`/short/${short.id}`}
                                key={short.id}
                                className="flex flex-col"
                            >
                                <img
                                    src={short.thumbnail || thumbnails[short._id] || "/default-placeholder.png"}
                                    alt={short.title}
                                    className="h-[265px] w-[160px] object-cover rounded-lg "
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

export default Dashboard