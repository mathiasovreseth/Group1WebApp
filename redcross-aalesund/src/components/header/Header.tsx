import React, {useContext} from 'react';
import styled, {DefaultTheme, ThemeContext, ThemeProps, ThemeProvider} from "styled-components";
import MyDropDownMenu from "../buttons/DropdownMenu";
import {LargeText, Li, MediumText} from "../../styles/CommonStyles";
import redCrossImage from "../../assets/red-cross-image.png";
import {Link} from "react-router-dom";
import {defaultTheme} from "../../styles/Theme";

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
  height: 4rem;
  margin-right: 1.6rem;
`;
const Center = styled.div`
  display: flex;
  width: 42rem;
  justify-content: space-between;
  @media (max-width: ${props => `${props.theme.breakPoints.tablet}`}) {
    display: none;
  }
`

const LogInButton = styled(MediumText)`
  font-size: ${props => `${props.theme.fontSizes.medium}`};
  margin-left: 1.6rem;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const DropDownMenuContainer = styled.div`
  display: none;
  @media (max-width: ${props => `${props.theme.breakPoints.tablet}`}) {
    display: block;
  }
`;


function Header() {
    return (
        <HeaderContainer>
            <LeftSection>
                <RedCrossImage src={redCrossImage} alt={'Red cross'}/>
                <LargeText>Røde kors</LargeText>
            </LeftSection>
            <Center>
                <Link to='/about'>
                    <MediumText>About us</MediumText>
                </Link>
                <Link to='/community'>
                    <MediumText>Community</MediumText>
                </Link>
                <Link to='/company'>
                    <MediumText>Company</MediumText>
                </Link>
            </Center>

            <RightSection>
                <DropDownMenuContainer>
                    <MyDropDownMenu/>
                </DropDownMenuContainer>
                <Link to={"/login"}>
                    <LogInButton>Log in</LogInButton>
                </Link>
                <Link to={"/registration"}>
                    <LogInButton>Registration</LogInButton>
                </Link>
            </RightSection>


        </HeaderContainer>
    );
}

export default Header;