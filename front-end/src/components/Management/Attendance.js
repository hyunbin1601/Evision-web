import React, {useState} from 'react';
import Table from './Table';
import styled from 'styled-components';

const Styledh1 = styled.h1`
    font-size: 2.3em;
    color: white;
    font-weight: bold;
    top: 220px;
    left: 550px;
    text-align: left;
    position: relative;
    width: 300px;
`;
const StyledButton = styled.button`
    top: 660px;
    left: 200px;
    position: relative;
    background-color: #1a5d1a;
    color: #fff;
    padding: 10px 15px;
    margin-top: 20px;
    cursor: pointer;
`;


const Attendance = () => {
    const [checkedCells, setCheckedCells] = useState([]);  //chekedCells는 서버로 보낼 체크박스 키값의 배열

    const handleCheckboxChange = (key) => {  //prevCheckedCells <- 이전에 체크한 체크박스 배열 저장
        setCheckedCells((prevCheckedCells) =>
            prevCheckedCells.includes(key)   //key는 셀에 넣은 구분키
                ? prevCheckedCells.filter((cellKey) => cellKey !== key)
                : [...prevCheckedCells, key]
        );
    };

    const handleSaveClick = () => {
        //서버와의 통신을 위한 용도임
    };

    const names = [{ name: '이면빈' }];   //json 형태로 보내기 때문에 -> {} 사용!
    const days = ['날짜1', '날짜2', '날짜3'];

    return (
        <div>
            <Styledh1>출석 체크</Styledh1>
            <Table names={names} days={days} onCheckboxChange={handleCheckboxChange}/>
            <StyledButton onClick={handleSaveClick}>Save</StyledButton>
        </div>
    );
};

export default Attendance;
