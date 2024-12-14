import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import ProfileSidebar from "./ProfileSidebar";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import { useEffect, useState } from "react";
import { uploadFileToS3 } from "../utils/uploadReels"; 
import { video } from "framer-motion/client";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./Loader";
import { getReelsByUserId, uploadReel } from "../features/reel/reelThunk";

const Library = () => {
    const {data:user , loading:userLoading , error:userError } = useSelector((state)=> state.auth) ; 
    const { data: reels, loading:reelsLoading , reelerror } = useSelector((state) => state.reels)
    const [uploadComplete, setUploadComplete] = useState(false); // New state for upload completion


    useEffect(() => {       
        const fetchUserReels = () => {
            console.log("Fetching user" , user?._id)
            if(user?.email){
            console.log(user._id);
                dispatch(getReelsByUserId(user?._id)).unwrap().then((payload) => {
                   console.log(payload);           
                   console.log("reels",reels);           
                }).catch((error) => {
                   console.log(error);             
                })
            }
        }
    fetchUserReels() ; 
    }, [user , uploadComplete])
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
        
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false); 
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [thumbnail, setThumbnail] = useState(null); 
    const dispatch = useDispatch() ; 
    const navigate = useNavigate(); 
    const toggleModal = () => {
        setIsOpen(!isOpen);
        setSelectedFile(null); 
    };
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); 
    };
    const handleThumbnailSelect = (e) => {
        setThumbnail(e.target.files[0]);
    };
    const handleUpload = async () => {
          setUploadComplete(false) ; 
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }else if (!title){
             alert("Please provide the title")
             return 
        }else if (!description){
             alert("Please provide the Description")
             return;
        }
        setUploading(true);
        const payload = {title,description , userId:user._id};
        if(thumbnail){
             const thumbnailUrl = await uploadFileToS3(thumbnail) ; 
              payload.thumbnail=thumbnailUrl; 
        }
        try {
            const uploadedFileUrl = await uploadFileToS3(selectedFile);
            payload.video=uploadedFileUrl; 
            console.log(payload);
            dispatch(uploadReel(payload)).unwrap().then((payload)=> {
                setTitle("");
                setDescription("");
                setThumbnail(null);
                setIsOpen(false);
                setUploading(false); 
                setUploadComplete(true) ; 
            }).catch((error)=>{
                alert(error)
                setUploading(false); 
            })
        } catch (error) {
            setUploading(false)
            alert("Error uploading file. Please try again.");
            console.log(error);
        }
    };

    if(userLoading || reels && reels.length===0 ) {
         return <Loader/>
    }

    if(userError){
        return navigate("/")
    }
    
    return (
        <div className="flex flex-col h-screen font-roboto">
            <div className="fixed top-0 w-full z-50">
                <Nav />
            </div>
            <div className="flex flex-1 pt-[53px] md:pt-[89px]">
                <div className="z-50 fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-scroll custom-scrollbar ml-0 md:ml-[227px] pt-6 px-5">
                    <UserProfile />
                    <hr className="my-5 w-full" />
                    <div className="flex gap-10">
                        <div className="hidden md:flex">
                            <ProfileSidebar />
                        </div>
                        <div>
                            <div className="sm:m-5 font-roboto w-[90vw] md:w-fit">
                                <div className="flex justify-between my-2">
                                    <p className="font-semibold text-[20px] py-2 font-inter">
                                        Video Library
                                    </p>
                                    <div>
                                        <button
                                            className="bg-[#065FD4] text-white py-2 px-4 rounded-md"
                                            onClick={toggleModal}
                                        >
                                            Upload Video
                                        </button>
                                        {isOpen && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                                <div className="bg-white rounded-lg w-full max-w-md p-6">
                                                    <div className="flex justify-between">
                                                        <h2 className="text-2xl font-bold mb-4">
                                                            Upload News
                                                        </h2>
                                                        <button
                                                            className="mb-4 text-xl"
                                                            onClick={toggleModal}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                    <div className="border-dashed border-2 border-[#065FD4] rounded-lg p-6 text-center mb-4">
                                                        <input
                                                            type="file"
                                                            accept=".mp4, .mov"
                                                            onChange={handleFileChange}
                                                        />
                                                        <p className="text-gray-500 mt-2">
                                                            Supported formats: .mp4, .mov
                                                        </p>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 mb-2">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="border border-gray-300 rounded-lg w-full p-2"
                                                            placeholder="Enter title"
                                                            value={title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 mb-2">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            className="border border-gray-300 rounded-lg w-full p-2"
                                                            rows="4"
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            placeholder="Enter description"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 mb-2">
                                                            Thumbnail
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleThumbnailSelect}
                                                        />
                                                    </div>
                                                    <button
                                                        className="bg-[#065FD4] text-white px-4 py-2 rounded w-full"
                                                        onClick={handleUpload}
                                                        disabled={uploading}
                                                    >
                                                        {uploading ? "Uploading..." : "Upload News"}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center items-center mx-auto md:max-w-7xl">
                                    { reels && reels.length>0 &&  reels.map((short) => (
                                        <Link
                                            to={`/short/${short.id}`}
                                            key={short.id}
                                            className="flex flex-col"
                                        >
                                            <img
                                                src={short.thumbnail || thumbnails[short._id] || "/default-placeholder.png"}
                                                alt={short.title}
                                                className="h-[265px] object-cover rounded-lg w-full "
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
                </div>
            </div>
        </div>
    );
};

export default Library;
