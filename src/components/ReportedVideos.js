import Dashboard from "./Dashboard"
import Nav from "./Nav"
import ProfileSidebar from "./ProfileSidebar"
import Sidebar from "./Sidebar"
import UserProfile from "./UserProfile"

const ReportedVideos = () => {
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
                    <UserProfile/>
                    <hr className="my-5 w-full" />
                    <div className="flex gap-10">
                    <ProfileSidebar/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportedVideos