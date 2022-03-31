import React from "react";
import styled from "styled-components";
import the_rock from "../../assets/the_rock.jpg";
import billie from "../../assets/billie_eilish.jpg";
import sebastian from "../../assets/sebastian.jpg";

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

const TrustedComment = styled.section`
  display: grid;
  padding-left: 5%;
  padding-right: 5%;
  grid-template-columns: 12rem auto;
  grid-template-rows: 12rem auto;
  // box-shadow: 0 0 1rem 0 rgba(90, 90, 90, 0.2);
  grid-gap: 50px;
  @media screen and (max-width: 800px) {
    grid-template-columns: 8rem auto;
    grid-template-rows: 8rem auto;
  }
`;

const CommentPicture = styled.div`
  align-self: center;
`;

const Comment = styled.div`
  font-size: 3rem;
  align-self: center;
  @media screen and (max-width: 800px) {
    font-size: 2rem;
  }
`;

const Image = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 12rem;
  height: 12rem;
  align-self: center;
  @media screen and (max-width: 800px) {
    width: 8rem;
    height: 8rem;
  }
`;

function TrustedReviews() {
  return (
    <div>
      <H1>Trust previous course attendees</H1>

      {/* First comment */}
      <TrustedComment>
        <CommentPicture>
          {" "}
          <Image src={billie} alt="Profile picture" />{" "}
        </CommentPicture>
        <Comment>
          <h2>Billie Eilish</h2>
          <p>
            The course was very comprehensive and easy to understand. The
            instructors made sure that they are giving the information in a way
            that won't make me confused. Thank you so much for this great
            course!
          </p>
        </Comment>
      </TrustedComment>

      {/* second comment */}
      <TrustedComment>
        <CommentPicture>
          {" "}
          <Image src={the_rock} alt="Profile picture" />{" "}
        </CommentPicture>
        <Comment>
          <h2>Dwayne Johnson</h2>
          <p>
          Teachers were outstanding. Lectures are to the point without drag-on. Many thanks for the quality of your efforts!
          </p>
        </Comment>
      </TrustedComment>
      {/* third comment */}
      <TrustedComment>
        <CommentPicture>
          {" "}
          <Image src={sebastian} alt="Profile picture" />{" "}
        </CommentPicture>
        <Comment>
          <h2>Sebastian Nilsen</h2>
          <p>
          Amazing course! Incredibly simple, fast-paced and provided a lot of useful information for someone like me.
          </p>
        </Comment>
      </TrustedComment>
    </div>
  );
}
export default TrustedReviews;
