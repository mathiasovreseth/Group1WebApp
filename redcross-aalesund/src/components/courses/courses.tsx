import React from "react";
import styled from "styled-components";

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
  border-radius: ${props => `${props.theme.borderRadius}`};
  background: #ededed;
  justify-content: center;
  align-items: center;
   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media  (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}){
    margin: 1rem 0 1rem 0;
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
  height: 2rem;
  width: 6rem;
  background-color: #f16670;
  text-align: center;
  font-size: 1.3rem;
  margin: 3rem 0 1rem 0;
`;

const BulletPoints = styled.ul`
  list-style-type: square;
  text-align: left;
  padding-top:10%;
  max-width: 25rem;
  font-size: ${props => `${props.theme.fontSizes.xSmall}`};
  margin:1rem 0 1rem 0;
`;

function Courses() {
    return (
        <CoursesContainer>
            <Section>
                <Box>1 day course</Box>
                <BulletPoints>
                  <li> Testing 1</li>
                  <li> Testing 2</li>
                  <li> Something else random stuff that doesnt mattter but is nice to have!</li>
                </BulletPoints>
                <SelectButton>Select</SelectButton>
            </Section>
            <Section>
                <Box>2 day course</Box>
                <BulletPoints>
                <li> Testing 1</li>
                  <li> Testing 2</li>
                  <li> Something else random stuff that doesnt mattter but is nice to have!</li>
                </BulletPoints>
                <SelectButton>Select</SelectButton>
            </Section>
            <Section>
                <Box>Short conciliation</Box>
                <BulletPoints>
                <li> Testing 1</li>
                  <li> Testing 2</li>
                  <li> Something else random stuff that doesnt mattter but is nice to have!</li>
                </BulletPoints>
                <SelectButton>Select</SelectButton>
            </Section>
        </CoursesContainer>
    );
}

export default Courses;
