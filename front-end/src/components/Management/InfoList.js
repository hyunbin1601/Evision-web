import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Table = styled.table`
    width: 600px;
    border-collapse: collapse;
    margin-bottom: 20px;
    top: 150px;
    left: 100px;
    position: relative;
`;

const Th = styled.th`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    background-color: #1a5d1a;
    color: #ffffff;
`;

const Td = styled.td`
    border: 2px solid #e6e6e6;
    text-align: left;
    padding: 8px;
    background-color: #ffffff;
`;

const ButtonSet = styled.div``;

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
    margin-left: 10px;
    margin-right: 10px;
    top: 600px;
    position: relative;
`;

const SaveButton = styled(EditButton)`
    background-color: #008cba;
`;

const DeleteButton = styled(EditButton)`
    background-color: #008cba;
`;

const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    max-height: 1200px;
`;

const InfoList = ({ userInfos, handleSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedValues, setEditedValues] = useState({});
    const [selectedIds, setSelectedIds] = useState([]);

    const handleInputChange = (field, value, studentId) => {
        setEditedValues((prevValues) => ({
            ...prevValues,
            [studentId]: {
                ...prevValues[studentId],
                [field]: value,
            },
        }));
    };

    const handleSaveClick = () => {
        axios
            .patch('/api/save', { editedValues })
            .then((response) => {
                console.log('');
            })
            .catch((error) => console.error(error));

        setEditedValues({});
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        if (selectedIds.length === 0) {
            alert('삭제할 대상을 선택해 주세요.');
            return;
        }

        axios.delete('/api/delete', { data: { studentIds: selectedIds } })
            .then((response) => {
                const updatedUserInfos = userInfos.filter(
                    (userInfo) => !selectedIds.includes(userInfo.studentId)
                );
                handleSave(updatedUserInfos);
                setSelectedIds([]);
            })
            .catch((error) => console.error(error));
    };

    const handleCheckboxChange = (studentId) => {
        const updatedIds = selectedIds.includes(studentId)
            ? selectedIds.filter((id) => id !== studentId)
            : [...selectedIds, studentId];
        setSelectedIds(updatedIds);
    };

    return (
        <Wrapper>
            <Table>
                <thead>
                    <tr>
                        <Th></Th>
                        <Th>이름</Th>
                        <Th>학번</Th>
                        <Th>이메일</Th>
                        <Th>yb/ob</Th>
                        <Th>벌금</Th>
                        <Th>총 정산</Th>
                    </tr>
                </thead>
                <tbody>
                    {userInfos.map((userInfo) => (
                        <tr key={userInfo.studentId}>
                            <Td>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(userInfo.studentId)}
                                    onChange={() => handleCheckboxChange(userInfo.studentId)}
                                />
                            </Td>
                            <Td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        defaultValue={userInfo.name}
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            handleInputChange('name', e.target.value, userInfo.studentId)
                                        }
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
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            handleInputChange('studentId', e.target.value, userInfo.studentId)
                                        }
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
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            handleInputChange('email', e.target.value, userInfo.studentId)
                                        }
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
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            handleInputChange('year', e.target.value, userInfo.studentId)
                                        }
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
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            handleInputChange('fine', e.target.value, userInfo.studentId)
                                        }
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
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            handleInputChange('price', e.target.value, userInfo.studentId)
                                        }
                                    />
                                ) : (
                                    userInfo.price
                                )}
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ButtonSet>
                {isEditing ? (
                    <SaveButton onClick={handleSaveClick}>Save</SaveButton>
                ) : (
                    <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
                )}
                <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
            </ButtonSet>
        </Wrapper>
    );
};

export default InfoList;
