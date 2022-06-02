import {
    FlexColumnContainer,

    FlexContainer,

    Input, Label,
    LargeText, MediumText, SmallText,

    XSmallText
} from "../../../styles/CommonStyles";
import React, {useState} from "react";
import styled from "styled-components";
import {isValidEmail, isValidPassword, isValidUsername} from "../../../utils/FormValidation";
import {getUserApiResponse} from "../../../models/UserModel";

const FormContainer = styled(FlexColumnContainer)`
  background-color: ${props => `${props.theme.palette.primary.background}`};
  border-radius: ${props => `${props.theme.borderRadius}`};
  box-shadow: 0 0 2rem 0 rgba(90, 90, 90);
  padding: 0 4.4rem 6.6rem 4.4rem;
`;


const Button = styled.button`
  border: 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
  font-size: ${props => `${props.theme.fontSizes.large}`};
  padding: 1rem 0;
  background-color: ${props => `${props.theme.palette.primary.accentColor}`};
  box-shadow: 0 0 5rem 0 rgba(90, 90, 90);
  color: white;
  cursor: pointer;
  width: 26rem;
  height: 4.5rem;
  overflow-y: hidden;
`;




export interface editedUserFields {
    id?: number,
    oldEmail: string,
    name: string,
    email: string,
    password: string,
    userRole: string,
}

interface EditUserFormProps {
    onSubmit: (user: editedUserFields) => void;
    onCancel: () => void;
    user: getUserApiResponse | undefined;
}
function EditUserForm(props: EditUserFormProps) {
    const [name, setName] = useState(props.user?.name ?? "");
    const [email, setEmail] = useState(props.user?.email ?? "");
    const [role, setRole] = useState(props.user?.userRole ?? "USER");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');


    function handleSubmit() {
        const editedUserValues: editedUserFields = {
            id: props.user?.id,
            oldEmail: props.user?.email ?? "",
            name: name,
            email: email,
            userRole: role,
            password: '',
        }
        props.onSubmit(editedUserValues);
    }
    function validateForm() {
        let isValid = true;
        if (name.length === 0) {
            setNameErr('Name is required');
            isValid = false;

        } else if(!isValidUsername(name)) {
            setNameErr("name must be lowercase and contain only letters");
        }
        if (email.length === 0) {
            setEmailErr('Email is required');
            isValid = false;

        } else if (!isValidEmail(email)) {
            setEmailErr('Invalid email address');
            isValid = false;
        }

        return isValid;
    }

    return (
        <form  onSubmit={(e)=> {
            if(validateForm()) {
                setEmailErr('');
                handleSubmit();
            }
            e.preventDefault();
        }}>
            <FormContainer>
                    <LargeText style={{marginTop: "2rem", marginBottom: "4rem", fontWeight: 700}}>Edit user</LargeText>
                <Label>Name</Label>
                <Input defaultValue={props?.user?.name ?? ""} onChange={(e)=> setName(e.target.value)}  type="text" name="name"/>
                {emailErr && <XSmallText style={{color: "red"}}>{nameErr}</XSmallText>}
                <Label>E-mail</Label>
                <Input defaultValue={props?.user?.email ?? ""}  onChange={(e)=> setEmail(e.target.value)}  type="email" name="email"/>
                {emailErr && <XSmallText style={{color: "red"}}>{emailErr}</XSmallText>}
                <MediumText style={{marginBottom: "1.2rem"}}>Role</MediumText>
                <FlexContainer style={{alignItems: "center"}}>
                    <input checked={role === "USER"} onClick={()=> setRole("USER")} type="checkbox" id="user" name="user" value="User"/>
                    <SmallText style={{marginLeft: ".8rem"}}>User</SmallText>

                </FlexContainer>
                <FlexContainer style={{alignItems: "center"}}>
                    <input checked={role === "ADMIN"} onClick={()=> setRole("ADMIN")}  type="checkbox" id="admin" name="admin" value="Admin"/>
                    <SmallText style={{marginLeft: ".8rem"}}>Admin</SmallText>
                </FlexContainer>

                <FlexContainer style={{ justifyContent: "space-between", marginTop: "2rem"}}>
                    <Button style={{boxShadow: "unset"}} type="submit" disabled={isSubmitting}>
                        {isSubmitting  ? 'Submitting': 'Submit'}
                    </Button>
                    <Button style={{backgroundColor: "black", boxShadow: "unset"}}  disabled={isSubmitting} onClick={props.onCancel}>
                        Cancel
                    </Button>
                </FlexContainer>
            </FormContainer>
        </form>
    )
}



export default EditUserForm;

