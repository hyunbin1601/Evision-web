import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            EVI$ION은 엘텍공과대학 사이버보안 전공 소속의 유일한 <span className="purple">과동아리</span>
            이자 <span className="purple"> 해킹 동아리</span>입니다.
            <br />
            6.5기수째 사이버보안 벗들을 중심으로 offensive security 중점의 학술적인 발전을 도모하고 있습니다.
            <br />
            새로운 기수 벗들과 함께하는 만큼 더욱 알차고 심도 있는 활동을 위해 양질의 프로그램을 기획하였습니다.
            <br />
            <br />
            EVI$ION 활동!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> 정규세션
            </li>
            <li className="about-activity">
              <ImPointRight /> 심화스터디
            </li>
            <li className="about-activity">
              <ImPointRight /> 자율스터디
            </li>
          </ul>

          <p style={{ color: "#a1bf9f" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Soumyajit</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
