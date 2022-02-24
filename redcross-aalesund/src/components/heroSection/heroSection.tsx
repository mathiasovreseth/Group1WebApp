import React from "react";
import styled from "styled-components";

const OuterContainer = styled.div`
  min-width: 100rem;
  height: 20vw;
  border: 1px solid black;
  background-size: 100%;
  min-height: 42rem;
  max-height: 60rem;
  position: relative;
  background-color: white;
`;

const H1 = styled.h1`
    color: black;
`;

const Button = styled.button`
  color: red;
`;

function HeroSection() {
    return <OuterContainer id={"hero-section"}>
        <H1>Lorem Ipsum</H1>
        <Button>Book your training</Button>
    </OuterContainer>;
}

export default HeroSection;
