import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../auth/Auth";
import { getCommentsApiResponse, getCoursesApiResponse } from "../../models/CourseModel";
import { getUserApiResponse } from "../../models/UserModel";
import { H1, MediumText, XSmallText } from "../../styles/CommonStyles";
import { sendApiRequest } from "../../utils/requests";


const H2 = styled.h2`
  font-size: ${props => `${props.theme.fontSizes.large}`};
  font-weight: bold;
  padding-top: 1rem;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    font-size: ${props => `${props.theme.fontSizes.medium}`};
  }
`;

const TrustedComment = styled.section`
  display: grid;
  padding-left: 5%;
  padding-right: 5%;
  text-align: center;
  grid-template-columns: 15% 1fr 1fr 15%;
  grid-template-rows: 12rem fit-content;
  grid-gap: 50px;
  margin-bottom: 2rem;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {  
    grid-template-columns: 8rem auto;
    grid-template-rows: 8rem fit-content;
    margin-bottom: 2rem;
  }
  
`;


const Paragraph1 = styled.p`
  font-size: ${props => `${props.theme.fontSizes.medium}`};
  padding-top: 0.5rem;
  grid-column: 3;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    font-size: ${props => `${props.theme.fontSizes.xSmall}`};
  }
`;
const Paragraph2 = styled.p`
  font-size: ${props => `${props.theme.fontSizes.medium}`};
  padding-top: 0.5rem;
  grid-column: 2;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    font-size: ${props => `${props.theme.fontSizes.xSmall}`};
  }
`;



function Comments(props: {reviews: Array<any>;}) {
  const reviews = props.reviews;


    
    return (
          <>
          <H1>Comments</H1>
          
           
           {props.reviews.map((review) => {
             return (
              <TrustedComment>
                 <Paragraph2>Name: <br /> {review.name}</Paragraph2>
                 <Paragraph1> Comment: <br /> {review.comment}</Paragraph1>
                 </TrustedComment>
             ) 
           })}
          
          </>
        )
  

}


export default Comments
