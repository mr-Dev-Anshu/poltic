import { MdOutlineArrowDropDownCircle } from "react-icons/md"
import img from "../assets/profileimg.png"

const UserProfile = () => {
    return (
        <div className=" w-full flex flex-col md:flex-row items-center md:justify-normal justify-center mx-auto p-5">
            <div className="">
                <img src={img} alt="" className="sm:pr-10" />
                <div className="absolute -z-10 right-6 top-24 sm:hidden">
                <MdOutlineArrowDropDownCircle className=" h-6 w-6 "/>
                </div>
            </div>
            <div className="flex flex-col items-center sm:items-start">
                <p className="md:text-[31px] text-[19px] py-1 md:py-0">Riya Sharma</p>
                <p className="md:text-[25px] text-[16px] text-[#B7B7B7] ">@riyakinews</p>
                <div className="hidden md:flex gap-4 p-2 md:p-0">
                    <div >
                        <p className="text-[#065FD4] md:text-[32px] text-[22px] font-medium">400K</p>
                        <p className="md:text-[20px] text-[14px] ">Subscribers</p>
                    </div>
                    <div className="bg-gray-300 h-14 mx-8 md:mx-0 md:mt-3 w-[1px] " />
                    <div>
                        <p className="text-[#065FD4] md:text-[32px] text-[22px] font-medium">280</p>
                        <p className="md:text-[20px] text-[14px] ">News</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile