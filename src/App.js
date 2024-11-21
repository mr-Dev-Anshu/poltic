import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Signup from "./components/Signup";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<LandingPage/>}/>
      <Route path="/about" element ={<About/>}/>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/signup" element ={<Signup/>}/>
      <Route path="/contact" element ={<Contact/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
