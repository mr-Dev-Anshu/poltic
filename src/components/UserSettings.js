import { useEffect } from "react"
import img from "../assets/profileimg.png"
import Nav from "./Nav"
import ProfileSidebar from "./ProfileSidebar"
import Sidebar from "./Sidebar"
import UserProfile from "./UserProfile"
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux"

const UserSettings = () => {
    
    const {data:user, loading, error} = useSelector((state) => state.auth)
    
    useEffect(()=> {
        console.log('fetched');
        }, [user])
    
    if(loading) {
        return <p>loading...</p>
    }

    if(error){
        return <p className="text-red-500">{error}</p>
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
                        <ProfileSidebar/>
                        </div>
                        <div className="sm:mx-4 font-inter">
                            <p className="font-semibold text-[20px] pb-4">Settings</p>
                            <div className=" flex flex-col md:flex-row ">
                                <div className="p-4 lg:p-10 flex flex-col items-center justify-center border border-b-0 md:border-b-[1px] md:border-r-0 border-[#9C9C9C] rounded-t-[16px] md:rounded-e-none md:rounded-s-[16px]">
                                    <div className="border border-[#9C9C9C] rounded-full p-1">
                                        <img src={img} className="w-[112px] h-[112px] " alt="" />
                                    </div>
                                    <p className="pt-2 text-[#1C1C1C] text-[20px] "></p>
                                </div>
                                <hr />
                                <div className="w-[90vw] sm:w-fit border border-t-0 md:border-t-[1px] border-[#9C9C9C] rounded-b-[16px] md:rounded-s-none md:rounded-e-[16px] p-5">
                                    <div className="flex gap-5">
                                        <p className="pt-2 text-[#1C1C1C] text-[20px] ">Basic Information</p>
                                        <FaRegEdit className="mt-3.5 text-blue-600" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 md:12 lg:mr-20">
                                        <div className="py-4">
                                            <p className="text-[10px] text-[#1C1C1C99] py-1">Email ID</p>
                                            <p className="text-[#1C1C1CCC] text-[14px] ">{user?.email || "User Name"}</p>
                                        </div>
                                        <div className="md:py-4">
                                            <p className="text-[10px] text-[#1C1C1C99] py-1">Location</p>
                                            <p className="text-[#1C1C1CCC] text-[14px] ">{user?.country}</p>
                                        </div>
                                        <div className="py-4">
                                            <p className="text-[10px] text-[#1C1C1C99] py-1">Phone Number</p>
                                            <p className="text-[#1C1C1CCC] text-[14px] ">{user?.number || " "}</p>
                                        </div>
                                        <div className="md:py-4">
                                            <p className="text-[10px] text-[#1C1C1C99] py-1">Gender</p>
                                            <p className="text-[#1C1C1CCC] text-[14px] ">{user?.gender || " "}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-5 p-5 border border-[#9C9C9C] rounded-[16px]">
                                <div className="flex gap-4">
                                    <p className="px-2 text-[#1C1C1C] text-[20px] ">Channel Information</p>
                                    <FaRegEdit className="mt-1.5 text-blue-600" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 md:mr-12 lg:mr-20 pl-2">
                                    <div className="py-4">
                                        <p className="text-[10px] text-[#1C1C1C99] py-1">Channel Name</p>
                                        <p className="text-[#1C1C1CCC] text-[14px] ">{user?.lastName || "User Name"}</p>
                                    </div>
                                    <div className="md:py-4">
                                        <p className="text-[10px] text-[#1C1C1C99] py-1">Niche</p>
                                        <p className="text-[#1C1C1CCC] text-[14px] ">{user?.lastName || "User Name"}</p>
                                    </div>
                                    <div className="py-4">
                                        <p className="text-[10px] text-[#1C1C1C99] py-1">Language</p>
                                        <p className="text-[#1C1C1CCC] text-[14px] ">{user?.lastName || "User Name"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettings