import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Workouts from "./pages/Workouts";
import Home from "./pages/Home";
import UserContext from "./UserContext";

function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null });

  const unsetUser = () => {
    setUser({ id: null, isAdmin: null });
    localStorage.clear();
  };

  useEffect(() => {
    fetch("https://fitnessapp-api-ln8u.onrender.com/users/details", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser({ id: data.user._id, isAdmin: data.user.isAdmin });
        } else {
          setUser({ id: null, isAdmin: null });
        }
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, unsetUser }}>
      {/* ✅ Wrap inside UserContext.Provider */}
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
