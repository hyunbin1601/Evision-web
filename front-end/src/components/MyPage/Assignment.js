import React, { useState } from 'react';
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
    const SubmitAssignment = async () => {
     {/*   try{
            const response = await axios.post('서버 주소', {
                submission_link: link,
                id:
                name:
                session_id
            }
            if response.data === 200 :
            setIsOkay(true)
        ); */}
    }

    return (
        <AssignmentContainer>
            {/* <h1><strong>정규 세션<br />과제 링크 제출</strong></h1> */}
            {isOkay ? <h1><strong>정규 세션<br />과제 링크 수정</strong></h1>: <h1><strong>정규 세션<br />과제 링크 제출</strong></h1>}
            <input
                type='text'
                name='link'
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder='Notion이나 Blog 등 링크 형식만 제출 가능합니다.'
            />
            <button onClick={SubmitAssignment}>제출</button>
        </AssignmentContainer>
    );
}

export default Assignment;