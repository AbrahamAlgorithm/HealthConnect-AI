import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import Chatting from "./pages/Chatting.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import SymptomChecker from "./pages/SymptomsChecker.jsx";
import Settings from "./pages/Settings.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/symptomchecker" element={<SymptomChecker />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/chat" element={<Chatting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;