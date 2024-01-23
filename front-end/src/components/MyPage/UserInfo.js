import React, { useState, useEffect } from 'react';
import './UserInfo.css';



const UserInfo = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        major: '',
        email: '',
        generation: ''
    });
    const fetchUserInfo = async () => {
        //더미 데이터임!!!! 주의
        setTimeout(() => {
            setUserInfo({
                name: '이면빈',
                major: '사보사보사보',
                email: 'vina1601@ewhain.net',
                generation: '6기'
            });
        }, 1);   
    };


    useEffect(() => {
        fetchUserInfo();
    }, []);    //실시간 변경 막음

    return (
        <div className="user-info-container">
        <p>User Info</p>
            <div className="user-info-box">
                <div className="info-item">
                    <span>이름: </span> {userInfo.name}
                </div>
                <div className="info-item">
                    <span>전공: </span> {userInfo.major}
                </div>
                <div className="info-item">
                    <span>이메일: </span> {userInfo.email}
                </div>
                <div className="info-item">
                    <span>기수: </span> {userInfo.generation}
                </div>
            </div>
            <p class="detail">※ 회원 정보를 수정하고 싶으신 경우, 운영진에게 문의해 주세요.</p>
        </div>
    );


};

export default UserInfo;
