import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Leftbar from '../Leftbar_admin';

const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const H1 = styled.p`
    font-size: 2.3em;
    color: white;
    font-weight: bold;
    top: 120px;
    left: 200px;
    text-align: center;
    position: relative;
    width: 400px;
`;

const TableContainer = styled.table`
    border-collapse: collapse;
    max-width: 600px;
    margin-bottom: 20px;
    top: 150px;
    left: 100px;
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

const AttendancePatch = () => {
    const [attendanceList, setAttendanceList] = useState([]);
    const [names, setNames] = useState([]);
    const [dateHeaders, setDateHeaders] = useState([]);
    const selectedList = [
        { value: "ABSENCE", name: "ABSENCE" },
        { value: "ATTEND", name: "ATTEND" },
        { value: "LATE", name: "LATE" }
    ];
    const token = localStorage.getItem('token');
    const config = { headers: { "Authorization" : `Bearer ${token}` } }
    const changeDate = (todayDate) => {
        const date = new Date(todayDate);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}/${day}`;
    };

    useEffect(() => {
        axios.get('/admin/attendance', config)
            .then(response => {
                if(response.data.success === true) {
                    const filteredList = response.data.member_attendance.filter(item => item.session_type === 'thr');
                    setAttendanceList(filteredList);
                    const { names, dateHeaders } = extractData(filteredList);
                    const changeDateHeaders = dateHeaders.map(changeDate);
                    setNames(names);
                    setDateHeaders(changeDateHeaders);
                }
                else {
                    alert("권한이 없습니다.")
                    window.location.reload('/');
                }
            })
            .catch(error => console.error(error));
    }, []);

    const extractData = (rawData) => {
        const extractedData = {
            names: [],
            dateHeaders: [],
        };


        rawData.forEach(data => {
            if(!names.includes(data.name)) {
                names.push(data.name)
            }
            if(!dateHeaders.includes(data.todayDate)) {
                dateHeaders.push(data.todayDate)
            }
        });

        extractedData.dateHeaders.sort((a, b) => new Date(a) - new Date(b));

        return extractedData;
    };

    const handleCellChange = (id, todayDate, newStatus) => {
        setAttendanceList(prevList =>
            prevList.map(data =>
                data.id === id && data.todayDate === todayDate
                    ? { ...data, attendance_status: newStatus }
                    : data
            )
        );
    };

    const handleSaveChanges = () => {
        const modifiedData = attendanceList.map(({ id, todayDate, attendance_status }) => ({
            id: id,
            todayDate: todayDate,
            attendance_status: attendance_status
        }));

        axios.patch('/admin/attendance', modifiedData, config)
            .then(response => {
                if(response.data.success === true) {
                    console.log(response)
                    window.location.reload();
                }
                else {
                    alert("출석 수정에 실패하였습니다.");
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <Wrapper>
        <Leftbar />
            <H1>정규세션 출석 리스트</H1>
            <TableContainer>
                <thead>
                    <tr>
                        <TableHead>이름</TableHead>
                        {dateHeaders.map((date) => (
                            <TableHead>{date}</TableHead>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {attendanceList.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell key={item.name}>{item.name}</TableCell>
                            {dateHeaders.map((date) => (
                                <TableCell key={date}>
                                    {attendanceList.filter(data => data.id === item.id && data.todayDate === date).map((data) => (
                                        <select
                                            value={data.attendance_status}
                                            onChange={(e) => handleCellChange(data.id, data.todayDate, e.target.value)}
                                        >
                                            {selectedList.map(option => (
                                                <option key={option.value} value={option.value}>{option.name}</option>
                                            ))}
                                        </select>
                                    ))}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </tbody>
            </TableContainer>
            <Button onClick={handleSaveChanges}>Save</Button>
        </Wrapper>
    );
};

export default AttendancePatch;
