import React, { useEffect, useState } from 'react';
import InfoList from './InfoList';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const H1 = styled.p`
    font-size: 2.3em;
    color: white;
    font-weight: bold;
    top: 120px;
    left: 260px;
    text-align: left;
    position: relative;
    width: 300px;
`;



const UsersList = () => {
    const [userInfos, setUserInfos] = useState([]);
    useEffect(() => {
        axios.get("/api/userInfo")
            .then(response => {
                setUserInfos(response.data);
            })
            .catch(err => console.log(err))
    }, [])

    const handleSave = (updatedUserInfos) => {
        setUserInfos(updatedUserInfos);   
    };




    return (
        <Wrapper>
            <H1>회원 정보 목록</H1>
            <InfoList userInfos={userInfos} handleSave={handleSave}/>
        </Wrapper>
    );
};

export default UsersList;
