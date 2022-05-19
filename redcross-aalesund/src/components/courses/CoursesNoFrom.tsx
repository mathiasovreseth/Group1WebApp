import React,{ useState, useEffect }  from "react";
import { useLocation } from 'react-router-dom'
import { FaSquare } from "react-icons/fa";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Course} from "./Course";
import {CourseForm} from "./CourseForm";

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

const Container = styled.div`
  padding-bottom: 2rem;
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
  transform: scale(1);
  transition: all 0.4s;
   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media  (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}){
    margin: 2rem 0 2rem 0;
  }
  &:hover,
  &:focus {
    transform: scale(1.02);
  }
`;

const SelectedCourseDiv = styled.div`
  
`;

class CourseNoForm extends React.Component {
  state = {
    info: "",
    card1Selected: false,
    card2Selected: false,
    card3Selected: false
  }

  hideComponent(name:string) {  
    switch (name) {  
        case "card1":  
            this.setState({ card1Selected: !this.state.card1Selected });
            this.setState({ card2Selected: false, card3Selected: false});
            break;  
        case "card2":  
            this.setState({ card2Selected: !this.state.card2Selected });
            this.setState({ card1Selected: false, card3Selected: false});  
            break;  
        case "card3":
            this.setState({ card3Selected: !this.state.card3Selected });  
            this.setState({ card1Selected: false, card2Selected: false});
            break; 
        default:  
            null;  
    }  
  }

  componentDidMount () {
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(response => this.setState({        
        info: response.fact
      }))
      
  }
  
  
  render () {
    let info: string = this.state.info;
    return (
      <>
      <Container>
        <H1>Our Courses</H1>
        <CoursesContainer>
          <Section id="card1" onClick={() => this.hideComponent("card1")}>
            <Course title="Left" info={info} hasButton={true}/> 
          </Section>
          <Section id="card2" onClick={() => this.hideComponent("card2")}>
            <Course title="Middle" info={info} hasButton={true} />
          </Section>
          <Section id="card3" onClick={() => this.hideComponent("card3")}>
            <Course title="Right" info={info} hasButton={true} />
          </Section>
        </CoursesContainer>
      </Container>
      </>
    );
  }
}


export {CourseNoForm};
