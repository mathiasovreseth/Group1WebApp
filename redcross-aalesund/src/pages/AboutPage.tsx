
import React from "react";
import {FlexColumnContainer, FlexContainer, H1, LargeText, MediumText} from "../styles/CommonStyles";
import styled from "styled-components";
import { FaSquare} from "react-icons/fa";
import groupImg from '../assets/gruppebilde2.jpg';

const Container = styled(FlexContainer)`
    margin: 10rem 10rem;
    flex-wrap: wrap;
    justify-content: center;
    flex-shrink: 0;
  @media (max-width:  ${props => `${props.theme.breakPoints.tablet}`}) {
    margin: 10rem 2rem;
  }
`
const Section = styled(FlexColumnContainer)`
    width: 50rem;
    justify-content: flex-start;
    
`;

const Title = styled(H1)`
  margin-bottom: 1.8rem;
  margin-left: 0;
  overflow: visible;
  text-align: start;
`;
const MediumTitle = styled(LargeText)`
  color:  ${props => `${props.theme.palette.primary.accentColor}`};
  font-weight: bold;
  margin-bottom: 1.6rem;
`
const Li = styled.li`
  display: flex;
  list-style: square;
  align-items: center;
  margin-bottom: 1.2rem;
  white-space: nowrap;
  font-size: ${props => `${props.theme.fontSizes.small}`};
  @media (max-width:  560px) {
    white-space: normal;
    align-items: center;
    line-height: normal;
   
  }
`;

const Image = styled.img`
  object-fit: cover;
  border-radius: ${props => `${props.theme.borderRadius}`};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const AboutPage = () => {
    return (
        <Container>
            <Section style={{marginRight: "5rem", marginBottom: "2rem"}}>
                <Title>Om Røde Kors Ålesund</Title>
                <MediumText style={{marginBottom: "1.2rem"}}>Our team consists of medical professionals with more than 30 years of experience. We are certified
                    according to ISO 8072 and DNV 23:786.</MediumText>
                <ul style={{marginBottom: "1.2rem", listStyle: "square"}}>
                    <Li><FaSquare style={{marginRight:".8rem"}}/>Provide courses for industrial HMS responsibles for 12 years</Li>
                    <Li><FaSquare style={{marginRight:".8rem"}}/>3000 customers from 6 different countries</Li>
                    {/* <Li><FaSquare style={{marginRight:".8rem"}}/>Lorem ipsum fanterier Lorem ipsum fanterier Lorem ipsum fanterier</Li> */}
                </ul>
                <MediumTitle>Kontakt</MediumTitle>
                <ul>
                    <Li>Phone number: 993 11 389</Li>
                    <Li>Email: aalesund@rodekors.org</Li>
                    <Li>Adress: Keiser Wilhelmsgt. 68, 6003 ÅLESUND</Li>
                </ul>
            </Section>
            <Section>
                <Image src={groupImg}/>
            </Section>
        </Container>
    );
}
export default AboutPage;