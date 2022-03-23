import React from "react";
import { FaSquare } from "react-icons/fa";
import styled from "styled-components";

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
const CoursesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 10%;
  padding-right: 10%;
  @media  (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}){
    flex-direction: column;
  }
`;

const Section = styled.div`
  min-height: 25rem;
  min-width: 30rem;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 5rem 0 1rem 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
  background: #ededed;
  justify-content: center;
  align-items: center;
   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media  (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}){
    margin: 2rem 0 2rem 0;
  }
`;

const Box = styled.h1`
  height: 5rem;
  width: 30rem;
  position: absolute;
  top: 0%;
  background-color: #f16670;
  text-align: center;
  font-size: ${props => `${props.theme.fontSizes.large}`};
`;

const SelectButton = styled.button`
  background-color:#f16670; 
  border: none;
  color: white;
  padding: 1rem 2.5rem;
  text-align: center;
  text-decoration: none;
  font-size: 1.2rem;
  display: inline-block;
  margin: 4rem 0 1rem 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
`;

const BulletPoints = styled.ul`
  list-style-type: square;
  text-align: left;
  padding-top:20%;
  max-width: 25rem;
  font-size: ${props => `${props.theme.fontSizes.xSmall}`};
  margin:1rem 0 1rem 0;
`;

const LI = styled.li`
  font-size: ${props => `${props.theme.fontSizes.xSmall}`};
  margin: 0.3rem 0 0 0;
`;

function Courses() {
    return (
      <div>
        <H1>Our Courses</H1>
        <CoursesContainer>
            <Section>
                <Box>1 Day Course</Box>
                <BulletPoints>
                  <LI><FaSquare style={{marginRight: ".8rem"}}/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a iaculis nulla.</LI>
                  <LI><FaSquare style={{marginRight: ".8rem"}}/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a iaculis nulla.</LI>
                  <LI><FaSquare style={{marginRight: ".8rem"}}/> Something else random stuff that doesnt mattter but is nice to have!</LI>
                </BulletPoints>
                <SelectButton>Select</SelectButton>
            </Section>
            <Section>
                <Box>2 Day Course</Box>
                <BulletPoints>
                <LI><FaSquare style={{marginRight: ".8rem"}}/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a iaculis nulla.</LI>
                <LI><FaSquare style={{marginRight: ".8rem"}}/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a iaculis nulla.</LI>
                <LI><FaSquare style={{marginRight: ".8rem"}}/> Something else random stuff that doesnt mattter but is nice to have!</LI>
                </BulletPoints>
                <SelectButton>Select</SelectButton>
            </Section>
            <Section>
                <Box>Short Conciliation</Box>
                <BulletPoints>
                <LI><FaSquare style={{marginRight: ".8rem"}}/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a iaculis nulla.</LI>
                <LI><FaSquare style={{marginRight: ".8rem"}}/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a iaculis nulla.</LI>
                <LI><FaSquare style={{marginRight: ".8rem"}}/> Something else random stuff that doesnt mattter but is nice to have!</LI>
                </BulletPoints>
                <SelectButton>Select</SelectButton>
            </Section>
        </CoursesContainer>
        </div>
    );
}

export default Courses;
