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
import SurveyForm from "./components/SurveyForm.jsx";
import Bulletin from "./components/Bulletin.jsx";
import PolicyManager from "./components/PolicyManager.jsx";
import Whistleblower from "./components/Whistleblower.jsx";
import ActionItems from "./components/ActionItems.jsx";
import Orientations from "./components/Orientations.jsx";
import SafetyMeetings from "./components/SafetyMeetings.jsx";
import SafetyDataSheets from "./components/SafetyDataSheets.jsx";
import Legislation from "./components/Legislation.jsx";
import Inspections from "./components/Inspections.jsx";
import Competencies from "./components/Competencies.jsx";

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
            <Route path="/dashboard" element={<Dashboard withHeader />} />
            <Route path="/completions" element={<Completions />} />
            <Route path="/safety-stats" element={<SafetyStats />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/incident-reporting" element={<IncidentReporting />} />
            <Route path="/certs" element={<Certificates />} />
            <Route path="/lessons/courses/:courseId/" element={<Lessons />} />
            <Route path="/quiz/course/:courseId" element={<QuizPlayer />} />
            <Route path="surveys" element={<SurveyForm />} />
            <Route path="/bulletin" element={<Bulletin />} />
            <Route path="/policies" element={<PolicyManager />} />
            <Route path="/whistleblower" element={<Whistleblower />} />
            <Route path="/action-items" element={<ActionItems />} />
            <Route path="/procedures" element={<ActionItems />} />
            <Route path="/legislation" element={<Legislation />} />
            <Route path="/orientations" element={<Orientations />} />
            <Route path="/inspections" element={<Inspections />} />
            <Route path="/safety-meetings" element={<SafetyMeetings />} />
            <Route path="/competencies" element={<Competencies />} />
            <Route path="/sds" element={<SafetyDataSheets />} />
            <Route path="/quiz/course/:courseId/" element={<QuizPlayer />} />
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
  const { pathname } = useLocation();

  // Hide header on /dashboard, /dashboard/, or any nested dashboard route
  const hideHeader =
    pathname === "/dashboard" ||
    pathname === "/dashboard/" ||
    pathname.startsWith("/dashboard/");

  if (hideHeader) return null;
  return <SubHeader />;
}

export default App;
