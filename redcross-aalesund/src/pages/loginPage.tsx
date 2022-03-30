import {FlexColumnContainer, FlexContainer, LargeText, MediumText, SmallText} from "../styles/commonStyles";
import React, {useEffect} from "react";
import styled from "styled-components";


const Container = styled(FlexColumnContainer)`
  width: 100vw;
  height: 60vh;
  align-items: center;
  justify-content: center;

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
`;

const Input = styled.input`
  border-radius: ${props => `${props.theme.borderRadius}`};
  width: 26rem;
  height: 4rem;
  padding: .25rem .25rem;
  font-size: ${props => `${props.theme.fontSizes.medium}`};;
`;



function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [statusMessage, setStatusMessage] = React.useState('');



    // replace with correct url
    function handleLogin() {
        console.log("test");
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
            }
            return response.json();
        }).then((data) => {
            // set token in localstorage
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('role', data.roles[0]);

        }).catch((error) => {
            console.log("Nice man");

            setStatusMessage('Wrong email or password');
        });
    }

    return (
        <form onSubmit={(e) => {
            handleLogin();
            e.preventDefault();
        }}>
            <Container>
                <FlexColumnContainer>
                    <SmallText>E-mail:</SmallText>
                    <Input type={'e-mail'} value={email} onChange={(e) => setEmail(e.target.value)}/>
                </FlexColumnContainer>

                <FlexColumnContainer style={{marginTop: '1rem'}}>
                    <SmallText>Password:</SmallText>
                    <Input type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FlexColumnContainer>

                <FlexContainer style={{marginTop: '1rem', justifyContent: 'flex-end'}}>
                    <Button type={'submit'}>
                        Login
                    </Button>
                </FlexContainer>
                {statusMessage != null &&
                <MediumText style={{marginTop: '.5em', color: 'red'}}>{statusMessage}</MediumText>
                }
            </Container>
        </form>
    )
}

export default LoginPage