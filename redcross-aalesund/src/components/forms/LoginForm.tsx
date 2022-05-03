import {
    FlexColumnContainer,

    Input,
    LargeText,

    XSmallText
} from "../../styles/CommonStyles";
import React, {useState} from "react";
import styled from "styled-components";
import {isValidEmail, isValidPassword, isValidUsername} from "../../utils/FormValidation";
import {useLocation, useNavigate} from "react-router-dom";
import {User} from "../../models/UserModel";
import {useAuth} from "../../auth/Auth";

const FormContainer = styled(FlexColumnContainer)`
  background-color: ${props => `${props.theme.palette.primary.background}`};
  border-radius: ${props => `${props.theme.borderRadius}`};
  box-shadow: 0 0 2rem 0 rgba(90, 90, 90);
  padding: 0 4.4rem 6.6rem 4.4rem;
  position: absolute;
  top: 30%;
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

const OuterContainer = styled(FlexColumnContainer)`
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;
  position: relative;
  
`
/** Login Form.
 * Didn't figure out how to use the auth hook here. So had to rewrite the loginForm.
 * That is why it is so different stuctured than registration form
 */
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailErr, setEmailErr] = useState('');
    const [passErr, setPassErr] = useState('');
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();


    function handleSubmit() {
        setIsSubmitting(true);
        // @ts-ignore
        let from = location?.state?.from?.pathname ?? "/";
        let user: User = {
            email: email,
            password: password
        };
        auth.signIn(user).then(res => {
            // navigate to page the user previously was on
            navigate(from, { replace: true });
        }).catch(err => {
            // display error message if login failed
            setPassErr(err);
        });
    }
    function validateForm() {
        let isValid = true;
        if (email.length === 0) {
            setEmailErr('Required');
            isValid = false;

        } else if (!isValidEmail(email)) {
            setEmailErr('Invalid email address');
            isValid = false;
        }
        if(password.length === 0) {
            setPassErr('Required');
            isValid = false;

        } else if(!isValidPassword(password)) {
            setPassErr('Password must be 6 characters or more');
            isValid = false;
        }
        return isValid;
    }
    return (
        <form  onSubmit={(e)=> {
            if(validateForm()) {
                setEmailErr('');
                setPassErr('');
                handleSubmit();
            }
            e.preventDefault();
        }}>
            <OuterContainer>
                <FormContainer>
                    <LargeText style={{marginTop: "2rem", marginBottom: "4rem"}}>Login</LargeText>
                    <Label>E-mail</Label>
                    <Input onChange={(e)=> setEmail(e.target.value)}  type="email" name="email"/>
                    {emailErr && <XSmallText style={{color: "red"}}>{emailErr}</XSmallText>}
                    <Label>Password</Label>
                    <Input onChange={(e)=> setPassword(e.target.value)} type="password" name="password"/>
                    {passErr && <XSmallText style={{color: "red"}}>{passErr}</XSmallText>}
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting  ? 'Submitting': 'Submit'}
                    </Button>
                </FormContainer>


            </OuterContainer>
        </form>
    )
}



export default LoginForm;

