import { Link } from "react-router-dom";
import VideosList from "../constants/VideoList";
import Nav from "./Nav";
import ProfileSidebar from "./ProfileSidebar";
import Sidebar from "./Sidebar";
import UserProfile from "./UserProfile";
import { useState } from "react";

const Library = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="flex flex-col h-screen font-roboto">
            <div className="fixed top-0 w-full z-10">
                <Nav />
            </div>
            <div className="flex flex-1 pt-[53px] md:pt-[89px]">
                <div className="fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-scroll custom-scrollbar ml-0 md:ml-[227px] pt-6 px-5">
                    <UserProfile />
                    <hr className="my-5 w-full" />
                    <div className="flex gap-10">
                        <ProfileSidebar />

                        <div>
                            <div className="sm:m-5 font-roboto">
                                <div className="flex justify-between my-2">
                                    <p className="font-semibold text-[20px] py-2 font-inter">
                                        Video Library
                                    </p>
                                    <div>
                                        <button className="bg-[#065FD4] text-white py-2 px-4 rounded-md" onClick={toggleModal}>
                                            Upload Video
                                        </button>
                                        {isOpen && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                                <div className="bg-white rounded-lg w-full max-w-md p-6">
                                                    <div className="flex justify-between">
                                                    <h2 className="text-2xl font-bold mb-4">
                                                        Upload News
                                                    </h2>
                                                    <button
                                                        className="mb-4 text-xl"
                                                        onClick={toggleModal}>
                                                        ✕
                                                    </button>
                                                    </div>
                                                    <div className="border-dashed border-2 border-[#065FD4] rounded-lg p-6 text-center mb-4">
                                                        <button className="bg-[#065FD4] text-white px-4 py-2 rounded">
                                                            Choose File
                                                        </button>
                                                        <p className="text-gray-500 mt-2">.mp4 & .mov</p>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 mb-2">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="border border-gray-300 rounded-lg w-full p-2"
                                                            placeholder="Enter title"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 mb-2">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            className="border border-gray-300 rounded-lg w-full p-2"
                                                            rows="4"
                                                            placeholder="Enter description"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 mb-2">
                                                            Thumbnail
                                                        </label>
                                                        <button className="border-2 border-[#065FD4] text-[#065FD4] px-4 py-2 rounded">
                                                            Choose File
                                                        </button>
                                                    </div>

                                                    <button className="bg-[#065FD4] text-white px-4 py-2 rounded w-full">
                                                        Upload News
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
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
                </div>
            </div>
        </div>
    );
};

export default Library;
