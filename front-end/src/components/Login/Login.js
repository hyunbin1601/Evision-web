import React, { useState } from 'react';
import styled from 'styled-components';

const LoginBox = styled.div`
    background-color: #e6e6e6;
    border-radius: 10px;
    padding: 20px;
    top: 218px;
    left: 700px;
    width: 450px;
    position: relative;
`;

const Title = styled.h1`
    color: #1a5d1a;
`;

const InputBox = styled.div`
    margin-bottom: 20px;
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid #1a5d1a;
    border-radius: 5px;
    outline: none;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
`;

const LoginButton = styled.button`
    background-color: #1a5d1a;
    width: 150px;
    color: #ffffff; 
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
`;

const Login = () => {
    const [studentId, setstudentId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        //서버랑 연결하는 부분, fetch, asyc, await를 통해 주고받을 예정임
    };

    return (
        <LoginBox>
        <Title>Login</Title>
        <InputBox>
        <Input
            type="text"
            placeholder="학번"
            value={studentId}
            onChange={(e) => setstudentId(e.target.value)}
        />
        </InputBox>
        <InputBox>
        <Input
            type="password"
            placeholder="패스워드"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        </InputBox>
        <LoginButton onClick={handleLogin}>Login</LoginButton>
        </LoginBox>
    );
};

export default Login;
