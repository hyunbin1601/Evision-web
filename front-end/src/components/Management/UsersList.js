import React from 'react';
import InfoList from './InfoList';
import styled from 'styled-components';

const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
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
    //fetch 함수 작성, 서버 만들어지는 대로 ㄱㄱ
    };

    return (
        <Wrapper>
            <h1>회원 정보 목록</h1>
            <InfoList userInfos={dummyData} handleSave={handleSave} />
        </Wrapper>
    );
};

export default UsersList;
