import React from "react";
import styled from "styled-components";

const CoursesContainer = styled.div`
  display: flex;

  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding: 10rem 10rem 0 10rem;
`;
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  background: #ededed;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  background: #ededed;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  background: #ededed;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Box = styled.div`
  height: 5rem;
  width: 40rem;
  background-color: #f16670;
  text-align: center;
  font-size: 2rem;
`;

const SelectButton = styled.button`
  height: 2rem;
  width: 6rem;
  background-color: #f16670;
  text-align: center;
  font-size: 1.3rem;
  margin: 3rem 0 1rem 0;
`;
const LinkElement = styled.h1`
  font-size: 1.8rem;
`;
const Textbox = styled.div`
  text-align: center;
  font-size: 1rem;
  margin: 3rem 0 1rem 0;
`;

function Courses() {
  return (
    <CoursesContainer>
      <LeftSection>
        <Box>1 day course</Box>
        <Textbox>hellio</Textbox>
        <SelectButton>Select</SelectButton>
      </LeftSection>
      <MiddleSection>
        <Box>2 day course</Box>
        <Textbox>yoyoyo</Textbox>
        <SelectButton>Select</SelectButton>
      </MiddleSection>
      <RightSection>
        <Box>Short conciliation</Box>
        <Textbox>ayeees</Textbox>
        <SelectButton>Select</SelectButton>
      </RightSection>
    </CoursesContainer>
  );
}

export default Courses;
