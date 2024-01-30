import React from 'react';
import './Recruiting.css';

function Recruiting() {
  return (
    <div className="Recruiting">
      {/* 상단 섹션 - 설명 */}
      <div className="description-section">
        <h1><strong>Recruiting</strong></h1>

        <h2>1.모집절차</h2>
        <div className="icon-heading">
        <svg width="105" height="107" viewBox="0 0 105 107" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M78.75 0L65.625 13.375L91.875 40.125L105 26.75L78.75 0ZM52.5 26.75L0 80.25V107H26.25L78.75 53.5L52.5 26.75Z" fill="white"/>
        </svg>
        <svg width="74" height="46" viewBox="0 0 74 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.9375 0V18.375H0V27.5625H45.9375V45.9375L73.5 22.6931L45.9375 0Z" fill="white"/>
        </svg>
        <svg width="130" height="90" viewBox="0 0 130 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.375 0L0 24.5455L65 90L130 24.5455L105.625 0L65 40.9091L24.375 0Z" fill="white"/>
          </svg>
        </div>
        <p class = "recruting1">서류 전형 후 최종 발표</p>

        <h3>2.지원 자격</h3>
        <p class="recruting2">사이버보안을 열심히 공부하고 싶은 사이버보안 주/복수 전공생 및 진입 예정인 호크마생 누구나!</p>
        <h4>3.활동 기간</h4>
        <p class="recruting3">추후 작성</p>
      </div>

      {/* 하단 섹션 - 버튼 */}
        <div className="button-section">
          <a href='https://www.naver.com' target="_blank" rel="noopener noreferrer">
          <button className="apply-button">지원하기</button>
          </a>
        </div>
    </div>
  );
}

export default Recruiting