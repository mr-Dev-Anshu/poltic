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
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { fetchCurrentUser } from "./features/auth/authThunk";
import { useDispatch } from "react-redux";
import Channel from "./components/Channel";
import Videos from "./components/Videos";
import ClickedVideo from "./components/ClickedVideo";
import UserDashboard from "./components/UserDashboard";

function App() {

  const dispatch = useDispatch() ; 

  useEffect(() => {
    dispatch(fetchCurrentUser());
}, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <VideoPlay />
            </ProtectedRoute>
          }
        />
        <Route path="/short/:id" element={<ClickedVideo />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/email-confirm" element={<EmailConfirm />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/user-profile" element={<UserDashboard/>}/>
        <Route
          path="/reels"
          element={
              <Reels />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
