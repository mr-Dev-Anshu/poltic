import { useEffect, useState } from "react"
import img from "../assets/profileimg.png"
import Nav from "./Nav"
import ProfileSidebar from "./ProfileSidebar"
import Sidebar from "./Sidebar"
import UserProfile from "./UserProfile"
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "../features/auth/authThunk"
import { getChannelByEmail, updateChannel } from "../features/channel/channelThunk"

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[90%] max-w-[500px] p-6">
                {children}
            </div>
        </div>
    );
};

const UserSettings = () => {
    const dispatch = useDispatch()
    const {data: channel, error: channelError} = useSelector((state) => state.channel)
    const { data: user, loading, error } = useSelector((state) => state.auth)
    const [isBasicInfoModalOpen, setBasicInfoModalOpen] = useState(false);
    const [isChannelInfoModalOpen, setChannelInfoModalOpen] = useState(false);
    const [channelData, setChannelData] = useState()
    const [err, setError] = useState()
    const id = user?._id
    console.log(channel);
    
    const [basicInfo, setBasicInfo] = useState({
        country: user?.country || "",
        number: user?.number || "",
        gender: user?.gender || "",
    });

    const [channelInfo, setChannelInfo] = useState({
        channelName: user?.lastName || "",
        niche: user?.niche || "",
        language: user?.language || "",
    });

    const updates = {
        "gender": basicInfo.gender,
        "number": basicInfo.number,
        "location": basicInfo.country
    }

    const channelUpdates = {
        "channelName": channelInfo.channelName,
        "niche": channelInfo.niche,
        "language": channelInfo.language
    }

    useEffect(() => {
        if (user) {
            setBasicInfo({
                email: user.email || "",
                country: user.country || "",
                number : user.number || "",
                gender: user.gender || "",
            });
            setChannelInfo({
                channelName: user.lastName || "",
                niche: user.niche || "",
                language: user.language || "",
            });
        }
    }, [user])

    const email = user?.email

    useEffect (()=> {
        const featchChannelDetails = ()=> {
            dispatchEvent(getChannelByEmail(email)).then((payload)=> {
                setChannelData(payload) ; 
            }).catch((error)=> {
                 setError(error)
            })
        } 
   }, [])

    if (loading) {
        return <p>loading...</p>
    }
    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    const handleBasicInfoChange = (e) => {
        const { name, value } = e.target;
        setBasicInfo((prev) => ({ ...prev, [name]: value }));
    };
    const handleChannelInfoChange = (e) => {
        const { name, value } = e.target;
        setChannelInfo((prev) => ({ ...prev, [name]: value }));
    };

    const saveBasicInfo = async (e) => {
        try {
            await dispatch(updateProfile({ id, updates }));
            console.log("Basic Info Saved Successfully", basicInfo, user);
            setBasicInfoModalOpen(false);
        } catch (error) {
            console.error("Error saving basic info:", error);
        }
    };
    const saveChannelInfo = async (e) => {
        try {
            await dispatch(updateChannel({ id, channelUpdates }));
            console.log("Channel Info Saved Successfully");
            setChannelInfoModalOpen(false);
        } catch (error) {
            console.error("Error saving channel info:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen font-roboto">
            <div className="fixed top-0 w-full z-50">
                <Nav />
            </div>
            <div className="flex flex-1 pt-[53px] md:pt-[89px]">
                <div className="z-50 fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-scroll custom-scrollbar ml-0 md:ml-[227px] pt-6 px-5">
                    <UserProfile />
                    <hr className="my-5 w-full" />
                    <div className="flex gap-10">
                        <div className="hidden md:flex">
                            <ProfileSidebar />
                        </div>
                        <div className="sm:mx-4 font-inter">
                            <p className="font-semibold text-[20px] pb-4">Settings</p>
                            <div className=" flex flex-col md:flex-row ">
                                <div className="p-4 lg:p-10 flex flex-col items-center justify-center border border-b-0 md:border-b-[1px] md:border-r-0 border-[#9C9C9C] rounded-t-[16px] md:rounded-e-none md:rounded-s-[16px]">
                                    <div className="border border-[#9C9C9C] rounded-full p-1">
                                        <img src={img} className="w-[112px] h-[112px] " alt="" />
                                    </div>
                                    <p className="pt-2 text-[#1C1C1C] text-[20px] "></p>
                                </div>
                                <hr />
                                <div className="w-[90vw] sm:w-fit border border-t-0 md:border-t-[1px] border-[#9C9C9C] rounded-b-[16px] md:rounded-s-none md:rounded-e-[16px] p-5">
                                    <div className="flex gap-5">
                                        <p className="pt-2 text-[#1C1C1C] text-[20px] ">Basic Information</p>
                                        <FaRegEdit className="mt-3.5 text-blue-600"
                                            onClick={() => setBasicInfoModalOpen(true)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 md:12 lg:mr-20">
                                        <div className="py-4">
                                            <p className="text-[10px] text-[#1C1C1C99] py-1">Email ID</p>
                                            <p className="text-[#1C1C1CCC] text-[14px] ">{user?.email || " "}</p>
                                        </div>
                                        <div className="md:py-4">
                                            <p className="text-[10px] text-[#1C1C1C99] py-1">Location</p>
                                            <p className="text-[#1C1C1CCC] text-[14px] ">{user?.country|| " "}</p>
                                        </div>
                                        <div className="py-4">
                                            <p className="text-[10px] text-[#1C1C1C99] py-1">Phone Number</p>
                                            <p className="text-[#1C1C1CCC] text-[14px] ">{user?.number || " "}</p>
                                        </div>
                                        <div className="md:py-4">
                                            <p className="text-[10px] text-[#1C1C1C99] py-1">Gender</p>
                                            <p className="text-[#1C1C1CCC] text-[14px] ">{user?.gender || " "}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-5 p-5 border border-[#9C9C9C] rounded-[16px]">
                                <div className="flex gap-4">
                                    <p className="px-2 text-[#1C1C1C] text-[20px] ">Channel Information</p>
                                    <FaRegEdit className="mt-1.5 text-blue-600"
                                        onClick={() => setChannelInfoModalOpen(true)}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 md:mr-12 lg:mr-20 pl-2">
                                    <div className="py-4">
                                        <p className="text-[10px] text-[#1C1C1C99] py-1">Channel Name</p>
                                        <p className="text-[#1C1C1CCC] text-[14px] ">{user?.channelName || " "}</p>
                                    </div>
                                    <div className="md:py-4">
                                        <p className="text-[10px] text-[#1C1C1C99] py-1">Niche</p>
                                        <p className="text-[#1C1C1CCC] text-[14px] ">{user?.niche || " "}</p>
                                    </div>
                                    <div className="py-4">
                                        <p className="text-[10px] text-[#1C1C1C99] py-1">Language</p>
                                        <p className="text-[#1C1C1CCC] text-[14px] ">{user?.language || " "}</p>
                                    </div>
                                </div>
                            </div>
                            <Modal
                                isOpen={isBasicInfoModalOpen}
                                onClose={() => setBasicInfoModalOpen(false)}
                            >
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-bold mb-4">Edit Basic Information</h3>
                                    <button
                                        className="mb-4 text-xl"
                                        onClick={() => setBasicInfoModalOpen(false)}
                                    >
                                        ✕
                                    </button>
                                </div>
                                <form onSubmit={(e) => { e.preventDefault(); saveBasicInfo(); }}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={basicInfo.email}
                                            onChange={handleBasicInfoChange}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={basicInfo.country}
                                            onChange={handleBasicInfoChange}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            type="text"
                                            name="number"
                                            value={basicInfo.number}
                                            onChange={handleBasicInfoChange}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                                        <input
                                            type="text"
                                            name="gender"
                                            value={basicInfo.gender}
                                            onChange={handleBasicInfoChange}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Save
                                    </button>
                                </form>
                            </Modal>
                            <Modal
                                isOpen={isChannelInfoModalOpen}
                                onClose={() => setChannelInfoModalOpen(false)}
                            >
                                <div className="flex justify-between">
                                    <h3 className="text-lg font-bold mb-4">Edit Channel Information</h3>
                                    <button
                                        className="mb-4 text-xl"
                                        onClick={() => setChannelInfoModalOpen(false)}
                                    >
                                        ✕
                                    </button>
                                </div>
                                <form onSubmit={(e) => { e.preventDefault(); saveChannelInfo(); }}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Channel Name</label>
                                        <input
                                            type="text"
                                            name="channelName"
                                            value={channelInfo.channelName}
                                            onChange={handleChannelInfoChange}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Niche</label>
                                        <input
                                            type="text"
                                            name="niche"
                                            value={channelInfo.niche}
                                            onChange={handleChannelInfoChange}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Language</label>
                                        <input
                                            type="text"
                                            name="language"
                                            value={channelInfo.language}
                                            onChange={handleChannelInfoChange}
                                            className="w-full border rounded-md p-2"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Save
                                    </button>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSettings