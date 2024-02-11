import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LeftbarItem from "./LeftbarItem";

const LeftbarContainer = styled.div`
  background-color: linear-gradient(to left, rgb(20, 41, 34), rgb(8, 24, 21));
  width: 400px;
  padding: 20px;
  position: absolute;
  top: 50%; 
  transform: translateY(-50%); 
  left: 0px;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  border-right: 2px solid white;;
`;


function Leftbar_admin() {
  const menus = [
    { name: "정규세션 출석체크", path: "/Management/Attendance" },
    { name: "정규세션 출결수정", path: "/Management/AttendancePatch" },
    { name: "러닝세션 출석체크", path: "/Management/Attendance_Run" },
    { name: "러닝세션 출결수정", path: "/Management/AttendancePatch_Run" },
    { name: "정규세션 과제현황", path: "/Management/AssignmentCheck" },
    { name: "러닝세션 과제현황", path: "/Management/AssignmentCheck_Run" },
    { name: "회원 목록", path: "/Management/UsersList" },
    { name: "회원 가입", path: "/Management/Register" }
  ];

  return (
    <LeftbarContainer>
      {menus.map((menu, index) => {
        return (
          <NavLink exact style={{textDecoration: "none"}} to={menu.path} key={index}>
            <LeftbarItem menu={menu} />
          </NavLink>
        );
      })}
    </LeftbarContainer>
  );
}

export default Leftbar_admin;
