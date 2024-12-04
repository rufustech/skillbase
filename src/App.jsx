import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";

import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SubHeader from "./components/SubHeader";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <SubHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
