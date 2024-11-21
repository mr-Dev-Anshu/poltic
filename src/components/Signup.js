import img from "../assets/image2.png"
import img1 from "../assets/image-Photoroom (38) 1.png"
import { LuDot } from "react-icons/lu"
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-between">
            <div className="md:w-[50%] h-screen mx-auto">
                <img onClick={()=> navigate("/")} src={img1} alt="" className="h-[50px] md:h-[65px] md:p-2 " />
                <div className="flex flex-col justify-center items-center h-[calc(100vh-84px)]">
                    <form className="flex flex-col max-h-screen m-auto">
                        <div className="">
                            <p className="font-medium text-[20px] ">Sign up to Poltic</p>
                        </div>
                        <div className="flex gap-4">
                            <input type="text" placeholder="First Name" className="w-60 px-3 py-2 border border-1 mt-4 border-[#0000003B] rounded-sm" />
                            <input type="text" placeholder="Last Name" className="w-60 px-3 py-2 border border-1 mt-4 border-[#0000003B] rounded-sm" />
                        </div>
                        <input type="email" placeholder="Email Address *" className="w-full px-3 py-2 border border-1 my-4 border-[#0000003B] rounded-sm" />
                        <div className="flex gap-4">
                            <input type="text" placeholder="Country" className="w-60 px-3 py-2 border border-1 mb-4 border-[#0000003B] rounded-sm" />
                            <input type="text" placeholder="Phone" className="w-60 px-3 py-2 border border-1 mb-4 border-[#0000003B] rounded-sm" />
                        </div>
                        <div className="">
                            <button className="px-4 py-2 my-4 bg-[#065FD4] text-white rounded-sm w-full uppercase" >Sign up</button>
                            <button className="px-4 py-2 bg-black text-white rounded-sm w-full uppercase" onClick={()=> navigate("/login")} >Back To Login</button>
                        </div>
                    </form>
                    <div className="flex text-[#000000DE] ">
                        <button className="text-[14px] ">Terms and conditions</button>
                        <LuDot className="m-1" />
                        <button className="text-[14px] ">Privacy policy</button>
                    </div>
                </div>
            </div>
            <div className="w-[30%] hidden md:flex">
                <img src={img} alt="" className="h-screen w-full object-cover" />
            </div>
        </div>
    )
}

export default Signup