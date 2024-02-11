import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Table = styled.table`
    width: 770px;
    border-collapse: collapse;
    margin-bottom: 20px;
    top: 150px;
    left: 50px;
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
    const [selectedId, setSelectedId] = useState(null);

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
        const editedData = userInfos.map((userInfo) => ({
            id: editedValues[userInfo.student_id]?.id ?? userInfo.id,
            name: editedValues[userInfo.student_id]?.name ?? userInfo.name,
            student_type: editedValues[userInfo.student_id]?.student_type ?? userInfo.student_type,
            major: editedValues[userInfo.student_id]?.major ?? userInfo.major,
            email: editedValues[userInfo.student_id]?.email ?? userInfo.email,
            password: editedValues[userInfo.student_id]?.password ?? userInfo.password,
            fine: editedValues[userInfo.student_id]?.fine ?? userInfo.fine,
            total_settlement: editedValues[userInfo.student_id]?.total_settlement ?? userInfo.total_settlement,
            admin: editedValues[userInfo.student_id]?.admin ?? userInfo.admin
        }));

        axios
            .patch('/admin/members', editedData)
            .then((response) => {
                console.log('');
            })
            .catch((error) => console.error(error));

        setEditedValues({});
        setIsEditing(false);
    };

    const handleDeleteClick = () => {
        if (!selectedId) {
            alert('삭제할 대상을 선택해 주세요.');
            return;
        }

        const dataToDelete = { id: selectedId };

        axios.delete('/admin/members', { data: dataToDelete })  //req.body {}로 인식됨
            .then((response) => {
                const updatedUserInfos = userInfos.filter(
                    (userInfo) => userInfo.studentId !== selectedId
                );
                handleSave(updatedUserInfos);
                setSelectedId(null);
            })
            .catch((error) => console.error(error));
    };

    const handleCheckboxChange = (studentId) => {
        setSelectedId(studentId);
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
                        <Th>비밀번호</Th>
                        <Th>yb/ob</Th>
                        <Th>벌금</Th>
                        <Th>총 정산</Th>
                    </tr>
                </thead>
                <tbody>
                    {userInfos.map((userInfo) => (
                        <tr key={userInfo.id}>
                            <Td>
                                <input
                                    type="checkbox"
                                    checked={selectedId.includes(userInfo.id)}
                                    onChange={() => handleCheckboxChange(userInfo.id)}
                                />
                            </Td>
                            <Td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        defaultValue={userInfo.name}
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            handleInputChange('name', e.target.value, userInfo.id)
                                        }
                                    />
                                ) : (
                                    userInfo.name
                                )}
                            </Td>
                            <Td>
                                userInfo.id
                            </Td>
                            <Td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        defaultValue={userInfo.email}
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            handleInputChange('email', e.target.value, userInfo.id)
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
                                        defaultValue={userInfo.password}
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            handleInputChange('password', e.target.value, userInfo.id)
                                        }
                                    />
                                ) : (
                                    userInfo.password
                                )}
                            </Td>
                            <Td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        defaultValue={userInfo.student_type}
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            handleInputChange('student_type', e.target.value, userInfo.id)
                                        }
                                    />
                                ) : (
                                    userInfo.student_type
                                )}
                            </Td>
                            <Td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        defaultValue={userInfo.fine}
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            handleInputChange('fine', e.target.value, userInfo.id)
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
                                        defaultValue={userInfo.total_settlement}
                                        style={{ width: "100%" }}
                                        onChange={(e) =>
                                            handleInputChange('totalSettlement', e.target.value, userInfo.id)
                                        }
                                    />
                                ) : (
                                    userInfo.total_settlement
                                )}
                            </Td>
                            <Td>
                                {isEditing ? (
                                    <input
                                        type="checkbox"
                                        defaultChecked={userInfo.admin}
                                        style={{ width: "20px", height: "20px" }}
                                        onChange={(e) =>
                                            handleInputChange('admin', e.target.checked, userInfo.id)
                                        }
                                    />
                                ) : (
                                    <input type="checkbox" defaultChecked={userInfo.admin} disabled={true}></input>
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
