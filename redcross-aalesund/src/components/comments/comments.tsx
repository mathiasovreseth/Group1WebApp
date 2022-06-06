import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../auth/Auth";
import { getCommentsApiResponse, getCoursesApiResponse } from "../../models/CourseModel";
import { getUserApiResponse } from "../../models/UserModel";
import { H1 } from "../../styles/CommonStyles";
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



function Comments(props: {reviews: Array<any>; name: string;}) {
  const reviews = props.reviews;

  const[review, setReview] = useState<getCommentsApiResponse>();



  useEffect(()=> {
    sendApiRequest("GET","/reviews/getReviewByUser",null, true).then((data: any) => {
        const reviewTemp: any = [];
        data.forEach((review: getCommentsApiResponse)=> {
            reviewTemp.push({
                0: review.id,
                1: review.name,
                2: review.comment
            });
        });
        setReview(reviewTemp);
    }).catch((err: any) => {
        console.log(err);
    });
}, [setSelectedProduct]);
  //flytt til courses
  
console.log(review);

function findMatchingReviews(rev: any){
  let exists = false
  reviews.map(function (value){
    if(value.reviewId === rev.id){
      exists = true
    }
    })
    return exists
  }



function createComment(reviewId: number, comment: string, name: string){
    return(
      <>
      <H2>{name}</H2>
      <Paragraph>{comment}</Paragraph>
      </>
    )
}

    
    return (
          <>
          <H1>Comments</H1>
          <TrustedComment>
            {review && review.map(function (value) {
              return(
                findMatchingReviews(value) && createComment(value.reviewId, value.comment, value.name)
              )
            })}
          </TrustedComment>
          </>
        )
  

}


export default Comments
