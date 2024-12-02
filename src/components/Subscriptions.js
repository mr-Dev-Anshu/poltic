import { SubscribedChannels } from "../constants/SubscribedChannels"
import Nav from "./Nav"
import ProfileSidebar from "./ProfileSidebar"
import Sidebar from "./Sidebar"
import UserProfile from "./UserProfile"

const Subscriptions = () => {
    return (
        <div className="flex flex-col h-screen font-roboto">
            <div className="z-50 fixed top-0 w-full">
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
                        <div>
                            <div className="sm:mx-4 font-inter w-[90vw]">
                                <p className="text-center md:text-start font-semibold text-[20px] pb-4 font-inter">All Subscribed Channels</p>
                                <div className="grid md:grid-cols-2 gap-10 justify-center mb-10 items-center mx-auto max-w-7xl">
                                    {SubscribedChannels.map((channel) => (
                                       <div className="flex gap-5">
                                         <div className="flex gap-5">
                                            <div>
                                                <img src={channel.profile} alt="" className="h-[75px] w-[75px]" />
                                            </div>
                                            <div>
                                                <p className="text-[18px] ">{channel.name}</p>
                                                <p className="text-[13px] text-[#B7B7B7]">{channel.attherate}</p>
                                                <p className="text-[13px] text-[#065FD4]">{channel.subscribers} <span className="text-[#B7B7B7]">Subscribers</span></p>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="bg-[#F0F0F0] rounded-md text-[#717171] text-[12px] px-3 py-2">Subscribed</button>
                                        </div>
                                       </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscriptions