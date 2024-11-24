import Nav from "./Nav"
import Reels from "./Reels"
import Sidebar from "./Sidebar"

const VideoPlay = () => {
    return (
        <div>
            <Nav/>
            <div className="flex">
                <Sidebar/>
                <Reels/>
            </div>
        </div>
    )
}

export default VideoPlay