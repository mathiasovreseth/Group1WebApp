import React from "react";
import styled from "styled-components";
import the_rock from "../../assets/the_rock.jpg";
import billie from "../../assets/billie_eilish.jpg";
import sebastian from "../../assets/sebastian.jpg";
import { H1 } from "../../styles/CommonStyles";


const TrustedComment = styled.section`
  display: grid;
  padding-left: 5%;
  padding-right: 5%;
  grid-template-columns: 12rem auto;
  grid-template-rows: 12rem fit-content;
  grid-gap: 50px;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {  
    grid-template-columns: 8rem auto;
    grid-template-rows: 8rem fit-content;
    margin-bottom: 2rem;
  }
  
`;

const CommentPicture = styled.div`
  align-self: center;
`;

const Comment = styled.div`
  align-self: center;
  height:auto;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {    
  }
`;

const Image = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 12rem;
  height: 12rem;
  align-self: center;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {    width: 8rem;
    height: 8rem;
  }
`;

const H2 = styled.h2`
  font-size: ${props => `${props.theme.fontSizes.large}`};
  font-weight: bold;
  padding-top: 1rem;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    font-size: ${props => `${props.theme.fontSizes.medium}`};
  }
`;

const Paragraph = styled.p`
  font-size: ${props => `${props.theme.fontSizes.medium}`};
  padding-top: 0.5rem;
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    font-size: ${props => `${props.theme.fontSizes.xSmall}`};
  }
`;

function TrustedReviews() {
  return (
    <>
      <H1>Trust previous course attendees</H1>

      {/* First comment */}
      <TrustedComment>
        <CommentPicture>
          {" "}
          <Image src={billie} alt="Profile picture" />{" "}
        </CommentPicture>
        <Comment>
          <H2>Billy Eirish</H2>
          <Paragraph>
            Red Cross are very competent experts in first help. They are so effective; you never
            need the second help
          </Paragraph>
        </Comment>
      </TrustedComment>

      {/* second comment */}
      <TrustedComment>
        <CommentPicture>
          {" "}
          <Image src={the_rock} alt="Profile picture" />{" "}
        </CommentPicture>
        <Comment>
          <H2>James Brown</H2>
          <Paragraph>
            I have been HR responsible at my company for 12 years, and every year I update
            my certification with Red Cross Ålesund. I can proudly say that no one has died under my
            watch.
          </Paragraph>
        </Comment>
      </TrustedComment>
      {/* third comment */}
      <TrustedComment>
        <CommentPicture>
          {" "}
          <Image src={sebastian} alt="Profile picture" />{" "}
        </CommentPicture>
        <Comment>
          <H2>Anna Brook</H2>
          <Paragraph>
            These folks may not be Linux kernel gurus, but they do one thing well – they teach
            you the essentials of first help in an easy and interesting way
          </Paragraph>
        </Comment>
      </TrustedComment>
    </>
  );
}
export default TrustedReviews;
