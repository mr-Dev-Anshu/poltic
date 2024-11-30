import { Link } from "react-router-dom"
import VideosList from "../constants/VideoList"
import Videos from "./Videos"

const Dashboard = () => {
    return (
        <div>
            <div>
                <p className="font-semibold text-[20px] pb-2 font-inter ">Dashboard</p>
                <div className="grid grid-cols-3 gap-5  sm:gap-10">
                    <div className="w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold ">1.3M</p>
                        <p className="text-[17px] font-normal text-[#999999]  ">Total views</p>
                    </div>
                    <div className="w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold ">145</p>
                        <p className="text-[17px] font-normal text-[#999999]  ">Total videos</p>
                    </div>
                    <div className="hidden w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] sm:flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold ">42.5k</p>
                        <p className="text-[17px] font-normal text-[#999999] ">Total comments</p>
                    </div>
                    <div className="sm:hidden w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold ">400k</p>
                        <p className="text-[17px] font-normal text-[#999999] ">Subscribers</p>
                    </div>
                </div>
            </div>
            <div>
                <p className="font-semibold text-[20px] py-2 font-inter mt-5">Top Performing News</p>
                <div className="sm:m-5 font-roboto">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center items-center mx-auto max-w-7xl">
                        {VideosList.map((short) => (
                            <Link
                                to={`/short/${short.id}`}
                                key={short.id}
                                className="flex flex-col"
                            >
                                <img
                                    src={short.thumbnail}
                                    alt={short.title}
                                    className="h-[265px] object-cover rounded-lg w-full "
                                />
                                <div className="">
                                    <p className="font-light mt-2">{short.title}</p>
                                    <p className="text-[14px] font-light">{short.views}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard