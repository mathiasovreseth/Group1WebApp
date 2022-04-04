import React from "react";
import styled from "styled-components";
import heroImage from "../../assets/forstehjelp.jpg"

const HeroContainer = styled.div`
  min-width: 100rem;
  height: 60vw;
  background-size: 100%;
  min-height: 42rem;
  max-height: 60rem;
  position: relative;
  background-image: url(${heroImage});
  background-repeat: no-repeat;
`;

const H1 = styled.h1`
  color: white;
  background-color: rgba(0,0,0,0.4);;
  font-size: ${props => `${props.theme.fontSizes.xLarge}`};
  font-weight: normal;
  margin: 10% 8rem;
  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 60em) {
    font-size: ${props => `${props.theme.fontSizes.large}`};
  }

  @media (max-width: 47em) {
    font-size: 2rem;
  }
`;

const Button = styled.button`
  position: absolute;
  margin-left: 8rem;
  margin-top: 25%;
  border: 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
  font-size: ${props => `${props.theme.fontSizes.large}`};
  padding: 1.5rem 2rem;
  background-color: ${props => `${props.theme.palette.primary.accentColor}`};
  box-shadow: 0 0 5rem 0 rgba(90, 90, 90);
  top: 0;
  left: 0;
  color: white;
  cursor: pointer;
`;



function HeroSection() {
    return <HeroContainer>
        <H1>We value every live. <br/> Serving anyone without exceptions is our goal. <br/> We care for people.</H1>
        <Button>Book your training</Button>
    </HeroContainer>;
}

export default HeroSection;
