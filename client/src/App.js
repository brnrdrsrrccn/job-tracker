import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import AddJob from "./pages/addjob";
import { Toaster } from "react-hot-toast";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addjob" element={<AddJob />} />
      </Routes>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </Router>
  );
}

export default App;
