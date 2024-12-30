import React, { useState, useRef, useEffect } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import ProfileSidebar from "./ProfileSidebar"; // Adjust the path if needed
import img from "../assets/profileimg.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../features/auth/authThunk";
import { getChannelByEmail } from "../features/channel/channelThunk";
import { CiMenuKebab } from "react-icons/ci";

const UserProfile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch()
    const { data: channel, error: channelError } = useSelector((state) => state.channel)
    const { data: user, loading, error } = useSelector((state) => state.auth)
    const sidebarRef = useRef(null);
    useEffect(() => {
        const fetchChannelDetails = () => {
            if (user?.email) {
                dispatch(getChannelByEmail(user?.email)).unwrap().then((payload) => {
                //   console.log(payload);            
                }).catch((error) => {

                })
            }
        }
        fetchChannelDetails();
    }, [user, channel])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // useEffect(() => {
    //     // console.log('fetched');
    //     // console.log("this is user from the userProfile", user);
    // }, [user])

    if (loading) {
        return <p>loading...</p>
    }

    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    return (
        <div className="w-full flex flex-col md:flex-row items-center md:justify-normal justify-center mx-auto p-5 relative">
            <div>
                <img src={img} alt="" className="sm:pr-10" />
                <div className="absolute right-4 top-6 sm:hidden">
                    <CiMenuKebab
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => setIsSidebarOpen((prev) => !prev)}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center sm:items-start">
                <p className="md:text-[31px] text-[19px] py-1 md:py-0">{user?.firstName || "User Name"} {user?.lastName || "User Name"}</p>
                <p className="md:text-[25px] text-[16px] text-[#B7B7B7] ">@{channel?.channelName || "channelName"}</p>
                <div className="hidden md:flex gap-4 p-2 md:p-0">
                    <div>
                        <p className="text-[#065FD4] md:text-[32px] text-[22px] font-medium"> {user?.subscribers || "0"}</p>
                        <p className="md:text-[20px] text-[14px] ">Subscribers</p>
                    </div>
                    <div className="bg-gray-300 h-14 mx-8 md:mx-0 md:mt-3 w-[1px]" />
                    <div>
                        <p className="text-[#065FD4] md:text-[32px] text-[22px] font-medium">{user?.newsCount || "0"}</p>
                        <p className="md:text-[20px] text-[14px] ">News</p>
                    </div>
                </div>
            </div>

            {isSidebarOpen && (
                <div
                    ref={sidebarRef}
                    className="absolute top-12 right-8 z-10 shadow-lg"
                >
                    <ProfileSidebar />
                </div>
            )}
        </div>
    );
};

export default UserProfile;
