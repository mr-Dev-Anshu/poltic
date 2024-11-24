import { LuDot } from "react-icons/lu"
import img from "../assets/LogoWhite.png"

const EmailConfirmation = () => {
    return (
        <div className="flex justify-center">
            <div className="py-10 w-[50%] ">
                <div>
                    <div className="bg-[#065FD4] h-[140px] flex items-center ">
                        <img src={img} alt="" className="mx-10" />
                    </div>
                    <div className="bg-[#FAFAFB] p-10">
                        <p className="font-semibold text-[28px] font-poppins p-2">Email Confirmation, before <span className="text-[#065FD4] "> we get started...</span> </p>
                        <p className="px-2 font-poppins ">Thank you for registering on socialRepeat, to finish your registration please confirm
                        your email by clicking on the button below:</p>
                        <button className="px-4 py-2 mx-2 my-10 bg-[#065FD4] text-white rounded-sm flex gap-2" type="submit" >CONFIRM YOUR EMAIL</button>
                        <p className="px-2">Didn't sign up for socialRepeat? <span className="text-[#0057FF] "> Let us know.</span></p>
                        <hr className="my-10" />
                        <p className="p-2 ">If you’re having trouble with the button above, copy and paste the URL below into your web browser.</p>
                        <a href="https://app.domain.com/auth/confirm-email/7ddc6cb3-0cd1-40d5-8e62-39b5bac44841" className="text-[#0057FF] px-2 my-20">https://app.domain.com/auth/confirm-email/7ddc6cb3-0cd1-40d5-8e62-39b5bac44841</a>
                        <br />
                        <br />
                        <br />
                    </div>
                    <div className="flex justify-between">
                        <p className="my-4">Email send by socialRepeat</p>
                        <div className="flex justify-center text-[#000000DE] my-4">
                    <button className="text-[14px] ">Terms and conditions</button>
                    <LuDot className="m-1"/>
                    <button className="text-[14px] ">Privacy policy</button>
                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailConfirmation