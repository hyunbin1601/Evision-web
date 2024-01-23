import React from 'react';
import InfoList from './InfoList';
import styled from 'styled-components';

const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const H1 = styled.p`
    font-size: 2.3em;
    color: white;
    font-weight: bold;
    top: 220px;
    left: 550px;
    text-align: left;
    position: relative;
    width: 300px;
`;



const UsersList = () => {
    const dummyData = [
        {
            name: '이면빈',
            studentId: '2176317',
            email: 'vina1601@ewhain.net',
            year: 'ob',
            fine: 3000,
            price: 27000,
        },
        {
            name: '류정윤',
            studentId: '몰라',
            email: 'stellano@ewhain.net',
            year: 'ob',
            fine: 3000,
            price: 27000,
        }
    ];

    const handleSave = (editedValues) => {
    //axios로 함수 작성, 서버 만들어지는 대로 ㄱㄱ
    };

    const onCheckboxChange = () => {

    }

    return (
        <Wrapper>
            <H1>회원 정보 목록</H1>
            <InfoList userInfos={dummyData} handleSave={handleSave} />
        </Wrapper>
    );
};

export default UsersList;
