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
import AttendancePatch from "./components/Management/Attendance_patch";
import AttendancePatchRun from "./components/Management/Attendance_patch_Sa"
import AssignmentCheckSu from "./components/Management/AssignmentCheck-Sa";
import AssignmentCheck from "./components/Management/AssignmentCheck-Th"
import Register from "./components/Management/Register"
import AttendanceRun from "./components/Management/Attendance_Run"
import PrivateRoute from "./components/Route/privateRoute";
import Recruiting from "./components/Recruiting/Recruiting"
import Home from "./components/Home/Home"




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
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Navigate to="/"/>} />
          <Route path="/MyPage" element={<UserInfo />} />
          <Route path="/Management/Attendance" element={<Attendance />} />
          <Route path="/Management/Attendance_Run" element={<AttendanceRun />} />
          <Route path="/Management/UsersList" element={<UsersList />} />
          <Route path="/Management/AttendancePatch" element={<AttendancePatch/>} />
          <Route path="/Management/AttendancePatch_Run" element={<AttendancePatchRun/>} />
          <Route path="/Management/AssignmentCheck_Run" element={<AssignmentCheckSu />} />
          <Route path="/Management/AssignmentCheck" element={<AssignmentCheck />} />
          <Route path="/Management/Register" element={<Register />} />
          <Route path="/Recruiting" element={<Recruiting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
