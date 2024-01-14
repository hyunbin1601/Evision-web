import React from "react";
import "./Login.css";

export const Login = () => {
  return (
    <div className="screen">
      <div className="div">
        <img
          className="line"
          alt="Line"
          src="https://c.animaapp.com/2FIBVt8e/img/line-1.svg"
        />
        <img
          className="img"
          alt="Line"
          src="https://c.animaapp.com/2FIBVt8e/img/line-2.svg"
        />
        <div className="text-wrapper">LOGIN</div>
        <div className="text-wrapper-2">학번</div>
        <div className="text-wrapper-3">비밀번호</div>
        <img
          className="frame"
          alt="Frame"
          src="https://c.animaapp.com/2FIBVt8e/img/frame-1.png"
        />
        {/*<div className="menu">
          <div className="text-wrapper-4">Recruting</div>
          <div className="text-wrapper-4">My Page</div>
          <div className="div-wrapper">
            <div className="text-wrapper-5">Assignment</div>
          </div>
          <div className="text-wrapper-4">Sign Up</div>
        </div>
  <div className="recruting">동아리 배너</div>*/}
  </div>
  </div>
  );
};

export default Login;