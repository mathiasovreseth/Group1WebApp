import React, { useState } from "react";
import styled from "styled-components";
import { getCoursesApiResponse } from "../../models/CourseModel";
import { H1 } from "../../styles/CommonStyles";


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

const Comment = styled.div`
  font-size: 3rem;
  align-self: center;
  @media screen and (max-width: 800px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  font-size: ${props => `${props.theme.fontSizes.medium}`};
  padding-top: 0.5rem;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    font-size: ${props => `${props.theme.fontSizes.xSmall}`};
  }
`;

interface CourseCardProps {
  product: getCoursesApiResponse;
  onSubmit: (product: getCoursesApiResponse) => void;
  
}


function Comments(props: {reviews: Array<any>;}) {
  const reviews = props.reviews;

  
console.log(props.reviews);


function createComment(reviewId: number,  comment: string ){
    return(
      <>
      <H2>{reviewId}</H2>
      <Paragraph>{comment}</Paragraph>
      </>
    )
}

    
    return (
          <>
          <H1>Comments</H1>
          <TrustedComment>
            {reviews.map(function (value){
              return(
                createComment(value.reviewId, value.comment)
              )
            })}
          </TrustedComment>
          </>
        )
  

}

export default Comments
