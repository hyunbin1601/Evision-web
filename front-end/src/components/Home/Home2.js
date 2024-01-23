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

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME INTRODUCE <span className="purple">EVI$ION</span>
            </h1>
            <p className="home-about-body">
              엘텍공과대학 사이버보안전공 소속의 유일한 과동아리이자 해킹 동아리입니다. 
              <br />
              <br />사이버보안 벗들을 중심으로
              <i>
                <b className="purple"> offensive security </b>
              </i> 중점의 학술적인 발전을 도모하고 있습니다.
              <br />
              <br />
              about 페이지가 따로 있는데 여기엔 뭘 더 써야하지? &nbsp;
              <i>
                <b className="purple">활동으로 얻을 수 있는 것 </b> 이것도
                about페이지에 들어가는 거 아닌가?{" "}
                <b className="purple">
                  물어봐야지.
                </b>
              </i>
              <br />
              <br />
              그리고 또 물어볼 것. <b className="purple">className="purple"</b> 이거
              정의해놓은 곳이 어디있는 건지 못찾겠다. 초반에 뭐 바꾸다가 나중에 보니까 purple에 해당하는 곳들도
              다 하얀색 됐는데..그리구
              <i>
                <b className="purple">
                  {" "}
                  밑에 아이콘들.
                </b>
              </i>
              &nbsp; 각각
              <i>
                <b className="purple"> 회장,부회장,운영진,운영진?</b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
