import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import './About.css';

function About() {
  return (
    <Container fluid className="about-section">
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Introduce <strong className="purple">EVI$ION</strong>
            </h1>
          
          </Col>
          <Aboutcard />
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px", paddingLeft:"200px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
        <h1 className="project-heading">
          EVI$ION <strong className="purple">수상 및 외부 활동 내역 </strong>
        </h1>

        <Techstack />

        <h1 className="project-heading">
          <strong className="purple">EVI$ION 활동</strong>으로 얻을 수 있는 것
        </h1>
        <Toolstack />

        
      </Container>
    </Container>
  );
}

export default About;
