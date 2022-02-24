import React from 'react';
import styled from "styled-components";
const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4rem;
    height: 6rem;
`
const LeftSection = styled.div`
   display: flex;
  align-items: center;
`
const RedCrossImage = styled.img`
    height: 5rem;
    margin-right: 1.2rem;
`;
const Center = styled.div`
    display: flex;
`
// make this  a link button or sometghin instead of h2
const LinkElement = styled.h2`
   font-size: 1.8rem;
    margin-right: 6rem;
   `;
// make this a link button or sometghin instead of h2
const LogInButton = styled.h2`
   font-size: 1.8rem;
`

function Header() {
    return(
        <HeaderContainer>
            <LeftSection>
                <RedCrossImage src={'red-cross-logo.png'} alt={'Red cross'}/>
                <h1 style={{fontSize: '2.4rem'}}>Røde kors</h1>
            </LeftSection>
            <Center>
                <LinkElement>About us</LinkElement>
                <LinkElement>Community</LinkElement>
                <LinkElement>Company</LinkElement>
            </Center>
            <LogInButton>Log in</LogInButton>


        </HeaderContainer>
    );
}
export default Header;