import {FlexColumnContainer, FlexContainer, MediumText} from "../../styles/CommonStyles";
import {getUserApiResponse} from "../../models/UserModel";
import UserCard from "../userCard/UserCard";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {sendApiRequest} from "../../utils/requests";
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import EditUserForm, {editedUserFields} from "../forms/EditUserForm";


const InnerContainer = styled(FlexContainer)`
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 5rem;
`;


function UserSectionAdminPage() {
    let [users, setUsers] = useState<Array<getUserApiResponse>>([]);
    let [userToEdit, setUserToEdit] = useState<getUserApiResponse>();

    let [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    useEffect(()=> {
        sendApiRequest("GET","/users/getAll",null, true).then((data: any) => {
            const usersTemp: any = [];
            data.forEach((user: getUserApiResponse)=> {
                usersTemp.push({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    userRole: user.userRole,
                    enabled: user.enabled,
                    accountCreated: user.accountCreated,
                });
            });
            setUsers(usersTemp);
        }).catch((err: any) => {
            console.log(err);
        });
    }, []);

    function handleDeleteUser(user: getUserApiResponse) {
        if(window.confirm("Are you sure?")) {
            const newUserList = users.filter((t) =>t.id != user.id);
            setUsers(newUserList);
            const postData = {
                id: user.id,
            };
            sendApiRequest("POST", "/users/delete",postData, false);
        }

    }
    function openPopup(user: getUserApiResponse) {
        setUserToEdit(user);
        setIsPopupOpen(true);
    }
    function handleEditUser(editedUser: editedUserFields) {
        sendApiRequest("POST", "/users/update", editedUser, false);
        setIsPopupOpen(false);

    }

    return (
        <InnerContainer>
            <FlexColumnContainer style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
                <FlexContainer style={{width: "80rem",padding: "0 2rem", justifyContent: "space-between", marginBottom: "2rem"}}>
                    <FlexContainer style={{width: "2rem", justifyContent: "center"}}>
                        <MediumText>Id</MediumText>
                    </FlexContainer>
                    <FlexContainer style={{width: "20rem", justifyContent: "center"}}>
                        <MediumText>Name</MediumText>
                    </FlexContainer>
                    <FlexContainer style={{width: "30rem", justifyContent: "center"}}>
                        <MediumText>Email</MediumText>
                    </FlexContainer>
                    <FlexContainer style={{width: "10rem", justifyContent: "center"}}>
                        <MediumText>User role</MediumText>
                    </FlexContainer>
                    <FlexContainer style={{width: "10rem", justifyContent: "center"}}>
                        <MediumText>Enabled</MediumText>
                    </FlexContainer>
                    <Popup  defaultOpen={false} open={isPopupOpen}>
                        <EditUserForm user={userToEdit} onCancel={()=> setIsPopupOpen(false)} onSubmit={(user)=> handleEditUser(user)} />
                    </Popup>
                </FlexContainer>
                {users && users.map((data: getUserApiResponse)=> {
                    return <UserCard key={data.id} user={data} onDeleteClick={handleDeleteUser} onEditClick={openPopup}/>
                })}
            </FlexColumnContainer>
        </InnerContainer>
    )
}

export default UserSectionAdminPage;