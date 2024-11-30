import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./features/auth/authThunk";

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
import Channel from "./components/Channel";
import Videos from "./components/Videos";
import ClickedVideo from "./components/ClickedVideo";
import UserDashboard from "./components/UserDashboard";
import { Loader } from "./components/Loader";
import { PublicRoute } from "./components/PublicRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Protected  routes  */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <VideoPlay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route path="/short/:id" element={<ClickedVideo />} />
        <Route path="/about" element={<About />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/email-confirm" element={<EmailConfirm />} />
        <Route path="/email-confirmation" element={<EmailConfirmation />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/channel" element={<Channel />} />


         {/* Public routes */}
         <Route path="/login" element={
           <PublicRoute>
            <Login />
           </PublicRoute>
         } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
