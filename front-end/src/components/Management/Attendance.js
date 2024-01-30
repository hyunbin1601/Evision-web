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
    border: 1px solid #e6e6e6;
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

const Attendance = () => {
    const [names, setNames] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const todayDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        axios.get('')  //get 방식으로 요청을 보냄 -> 페이지가 렌더링 되자마자 실행
            .then(response => setNames(response.data))
            .catch(error => console.error(error));

        initializeAttendanceData();
    }, []);

    const initializeAttendanceData = () => {
        const initialData = names.map(({ name, student_id }) => ({
            name,
            student_id,
            attendance_status: false,
        }));
        setAttendanceData(initialData);
    };

    const handleCheckboxChange = (student_id) => {
        const updatedData = attendanceData.map(data => {
            if (data.student_id === student_id) {
                return { ...data, attendance_status: !data.attendance_status };
            }
            return data;
        });
        setAttendanceData(updatedData);
    };

    const handleSave = () => {
        const saveData = attendanceData.map(({ name, student_id, attendance_status, todayDate }) => ({
            name,
            student_id,
            attendance_status,
            todayDate
        }));

        axios.post('', saveData)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <H1>정규세션 출석체크</H1>
            <TableContainer>
                <thead>
                    <tr>
                        <TableHead>이름</TableHead>
                        <TableHead>{todayDate}</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map(({ name, student_id, attendance_status }) => (
                        <TableRow key={student_id}>
                            <TableCell>{name}</TableCell>
                            <TableCell>
                                <CheckboxInput
                                    type="checkbox"
                                    checked={attendance_status}    
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

export default Attendance;