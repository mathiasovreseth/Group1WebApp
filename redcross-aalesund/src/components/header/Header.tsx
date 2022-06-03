import React, {useContext, useEffect, useState} from 'react';
import styled, {DefaultTheme, ThemeContext, ThemeProps, ThemeProvider, useTheme} from "styled-components";
import MyDropDownMenu from "../buttons/DropdownMenu";
import {LargeText, Li, MediumText, XSmallText} from "../../styles/CommonStyles";
import redCrossImage from "../../assets/red-cross-image.png";
import {Link} from "react-router-dom";
import {defaultTheme} from "../../styles/Theme";
import {useAuth} from "../../auth/Auth";
import TextButton from "../buttons/TextButton";
import {FaBars, FaShoppingBag, FaShoppingBasket, FaShoppingCart} from "react-icons/fa";

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

const LogInText = styled(MediumText)`
  font-size: ${props => `${props.theme.fontSizes.medium}`};
  margin-left: 1.6rem;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const ShoppingCartContainer = styled.div`
  margin-right: .8rem;
  height: 4rem;
  width: 4rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: visible;
  :hover {
    cursor: pointer;
  }
`;

const ShoppingItemCount = styled.div`
    height: 2rem;
    width: 2rem;
    position: absolute;
    display: flex;
   justify-content: center;
  align-items: center;
    z-index: 6;
    top: .1rem;
    right: .5rem;
    border-radius: 50%;
    overflow: visible;
    background-color:  ${props => `${props.theme.palette.primary.accentColor}`};
`;

const DropDownMenuContainer = styled.div`
  display: none;
  @media (max-width: ${props => `${props.theme.breakPoints.tablet}`}) {
    display: block;
  }
`;

const linkStyle = {
  margin: "0rem",
  textDecoration: "none",
  color: 'black'
};
interface HeaderProps  {
    shoppingCartItem: string;
}
function Header( ) {
    const auth = useAuth();
    const theme = useTheme();
    const [url, setUrl] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [hasProductInCart, setHasProductInCart] = useState(false);

    useEffect(()=> {
        const urlSplitted = window.location.href.split("/");
        setUrl(urlSplitted[urlSplitted.length -1]);
    },)

    useEffect(()=> {
        if(localStorage.getItem("courseBooking")) {
            setHasProductInCart(true);
        } else {
            setHasProductInCart(false);
        }
    }, []);

    window.addEventListener('storage', (event) => {
        console.log("heisann");
        if(localStorage.getItem("courseBooking")) {
             setHasProductInCart(true);
         } else {
             setHasProductInCart(false);
         }

    });


    return (
        <HeaderContainer>
            <Link to='/'>
                <LeftSection>
                    <RedCrossImage src={redCrossImage} alt={'Red cross'}/>
                    <LargeText>Røde kors</LargeText>
                </LeftSection>
            </Link>
            <Center>
                <Link to='/about' onClick={()=> setSelectedIndex(0)}>
                    <MediumText style={{color: url == "about" ? theme.palette.primary.accentColor: "inherit"}}>About us</MediumText>
                </Link>
                <Link to='/questions' onClick={()=> setSelectedIndex(1)}>
                    <MediumText style={{color: url == "questions" ? theme.palette.primary.accentColor: "inherit"}}>Ask us a question</MediumText>
                </Link>
                <Link to='/ethics' onClick={()=> setSelectedIndex(2)}>
                    <MediumText style={{color: url == "ethics" ? theme.palette.primary.accentColor: "inherit"}}>Ethics</MediumText>
                </Link>
            </Center>

            <RightSection>
                <DropDownMenuContainer>
                    <MyDropDownMenu/>
                </DropDownMenuContainer>
                <Link to={"/shopping-cart"}>
                    <ShoppingCartContainer>
                        <FaShoppingCart style={{fontSize: "2.2rem"}}/>
                        {hasProductInCart &&
                            <ShoppingItemCount>
                                <XSmallText style={{color: "#fff"}}>1</XSmallText>
                            </ShoppingItemCount>
                        }
                    </ShoppingCartContainer>
                </Link>
                {auth.isAuthenticated ?
                    <TextButton style={{marginLeft:"1.6rem" }} onClick={()=> auth.signOut()} label={"Sign out"}/> :
                    <Link to={"/login"}>
                        <LogInText style={{color: url == "login" ? theme.palette.primary.accentColor: "inherit"}}>Log in</LogInText>
                    </Link>
                }
            </RightSection>


        </HeaderContainer>
    );
}

export default Header;