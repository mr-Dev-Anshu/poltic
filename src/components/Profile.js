import img from "../assets/profileimg.png"

const Profile = () => {
    return (
        <div className=" w-full flex flex-col items-center justify-center mx-auto p-5">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <p>Riya Sharma</p>
                <p>@riyakinews</p>
                <div className="flex gap-4">
                    <div >
                        <p className="text-[#065FD4] text-lg font-medium">400K</p>
                        <p>Subscribers</p>
                    </div>
                    <div className="bg-gray-300 h-12 w-[1px] "/>
                    <div>
                        <p className="text-[#065FD4] text-lg font-medium">280</p>
                        <p>News</p>
                    </div>
                </div>
                <button className="px-4 py-2 bg-[#065FD4] text-white rounded-md">Subscribe</button>
            </div>
        </div>
    )
}

export default Profile