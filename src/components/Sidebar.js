const Sidebar = () => {
    return (
        <div className="hidden md:flex flex-col bg-[#F6F6F6] h-[calc(100vh-89px)] w-[227px] ">
            <div>
                <button className="p-2">Home</button>
            </div>
            <div>
                <p>Breaking</p>
            </div>
            <div>
                <p>Subscription</p>
            </div>
        </div>
    )
}

export default Sidebar