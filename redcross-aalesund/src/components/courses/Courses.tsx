import React from "react";
import { FaSquare } from "react-icons/fa";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Course} from "./Course";

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

const CardLeft = ["Info1", "info2", "Info3"];
const CardMiddle = ["Info1", "info2", "Info3"];
const CardRight= ["Info1", "info2", "Info3"];

function Courses() {
    return (
      <div>
        <H1>Our Courses</H1>
        <CoursesContainer>
            <Course title="Left" info={CardLeft} hasButton={true} /> 
            <Course title="Middle" info={CardMiddle} hasButton={true}/>
            <Course title="Right" info={CardRight} hasButton={true}/>
        </CoursesContainer>
      </div>
    );
}

export default Courses;
