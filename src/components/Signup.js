import img from "../assets/image2.png"
import img1 from "../assets/image-Photoroom (38) 1.png"
import { LuDot } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { signupUser } from "../features/auth/authThunk"

const Signup = () => {

    const dispatch = useDispatch()
    const { isLoading, error} = useSelector((state) => state.auth)

    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [country, setCountry] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
  
    const handleSignup = () => {
      dispatch(signupUser({firstName, lastName, email, country, phone, password, confPassword}));
    };

    const navigate = useNavigate()
    return (
        <div className="flex justify-between">
                <img onClick={()=> navigate("/")} src={img1} alt="" className="h-[50px] md:m-4 " />
            <div className="md:w-[50%] h-screen mx-auto">
                <div className="flex flex-col justify-center items-center h-[calc(100vh-84px)]">
                    <form className="flex flex-col max-h-screen m-auto">
                        <div className="">
                            <p className="font-medium text-[20px] ">Sign up to Poltic</p>
                        </div>
                        <div className="flex gap-4">
                            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFName(e.target.value)} className="w-60 px-3 py-2 border border-1 mt-4 border-[#0000003B] rounded-sm" />
                            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLName(e.target.value)} className="w-60 px-3 py-2 border border-1 mt-4 border-[#0000003B] rounded-sm" />
                        </div>
                        <input type="email" placeholder="Email Address *" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-1 my-4 border-[#0000003B] rounded-sm" />
                        <div className="flex gap-4">
                            <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-60 px-3 py-2 border border-1 mb-4 border-[#0000003B] rounded-sm" />
                            <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-60 px-3 py-2 border border-1 mb-4 border-[#0000003B] rounded-sm" />
                        </div>
                        <div className="flex gap-4">
                            <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-60 px-3 py-2 border border-1 mb-4 border-[#0000003B] rounded-sm" />
                            <input type="text" placeholder="Confirm Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className="w-60 px-3 py-2 border border-1 mb-4 border-[#0000003B] rounded-sm" />
                        </div>
                        <div className="">
                            <button className="px-4 py-2 my-4 bg-[#065FD4] text-white rounded-sm w-full uppercase" onClick={handleSignup}>Sign up</button>
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