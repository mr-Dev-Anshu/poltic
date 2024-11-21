import { useNavigate } from "react-router-dom"
import img1 from "../assets/image-Photoroom (38) 1.png"
import { NavButtons } from "../constants/NavButtons"

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className="sticky rounded-2xl flex justify-between h-[81px] ">
            <div className="flex items-center ml-6">
                <button onClick={() => navigate("/")}>
                    <img src={img1} alt="logo" className="h-[50px] mr-2"/>
                </button>
            </div>
            <div className="flex gap-[65px] text-[18px]">
                {NavButtons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(button.link)}>
                        {button.title}
                    </button>
                ))}
            </div>
            <div className="flex items-center mr-6">
                <div className="card text-sm font-medium">
                    <button className="px-5 p-3 bg-[#032347] rounded-md text-white" onClick={() => navigate("/login")}>Login/SignUp</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar