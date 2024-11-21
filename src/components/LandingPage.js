import Footer from "./Footer"
import HeroSection from "./HeroSection"
import Navbar from "./Navbar"

const LandingPage = () => {
    return (
        <div className="overflow-hidden font-inter">
            <Navbar/>
            <HeroSection/>
            <Footer/>
        </div>       
    )
}

export default LandingPage