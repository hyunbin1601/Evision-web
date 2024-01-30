import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const H1 = styled.p`
    font-size: 2.3em;
    color: white;
    font-weight: bold;
    top: 120px;
    left: 750px;
    text-align: center;
    position: relative;
    width: 400px;
`;

const TableContainer = styled.table`
    border-collapse: collapse;
    width: 400px;
    margin-bottom: 20px;
    top: 150px;
    left: 750px;
    position: relative;
`;

const TableHead = styled.th`
    background-color: #1a5d1a;
    padding: 12px;
    text-align: center;
    color: white;
    border: 1px solid #dddddd;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

const TableCell = styled.td`
    padding: 12px;
`;

const CheckboxInput = styled.input`
    width: 20px;
    height: 20px;
`;


const Button = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
    top: 600px;
    position: relative;
`;

const AttendanceRun = () => {
    const [names, setNames] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const todayDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        axios.get('')
            .then(response => setNames(response.data))
            .catch(error => console.error(error));

        initializeAttendanceData();
    }, []);

    const initializeAttendanceData = () => {
        const initialData = names.map(({ name, student_id }) => ({
            name,
            student_id,
            attendanceCheck: false,
            todayDate
        }));
        setAttendanceData(initialData);
    };

    const handleCheckboxChange = (student_id) => {
        const updatedData = attendanceData.map(data => {
            if (data.student_id === student_id) {
                return { ...data, attendanceCheck: !data.attendanceCheck };
            }
            return data;
        });
        setAttendanceData(updatedData);
    };

    const handleSave = () => {
        const sessionId = "Sun";
        const saveData = attendanceData.map(({ name, student_id, attendanceCheck, todayDate }) => ({
            name,
            student_id,
            attendanceCheck,
            todayDate,
            sessionId
        }));

        axios.post('', saveData)   //api에게 saveData를 보내줌, 러닝세션 출석 용도라 변수 sessionId는 필요할까..?
            .then(response => console.log(response.data))   //서버와의 통신 부분
            .catch(error => console.error(error));
    };

    return (
        <div>
            <H1>러닝세션 출석체크</H1>
            <TableContainer>
                <thead>
                    <tr>
                        <TableHead>이름</TableHead>
                        <TableHead>{todayDate}</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map(({ name, student_id, attendanceCheck }) => (
                        <TableRow key={student_id}>
                            <TableCell>{name}</TableCell>
                            <TableCell>
                                <CheckboxInput
                                    type="checkbox"
                                    checked={attendanceCheck}
                                    onChange={() => handleCheckboxChange(student_id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </TableContainer>
            <div>
                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
};

export default AttendanceRun;
