import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";

import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SubHeader from "./components/SubHeader";
import Dashboard from "./pages/Dashboard";
import Completions from "./components/DashboardComponents/Completions";
import Courses from "./components/DashboardComponents/Courses";
import Lessons from "./components/DashboardComponents/Lessons";
import Certificates from "./components/DashboardComponents/Certificates";

function App() {
  return (
    <BrowserRouter>
      <SubHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/completions" element={<Completions />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/certs" element={<Certificates />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
