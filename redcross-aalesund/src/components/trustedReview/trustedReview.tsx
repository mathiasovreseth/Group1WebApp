import React from "react";
import styled from "styled-components";
import image from "../../assets/baby.jpg"

const H1 = styled.h1`
  color: red;
  font-size: 4.8rem;
  font-weight: normal;
  margin: 10% 8rem;
`;

const TrustedComment = styled.section`
    display: grid; 
    grid-template-columns: 230px auto; 
    grid-template-rows: 230px auto; 
    gap: 0px 0px; 
    box-shadow: 0 0 3rem 0 rgba(90, 90, 90, 0.2);
    grid-gap: 50px;
`;

const CommentPicture = styled.div`
    align-self:center;
`;

const Comment = styled.div`
    font-size: 4rem;
    align-self:center;
`;

const Image = styled.img`
    border-radius: 50%;
    object-fit: cover;
    width:230px;
    height:230px;
`;


function TrustedReviews() {
    return (
        <div>
            <H1>Trust previous course attendees</H1>

            {/* First comment */}
            <TrustedComment> 
                <CommentPicture> <Image src={image} alt="Profile picture" /> </CommentPicture>
                <Comment>
                    <h2>Sjur Gustavsen</h2>
                    <p>Very good! yes!</p>
                    </Comment>
            </TrustedComment>

            {/* second comment */}
            <TrustedComment> 
                <CommentPicture> <Image src={image} alt="Profile picture" /> </CommentPicture>
                <Comment>
                    <h2>Sjur Gustavsen</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a iaculis nulla. Aliquam tellus enim, sodales eget dapibus vel, volutpat sit amet nibh. Praesent egestas orci dui. Vestibulum sollicitud</p>
                    </Comment>
            </TrustedComment>
            {/* third comment */}
            <TrustedComment> 
                <CommentPicture> <Image src={image} alt="Profile picture" /> </CommentPicture>
                <Comment>
                    <h2>Sjur Gustavsen</h2>
                    <p>Quisque pretium nulla vitae velit euismod, quis volutpat justo vehicula. Etiam cursus nulla ac hendrerit sagittis. Fusce molestie ligula pellentesque eleifend dignissim. Morbi rhoncus, lorem id vehicula dignissim, nulla risus vehicula nunc, at tempus dolor massa ut orci. Quisque sollicitudin nisi eu nulla elemen</p>
                    </Comment>
            </TrustedComment>
        </div>
        
    )
}
export default TrustedReviews;