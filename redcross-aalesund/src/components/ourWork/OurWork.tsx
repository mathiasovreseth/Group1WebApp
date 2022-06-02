import React from "react";
import styled from "styled-components";
import FieldDuty from "../../assets/FieldDuty.jpg";
import Frivillig from "../../assets/Frivillig.jpg";
import { H1 } from "../../styles/CommonStyles";


const H2 = styled.h2`
  font-size: ${props => `${props.theme.fontSizes.large}`};
  font-weight: bold;
  padding-top: 1rem;
  margin: 2rem;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    font-size: ${props => `${props.theme.fontSizes.medium}`};
  }
`;

const Paragraph = styled.p`
  font-size: ${props => `${props.theme.fontSizes.medium}`};
  margin: 2rem;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    font-size: ${props => `${props.theme.fontSizes.small}`};
  }
  
`;

const Image = styled.img`
  flex-shrink: 0; 
  height: 20rem;
  width: 30rem;
  vertical-align: middle;
  margin: 2rem;
  border-radius: ${props => `${props.theme.borderRadius}`};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {  
    width: 22.5rem;
    height: 15rem;
  } ;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.phone}`}) {  
  } ;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.phone}`}) {  
    flex-wrap: wrap;
  } ;
`;

const ContainerReverse = styled(Container)`
  @media screen and (max-width: ${props => `${props.theme.breakPoints.phone}`}) {  
      flex-wrap: wrap-reverse;
    } ;
`;

const TextContainer = styled.div`
`;

function OurWork() {
  return (
    <>
      <H1>Our work</H1>
      <Container>
        <Image src={Frivillig} alt="image" />
        <TextContainer>
          <H2>Vårt arbeid i Norge</H2>
          <Paragraph>
            Røde Kors har lokalforeninger over hele landet. Vi er en
            medlemsorganisasjon hvor du kan melde deg inn som medlem i din
            lokale Røde Kors forening. Samtidig er organisasjonen en
            verdensomspennende bevegelse med et stort nettverk av frivillige
            hjelpere.
          </Paragraph>
        </TextContainer>
      </Container>
      <ContainerReverse>
        <TextContainer>
          <H2>Vårt arbeid internasjonalt</H2>
          <Paragraph>
            Røde Kors jobber over hele verden. Internasjonalt jobber Norges Røde
            Kors alltid gjennom nasjonale Røde Kors/Røde
            Halvmåne-søsterforeninger. Som beredskapsorganisasjon er vi til
            stede i lokalsamfunn over hele landet – før, under og etter en
            krise. Primærhelse, sosial inkludering og forebygging av katastrofer
            er kjerneområdene i Røde Kors sitt langsiktige engasjement både i
            Norge og utlandet.
          </Paragraph>
        </TextContainer>
        <Image src={FieldDuty} alt="image" />
      </ContainerReverse>
    </>
  );
}
export default OurWork;
