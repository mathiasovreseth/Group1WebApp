import {
    FlexColumnContainer,

    FlexContainer,

    Input,
    LargeText, SmallText,

    XSmallText
} from "../../styles/CommonStyles";
import React, {useState} from "react";
import styled from "styled-components";
import {isValidEmail, isValidPassword, isValidUsername} from "../../utils/FormValidation";
import {getUserApiResponse} from "../../models/UserModel";

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
  margin-top: 2rem;
  background-color: ${props => `${props.theme.palette.primary.accentColor}`};
  box-shadow: 0 0 5rem 0 rgba(90, 90, 90);
  color: white;
  cursor: pointer;
  width: 26rem;
  height: 4.5rem;
  overflow-y: hidden;
`;


const Label = styled.label`
  font-size: ${props => `${props.theme.fontSizes.medium}`};;
  margin-bottom: 0.8rem;
`

export interface editedUserFields {
    id?: number,
    oldEmail: string,
    name: string,
    email: string,
    password: string,
}

interface EditUserFormProps {
    onSubmit: (user: editedUserFields) => void;
    onCancel: () => void;
    user: getUserApiResponse | undefined;
}
function EditUserForm(props: EditUserFormProps) {
    const [name, setName] = useState(props.user?.name ?? "");
    const [email, setEmail] = useState(props.user?.email ?? "");
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');


    function handleSubmit() {
        const editedUserValues: editedUserFields = {
            id: props.user?.id,
            oldEmail: props.user?.email ?? "",
            name: name,
            email: email,
            password: password,
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
                    <LargeText style={{marginTop: "2rem", marginBottom: "4rem"}}>Register</LargeText>
                <Label>Name</Label>
                <Input defaultValue={props?.user?.name ?? ""} onChange={(e)=> setName(e.target.value)}  type="text" name="name"/>
                {emailErr && <XSmallText style={{color: "red"}}>{nameErr}</XSmallText>}
                <Label>E-mail</Label>
                <Input defaultValue={props?.user?.email ?? ""}  onChange={(e)=> setEmail(e.target.value)}  type="email" name="email"/>
                {emailErr && <XSmallText style={{color: "red"}}>{emailErr}</XSmallText>}
                <Label>Password</Label>
                <Input onChange={(e)=> setPassword(e.target.value)} type="password" name="password"/>
                <FlexContainer style={{ justifyContent: "space-between"}}>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting  ? 'Submitting': 'Submit'}
                    </Button>
                    <Button style={{backgroundColor: "black"}}  disabled={isSubmitting} onClick={props.onCancel}>
                        Cancel
                    </Button>
                </FlexContainer>





            </FormContainer>
        </form>
    )
}



export default EditUserForm;

