import React, { useState, useEffect } from 'react';
import './AttendanceStatus.css';
import axios from 'axios';
import Leftbar from '../Leftbar';



const AttendanceStatus = () => {   //{token} 넣기
    const [attendanceData, setAttendanceData] = useState([]);

  {/*  
    
    const token = localStorage.setItem('token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('서버 주소',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAttendanceData(response.data.filter(item => item.session_type === 'thr'););
            } catch (error) {
                alert('에러 발생');
            }
        };

        fetchData();
    }, []); */}

    return (
        <div className='attendance-and-assignment'>
            <Leftbar />
            <h1><strong>정규세션 출결 및 과제 제출</strong></h1>
            <table>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>정규세션 과제 제출 현황</th>
                        <th>출결</th>
                    </tr>
                </thead>
                <tbody>
                   {/* {attendanceData.map((data) => (
                        <tr key={data.id}>
                            <td>{data.todayDate}</td>
                            <td>{data.assignment}</td>
                            <td>{data.attendance_Status}</td>
                        </tr>
                    ))}
                   */}
                   <tr>
                    <td>2022-03-01</td>
                    <td>Submitted</td>
                    <td>Present</td>
                    </tr>
                    <tr>
                    <td>2022-03-02</td>
                    <td>Not submitted</td>
                    <td>Present</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AttendanceStatus;


