import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AssignmentContainer = styled.div`
  margin-top: 300px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 20px;

  h1 {
    color: #1a5d1a;
    margin-bottom: 10px;
    line-height: 1.5;
  }

  input {
    margin-top: 10px;
    padding: 8px;
    border: 1px solid #1a5d1a;
    border-radius: 5px;
    outline: none;
    width : 500px;
  }

  button {
    background-color: #1a5d1a;
    width: 150px;
    color: #ffffff; 
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
  }
`;




const Assignment = () => {
    const [link, setLink] = useState('');
    const [isOkay, setIsOkay] = useState(false);
    const [token, setToken] = useState('');
    const [timeOk, setTimeOk] = useState('');  // 서버 응답 값에 따라 다른 화면 렌더링

    useEffect(() => {
      const storedToken = localStorage.getItem('token');

      if(storedToken) {
        setToken(storedToken);
      }
    }, []);

    const SubmitAssignment = async () => {
     {/*   try{
            
            const response = await axios.post('서버 주소', {
              submission_link: link,
              todayDate = new Date().toISOString().split('T')[0],
            }, {
              headers: {
                'Authorization': 'Bearer ${token}'
              }
            });

            setTimeOk(responseFromServer.data.time);  // 일단 변수명 time이라고 임의로 정해봤어용
            if (responseFromServer.data.success === 200) {   // time이랑 구분하려고 response.data.status 라고 바꿨어요
            setIsOkay(true);
            }
          }catch(error) {
            alert('과제 제출 중 오류 발생');
          }
         */}
    }

    return (
        <AssignmentContainer>
          {timeOk === true ? (
            <>
            {isOkay ? <h1><strong>정규 세션<br />과제 링크 수정</strong></h1>: <h1><strong>정규 세션<br />과제 링크 제출</strong></h1>}
            <input
                type='text'
                name='link'
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder='Notion이나 Blog 등 링크 형식만 제출 가능합니다.'
            />
            <button onClick={SubmitAssignment}>제출</button>
            </>
          ) : (
            <>
              <h1><strong>과제 제출 불가</strong></h1>
              <p>과제 제출 시간이 아닙니다</p>
              <div className="button-section">
              <a href='/MyPage' target="_blank" rel="noopener noreferrer">
              <button className="apply-button">마이페이지</button>
              </a>
             </div>
            </>
          )}
        </AssignmentContainer>
    );
}

export default Assignment;