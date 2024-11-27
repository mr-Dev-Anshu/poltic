const Dashboard = () => {
    return (
        <div>
            <div>
                <p className="font-semibold text-[20px] pb-2 font-inter ">Dashboard</p>
                <div className="grid grid-cols-3 gap-10">
                    <div className="w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold ">1.3M</p>
                        <p className="text-[17px] font-normal text-[#999999]  ">Total views</p>
                    </div>
                    <div className="w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold ">145</p>
                        <p className="text-[17px] font-normal text-[#999999]  ">Total videos</p>
                    </div>
                    <div className="w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                        <p className="text-[24px] font-semibold ">42.5k</p>
                        <p className="text-[17px] font-normal text-[#999999] ">Subscribers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard