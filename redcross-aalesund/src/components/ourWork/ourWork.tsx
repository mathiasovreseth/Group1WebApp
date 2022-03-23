import React from "react";
import styled from "styled-components";
import image from "../../assets/baby.jpg";

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
  @media screen and (max-width: 800px){
    font-size: 1.5rem;
  }

`;

const Paragraph = styled.p`
  font-size: 1.5rem;
  margin: 2rem;
  @media screen and (max-width: 800px){
    font-size: 1rem; 
}
`;

const ImageLeft = styled.img`
  height: 200px;
  width: 300px;
  vertical-align: middle;
  @media screen and (max-width: 800px){
    height: 100px;
    width: 150px;
  };
`;
const ImageRight = styled.img`
  height: 200px;
  width: 300px;
  vertical-align: middle;
  @media screen and (max-width: 800px){
    height: 100px;
    width: 150px;
  };
`;
const Container = styled.div`
  width: 100%;
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
      <ImageLeft src={image} alt="image" />
        <TextContainer>
          <H2>Sed ut perspiciatis unde omnis</H2>
          <Paragraph>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
          </Paragraph>
        </TextContainer>
      </Container>
      <Container>
        <TextContainer>
            <H2>Sed ut perspiciatis unde omnis</H2>
            <Paragraph>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
            sequi nesciunt. Neque porro quisquam est, qui dolorem.
            </Paragraph>
        </TextContainer>
        <ImageRight src={image} alt="image" />
      </Container>
    </div>
  );
}
export default OurWork;
