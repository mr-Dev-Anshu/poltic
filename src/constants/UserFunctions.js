import { AiFillDashboard, AiFillVideoCamera, AiFillSetting } from "react-icons/ai";
import { RiVideoAddLine, RiLogoutCircleRLine } from "react-icons/ri";
import { MdSubscriptions } from "react-icons/md";

export const UserFunctions = [
    {
        title: "Dashboard",
        link: "/user-profile",
        icon: <AiFillDashboard className="text-xl" />,
    },
    {
        title: "Video Library",
        link: "/",
        icon: <AiFillVideoCamera className="text-xl" />,
    },
    {
        title: "Reported Videos",
        link: "/",
        icon: <RiVideoAddLine className="text-xl" />,
    },
    {
        title: "Subscribed Channels",
        link: "/",
        icon: <MdSubscriptions className="text-xl" />,
    },
    {
        title: "Settings",
        link: "/settings",
        icon: <AiFillSetting className="text-xl" />,
    },
    {
        title: "Logout",
        link: "/logout",
        icon: <RiLogoutCircleRLine className="text-xl" />,
    },
];
