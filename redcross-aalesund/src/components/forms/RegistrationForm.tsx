import * as React from 'react';

import {
    FlexColumnContainer, Input, Label, LargeText, SmallText,
    XSmallText
} from "../../styles/CommonStyles";
import styled from "styled-components";
import {isValidEmail, isValidPassword, isValidUsername} from '../../utils/FormValidation';
import {ToastContainer, toast} from 'react-toastify';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {useAuth} from '../../auth/Auth';
import {UserRegistrationFormValues} from "../../models/UserModel";

const Button = styled.button`
  border: 0;
  margin-top: 2rem;
  border-radius: ${props => `${props.theme.borderRadius}`};
  font-size: ${props => `${props.theme.fontSizes.large}`};
  padding: 1rem 0;
  background-color: ${props => `${props.theme.palette.primary.accentColor}`};
  box-shadow: 0 0 2rem 0 rgba(90, 90, 90);
  color: white;
  cursor: pointer;
`;

const FormContainer = styled(FlexColumnContainer)`
  background-color: ${props => `${props.theme.palette.primary.background}`};
  border-radius: ${props => `${props.theme.borderRadius}`};
  box-shadow: 0 0 1.5rem 0 rgba(90, 90, 90);
  padding: 0 4.4rem 6.6rem 4.4rem;
  width: 40rem;
`;
const Container = styled(FlexColumnContainer)`
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;

`;
const OuterContainer = styled(FlexColumnContainer)`
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;
  position: relative;

`

function RegistrationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();


    function handleSubmit() {
        setIsSubmitting(true);
        const formValues: UserRegistrationFormValues = {
            name: name,
            email: email,
            password: password,
        }
        auth.signUp(formValues).then(res => {
            setIsSubmitting(false);
            toast.success('Account created!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                bodyStyle: {fontSize: "3.2rem"},
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => navigate("/login")
            });
        }).catch((err) => {
            setPassErr(err);
            setIsSubmitting(false);
        });

    }

    function validateForm() {
        let isValid = true;
        if (name.length === 0) {
            setNameErr('Name is required');
            isValid = false;

        } else if (!isValidUsername(name)) {
            setNameErr("name must be lowercase and contain only letters");
        }
        if (email.length === 0) {
            setEmailErr('Email is required');
            isValid = false;

        } else if (!isValidEmail(email)) {
            setEmailErr('Invalid email address');
            isValid = false;
        }
        if (password.length === 0) {
            setPassErr('Password is required');
            isValid = false;

        } else if (!isValidPassword(password)) {
            setPassErr('Password must be 6 characters or more');
            isValid = false;
        }
        return isValid;
    }

    return (
        <form onSubmit={(e) => {
            if (validateForm()) {
                setEmailErr('');
                setNameErr('');
                setPassErr('');
                handleSubmit();
            }
            e.preventDefault();
        }}>

            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                style={{overflowY: "hidden"}}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <OuterContainer>

                <FormContainer>
                    <LargeText style={{marginTop: "2rem", marginBottom: "4rem", fontWeight: 700}}>Register</LargeText>
                    <Label>Name</Label>
                    <Input onChange={(e) => setName(e.target.value)} type="text" name="name"/>
                    {emailErr && <XSmallText style={{color: "red"}}>{nameErr}</XSmallText>}
                    <Label>E-mail</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email"/>
                    {emailErr && <XSmallText style={{color: "red"}}>{emailErr}</XSmallText>}
                    <Label>Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password"/>
                    {passErr && <XSmallText style={{color: "red"}}>{passErr}</XSmallText>}
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting' : 'Submit'}
                    </Button>

                    <SmallText style={{marginTop: "2rem", display: "flex", flexWrap: "wrap"}}>
                        <SmallText style={{opacity: 0.7}}>By creating an account you agree to our </SmallText> <Link
                        to={"/privacy-policy"}> <SmallText>Privacy Policy</SmallText></Link>
                        <SmallText style={{opacity: 0.7, margin: "0 .2rem"}}>and </SmallText> <Link
                        to={"/terms-of-service"}> <SmallText>Terms of Service</SmallText></Link>
                    </SmallText>
                    <SmallText style={{display: "flex", marginTop: "2rem"}}>
                        <SmallText style={{opacity: 0.7, marginRight: "0.4rem"}}>
                            Already have an account?
                        </SmallText>
                        <Link to={"/login"}>
                            <SmallText>Log in</SmallText>
                        </Link>
                    </SmallText>
                </FormContainer>
            </OuterContainer>
        </form>
    )
}


export default RegistrationForm;


