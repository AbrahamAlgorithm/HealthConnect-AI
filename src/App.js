import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/patientdashboard" element={<PatientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;