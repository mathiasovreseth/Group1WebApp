import React from 'react';
import {FlexContainer, LargeText} from "../styles/CommonStyles";
import styled from "styled-components";


const Container = styled(FlexContainer)`
  height: 90vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

function PageNotFound() {
    return (
      <Container>
          <LargeText>Page not found</LargeText>
      </Container>
    );
}
export default PageNotFound;