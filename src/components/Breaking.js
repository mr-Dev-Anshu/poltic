import Nav from "./Nav"
import Sidebar from "./Sidebar"
import img0 from "../assets/Rectangle 47.png"
import img1 from "../assets/Rectangle 49.png"
import img2 from "../assets/Rectangle 50.png"

const Breaking = () => {
    const tags = ["Trending", "Cricket", "Politics", "Cricket"];
    const newsData = [
        { id: 1, imgSrc: img0 },
        { id: 2, imgSrc: img1 },
        { id: 3, imgSrc: img2 },
        { id: 4, imgSrc: img0 },
        { id: 5, imgSrc: img1 },
        { id: 6, imgSrc: img2 },
        { id: 7, imgSrc: img1 },
        { id: 8, imgSrc: img2 },
        { id: 9, imgSrc: img0 },
    ];
    return (
        <div className="flex flex-col h-screen font-roboto">
            <div className="fixed top-0 w-full z-50">
                <Nav />
            </div>
            <div className="flex flex-1 pt-[53px] md:pt-[89px]">
                <div className="z-50 fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-scroll custom-scrollbar ml-0 md:ml-[227px] pt-6 px-2 sm:px-5">
                    <div className="flex flex-col items-center space-y-4">
                        <input
                            type="text"
                            placeholder="Search for your favourite News"
                            className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex space-x-3">
                            {tags.map((tag, index) => (
                                <button
                                    key={index}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* News Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 sm:px-32">
                        {newsData.map((news) => (
                            <div
                                key={news.id}
                                className="relative w-[160px] sm:w-[200px] rounded-lg overflow-hidden"
                            >
                                <img
                                    src={news.imgSrc}
                                    alt={`News ${news.id}`}
                                    className="w-[160px] sm:w-[200px] object-cover"
                                />
                                {/* Play Icon */}
                                <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-gray-800"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5.5 4.5l12.5 7-12.5 7v-14z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Breaking