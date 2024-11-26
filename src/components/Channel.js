import Nav from "./Nav"
import Navbar from "./Navbar"
import Profile from "./Profile"
import Sidebar from "./Sidebar"

const Channel = () => {
    return (
        <div>
            <Nav/>
            <div className="flex">
                <Sidebar/>
                <div className="flex flex-col mx-auto">
                    <Profile/>
                </div>
            </div>
        </div>
    )
}

export default Channel