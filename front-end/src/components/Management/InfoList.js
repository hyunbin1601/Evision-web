import React, { useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
    width: 600px;
    border-collapse: collapse;
    margin-bottom: 20px;
    top: 218px;
    left: 520px;
`;

const Th = styled.th`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

const Td = styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
`;

const EditButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
`;

const SaveButton = styled(EditButton)`
    background-color: #008cba;
`;

const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const InfoList = ({ userInfos, handleSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedValues, setEditedValues] = useState({
        name: '',
        studentId: '',
        email: '',
        year: '',
        fine: '',
        price: '',
    });

    const handleInputChange = (field, value) => {
        setEditedValues({ ...editedValues, [field]: value });
    };

    const handleSaveClick = () => {
        handleSave(editedValues);
        setIsEditing(false);
    };

    return (
        <Wrapper>
            <Table>
                <thead>
                <tr>
                <Th>이름</Th>
                <Th>학번</Th>
                <Th>이메일</Th>
                <Th>yb/ob</Th>
                <Th>벌금</Th>
                <Th>총 정산</Th>
                </tr>
                </thead>
                <tbody>
                {userInfos.map((userInfo, index) => (
                    <tr key={index}>
                    <Td>
                    {isEditing ? (
                        <input
                            type="text"
                            defaultValue={userInfo.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    ) : (
                        userInfo.name
                    )}
                    </Td>
                    <Td>
                    {isEditing ? (
                        <input
                            type="text"
                            defaultValue={userInfo.studentId}
                            onChange={(e) => handleInputChange('studentId', e.target.value)}
                        />
                    ) : (
                        userInfo.studentId
                    )}
                    </Td>
                    <Td>
                    {isEditing ? (
                        <input
                            type="text"
                            defaultValue={userInfo.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                    ) : (
                        userInfo.email
                    )}
                    </Td>
                    <Td>
                    {isEditing ? (
                        <input
                            type="text"
                            defaultValue={userInfo.year}
                            onChange={(e) => handleInputChange('year', e.target.value)}
                        />
                        ) : (
                            userInfo.name
                        )}
                    </Td>
                    <Td>
                    {isEditing ? (
                        <input
                            type="text"
                            defaultValue={userInfo.fine}
                            onChange={(e) => handleInputChange('fine', e.target.value)}
                        />
                    ) : (
                        userInfo.fine
                    )}
                    </Td>
                    <Td>
                    {isEditing ? (
                        <input
                            type="text"
                            defaultValue={userInfo.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                        />
                    ) : (
                        userInfo.name
                    )}
                    </Td>
                    </tr>
                ))}
                </tbody>
            </Table>
        <div>
        {isEditing ? (
            <SaveButton onClick={handleSaveClick}>Save</SaveButton>
        ) : (
            <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
        )}
        </div>
        </Wrapper>
    );
};

export default InfoList;
