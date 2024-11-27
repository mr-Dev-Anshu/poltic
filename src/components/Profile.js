import img from "../assets/profileimg.png"

const Profile = () => {
    return (
        <div className=" w-full flex flex-col items-center justify-center mx-auto p-5">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="flex flex-col items-center">
                <p className="md:text-[31px] text-[19px] ">Riya Sharma</p>
                <p className="md:text-[25px] text-[16px] text-[#B7B7B7] ">@riyakinews</p>
                <div className="flex gap-4 p-2 md:p-0">
                    <div >
                        <p className="text-[#065FD4] md:text-[32px] text-[22px] font-medium">400K</p>
                        <p className="md:text-[20px] text-[14px] ">Subscribers</p>
                    </div>
                    <div className="bg-gray-300 h-14 mx-8 md:mx-0 md:mt-3 w-[1px] "/>
                    <div>
                        <p className="text-[#065FD4] md:text-[32px] text-[22px] font-medium">280</p>
                        <p className="md:text-[20px] text-[14px] ">News</p>
                    </div>
                </div>
                <button className="px-6 py-2 bg-[#065FD4] m-3 text-white rounded-md">Subscribe</button>
            </div>
        </div>
    )
}

export default Profile