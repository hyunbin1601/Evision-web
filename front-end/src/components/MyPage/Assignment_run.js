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




const Assignment_run = () => {
    const [link, setLink] = useState('');
    const [isOkay, setIsOkay] = useState(false);  //isOkay는 과제제출 후 표시
    const [token, setToken] = useState('');
    const [pageOpen,setPageOpen] = useState(false); // pageOpen은 목, 토에만 열림. 이 값에 따라 페이지 열리게 만듬
    const config = { headers: { "Authorization" : `Bearer ${token}` } }

    useEffect(async () => {
      const storedToken = localStorage.getItem('token');

      if(storedToken) {
        setToken(storedToken);
      }
      const response = await axios.get('', config);
      if (response.data.success === false) {
        alert("권한이 없습니다");
        window.location.redirect("/");
      }
      else {
        setIsOkay(response.data.isOkay);
        setPageOpen(response.data.pageOpen);
      }
    }, []); 
 

    const SubmitAssignment = async () => {
     {/*   try{
            
            const response = await axios.post('서버 주소', {
              submission_link: link,
              todayDate : new Date().toISOString().split('T')[0],
            }, {
              headers: {
                `Authorization`: 'Bearer ${token}'
              }
            });

            if(response.data.isOkay === true) {   //과제 제출 여부에 따라 제출 혹은 수정 띄움
              setIsOkay(true);
            }
            else {
              setIsOkay(false);
            }
            


          }catch(error) {
            alert('과제 제출 중 오류 발생');
          }
         */}
    }

    return (
        <AssignmentContainer>
          {pageOpen === true ? (
            <>
            {/*뭔가 과제 제출까지 얼마 남았는지 표시해줘도 좋을 것 같다*/}
            {isOkay ? <h1><strong>러닝 세션<br />과제 링크 수정</strong></h1>: <h1><strong>정규 세션<br />과제 링크 제출</strong></h1>}
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
              <h1><strong>과제 제출 시간이 아닙니다</strong></h1>
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



export default Assignment_run;