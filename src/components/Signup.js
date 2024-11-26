import img from "../assets/image2.png";
import img1 from "../assets/image-Photoroom (38) 1.png";
import { LuDot } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signup } from "../features/auth/authThunk";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: signupData, loading: signupLoading, error: signupError } = useSelector((state) => state.auth);

    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        let errors = "";
        if (!firstName.trim()) errors += "First Name is required.\n";
        if (!lastName.trim()) errors += "Last Name is required.\n";
        if (!email.includes("@")) errors += "Enter a valid email address.\n";
        if (phone.length !== 10 || !/^\d+$/.test(phone)) errors += "Enter a valid 10-digit phone number.\n";
        if (password !== confPassword) errors += "Passwords do not match.\n";

        if (errors) {
            setErrorMessage(errors);
            return;
        }
        setErrorMessage("");
        dispatch(
            signup({
                firstName,
                lastName,
                email,
                country,
                phone,
                password,
            })
        );
    };
    useEffect(() => {
        if (signupError) {
            setErrorMessage(signupError);
        }
    }, [signupError]);

    return (
        <div className="flex flex-col md:flex-row md:justify-between">
            <img
                onClick={() => navigate("/")}
                src={img1}
                alt="Logo"
                className="h-[50px] w-fit m-4 cursor-pointer"
            />
            <div className="md:w-[50%] h-screen md:mx-auto px-5 md:px-0">
                <div className="flex flex-col md:justify-center md:items-center h-[calc(100vh-84px)]">
                    <form className="flex flex-col max-h-screen my-auto" onSubmit={handleSignup}>

                        <div>
                            <p className="font-medium text-[20px]">Sign up to Poltic</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFName(e.target.value)}
                                className="md:w-60 px-3 py-2 border border-[#0000003B] mt-4 rounded-sm"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLName(e.target.value)}
                                className="md:w-60 px-3 py-2 border border-[#0000003B] mt-4 rounded-sm"
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Email Address *"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="md:w-full px-3 py-2 border border-[#0000003B] my-4 rounded-sm"
                        />
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="md:w-60 px-3 py-2 border border-[#0000003B] mb-4 rounded-sm"
                            />
                            <input
                                type="number"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="md:w-60 px-3 py-2 border border-[#0000003B] mb-4 rounded-sm"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="md:w-60 px-3 py-2 border border-[#0000003B] mb-4 rounded-sm"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                                className="md:w-60 px-3 py-2 border border-[#0000003B] mb-4 rounded-sm"
                            />
                        </div>
                        {errorMessage && (
                            <p className="text-red-600 bg-white text-sm mb-4 whitespace-pre-line">
                                {errorMessage}
                            </p>)}
                        <button type="submit" className="px-4 py-2 my-4 bg-[#065FD4] text-white rounded-sm w-full uppercase"
                            disabled={signupLoading}>
                            {signupLoading ? "Loading..." : "Sign up"}
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-black text-white rounded-sm w-full uppercase"
                            onClick={() => navigate("/login")}
                        >
                            Back To Login
                        </button>
                    </form>
                    <div className="flex text-[#000000DE] mt-4">
                        <button className="text-[14px]">Terms and conditions</button>
                        <LuDot className="m-1" />
                        <button className="text-[14px]">Privacy policy</button>
                    </div>
                </div>
            </div>
            <div className="w-[30%] hidden md:flex">
                <img src={img} alt="Signup Visual" className="h-screen w-full object-cover" />
            </div>
        </div>
    );
};

export default Signup;
