import React from 'react';
import styled from "styled-components";
import {FlexContainer, MediumText} from "../../styles/CommonStyles";
import mathiasL from "../../assets/mathiasL.jpeg";
import mathiasJ from "../../assets/mathiasj.jpeg";
import sjur from "../../assets/sjur.jpeg";
import michal from "../../assets/michal.jpeg";
import redCrossImage from "../../assets/red-cross-image.png";
import {Link} from "react-router-dom";

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 6rem 0 6rem 0;
  background-color: #EDEDED;
  width: 100vw;
  position: relative;
  bottom: 0;

`
const FooterLinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;

  @media (max-width: 56.25em) {
    display: grid;
    grid-template-columns: 100px 100px;
    align-items: start;
    column-gap: 6rem;
    row-gap: 2.4rem;
  }


`;
const FooterLinkItem = styled(MediumText)`
  margin-right: 7rem;
  @media (max-width: 56.25em) {
    margin-right: 0;
    text-align: start;
  }

`;

const RedCrossImage = styled.img`
  /// 1100px
  @media (max-width: 68.75em) {
    display: none
  }

  height: 5rem;
  margin-right: 7rem;
`;
const ImageContainer = styled(FlexContainer)`
  margin-top: 10rem;
  justify-content: center;
  flex-wrap: wrap;
`;
const ImageElement = styled.img`
  border-radius: 50%;

  height: 10rem;
  width: 10rem;
  margin-right: 1.6rem;
  @media (max-width: 29.375em) {
    margin: 0.8rem;
  }
`;
const CopyRightText = styled.h1`
  font-size: ${props => `${props.theme.fontSizes.small}`};
  margin-top: 2.4rem;

`;


// Footer that is placed at the bottom of the website
function Footer() {
    return (
        <FooterContainer>
            <div style={{display: "flex", justifyContent: "center"}}>
                <FooterLinkContainer>
                    <Link to='/about'>
                        <FooterLinkItem>About us</FooterLinkItem>
                    </Link>
                    <Link to='/questions'>
                        <FooterLinkItem>Ask us a question</FooterLinkItem>
                    </Link>
                    <Link to='/terms'>
                        <FooterLinkItem>Terms</FooterLinkItem>
                    </Link>
                    <RedCrossImage src={redCrossImage} alt={'Red cross'}/>
                    <Link to='/refunds'>
                        <FooterLinkItem>Refunds</FooterLinkItem>
                    </Link>
                    <Link to='/community'>
                        <FooterLinkItem>Community</FooterLinkItem>
                    </Link>
                    <Link to='/ethics'>
                        <FooterLinkItem style={{marginRight: 0}}>Ethics</FooterLinkItem>
                    </Link>
                </FooterLinkContainer>
            </div>
            <div style={{width: "80vw", marginTop: "1.2rem", backgroundColor: "#333", height: "0.3rem"}}/>
            <ImageContainer>
                <ImageElement src={mathiasJ} alt={"Mathias Jørgensen. Developer of website"}/>
                <ImageElement src={mathiasL} alt={"Mathias Øvreset. Developer of website"}/>
                <ImageElement src={sjur} alt={"Sjur Gustavsen. Developer of website"}/>
                <ImageElement src={michal} alt={"Michal Åsebø. Developer of website"}/>
            </ImageContainer>
            <CopyRightText>© Student Project NTNU - Red cross Ålesund website. 2022.</CopyRightText>
        </FooterContainer>
    );
}

export default Footer;