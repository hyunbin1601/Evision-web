import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegisterBox = styled.div`
    background-color: #e6e6e6;
    border-radius: 10px;
    padding: 20px;
    top: 218px;
    left: 735px;
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
    const navigate = useNavigate();
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [major, setMajor] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [typeIsChecked, setTypeIsChecked] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleRegister = () => {
        if (password !== passwordConfirmation) {
            alert("패스워드가 일치하지 않습니다. 다시 입력해주세요.");
            return;
        }
        axios
        .post("", {
            name: studentName,
            user_id: studentId,
            major: major,
            email: email,
            password: password,
            isOb: typeIsChecked,
            admin: isAdmin,
        })
        .then((response) => {
            if(response.status === 200) {
                return navigate("/MyPage");
            }
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
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
        <Input
            type="password"
            placeholder="패스워드"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        </InputBox>
        <InputBox>
            <Input
                type="password"
                placeholder="패스워드 확인"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
        </InputBox>
        <InputBox>
            <AdditionalText>ob</AdditionalText>
            <RadioInput
                type="radio"
                checked={typeIsChecked}
                onChange={() => setTypeIsChecked(!typeIsChecked)}
            />
        </InputBox>
        <InputBox>
            <AdditionalText>관리자</AdditionalText>
            <RadioInput
                type="radio"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
            />
        </InputBox>
        <RegisterButton onClick={handleRegister}>Register</RegisterButton>
        </RegisterBox>
    );
};

export default Register;
