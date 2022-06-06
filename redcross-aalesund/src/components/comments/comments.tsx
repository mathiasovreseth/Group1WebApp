import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
import { useAuth } from "../../auth/Auth";
import { getCommentsApiResponse, getCoursesApiResponse } from "../../models/CourseModel";
import { getUserApiResponse } from "../../models/UserModel";
import { H1, MediumText, XSmallText } from "../../styles/CommonStyles";
import { sendApiRequest } from "../../utils/requests";


const H2Comment = styled.h2`
  font-size: ${props => `${props.theme.fontSizes.large}`};
  font-weight: bold;
  padding-top: 1rem;
  grid-column: 3;
  grid-row: 1;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    font-size: ${props => `${props.theme.fontSizes.medium}`};
  }
`;

const TrustedComment = styled.section`
  display: grid;
  padding-left: 5%;
  padding-right: 5%;
  text-align: left;
  grid-template-columns: 15% 1fr 15%;
  grid-template-rows: 12rem fit-content;
  grid-gap: 50px;
  margin-bottom: 2rem;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {  
    grid-template-columns: 8rem auto;
    grid-template-rows: 8rem fit-content;
    margin-bottom: 2rem;
  }
  
`;

const H2Name = styled.h2`
  font-size: ${props => `${props.theme.fontSizes.medium}`};
  font-weight: bold;
  padding-top: 1rem;
  grid-column: 2;
  grid-row: 1;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    font-size: ${props => `${props.theme.fontSizes.medium}`};
  }
`;



const Paragraph2 = styled.p`
  font-size: ${props => `${props.theme.fontSizes.medium}`};
  padding: 1rem;
  grid-column: 2;
  background-color: #f3f3f3;
  border-radius: ${props => `${props.theme.borderRadius}`};
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    font-size: ${props => `${props.theme.fontSizes.xSmall}`};
  }
`;



function Comments(props: {reviews: Array<any>;}) {
  const reviews = props.reviews;


    
    return (
          <>
          <H1>Comments</H1>
          
               <TrustedComment>
                      {props.reviews.map((review) => {
                   return (
                     <><Paragraph2> <FaUser/> {review.name} <br /> <br />{review.comment}</Paragraph2>
                    </>
                     ) 
                    })}
                </TrustedComment>
          
          </>
        )
  

}


export default Comments
