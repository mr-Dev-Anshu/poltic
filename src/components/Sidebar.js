import { GoHomeFill } from "react-icons/go"
import img from "../assets/Vector5.png"
import img1 from "../assets/Group.jpg"

const Sidebar = () => {
    return (
        <div className="bg-white w-full flex md:flex-col gap-4 sm:gap-14 md:gap-4 font-roboto p-2 items-center md:items-start md:justify-normal justify-around mx-auto md:mx-0 md:bg-[#F6F6F6] h-[36px] md:h-[calc(100vh-89px)] md:w-[227px] ">
            <div className="flex gap-1 md:m-2">
                <GoHomeFill className="m-1" />
                <button className="">Home</button>
            </div>
            <div className="flex gap-1 md:mx-2">
                <img src={img1} alt=""  className="m-1" />
                <button className="">Breaking</button>
            </div>
            <div className="flex gap-1 md:m-2">
                <img src={img} alt=""  className="m-1" />
                <button className="">Subscription</button>
            </div>
        </div>
    )
}

export default Sidebar