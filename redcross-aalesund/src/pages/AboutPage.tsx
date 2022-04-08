
import React from "react";
import {FlexColumnContainer, FlexContainer, LargeText, MediumText, xLargeText} from "../styles/CommonStyles";
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
    
`;

const Title = styled(xLargeText)`
    color:  ${props => `${props.theme.palette.primary.accentColor}`};
  margin-bottom: 1.8rem;
`;
const MediumTitle = styled(LargeText)`
  color:  ${props => `${props.theme.palette.primary.accentColor}`};
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
const MapImg = styled.img`
   object-fit: cover;
  
`;
const AboutPage = () => {
    return (
        <Container>
            <Section style={{marginRight: "5rem", marginBottom: "2rem"}}>
                <Title>Om Røde Kors Ålesund</Title>
                <MediumText style={{marginBottom: "1.2rem"}}>Our team consists of medical professionals with more than 30 years of experience. We are certified
                    according to ISO 8072 and DNV 23:786.</MediumText>
                <ul style={{marginBottom: "1.2rem", listStyle: "square"}}>
                    <Li><FaSquare style={{marginRight:".8rem"}}/>Lorem ipsum fanterier Lorem ipsum fanterier Lorem ipsum fanterier</Li>
                    <Li><FaSquare style={{marginRight:".8rem"}}/>Lorem ipsum fanterier Lorem ipsum fanterier Lorem ipsum fanterier</Li>
                    <Li><FaSquare style={{marginRight:".8rem"}}/>Lorem ipsum fanterier Lorem ipsum fanterier Lorem ipsum fanterier</Li>
                </ul>
                <MediumTitle>Kontakt</MediumTitle>
                <ul>
                    <Li>Phone number: 993 11 389</Li>
                    <Li>Email: aalesund@rodekors.org</Li>
                    <Li>Adress: Keiser Wilhelmsgt. 68, 6003 ÅLESUND</Li>
                </ul>
            </Section>
            <Section>
                <MapImg src={groupImg}/>
            </Section>
        </Container>
    );
}
export default AboutPage;