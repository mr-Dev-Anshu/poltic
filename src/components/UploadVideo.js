import { useState } from "react";

const UploadVideo = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Button to open the modal */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={toggleModal}
            >
                Open Upload News Modal
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-6">
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={toggleModal}
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-4">Upload News</h2>
                        {/* File Upload Section */}
                        <div className="border-dashed border-2 border-blue-500 rounded-lg p-6 text-center mb-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                Choose File
                            </button>
                            <p className="text-gray-500 mt-2">.mp4 & .mov</p>
                        </div>

                        {/* Title Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg w-full p-2"
                                placeholder="Enter title"
                            />
                        </div>

                        {/* Description Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                className="border border-gray-300 rounded-lg w-full p-2"
                                rows="4"
                                placeholder="Enter description"
                            />
                        </div>

                        {/* Thumbnail Upload Section */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Thumbnail</label>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                                Choose File
                            </button>
                        </div>

                        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                            Upload News
                        </button>
                    </div>
                </div>
            )}
        </div>
    )

}

export default UploadVideo