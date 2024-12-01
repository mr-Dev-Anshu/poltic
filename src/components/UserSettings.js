import img from "../assets/profileimg.png"
import Nav from "./Nav"
import ProfileSidebar from "./ProfileSidebar"
import Sidebar from "./Sidebar"
import UserProfile from "./UserProfile"

const UserSettings = () => {
    return (
        <div className="flex flex-col h-screen font-roboto">
            <div className="fixed top-0 w-full z-10">
                <Nav />
            </div>
            <div className="flex flex-1 pt-[53px] md:pt-[89px]">
                <div className="fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-scroll custom-scrollbar ml-0 md:ml-[227px] pt-6 px-5">
                    <UserProfile />
                    <hr className="my-5 w-full" />
                    <div className="flex gap-10">
                        <ProfileSidebar />
                        <div className="sm:mx-4 font-inter">
                            <p className="font-semibold text-[20px] pb-4">Settings</p>
                            <div className="border border-[#9C9C9C] rounded-[16px] flex ">
                                <div className="p-5 flex flex-col items-center justify-center">
                                    <div className="border border-[#9C9C9C] rounded-full p-1">
                                    <img src={img} className="w-[112px] h-[112px] " alt="" />
                                    </div>
                                    <p className="pt-2 text-[#1C1C1C] text-[20px] ">Riya Sharma</p>
                                </div>
                                <hr />
                                <div>
                                <p className="pt-2 text-[#1C1C1C] text-[20px] ">Basic Information</p>
                                    <div>
                                        <div>
                                            <p>Email ID</p>
                                            <p>riya@gmail.com</p>
                                        </div>
                                        <div>
                                            <p>Location</p>
                                            <p>Agra, Uttar Pradesh, India</p>
                                        </div>
                                        <div>
                                            <p>Phone Number</p>
                                            <p></p>
                                        </div>
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