import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import './Home.css';
import { SiKakaotalk } from "react-icons/si";


function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME INTRODUCE <span style={{fontWeight:"bold"}}>EVI$ION</span>
            </h1>
            <h2 className="home-about-body">
              엘텍공과대학 사이버보안전공 소속의 유일한 과동아리이자 해킹 동아리입니다. 
              <br />
              <br />사이버보안 벗들을 중심으로
              <i> offensive security</i> 중점의 학술적인 발전을 도모하고 있습니다.
              <br />
              <br />
              새로운 기수 벗들과 함께하는 만큼 더욱 알차고 심도 있는 활동을 위해 양질의 프로그램을 기획하였습니다. &nbsp;
              <br />
              <br />
              EVI$ION은 6.5기 여러분을 기다리고 있습니다!
              <br /> 
              많은 관심과 지원 바랍니다.
              <br />
              ☆*:.｡. o(≧▽≦)o .｡.:*☆
              &nbsp; 
            </h2>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col className="home-about-social">
            <h1>FIND ME ON</h1>
            <a href="https://open.kakao.com/o/sBPXsrCf">
            <SiKakaotalk size={50} />
            </a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
