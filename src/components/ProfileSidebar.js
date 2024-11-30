import React from "react";
import { UserFunctions } from "../constants/UserFunctions";
import { useLocation } from "react-router-dom";

const ProfileSidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="hidden md:block bg-[#F1F8FF] w-[227px] h-[330px] rounded-[7px] overflow-hidden">
            {UserFunctions.map((func, index) => (
                <a
                    href={func.link}
                    key={index}
                    className={`flex items-center px-4 gap-3 font-light hover:text-blue-500 py-3 ${isActive(func.link) ? "bg-[#065FD4] text-white " : ""}
                        `}>
                    {func.icon}
                    <span>{func.title}</span>
                </a>
            ))}
        </div>
    );
};

export default ProfileSidebar;
