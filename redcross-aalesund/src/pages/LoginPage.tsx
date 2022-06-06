import React from "react";
import styled from "styled-components";

import LoginForm from "../components/forms/LoginForm";
import { FlexColumnContainer } from "../styles/CommonStyles";

const OuterContainer = styled(FlexColumnContainer)`
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;
  position: relative;
  
`




// do http requests here
function LoginPage(props:any) {

    return (
    <OuterContainer>
    <LoginForm shouldRedirect={true}/>
    </OuterContainer>
    )
}

export default LoginPage