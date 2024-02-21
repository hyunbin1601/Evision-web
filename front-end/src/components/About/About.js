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
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px", textAlign: "left" }}>
              Introduce <strong className="purple">EVI$ION</strong>
            </h1>
          
          </Col>
          <Aboutcard />
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
        <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
          EVI$ION <strong className="purple">수상 및 외부 활동 내역 </strong>
        </h1>
        <p className="about1" >
          양자암호통신 아이디어 공모전 1등상
          제7회 소프트웨어개발보안경진대회 최우수상(2등)<br></br>
          스틸리언 모의해킹 분야 인턴십 수행<br></br>
          스틸리언 보안인재 멘토링 프로그램 1기 수료<br></br>
          2020 한국IT서비스학회 추계학술대회 대학생 논문/졸업작품 공모전 우수논문상<br></br>
          2020 스마트시티 서비스 아이디어 공모전 우수상<br></br>
          보안 솔루션 회사 인턴 - 네트워크 드라이범개발 업무 수행<br></br>
          블록체인 아이디어 공모전 - 최우수상<br></br>
          2020 하반기 BOSCH Korea 사이버보안사업부 인턴<br></br>
          019 K-사이버 시큐리티 챌린지 자동차용 침입 탐지 트랙 - 3위<br></br>
          교내 창업 경진대회 - 우수상 (2020.12)<br></br>
          해피문데이 스타트업 인턴 (2020.01.08~02.26)<br></br>
          고려대 해커톤-베스트 서비스상<br></br>
          KITRI 화이트햇 스쿨 1기 수료생 4명 (2023.09~2024.02)<br></br>
          KITRI Best Of Best 12기 디지털 포렌식 트랙 수료생 1명 (2023.07~2024.02)<br></br>
          서초 AIOT 메이커톤&컨퍼런스 특별상(2023.07~2023.9)<br></br>
          2023년 한국정보보호학회 동계학술대회 CISC-W'23 발표 (2023.12)<br></br>
          HSpace 해커팀과 협업하여 기업 외주 프로젝트 진행 (DDOS Generator) (2023.8~)<br></br>
          드림핵 X-MAS CTF 문제 출제위원 (2023.12)<br></br>
          EVI$ION X E-COPS ECS CTF 문제 출제 및 운영진 (2024.2)<br></br>
          서울대학교 보안최적화 연구실 인턴  (2024.02~)<br></br>
          고려대학교 컴퓨터시스템보안 연구실 석사 과정 (2024.02~)<br></br>

          <br></br>
        </p>


        <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        EVI$ION<strong className="purple"> 활동으로 얻을 수 있는 것</strong>
        <p className="about2" style={{ fontSize: "0.6em", paddingBottom: "20px", margin: "10px"}}>
        <br></br>
          - 보안에 관심있는 학우들간의 교류<br></br>
          - 다양한 보안 분야 스터디 및 보안 프로젝트 진행<br></br>
          - CTF, 모의 해킹 등 보안 관련 대회 참가<br></br>
          - 보안 세미나, 선배와의 만남 등 다양한 행사 개최<br></br>
          - CTF 및 해커톤과 같은 다양한 보안 관련 행사에 참가하여 실무 보안 능력 향상<br></br>
          - 보안 관련 학습에 필요한 교재, 강의 등을 지원<br></br>
        </p>
        </h1>

        
      </Container>
    </Container>
  );
}

export default About;
