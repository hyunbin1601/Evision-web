import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
    width: 400px;
    margin-bottom: 20px;
    top: 150px;
    left: 200px;
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

const Attendance_Run = () => {
    const [names, setNames] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [selected, setSelected] = useState("ABSENCE");
    const selectedList = [
        { value: "ABSENCE", name: "ABSENCE" },
        { value: "ATTEND", name: "ATTEND" },
    ];
    const token = localStorage.getItem('token');
    const todayDate = new Date().toISOString().split('T')[0];
    const config = { headers: { "Authorization" : `Bearer ${token}` } }

    // useEffect(() => {
    //     axios.get('/admin/members', config)  //get 방식으로 요청을 보냄 -> 페이지가 렌더링 되자마자 실행
    //         .then(response => setNames(response.data.user))
    //         .catch(error => console.error(error));

    //     initializeAttendanceData();
    // }, []);

    useEffect(() => {
        axios.get('/admin/members', config)  
            .then(response => {
                if(response.data.success === true) {
                    setNames(response.data.user)
                }
                else {
                    alert("권한이 없습니다");
                    window.location.reload('/');
                }
            })
            .catch(error => console.error(error));

        initializeAttendanceData();
    }, []);

    const initializeAttendanceData = () => {
        const initialData = names.map(({ name, id }) => ({
            name: name,
            student_id: id,
            attendance_status: "ABSENCE",
            todayDate: todayDate
        }));
        setAttendanceData(initialData);
    };

    const onHandleSelect = (e, student_id) => {
        setAttendanceData(prevData => 
            prevData.map(item => 
                item.student_id === student_id ? {...item, attendance_status : e.target.value} : item
                )
            )
    }

    const handleSave = () => {
        const saveData = attendanceData.map(({ student_id, attendance_status, todayDate }) => ({
            id: student_id,
            attendance_status: attendance_status,
            todayDate: todayDate
        }));

        axios.post('/admin/attendance/sat', saveData)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <Wrapper>
        <Leftbar />
            <H1>러닝세션 출석체크</H1>
            <TableContainer>
                <thead>
                    <tr>
                        <TableHead>이름</TableHead>
                        <TableHead>{todayDate}</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map(({ name, student_id }) => (
                        <TableRow key={student_id}>
                            <TableCell>{name}</TableCell>
                            <TableCell>
                            <select onChange={(e) => onHandleSelect(e, student_id)} value={selected}>
                                {selectedList.map((item) => {
                                    return <option value={item.value} key={item.value}>
                                        {item.name}
                                    </option>;
                                })}
                            </select>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </TableContainer>
            <div>
                <Button onClick={handleSave}>Save</Button>
            </div>
        </Wrapper>
    );
};

export default Attendance_Run;