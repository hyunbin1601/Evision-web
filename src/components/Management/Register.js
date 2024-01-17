import React, { useState } from 'react';
import styled from 'styled-components';

const RegisterBox = styled.div`
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

const AdditionalText = styled.span`
    margin-left: 10px;
    color: #1a5d1a;
`;

const RadioInput = styled.input`
    width: 20px;
    height: 20px;
`;

const RegisterButton = styled.button`
    background-color: #1a5d1a;
    width: 150px;
    color: #ffffff; 
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
`;

const Register = () => {
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [major, setMajor] = useState('');
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleRegister = () => {
        //서버랑 연결하는 부분, fetch, asyc, await를 통해 주고받을 예정임
    };

    return (
        <RegisterBox>
        <Title>Register</Title>
        <InputBox>
        <Input
            type="text"
            placeholder="학번"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
        />
        </InputBox>
        <InputBox>
        <Input
            type="text"
            placeholder="이름"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
        />
        </InputBox>
        <InputBox>
        <Input
            type="text"
            placeholder="전공"
            value={major}   
            onChange={(e) => setMajor(e.target.value)}
        />
        </InputBox>
        <InputBox>
        <Input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        </InputBox>
        <InputBox>
            <AdditionalText>ob</AdditionalText>
            <RadioInput
                type="radio"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
            />
        </InputBox>
        <RegisterButton onClick={handleRegister}>Register</RegisterButton>
        </RegisterBox>
    );
};

export default Register;
