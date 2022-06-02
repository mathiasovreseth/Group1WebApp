import React from "react";
import {
  FlexColumnContainer,
  FlexContainer,
  H1,
  LargeText,
  MediumText,
} from "../styles/CommonStyles";
import styled from "styled-components";
import { FaSquare } from "react-icons/fa";
import groupImg from "../assets/gruppebilde2.jpg";

const Container = styled(FlexContainer)`
  margin: 10rem 10rem;
  flex-wrap: wrap;
  justify-content: center;
  flex-shrink: 0;
  @media (max-width: ${(props) => `${props.theme.breakPoints.tablet}`}) {
    margin: 10rem 2rem;
  }
`;
const Section = styled(FlexColumnContainer)`
  width: 50rem;
`;

const Title = styled(H1)`
  margin-bottom: 1.8rem;
`;
const MediumTitle = styled(LargeText)`
  color: ${(props) => `${props.theme.palette.primary.accentColor}`};
  font-weight: bold;
  margin-bottom: 1.6rem;
`;
const Li = styled.li`
  display: flex;
  list-style: square;
  align-items: center;
  margin-bottom: 1.2rem;
  white-space: nowrap;
  font-size: ${(props) => `${props.theme.fontSizes.small}`};
  @media (max-width: 560px) {
    white-space: normal;
    align-items: center;
    line-height: normal;
  }
`;

const Ethics = () => {
  return (
    <Container>
      <Section style={{ marginRight: "5rem", marginBottom: "2rem" }}>
        <Title>Code of medical ethics</Title>
        <MediumText style={{ marginBottom: "1.2rem" }}>
          In hac habitasse platea dictumst. Quisque at orci ligula. Sed iaculis
          facilisis pellentesque. Nulla et mauris tempor, convallis enim ac,
          laoreet turpis. Phasellus id mi quis nunc tristique molestie.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Duis nec velit lorem. Nam sed lacinia nunc
        </MediumText>
      </Section>
      <Section></Section>
    </Container>
  );
};
export default Ethics;
