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

const AssignmentCheck = () => {
    const [assignmentList, setAssignmentList] = useState([]);
    const [names, setNames] = useState([]);
    const [dateHeaders, setDateHeaders] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [modifiedList, setModifiedList] = useState([]);

    const token = localStorage.getItem('token');
    const config = { headers: { "Authorization" : `Bearer ${token}` } }
    const changeDate = (todayDate) => {
        const date = new Date(todayDate);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}/${day}`;
    };

    useEffect(() => {
        axios.get('/admin/assignment', config)
            .then(response => {
                if(response.data.success === true) {
                    const filteredList = response.data.member_assignment.filter(item => item.session_type === 'thr');
                    setAssignmentList(filteredList);
                    const { names, dateHeaders } = extractData(filteredList);
                    const changeDateHeaders = dateHeaders.map(changeDate);
                    setNames(names);
                    setDateHeaders(changeDateHeaders);
                }
                else {
                    alert("권한이 없습니다");
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

    // const handleCellChange = (id, todayDate, newStatus) => {
    //     setAssignmentList(prevList =>
    //         prevList.map(data =>
    //             data.id === id && data.todayDate === todayDate
    //                 ? { ...data, assignment_status: newStatus }
    //                 : data
    //         )
    //     );
    // };

    const handleCellChange = (id, todayDate, newStatus) => {
        const updatedData = { id: id, date: todayDate, assignment_status: newStatus };
        const existingIndex = modifiedList.findIndex(item => item.id === id && item.date === todayDate);
        
        if (existingIndex !== -1) {
            const newData = [...modifiedList];
            newData[existingIndex] = updatedData;
            setModifiedList(newData);
        } else {
            setModifiedList(prevData => [...prevData, updatedData]);
        }
    };

    const handleSaveChanges = () => {
        // const modifiedData = assignmentList.map(({ id, todayDate, assignment_status }) => ({
        //     id: id,
        //     todayDate: todayDate,
        //     assignment_status: assignment_status
        // }));
        axios.patch('/admin/assignment', modifiedList, config)
            .then(response => {
                if(response.data.success === true) {
                    console.log(response)
                    window.location.reload();
                }
                else {
                    alert("과제 수정에 실패하였습니다.");
                }
            })
            .catch(error => console.error(error));
    };

    const handleEditChanges = () => {
        setIsEditing(true);
    };

    return (
        <Wrapper>
        <Leftbar />
            <H1>정규세션 과제제출 확인</H1>
            {isEditing ? (
                <Button onClick={handleSaveChanges}>Save</Button>
            ) : (
                <Button onClick={handleEditChanges}>Edit</Button>
            )}
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
                {assignmentList.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell key={item.name}>{item.name}</TableCell>
                            {dateHeaders.map((date) => (
                                <TableCell key={date}>
                                    {assignmentList.filter(data => data.id === item.id && changeDate(data.todayDate) === date).map((data) => (
                                        <CheckboxInput
                                        type="checkbox"
                                        checked={data.assignment_status}
                                        onChange={(e) => handleCellChange(data.id, data.todayDate, e.target.checked)}
                                        readOnly={!isEditing}
                                        />
                                    ))}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </tbody>
            </TableContainer>
        </Wrapper>
    );
};

export default AssignmentCheck;
