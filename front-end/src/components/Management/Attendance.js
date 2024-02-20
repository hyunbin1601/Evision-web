import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import axios from 'axios';

const TableContainer = styled.div`
  font-family: 'Arial', sans-serif;
  border-collapse: collapse;
  width: 800px;
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
`;

const AttendanceTable = () => {
  const [names, setNames] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // 서버에서 이름 목록을 불러오는 axios 요청
    axios.get('/api/names')
      .then(response => setNames(response.data))
      .catch(error => console.error(error));

    // 페이지가 처음 로드될 때, 오늘 날짜의 출석체크 데이터를 초기화
    initializeAttendanceData();
  }, []);

  const initializeAttendanceData = () => {
    const todayDate = new Date().toISOString().split('T')[0];
    const initialData = names.map(({ name, student_id }) => ({
      name,
      student_id,
      attendanceCheck: false,
      todayDate,
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
    const payload = attendanceData.map(({ name, student_id, attendanceCheck, todayDate }) => ({
      name,
      student_id,
      attendanceCheck,
      todayDate,
    }));

    // 서버로 출석체크 데이터를 저장하는 axios 요청
    axios.post('/attendance/update', payload)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  // react-table 사용을 위한 코드
  const columns = React.useMemo(
    () => [
      {
        Header: '이름',
        accessor: 'name',
      },
      {
        Header: '출석 체크',
        accessor: 'attendanceCheck',
        Cell: ({ row }) => (
          <CheckboxInput
            type="checkbox"
            checked={row.original.attendanceCheck}
            onChange={() => handleCheckboxChange(row.original.student_id)}
          />
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: attendanceData });

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
      <div>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default AttendanceTable;
