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

const Button = styled.button`
  color: red;
`;

function HeroSection() {
    return <OuterContainer id={"hero-section"}>Harry Maguire
        <Button>Book your training</Button>
    </OuterContainer>;
}

export default HeroSection;
