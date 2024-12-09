import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import { UserProvider } from "./components/userContext/UserContext"; 
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SubHeader from "./components/SubHeader";
import Dashboard from "./pages/Dashboard";
import Completions from "./components/DashboardComponents/Completions";
import Courses from "./components/DashboardComponents/Courses";
import Lessons from "./components/DashboardComponents/Lessons";
import Certificates from "./components/DashboardComponents/Certificates";
import LessonFormSubmit from "./components/trainerComponent/lessonFormSubmit";

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <SubHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/completions" element={<Completions />} />
        <Route path="/courses" element={<Courses />} />
        {/* <Route path="/lessons" element={<Lessons />} /> */}
        <Route path="/certs" element={<Certificates />} />
        <Route path="/dashboard" element={<Dashboard  />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/lessons/courses/:courseId/" element={<Lessons />} /> 
        <Route path="/loadlesson" element={<LessonFormSubmit />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
