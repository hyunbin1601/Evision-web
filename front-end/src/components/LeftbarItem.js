import React from "react";
import styled from "styled-components";

const SidebarItemWrapper = styled.div`
  border-bottom: 1px solid white;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  left: 0px;
  &:hover {
    background-color: linear-gradient(to left, rgb(20, 41, 34), rgb(8, 24, 21));
  }
`;

const Fonts = styled.p `
  color: white;
  font-size: 20px;
  text-decoration: none;
  padding: 6px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  top: 0px;
  left: 0px;
  &:hover {
    background-color: white;
    color: #1a5d1a;
  }
`;

function LeftbarItem({ menu }) {
  return (
    <SidebarItemWrapper>
      <Fonts>{menu.name}</Fonts>
    </SidebarItemWrapper>
  );
}

export default LeftbarItem;
