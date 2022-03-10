import React from 'react';
import styled from "styled-components";
import MyDropDownMenu from "../buttons/dropdownMenu";

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  padding: 0 4rem;

  @media (max-width: 25em) {
    padding: 0 1.6rem;
    }
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
    @media (max-width: 50em) {
      display: none;
    }
`
// make this  a link button or sometghin instead of h2
const LinkElement = styled.h2`
    font-size: 1.8rem;
    margin-right: 6rem;
   `;
// make this a link button or sometghin instead of h2
const LogInButton = styled.h2`
   font-size: 1.8rem;
   margin-left: 1.6rem;
`

const RightSection = styled.div`
    display: flex;
    align-items: center;
`;

const DropDownMenuContainer = styled.div `
  display: none;
  @media (max-width: 50em) {
    display: block;
  }
`;



function Header() {
    const options = [
        'About us', 'Community', 'Company'
    ];
    const defaultOption = options[0];
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

            <RightSection>
                <DropDownMenuContainer>
                    <MyDropDownMenu/>
                </DropDownMenuContainer>
                <LogInButton>Log in</LogInButton>
            </RightSection>


        </HeaderContainer>
    );
}
export default Header;