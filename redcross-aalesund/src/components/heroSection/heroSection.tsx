import React from "react";
import styled from "styled-components";
import heroImage from "../../assets/forstehjelp.jpg"

const OuterContainer = styled.div`
  min-width: 100rem;
  height: 60vw;
  border: 1px solid black;
  background-size: 100%;
  min-height: 42rem;
  max-height: 60rem;
  position: relative;
  background-image: url(${heroImage});
`;

const H1 = styled.h1`
  color: black;
  font-size: 4.8rem;
  font-weight: normal;
  margin: 10% 8rem;
  position: absolute;
  top: 0;
  left: 0;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 8rem;
  margin-top: 28%;
  font-size: 2.4rem;
  padding: 1.5rem 2rem;
`;

function HeroSection() {
    return <OuterContainer id={"hero-section"}>
        <H1>Lorem Ipsum</H1>
        <Button>Book your training</Button>
    </OuterContainer>;
}

export default HeroSection;
