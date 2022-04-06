import React from "react";
import styled from "styled-components";
import image from "../../assets/baby.jpg";
import FieldDuty from "../../assets/FieldDuty.jpg";
import Frivillig from "../../assets/Frivillig.jpg";

const H1 = styled.h1`
  color: #d52d27;
  font-size: 4.8rem;
  font-weight: normal;
  margin: 2rem;
  @media screen and (max-width: 800px) {
    font-size: 3rem;
  }
  text-align: center;
`;

const H2 = styled.h2`
  font-size: 2rem;
  font-weight: normal;
  margin: 2rem;
  @media screen and (max-width: 800px) {
    font-size: 1.5rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.5rem;
  margin: 2rem;
  @media screen and (max-width: 800px) {
    font-size: 1rem;
  }
`;

const ImageLeft = styled.img`
  flex-shrink: 0; 
  height: 200px;
  width: 300px;
  vertical-align: middle;
  @media screen and (max-width: 800px) {
    height: 100px;
    width: 150px;
  } ;
`;
const ImageRight = styled.img`
  flex-shrink: 0;
  height: 200px;
  width: 300px;
  vertical-align: middle;
  @media screen and (max-width: 800px) {
    height: 100px;
    width: 150px;
  } ;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
`;

const TextContainer = styled.div`
  margin-left: 10px;
`;

function OurWork() {
  return (
    <div>
      <H1>Our work</H1>
      <Container>
        <ImageLeft src={Frivillig} alt="image" />
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
      <Container>
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
        <ImageRight src={FieldDuty} alt="image" />
      </Container>
    </div>
  );
}
export default OurWork;
