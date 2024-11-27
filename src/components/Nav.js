import { IoMdSearch } from "react-icons/io"
import img from "../assets/image-Photoroom (38) 1.png"

const Nav = () => {
    return (
        <div className="sticky h-[53px] md:h-[89px] flex justify-between items-center bg-white font-roboto md:bg-[#F6F6F6] ">
            <div className="md:hidden bg-[#E0E9F3] h-[33px] w-[33px] rounded-full flex items-center justify-center ml-2">
            <IoMdSearch className="h-[16px] w-[16px]" />
            </div>
            <div className="md:ml-4">
                <img src={img} alt="" className="w-[99px] md:w-[138px]" />
            </div>
            <div className="bg-[#032347] w-[33px] h-[33px] rounded-full flex items-center justify-center mr-2 md:mr-12">
                <p className="text-white">A</p>
            </div>
        </div>
    )
}

export default Nav