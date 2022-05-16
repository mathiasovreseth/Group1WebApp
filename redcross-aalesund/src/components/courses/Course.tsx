import React from "react";
import { FaSquare } from "react-icons/fa";
import styled from "styled-components";
import {Link} from "react-router-dom";



const Box = styled.h1`
  height: 5rem;
  width: 30rem;
  position: absolute;
  top: 0%;
  background-color: #f16670;
  text-align: center;
  font-size: ${props => `${props.theme.fontSizes.large}`};
`;

let SelectButton = styled.button`
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



export function Course(props: { title: string; info: any; hasButton: boolean;}) {
    const title = props.title
    const info = props.info
    const hasButton = props.hasButton
    let selected: boolean = false
  

    function clickSelected() {
      if (!selected) {
        selected = true;
      } else {
        selected = false;
      }
    }
     

    function createButton() {
      if(hasButton) {
        return(
          <Link to='/product_page'>
            <SelectButton onClick={clickSelected}>Select</SelectButton>
          </Link>);
      }
    }

    

    return (
      <>
        <Box>{title}</Box>
        <BulletPoints>
        {/* {info.map((text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) =>
        <LI><FaSquare style={{marginRight: ".8rem"}}/>{text}</LI>)
        } */}
        {info}
        </BulletPoints>
        {createButton()}
      </>
    );
}

