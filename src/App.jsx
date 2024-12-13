import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import Admin from "./components/DashboardComponents/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ConditionalSubHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/completions" element={<Completions />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/lessons" element={<Lessons />} /> */}
          <Route path="/certs" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/lessons/courses/:courseId/" element={<Lessons />} />
          <Route path="/loadlesson" element={<LessonFormSubmit />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

// Helper Component to conditionally render SubHeader
function ConditionalSubHeader() {
  const location = useLocation();

  // Exclude SubHeader for "/dashboard" route
  if (location.pathname === "/dashboard") {
    return null;
  }

  return <SubHeader />;
}

export default App;
