import React,{ useState, useEffect }  from "react";

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


class MyComponent extends React.Component {
  state = {
    info: ""
  }

  componentDidMount () {
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(response => this.setState({        
        info: response.fact
      }))
      
  }
  
  render () {
    let {info} = this.state;
    return (
      <div>
        <H1>Our Courses</H1>
        <CoursesContainer>
            <Course title="Left" info={info} hasButton={true} selected={false}/> 
            <Course title="Middle" info={info} hasButton={true} selected={false}/>
            <Course title="Right" info={info} hasButton={true} selected={false}/>
        </CoursesContainer>
      </div>
    );
  }
}


  // render(): React.ReactNode {
  //   return (
  //     <div>
  //       <H1>Our Courses</H1>
  //       <CoursesContainer>
  //           <Course title="Left" info={CardLeft} hasButton={true} /> 
  //           <Course title="Middle" info={CardMiddle} hasButton={true}/>
  //           <Course title="Right" info={CardRight} hasButton={true}/>
  //       </CoursesContainer>
  //     </div>
  //   );
  // }

export {MyComponent};
