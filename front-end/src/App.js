import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserInfo from "./components/MyPage/UserInfo";
import Attendance from "./components/Management/Attendance"
import Login from "./components/Login/Login"
import UsersList from "./components/Management/UsersList"
import Recruiting from "./components/Recruiting/Recruiting";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/MyPage" element={<UserInfo />} />
          <Route path="/Management/Attendance" element={<Attendance />} />
          <Route path="/Management/UsersList" element={<UsersList />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Recruiting" element={<Recruiting />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
