import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import { UserProvider } from "./components/userContext/UserContext";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SubHeader from "./components/SubHeader";
import Dashboard from "./pages/Dashboard";
import Courses from "./components/DashboardComponents/Courses";
import Lessons from "./components/DashboardComponents/Lessons";
import Certificates from "./components/DashboardComponents/Certificates";
import LessonFormSubmit from "./components/trainerComponent/lessonFormSubmit";
import Admin from "./components/DashboardComponents/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivateRoute from "./components/PrivateRoute";
import IncidentReporting from "./components/IncidentReporting";
import QuizPlayer from "./components/DashboardComponents/quiz/QuizPlayer";
import Reset from "./components/Registration/Reset";
import AdminRoute from "./components/AdminRoute";
import Completions from "./components/DashboardComponents/Completions";
import SafetyStats from "./components/SafetyStats";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ConditionalSubHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/completions" element={<Completions />} />
            <Route path="/safety-stats" element={<SafetyStats />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/incident-reporting" element={<IncidentReporting />} />
            <Route path="/certs" element={<Certificates />} />
            <Route path="/lessons/courses/:courseId/" element={<Lessons />} />
            <Route path="/quiz/course/:courseId" element={<QuizPlayer />} />

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/loadlesson" element={<LessonFormSubmit />} />
              {/* <Route path="/admin" element={<Admin />} /> */}
            </Route>
          </Route>
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
