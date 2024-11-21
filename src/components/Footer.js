import img from "../assets/LogoWhite.png"
const Footer = () => {
    return (
        <div className="bg-[#032347] p-20 text-white grid grid-cols-3">
            <div>
                <img src={img} alt="" />
                <p className="py-2">Craft stunning sites <br />
                    effortlessly while enjoying <br />
                    real-time customer support.</p>
            </div>
            <div>
                <div>

                </div>
                <div></div>
                <div></div>
            </div>
            <div>
                <p className="m-2 font-semibold">Want to receive news and updates?</p>
                <form>
                    <input type="email" placeholder="Email" className="bg-[#FFFFFF1A] px-3 py-2 rounded-xl m-2" />
                    <button type="submit" className="px-3 py-2 bg-[#77ACF4] text-[#032347] rounded-xl">Stay in the loop</button>
                </form>
            </div>
        </div>
    )
}

export default Footer