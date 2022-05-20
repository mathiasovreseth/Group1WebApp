import React from "react";
import { FaSquare } from "react-icons/fa";
import styled from "styled-components";
import {Link} from "react-router-dom";
import { getCoursesApiResponse } from "../../models/CourseModel";



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

interface CourseCardProps {
  product: getCoursesApiResponse;
  onSubmit: (product: getCoursesApiResponse) => void;
  
}



export function Course(props: CourseCardProps) {
      return (
      <>
        <Box>{props.product.title}</Box>
        <BulletPoints>
    
        {props.product.description}
        </BulletPoints>
      <Link to='/product_page'>
            <SelectButton onClick={() => props.onSubmit(props.product)}>Select</SelectButton>
          </Link>
      </>
    );
}

