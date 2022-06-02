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
const MapImg = styled.img`
  object-fit: cover;
`;
const Terms = () => {
  return (
    <Container>
      <Section style={{ marginRight: "5rem", marginBottom: "2rem" }}>
        <H1>Terms</H1>
        <MediumText style={{ marginBottom: "1.2rem" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac
          tincidunt est. Proin in turpis sed tortor laoreet egestas in et felis.
          Aliquam semper nibh pulvinar egestas pulvinar. Pellentesque luctus
          tempus lorem ac commodo. Aliquam dapibus mauris in quam lobortis
          consequat. Nullam dignissim pulvinar ullamcorper.{" "}
        </MediumText>
        <ul style={{ marginBottom: "1.2rem", listStyle: "square" }}>
          <Li>
            <FaSquare style={{ marginRight: ".8rem" }} />
            Maecenas fringilla venenatis elit ac maximus.
          </Li>
          <Li>
            <FaSquare style={{ marginRight: ".8rem" }} />
            Nunc id placerat felis. Donec sapien mauris, 
          </Li>
          {/* <Li><FaSquare style={{marginRight:".8rem"}}/>Lorem ipsum fanterier Lorem ipsum fanterier Lorem ipsum fanterier</Li> */}
        </ul>
      </Section>
      <Section>
        <MapImg src={groupImg} />
      </Section>
    </Container>
  );
};
export default Terms;
