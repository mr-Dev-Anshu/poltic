import Navbar from "./Navbar"
import img from "../assets/bg.png"
import img1 from "../assets/intro.png"
import img2 from "../assets/login.png"
import Footer from "./Footer"
import { IoCheckmarkSharp } from "react-icons/io5"

const About = () => {
    return (
        <div className="font-inter">
            <Navbar />
            <div className="h-[359px] bg-no-repeat bg-cover flex items-center justify-center text-white "
                style={{ backgroundImage: `url(${img})` }}
            >
                <p className="text-[48px] font-semibold text-center">PolTic: News for the <br /> Next Generation</p>
            </div>
            <div className="p-20">
                <span className="px-4 py-2 my-2 rounded-xl bg-[#F3F5F7] text-[#032347] text-[15px] font-medium ">About PolTic</span>
                <p className="bg-gradient-to-b from-transparent  via-transparent text-[20px] md:text-[44px] font-medium to-[#A6CCFF] w-fit my-2">Introduction</p>
                <div className="flex gap-5 justify-between">
                    <div className="w-[45%]">
                        <p className="text-[#23291FCC] text-[18px] py-4">PolTic is a unique social media platform dedicated to the voices of everyday citizens on political opinions, Trending Issues, and Breaking News. Users post quick, under-1-minute videos where they discuss their views on a wide range of topics, that affect their lives. The platform emphasizes transparency, aiming to avoid bias, toxicity, and hidden agendas often present in some media.</p>
                        <div className="flex gap-2 py-2">
                            <IoCheckmarkSharp className="my-1" />
                            <p className="font-semibold text-[16px]">Credible, Curated News – <span className="font-medium text-[#23291FCC] ">Every story on Poltic is sourced
                                and verified, ensuring you receive news you can trust.</span> </p>
                        </div>
                        <div className="flex gap-2 py-2">
                            <IoCheckmarkSharp className="my-1" />
                            <p className="font-semibold text-[16px]">Engaging Format – <span className="font-medium text-[#23291FCC] "> Our short-form videos make complex topics easy to understand, keeping you both informed and entertained.</span> </p>
                        </div>
                        <div className="flex gap-2 py-2">
                            <IoCheckmarkSharp className="my-1" />
                            <p className="font-semibold text-[16px]">Effortless Access – <span className="font-medium text-[#23291FCC] "> Access the news that matters with just a few taps, wherever and whenever it suits you.</span> </p>
                        </div>
                        <div className="flex gap-2 py-2">
                            <IoCheckmarkSharp className="my-1" />
                            <p className="font-semibold text-[16px]">Inclusivity – <span className="font-medium text-[#23291FCC] "> Open to people from all walks of life across India, representing diverse regional, linguistic, and cultural perspectives.</span> </p>
                        </div>
                    </div>
                    <div className="relative mx-10">
                        <img src={img2} alt="" style={{ zIndex: 1, position: "relative" }} />
                        <div className="w-[558px] h-[526px] bg-[#F3F5F7] rounded-lg inset-0 " style={{ position: "absolute", top: "50px", left: "50px" }} />
                    </div>
                </div>
            </div>
            <div className="flex m-20 my-36">
                <div className="relative mx-10">
                    <img src={img1} alt="" style={{ zIndex: 1, position: "relative" }} />
                    <div className="w-[558px] h-[526px] bg-[#F3F5F7] rounded-lg inset-0 " style={{ position: "absolute", top: "50px", left: "-50px" }} />
                </div>
                <div className=" w-[40%] m-20">
                    <span className="px-4 py-2 my-2 rounded-xl bg-[#F3F5F7] text-[#032347] text-[15px] font-medium ">Our Mission</span>
                    <br />
                    <span className="bg-gradient-to-b from-transparent  via-transparent to-[#A6CCFF]  text-[20px] md:text-[44px] font-medium w-fit">Empowering {" "} </span><span className=" text-[20px] md:text-[44px] font-medium">You With News That Matters</span>
                    <p className="text-[#23291FCC] text-[18px] py-4">To empower people with quick, credible, and impactful news stories that keep them connected to the world around them. We aim to bridge the gap between complex issues and everyday audiences, making news more relatable, insightful, and meaningful.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About