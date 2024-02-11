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

const AssignmentCheckRun = () => {
    const [names, setNames] = useState([]);
    const [assignmentData, setAssignmentData] = useState([]);
    const [dateHeaders, setDateHeaders] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        axios.get('/admin/assignment/sat')
            .then(response => {
                const { names, assignmentData, dateHeaders } = extractData(response.data);
                setNames(names);
                setAssignmentData(assignmentData);
                setDateHeaders(dateHeaders);
            })
            .catch(error => console.error(error));
    }, []);

    const extractData = (rawData) => {
        const extractedData = {
            names: [],
            assignmentData: [],
            dateHeaders: [],
        };

        rawData.names.forEach(name => {
            extractedData.names.push(name);
        });

        rawData.assignmentData.forEach(data => {
            const { name, id, assignment_status } = data;
            const newData = { name, id };
            Object.entries(assignment_status).forEach(([date, value]) => {
                if (!extractedData.dateHeaders.includes(date)) {
                    extractedData.dateHeaders.push(date);
                }
                newData[date] = value;
            });
            extractedData.assignmentData.push(newData);
        });

        extractedData.dateHeaders.sort((a, b) => new Date(a) - new Date(b));

        return extractedData;
    };

    const handleCheckboxChange = (id, date) => {
        if (isEditing) {
            const updatedData = assignmentData.map(data => {
                const newData = { ...data };
                newData.assignment_status[date] = !newData.assignment_status[date];
                return newData;
            });
            setAssignmentData(updatedData);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        const saveData = assignmentData.map(({ name, id, assignment_status }) => ({
            name: name,
            id: id,
            assignment_status: Object.entries(assignment_status).map(([date, value]) => ({
                [date] : value
            }))
        }));

        axios.patch('', { saveData })
            .then(response => {
                console.log(response.data);
                setIsEditing(false);
            })
            .catch(error => console.error(error));
    };

    return (
        <Wrapper>
        <Leftbar />
            <H1>정규세션 과제확인</H1>
            {isEditing ? (
                <Button onClick={handleSaveClick}>Save</Button>
            ) : (
                <Button onClick={handleEditClick}>Edit</Button>
            )}
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
                    {assignmentData.map(({ name, id, assignment_status }) => (
                        <TableRow key={id}>
                            <TableCell>{name}</TableCell>
                            {dateHeaders.map(date => (
                                <TableCell key={date}>
                                    <CheckboxInput
                                        type="checkbox"
                                        checked={assignment_status[date]}
                                        onChange={() => handleCheckboxChange(id, date)}
                                        readOnly={!isEditing}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </tbody>
            </TableContainer>
        </Wrapper>
    );
};

export default AssignmentCheckRun;
