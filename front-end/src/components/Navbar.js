import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import axios from "axios";

import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineLogin,
  AiOutlineProfile,
  AiOutlineLogout
} from "react-icons/ai";



function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userToken"));

  const handleLogout = async () => {
    try {
      await axios.get("");
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">

            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/Recruting" onClick={() => updateExpanded(false)}>
                <ImBlog style={{ marginBottom: "2px" }} /> Recruting
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/About" onClick={() => updateExpanded(false)}>
                <AiOutlineProfile style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/MyPage"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> MyPage
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/Management/Attendance"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                Management
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              {isLoggedIn ? (
                <Button onClick={handleLogout} className="fork-btn-inner">
                  <AiOutlineLogout style={{marginBottom: "2px"}} /> Logout
                </Button>
              ):(
                <Button href="/Login" className="fork-btn-inner">
                  <AiOutlineLogin style={{marginBotton: "2px"}} /> Login
                </Button>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

/*
            {isLoggedIn && (
              <Nav.Item>
                {isAdmin ? (
                  <Nav.Link as={Link} to="/Management/Attendance" onClick={() => setIsLoggedIn(false)}>
                    <AiOutlineFundProjectionScreen /> Management
                  </Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/MyPage" onClick={() => setIsLoggedIn(false)}>
                    <AiOutlineUser /> MyPage
                  </Nav.Link>
                )}
              </Nav.Item>
            )}
 */

export default NavBar;
