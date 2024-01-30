import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
    width: 600px;
    margin-bottom: 20px;
    top: 150px;
    left: 600px;
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
    text-align: center;
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

const AttendancePatchRun = () => {
    const [names, setNames] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [dateHeaders, setDateHeaders] = useState([]);

    useEffect(() => {
        axios.get('')
            .then(response => {
                const { names, attendanceData, dateHeaders } = extractData(response.data);
                setNames(names);
                setAttendanceData(attendanceData);
                setDateHeaders(dateHeaders);
            })
            .catch(error => console.error(error));
    }, []);

    const extractData = (rawData) => {
        const extractedData = {
            names: [],
            attendanceData: [],
            dateHeaders: [],
        };

        rawData.names.forEach(name => {
            extractedData.names.push(name);
        });

        rawData.attendanceData.forEach(data => {
            const { name, student_id, attendance_status } = data;
            const newData = { name, student_id };
            Object.entries(attendance_status).forEach(([date, value]) => {
                if (!extractedData.dateHeaders.includes(date)) {
                    extractedData.dateHeaders.push(date);
                }
                newData[date] = value;
            });
            extractedData.attendanceData.push(newData);
        });

        extractedData.dateHeaders.sort((a, b) => new Date(a) - new Date(b));

        return extractedData;
    };

    const handleCheckboxChange = (student_id, date) => {
        const updatedData = attendanceData.map(data => {
            const newData = { ...data };
            newData[date] = !newData[date];
            return newData;
        });
        setAttendanceData(updatedData);
    };

    const handleSave = () => {
        const saveData = attendanceData.map(({ name, student_id, ...attendance_status_set }) => ({
            name,
            student_id,
            attendance_status_set: Object.entries(attendance_status_set).map(([date, attendance_status]) => ({
                date,
                attendance_status,
            })),
        }));

        axios.patch('', saveData)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <H1>러닝세션 출석체크 수정</H1>
            <TableContainer>
                <thead>
                    <tr>
                        <TableHead>이름</TableHead>
                        {dateHeaders.map(date => (
                            <TableHead key={date}>{date}</TableHead>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map(({ name, student_id, ...attendance_status_set }) => (
                        <TableRow key={student_id}>
                            <TableCell>{name}</TableCell>
                            {dateHeaders.map(date => (
                                <TableCell key={date}>
                                    <CheckboxInput
                                        type="checkbox"
                                        checked={attendance_status_set[date] || false}
                                        onChange={() => handleCheckboxChange(student_id, date)}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </tbody>
            </TableContainer>
            <Button onClick={handleSave}>Save</Button>
        </div>
    );
};

export default AttendancePatchRun;