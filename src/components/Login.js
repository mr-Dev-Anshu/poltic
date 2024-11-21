import img from "../assets/image1.png"
import img1 from "../assets/image-Photoroom (38) 1.png"
import { FaArrowRight } from "react-icons/fa"
import { LuDot } from "react-icons/lu"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-between">
            <div className="md:w-[50%] h-screen mx-auto">
                <img onClick={()=> navigate("/")} src={img1} alt="" className="h-[50px] md:h-[65px] md:p-2 md:ml-4" />
                <div className="flex flex-col justify-center items-center h-[calc(100vh-84px)]">             
                <form className="flex flex-col max-h-screen m-auto">
                <div className="">
                        <p className="font-medium text-[20px] ">Sign in</p>
                </div>
                <input type="email" placeholder="Email Address *" className="w-72 px-3 py-2 border border-1 my-4 border-[#0000003B] rounded-sm" />
                <input type="password" placeholder="Password *" className="w-72 px-3 py-2 border border-1 border-[#0000003B] rounded-sm" />
                <div className="flex justify-between my-5">
                        <button className="px-4 py-2 bg-[#065FD4] text-white rounded-md flex gap-2" type="submit">LOGIN <FaArrowRight className="m-1"/></button>
                        <button className="text-[14px] font-semibold ">Forgot your password?</button>
                </div>
                <div className="">
                        <button className="px-4 py-3 bg-black text-white rounded-sm w-full uppercase" onClick={()=>navigate("/signup")} >Create new Account</button>
                    </div>
                </form>
                <div className="flex text-[#000000DE] ">
                    <button className="text-[14px] ">Terms and conditions</button>
                    <LuDot className="m-1"/>
                    <button className="text-[14px] ">Privacy policy</button>
                </div>
                </div>
            </div>
            <div className="w-[40%] hidden md:flex">
                <img src={img} alt="" className="h-screen w-full object-cover" />
            </div>
        </div>
    )
}

export default Login