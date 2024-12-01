import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch} from "react-redux";
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
import ClickedVideo from "./components/ClickedVideo";
import UserDashboard from "./components/UserDashboard";
import { PublicRoute } from "./components/PublicRoute";
import Subscriptions from "./components/Subscriptions";
import UserSettings from "./components/UserSettings";
import Library from "./components/Library";
import ReportedVideos from "./components/ReportedVideos";

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
        <Route path="/user-profile" element={<UserDashboard/>}/>
        <Route path="/user-library" element={<Library/>}/>
        <Route path="/user-settings" element={<UserSettings/>}/>
        <Route path="/user-subscriptions" element={<Subscriptions/>}/>
        <Route path="/user-reports" element={<ReportedVideos/>}/>
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
