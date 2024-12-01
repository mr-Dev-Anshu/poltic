import React from "react";
import { UserFunctions } from "../constants/UserFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authThunk";

const ProfileSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        const result = await dispatch(logout());
        if (logout.fulfilled.match(result)) {
            // Redirect to login or home page after successful logout
            navigate("/login");
        } else {
            // Handle any logout error if needed
            alert(result.payload || "Failed to logout. Please try again.");
        }
    };

    return (
        <div className="hidden md:block bg-[#F1F8FF] w-[227px] h-fit rounded-[7px] overflow-hidden">
            {UserFunctions.map((func, index) => (
                <a
                    href={func.link}
                    key={index}
                    className={`flex items-center px-4 gap-3 font-light py-3 ${isActive(func.link) ? "bg-[#065FD4] text-white " : ""}
                        `}>
                    {func.icon}
                    <span>{func.title}</span>
                </a>
            ))}
            <button className="flex py-3 gap-3 px-4" onClick={handleLogout}><RiLogoutCircleRLine className="text-xl" />Logout</button>
        </div>
    );
};

export default ProfileSidebar;
