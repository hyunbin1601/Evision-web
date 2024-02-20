import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Leftbar from '../Leftbar_admin';

const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const RegisterBox = styled.div`
    background-color: #e6e6e6;
    border-radius: 10px;
    padding: 20px;
    top: 150px;
    left: 250px;
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
    const [studentType, setStudentType] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem('token');
    const config = { headers: { "Authorization" : `Bearer ${token}` } };

    useEffect(() => {
        axios.get("/admin/members", config)
            .then(response => {
                if(response.data.success === false) {
                    alert("접근 권한이 없습니다.");
                    window.location.redirect('/');
                }
            })
            .catch(err => console.log(err))
    }, [])
    

    const handleRegister = () => {
        if (password !== passwordConfirmation) {
            alert("패스워드가 일치하지 않습니다. 다시 입력해주세요.");
            return;
        }
        axios
        .post("/admin/members", {
            name: studentName,
            id: studentId,
            major: major,
            email: email,
            password: password,
            student_type: studentType,
            admin: isAdmin,
        })
        .then((response) => {
            if(response.data.success === true) {
                return navigate("/MyPage");
            }
            else {
                alert("회원 가입에 실패하였습니다.");
            }
        })
        .catch((error) => {
            alert(error.response.data.message)
        })
    };

    return (
        <Wrapper>
        <Leftbar />
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
            <Input
                type="text"
                placeholder="yb/ob"
                value={studentType}
                onChange={(e) => setStudentType(e.target.value)}
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
        </Wrapper>
    );
};

export default Register;
