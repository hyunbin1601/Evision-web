import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
    width: 600px;
    border-collapse: collapse;
    margin-top: 20px;
    top: 218px;
    left: 520px;
    position: relative;
`;

const StyledTh = styled.th`
    background-color: #1a561d;
    color: #fff;
    padding: 15px;
    text-align: center;
`;

const StyledTd = styled.td`
    border: 1px solid #e6e6e6;
    padding: 15px;
    text-align: center;

    input[type="checkbox"] {
        width: 18px;
        height: 18px;
        margin: 0;
        padding: 0;
    }

    input[type="checkbox"]:checked {
        background-color: #1a5d1a;
        border-color: #1a5d1a;
    }
`;

const Table = ({ names, days }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <StyledTh>이름</StyledTh>
                    {days.map((day) => (
                        <StyledTh key={day}>{day}</StyledTh>
                    ))}
                </tr>
            </thead>
            <tbody>
                {names.map((name) => (
                    <tr key={name}>
                        <StyledTd>{name.name}</StyledTd>
                        {days.map((day) => (
                            <StyledTd key={`${name.name}-${day}`}>
                                <input type="checkbox" />
                            </StyledTd>
                        ))}
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
};

export default Table;
