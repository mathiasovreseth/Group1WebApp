import React, { Component } from "react";
import { FaSquare } from "react-icons/fa";
import styled from "styled-components";
import {Link} from "react-router-dom";
import { Class } from "leaflet";
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
  cursor: pointer;
  @media  (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}){
    flex-direction: column;
  }
`;



const CardLeft = ["Info1", "info2", "Info3"];
const CardMiddle = ["Info1", "info2", "Info3"];
const CardRight= ["Info1", "info2", "Info3"];


function CoursesNoButton() {
  return(
    <>
    <H1>Our Courses</H1>
    <CoursesContainer>
        <Course title="Left" info={CardLeft} hasButton={false} selected={false}/> 
        <Course title="Middle" info={CardMiddle} hasButton={false} selected={false}/>
        <Course title="Right" info={CardRight} hasButton={false} selected={false}/>
    </CoursesContainer>
    
    </>
  )
}

export default CoursesNoButton;
