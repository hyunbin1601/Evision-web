import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import styled from 'styled-components';

const TableContainer = styled.div`
    font-family: 'Arial', sans-serif;
    border-collapse: collapse;
    width: 800px;
    margin: 20px auto;
`;

const TableHead = styled.th`
    background-color: #f2f2f2;
    padding: 12px;
    text-align: left;
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
    margin-top: 10px;
`;

const AttendanceTable = () => {
    const [names, setNames] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [dateHeaders, setDateHeaders] = useState([]);

    useEffect(() => {
        axios.get('/api/attendance')
            .then(response => {
                const { attendanceData, dateHeaders } = extractData(response.data);
                setAttendanceData(attendanceData);
                setDateHeaders(dateHeaders);
            })
            .catch(error => console.error(error));

        axios.get('/api/names')
            .then(response => setNames(response.data))
            .catch(error => console.error(error));
    }, []);

    const extractData = (rawData) => {
        const extractedData = {
            attendanceData: [],
            dateHeaders: [],
        };


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
        const payload = attendanceData.map(({ name, student_id, ...attendanceChecks }) => ({
            name,
            student_id,
            attendanceChecks,
        }));

        axios.patch('/attendance/update', payload)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    const columns = React.useMemo(
        () => [
            {
                Header: '이름',
                accessor: 'name',
            },
            ...dateHeaders.map(date => ({
                Header: date,
                accessor: date,
                Cell: ({ row }) => (
                    <TableCell>
                        <CheckboxInput
                            type="checkbox"
                            checked={row.original[date] || false}
                            onChange={() => handleCheckboxChange(row.original.student_id, date)}
                        />
                    </TableCell>
                ),
            })),
        ],
        [dateHeaders]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: attendanceData,
    });

    return (
        <div>
            <TableContainer {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableHead {...column.getHeaderProps()}>{column.render('Header')}</TableHead>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </tbody>
            </TableContainer>
            <Button onClick={handleSave}>Save</Button>
        </div>
    );
};

export default AttendanceTable;
