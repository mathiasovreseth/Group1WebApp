import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import heroImage from "../../assets/forstehjelp.jpg"

const HeroContainer = styled.div`
  min-width: 100rem;
  height: 60vw;
  background-size: cover;
  min-height: 42rem;
  max-height: 60rem;
  position: static;
  background-image: url(${heroImage});
  background-repeat: no-repeat;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    height: 40vw;
  }
`;

const H1 = styled.h1`
  padding: 1rem;
  color: white;
  margin-left: 8rem;
  margin-top: 8rem;
  margin-bottom: 4rem;
  width: 50rem;
  background-color: rgba(0,0,0,0.4);
  border-radius: ${props => `${props.theme.borderRadius}`};
  font-size: ${props => `${props.theme.fontSizes.xLarge}`};
  position: static;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    width: 30rem;
    font-size: ${props => `${props.theme.fontSizes.large}`};
  }

`;

const Button = styled.button`
  position: static;
  margin-left: 8rem;
  border: 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
  font-size: ${props => `${props.theme.fontSizes.large}`};
  padding: 1.5rem 2rem;
  background-color: ${props => `${props.theme.palette.primary.accentColor}`};
  box-shadow: 0 0 5rem 0 rgba(90, 90, 90);
  color: white;
  cursor: pointer;
`;



function HeroSection() {
    return <HeroContainer>
        <H1>We value every live. <br/> 
        Serving anyone without <br/> 
        exceptions is our goal. <br/> 
        We care for people.</H1>
        <Link to={"/product_page"}>
          <Button>Book your training</Button>
        </Link>
        
    </HeroContainer>;
}

export default HeroSection;
