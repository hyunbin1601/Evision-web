import React from 'react';
import Table from './Table';

const Attendance = () => {

    const names = [{ name: '이면빈' }];   //json 형태로 보내기 때문에 -> {} 사용!
    const days = ['날짜1', '날짜2', '날짜3'];

    return (
        <div>
            <h1>출석 체크</h1>
            <Table names={names} days={days} />
        </div>
    );
};

export default Attendance;
