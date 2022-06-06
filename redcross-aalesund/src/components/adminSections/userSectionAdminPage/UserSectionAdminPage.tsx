import {FlexColumnContainer, FlexContainer, MediumText} from "../../../styles/CommonStyles";
import {getUserApiResponse} from "../../../models/UserModel";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {sendApiRequest} from "../../../utils/requests";
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import EditUserForm, {editedUserFields} from "./EditUserForm";
import UserCardAdminPage from "./UserCardAdminPage";
import {sortById} from "../../../utils/Sorting";
import {toast, ToastContainer} from "react-toastify";


const InnerContainer = styled(FlexContainer)`
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 5rem;
`;


function UserSectionAdminPage() {
    const [users, setUsers] = useState<Array<getUserApiResponse>>([]);
    const [userToEdit, setUserToEdit] = useState<getUserApiResponse>();

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
            setUsers(sortById(usersTemp));
        }).catch((err: any) => {
            console.log(err);
        });
    }, []);

    function handleDeleteUser(user: getUserApiResponse) {
        if(window.confirm("Are you sure?")) {
            const postData = {
                id: user.id,
            };
            sendApiRequest("PUT", "/users/delete",postData, false).then(()=> {
                const userToDisable: Array<getUserApiResponse> = users.filter((t) =>t.id != user.id);
                const newUserList: Array<getUserApiResponse> = users.filter((t) => t.id == user.id);
                userToDisable[0].enabled = false;
                newUserList.push(userToDisable[0]);
                setUsers(sortById(newUserList));
                toast.success('User disabled', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    bodyStyle: {fontSize: "3.2rem"},
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                });
            }).catch((e: any)=> {
                toast.error('Error disabling user', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    bodyStyle: {fontSize: "3.2rem"},
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        }

    }
    function openPopup(user: getUserApiResponse) {
        setUserToEdit(user);
        setIsPopupOpen(true);
    }
    function handleEditUser(editedUser: editedUserFields) {
        const userToEdit = users.filter((t) => t.id == editedUser.id);
        const newUserList = users.filter((t) => t.id != editedUser.id);
        userToEdit[0].name = editedUser.name;
        userToEdit[0].email = editedUser.email;
        userToEdit[0].enabled = editedUser.enabled;
        userToEdit[0].userRole = editedUser.userRole;
        newUserList.push(userToEdit[0]);

        setUsers(sortById(newUserList));
        sendApiRequest("PUT", "/users/update", editedUser, false).then(()=> {
            toast.success('User edited', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                bodyStyle: {fontSize: "3.2rem"},
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        }).catch((e: any)=> {
            toast.error('Failed to update user', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                bodyStyle: {fontSize: "3.2rem"},
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        });
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
                    <Popup   defaultOpen={false} open={isPopupOpen}>
                        <EditUserForm user={userToEdit} onCancel={()=> setIsPopupOpen(false)} onSubmit={(user)=> handleEditUser(user)} />
                    </Popup>
                </FlexContainer>
                {users && users.map((data: getUserApiResponse)=> {
                    return <UserCardAdminPage key={data.id} user={data} onDeleteClick={handleDeleteUser} onEditClick={openPopup}/>
                })}
            </FlexColumnContainer>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={true}
                style={{overflowY: "hidden"}}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </InnerContainer>
    )
}

export default UserSectionAdminPage;