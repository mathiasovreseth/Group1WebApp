import React from "react";
import styled from "styled-components";


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


class Comments extends React.Component {

    Constructor(props: String) {
        this.state = {  
         name: "test",
         comment: "ee"
      }  
    }




    render() {
        return (
            <>
                <TrustedComment>
                    <CommentPicture>
                        <p>image</p>
                    </CommentPicture>
                    <Comment>
                        <H1>name</H1>
                        <p>Comment</p>
                    </Comment>
                </TrustedComment>
            </>
        )
    }

}

export {Comments}