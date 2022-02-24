import React from "react";
import styled from "styled-components";

const OuterContainer = styled.div`
  color: red;
  font-size: 3.6rem;
`;

function HeroSection() {
  return <OuterContainer id={"hero-section"}>Harry Maguire</OuterContainer>;
}

export default HeroSection;
