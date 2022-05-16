import React from "react";
import { FaSquare } from "react-icons/fa";
import styled from "styled-components";
import {Link} from "react-router-dom";

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
  cursor: pointer;
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



export function Course(props: { title: any; info: any; hasButton: boolean; selected: boolean }) {
    const title = props.title
    const info = props.info
    const hasButton = props.hasButton
    let selected = props.selected

    function setSelected() {
      if(!selected){
        selected = true
      }else {
        selected = false
      }
    }
     

    function createButton() {
      if(hasButton) {
        return(
          <Link to='/product_page'>
            <SelectButton onClick={setSelected}>Select</SelectButton>
          </Link>);
      }
    }

    

    return (
      <>
        <Section>
            <Box>{title}</Box>
            <BulletPoints>
            {/* {info.map((text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) =>
            <LI><FaSquare style={{marginRight: ".8rem"}}/>{text}</LI>)
            } */}
            {info}
            </BulletPoints>
            {createButton()}
  
        </Section>
        </>
    );
}

