import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Reels from "./components/Reels";
import EmailConfirm from "./components/EmailConfirm";
import PasswordReset from "./components/PasswordReset";
import ForgetPassword from "./components/ForgetPassword";
import EmailConfirmation from "./components/EmailConfirmation";
import VideoPlay from "./components/VideoPlay";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<LandingPage/>}/>
      <Route path="/home" element={<VideoPlay/>}/>
      <Route path="/about" element ={<About/>}/>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/forget-password" element = {<ForgetPassword/>}/>
      <Route path="/reset-password" element={<PasswordReset/>}/>
      <Route path="/email-confirm" element={<EmailConfirm/>}/>
      <Route path="/email-confirmation" element={<EmailConfirmation/>}/>
      <Route path="/signup" element ={<Signup/>}/>
      <Route path="/contact" element ={<Contact/>}/>
      <Route path="/reels" element={<Reels/>} /> 
    </Routes>
    </BrowserRouter>
  );
}

export default App;
