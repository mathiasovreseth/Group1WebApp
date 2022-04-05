import {FlexColumnContainer, FlexContainer, Input, LargeText, MediumText, SmallText} from "../styles/commonStyles";
import React, {useEffect} from "react";
import styled, {css} from "styled-components";
import img from "../assets/rosemarkering.jpg"
import ClipLoader from "react-spinners/ClipLoader";



const FormContainer = styled(FlexColumnContainer)`
  background-color: ${props => `${props.theme.palette.primary.background}`};
  border-radius: ${props => `${props.theme.borderRadius}`};
  box-shadow: 0 0 2rem 0 rgba(90, 90, 90);
  padding: 6.6rem 4.4rem;
  position: absolute;
  top: 30%;
`;

const ImgCont = styled.div`
    background-image:  url(${img});
  width: 100vw;
  height: 90vh;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  opacity: .8;
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



const OuterContainer = styled(FlexColumnContainer)`
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;
  position: relative;
  
`


function LoginPage(props:any) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [statusMessage, setStatusMessage] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);



    // replace with correct url
    function handleLogin() {
        setIsSubmitting(true);
        const request = new Request("http://localhost:8080/auth/login", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        fetch(request).then(response => {
            if (response.status === 401 || response.status === 403) {
                // not authorized
                setStatusMessage("Invalid login")
                setIsSubmitting(false);

            }
            return response.json();
        }).then((data) => {
            // set token in localstorage
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('role', data.roles[0]);
            setIsSubmitting(false);

        }).catch((error) => {
            console.log("Nice man");
            setStatusMessage('Wrong email or password');
            setIsSubmitting(false);
        });
    }

    return (
        <OuterContainer>
            <ImgCont/>
            <FormContainer>
                <form onSubmit={(e) => {
            handleLogin();
            e.preventDefault();
        }}>
                <FlexColumnContainer>
                    <SmallText>E-mail:</SmallText>
                    <Input type={'e-mail'} value={email} onChange={(e) => setEmail(e.target.value)}/>
                </FlexColumnContainer>

                <FlexColumnContainer style={{marginTop: '1rem'}}>
                    <SmallText>Password:</SmallText>
                    <Input type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FlexColumnContainer>

                <FlexContainer style={{marginTop: '1rem', justifyContent: 'flex-end'}}>
                    <Button disabled={isSubmitting} type={'submit'}>
                        {isSubmitting ?
                            <ClipLoader color={'white'} loading={isSubmitting}  size={30} />:
                            <MediumText>Login</MediumText>
                        }
                    </Button>
                </FlexContainer>
                {statusMessage != null &&
                <MediumText style={{marginTop: '.5em', color: 'red'}}>{statusMessage}</MediumText>
                }
        </form>
            </FormContainer>

        </OuterContainer>
    )
}

export default LoginPage