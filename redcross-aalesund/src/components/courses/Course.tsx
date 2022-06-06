import React from "react";
import { FaSquare } from "react-icons/fa";
import styled from "styled-components";
import {Link} from "react-router-dom";
import { getCoursesApiResponse } from "../../models/CourseModel";
import {FlexContainer, SmallText} from "../../styles/CommonStyles";



const Box = styled.h1`
  height: 5rem;
  width: 30rem;
  background-color: #f16670;
  display: flex;
  align-items: center;
  justify-content: center;
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

const BulletPoints = styled.div`
  height: 30rem;
  max-width: 25rem;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: ${props => `${props.theme.fontSizes.xSmall}`};
`;


interface CourseCardProps {
  product: getCoursesApiResponse;
  onSubmit: (product: getCoursesApiResponse) => void;
  
}


export function Course(props: CourseCardProps) {

    function splitString(string: string) {
        let sentences = string.split(". ");
        return sentences
    }
    const infoArray: Array<String> = splitString(props.product.description);

    return (
      <>
        <Box>{props.product.title}</Box>
        <BulletPoints onClick={() => props.onSubmit(props.product)}>
            <div>
            {
                infoArray.map(function (value: any) {
                    return (
                        <FlexContainer style={{marginBottom: "1.2rem", alignItems: "center", justifyContent: "flex-start"}}>
                            <div style={{ marginRight:"0.8rem", overflow: "visible"}}>
                                <FaSquare style={{fontSize: ".6rem"}}/>
                            </div>
                            <SmallText style={{}}>{value}</SmallText>
                        </FlexContainer>
                    );
                })
            }
            </div>
            <FlexContainer style={{justifyContent: "center"}}>
                <Link to='/product-page'>
                    <SelectButton onClick={() => props.onSubmit(props.product)}>Select</SelectButton>
                </Link>
            </FlexContainer>

        </BulletPoints>

      </>
    );
}

