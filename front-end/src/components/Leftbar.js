import React, { useState } from "react";
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


function Leftbar() {
  const menus = [
    { name: "회원 정보", path: "/myPage" },
    { name: "출결 현황", path: "/" },
    { name: "정규세션 과제제출", path: "/" },
    { name: "러닝세션 과제제출", path: "/" }
  ];



  return (
    <LeftbarContainer>
      {menus.map((menu, index) => {
        return (
          <NavLink exact style={{textDecoration: "none"}} to={menu.path} key={index} >
            <LeftbarItem menu={menu} />
          </NavLink>
        );
      })}
    </LeftbarContainer>
  );
}

export default Leftbar;
