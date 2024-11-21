// import { useNavigate } from "react-router-dom"
import img from "../assets/Vector.png"
import img1 from "../assets/v1.jpg"
import { ItemList } from "../constants/ItemList";

const HeroSection = () => {
  return (
    <div className="font-inter bg-no-repeat bg-right-bottom md:h-[1200px]" 
    style={{ backgroundImage: `url(${img1})` }}>
      <div className="p-10 flex justify-between">
        <div className="md:w-[40%] md:p-10">
          <span className="bg-gradient-to-b from-transparent via-transparent text-[20px] md:text-[60px] font-medium to-[#A6CCFF]">
            News by You
          </span>
          <p className="text-[20px] md:text-[60px] font-medium">In just 1 Minute of Video!</p>
          <p className="text-[18px] py-4 text-[#23291FCC]">
            Share and Discover the Latest Political Opinions, Trending Issues, and Breaking News. All in Quick Videos from Everyday Citizens!
          </p>
          <div className="flex items-center mr-6">
            <div className="text-sm font-medium py-2">
              <button className="px-6 p-3 bg-[#032347] rounded-md text-white">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="md:py-10 rounded-md">
          <div className="w-[120px] md:w-[587px] h-[80px] md:h-[358px] bg-[#F8E8E8] rounded-md" />
        </div>
      </div>
      <div
        className="flex flex-col items-center bg-left bg-no-repeat py-8"
        style={{ backgroundImage: `url(${img})` }}>
        <p className="text-center text-[15px] font-medium pt-16">Short Form Video News</p>
        <p className="text-center text-[44px] font-medium">Why PolTic?</p>
        <p className="text-center text-[16px] text-[#000000E5] md:w-[30%] py-1">
          Join a community where your voice matters! At #PolTic, everyone shapes the news that impacts our lives.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 p-5 md:px-24 gap-10 bg-no-repeat bg-right-bottom">
        {ItemList.map((item, index)=>(
            <div className="bg-[#F3F8FF] p-4 w-[275px]">
                <div className="bg-[#D9D9D9] h-[31px] w-[31px] rounded-full"/>
                <p className="py-2 text-[18px] font-semibold">{item.title}</p>
                <p className="text-[14px] text-[#3D3C3C]">{item.description}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
