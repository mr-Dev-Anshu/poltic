// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import img from "../assets/profileimg.png";
// import Nav from "./Nav";
// import ProfileSidebar from "./ProfileSidebar";
// import Sidebar from "./Sidebar";
// import UserProfile from "./UserProfile";
// import { FaRegEdit } from "react-icons/fa";

// const Modal = ({ children, isOpen, onClose }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg w-[90%] max-w-[500px] p-6">
//                 <button
//                     className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                     onClick={onClose}
//                 >
//                     &#10005;
//                 </button>
//                 {children}
//             </div>
//         </div>
//     );
// };

// const UserSettings = () => {
//     const { data: user, loading, error } = useSelector((state) => state.auth);

//     const [isBasicInfoModalOpen, setBasicInfoModalOpen] = useState(false);
//     const [isChannelInfoModalOpen, setChannelInfoModalOpen] = useState(false);

//     const [basicInfo, setBasicInfo] = useState({
//         name: user?.name || "",
//         country: user?.country || "",
//         phone: user?.number || "",
//         gender: user?.gender || "",
//     });

//     const [channelInfo, setChannelInfo] = useState({
//         channelName: user?.lastName || "",
//         niche: user?.niche || "",
//         language: user?.language || "",
//     });

//     useEffect(() => {
//         console.log("fetched");
//     }, [user]);

//     const handleBasicInfoChange = (e) => {
//         const { name, value } = e.target;
//         setBasicInfo((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleChannelInfoChange = (e) => {
//         const { name, value } = e.target;
//         setChannelInfo((prev) => ({ ...prev, [name]: value }));
//     };

//     const saveBasicInfo = () => {
//         console.log("Saving Basic Info:", basicInfo);
//         setBasicInfoModalOpen(false);
//         // API call to save updated basic info
//     };

//     const saveChannelInfo = () => {
//         console.log("Saving Channel Info:", channelInfo);
//         setChannelInfoModalOpen(false);
//         // API call to save updated channel info
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p className="text-red-500">{error}</p>;
//     }

//     return (
//         <div className="flex flex-col h-screen font-roboto">
//             <div className="fixed top-0 w-full z-50">
//                 <Nav />
//             </div>
//             <div className="flex flex-1 pt-[53px] md:pt-[89px]">
//                 <div className="z-50 fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
//                     <Sidebar />
//                 </div>
//                 <div className="flex-1 overflow-y-scroll custom-scrollbar ml-0 md:ml-[227px] pt-6 px-5">
//                     <UserProfile />
//                     <hr className="my-5 w-full" />
//                     <div className="flex gap-10">
//                         <div className="hidden md:flex">
//                             <ProfileSidebar />
//                         </div>
//                         <div className="sm:mx-4 font-inter">
//                             <p className="font-semibold text-[20px] pb-4">Settings</p>

//                             {/* Basic Information */}
//                             <div className="my-5 p-5 border border-[#9C9C9C] rounded-[16px]">
//                                 <div className="flex justify-between items-center">
//                                     <p className="text-[#1C1C1C] text-[20px]">Basic Information</p>
//                                     <FaRegEdit
//                                         className="cursor-pointer text-blue-600"
//                                         onClick={() => setBasicInfoModalOpen(true)}
//                                     />
//                                 </div>
//                             </div>

//                             {/* Channel Information */}
//                             <div className="my-5 p-5 border border-[#9C9C9C] rounded-[16px]">
//                                 <div className="flex justify-between items-center">
//                                     <p className="text-[#1C1C1C] text-[20px]">Channel Information</p>
//                                     <FaRegEdit
//                                         className="cursor-pointer text-blue-600"
//                                         onClick={() => setChannelInfoModalOpen(true)}
//                                     />
//                                 </div>
//                             </div>

//                             {/* Basic Information Modal */}
//                             <Modal
//                                 isOpen={isBasicInfoModalOpen}
//                                 onClose={() => setBasicInfoModalOpen(false)}
//                             >
//                                 <h3 className="text-lg font-bold mb-4">Edit Basic Information</h3>
//                                 <form onSubmit={(e) => { e.preventDefault(); saveBasicInfo(); }}>
//                                     <div className="mb-4">
//                                         <label className="block text-sm font-medium text-gray-700">Name</label>
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             value={basicInfo.name}
//                                             onChange={handleBasicInfoChange}
//                                             className="w-full border rounded-md p-2"
//                                         />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label className="block text-sm font-medium text-gray-700">Location</label>
//                                         <input
//                                             type="text"
//                                             name="country"
//                                             value={basicInfo.country}
//                                             onChange={handleBasicInfoChange}
//                                             className="w-full border rounded-md p-2"
//                                         />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label className="block text-sm font-medium text-gray-700">Phone</label>
//                                         <input
//                                             type="text"
//                                             name="phone"
//                                             value={basicInfo.phone}
//                                             onChange={handleBasicInfoChange}
//                                             className="w-full border rounded-md p-2"
//                                         />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label className="block text-sm font-medium text-gray-700">Gender</label>
//                                         <input
//                                             type="text"
//                                             name="gender"
//                                             value={basicInfo.gender}
//                                             onChange={handleBasicInfoChange}
//                                             className="w-full border rounded-md p-2"
//                                         />
//                                     </div>
//                                     <button
//                                         type="submit"
//                                         className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                                     >
//                                         Save
//                                     </button>
//                                 </form>
//                             </Modal>

//                             {/* Channel Information Modal */}
//                             <Modal
//                                 isOpen={isChannelInfoModalOpen}
//                                 onClose={() => setChannelInfoModalOpen(false)}
//                             >
//                                 <h3 className="text-lg font-bold mb-4">Edit Channel Information</h3>
//                                 <form onSubmit={(e) => { e.preventDefault(); saveChannelInfo(); }}>
//                                     <div className="mb-4">
//                                         <label className="block text-sm font-medium text-gray-700">Channel Name</label>
//                                         <input
//                                             type="text"
//                                             name="channelName"
//                                             value={channelInfo.channelName}
//                                             onChange={handleChannelInfoChange}
//                                             className="w-full border rounded-md p-2"
//                                         />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label className="block text-sm font-medium text-gray-700">Niche</label>
//                                         <input
//                                             type="text"
//                                             name="niche"
//                                             value={channelInfo.niche}
//                                             onChange={handleChannelInfoChange}
//                                             className="w-full border rounded-md p-2"
//                                         />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label className="block text-sm font-medium text-gray-700">Language</label>
//                                         <input
//                                             type="text"
//                                             name="language"
//                                             value={channelInfo.language}
//                                             onChange={handleChannelInfoChange}
//                                             className="w-full border rounded-md p-2"
//                                         />
//                                     </div>
//                                     <button
//                                         type="submit"
//                                         className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                                     >
//                                         Save
//                                     </button>
//                                 </form>
//                             </Modal>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserSettings;
