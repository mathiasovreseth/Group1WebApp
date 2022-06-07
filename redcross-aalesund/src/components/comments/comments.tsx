import React, {useEffect, useState} from "react";
import {FaEdit, FaTrash, FaUser} from "react-icons/fa";
import styled from "styled-components";
import {useAuth} from "../../auth/Auth";
import {getCommentsApiResponse, getCoursesApiResponse} from "../../models/CourseModel";
import {getUserApiResponse} from "../../models/UserModel";
import {FlexColumnContainer, FlexContainer, H1, Input, MediumText, XSmallText} from "../../styles/CommonStyles";
import {sendApiRequest} from "../../utils/requests";
import {isValidEmail, isValidPassword} from "../../utils/FormValidation";
import {sortById} from "../../utils/Sorting";
import {toast} from "react-toastify";


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
  border-radius: ${props => `${props.theme.borderRadius}`};
  @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
    font-size: ${props => `${props.theme.fontSizes.xSmall}`};
  }
`;

const Button = styled.button`
  border: 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
  font-size: ${props => `${props.theme.fontSizes.large}`};
  padding: 1rem 0;
  margin-top: 2rem;
  background-color: ${props => `${props.theme.palette.primary.accentColor}`};
  color: white;
  cursor: pointer;
  width: 26rem;
  height: 4.5rem;
  overflow-y: hidden;
`;
const CommentCard = styled(FlexContainer)`
  width: 90%;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.2rem;
  background-color: #f3f3f3;
  margin-bottom: 1.2rem;

`;

const EditIconContainer = styled.div`
  :hover {
    cursor: pointer;
  }
`;

function Comments(props: { reviews: Array<any>; onDelete: (reviewId: number) => void; onEditSubmit: (comment: string, reviewId: number) => void; onSubmit: (comment: string) => void }) {
    const [isCreatingComment, setIsCreatingComment] = useState(false);
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);
    const [comment, setComment] = useState("");
    const [editComment, setEditComment] = useState("");
    const [commentErr, setCommentErr] = useState("");
    const [reviews, setReviews] = useState<Array<any>>([]);

    const auth = useAuth();

    useEffect(() => {
        let tempRev: Array<any> = [];
        props.reviews.forEach((rev) => {
            tempRev.push({
                ...rev,
                isEditing: false,
            });
        });
        console.log(tempRev);
        setReviews(tempRev);
    }, [props.reviews])

    function validateEditForm() {
        let isValid = true;

            if (editComment.length === 0) {
                setCommentErr('Comment is required');
                isValid = false;
            }
        return isValid;
    }
    function validateCreateComment() {
        let isValid = true;
        if (comment.length === 0) {
            setCommentErr('Comment is required');
            isValid = false;
        }
        return isValid;
    }
    function onSubmit() {
        if (validateCreateComment()) {
            setIsCreatingComment(false)
            props.onSubmit(comment);
        }
    }

    function onEditSubmit(reviewId: number) {
        if (validateEditForm()) {
            setIsEditingComment(false);
            props.onEditSubmit(editComment, reviewId);
        }
    }


    return (
        <FlexColumnContainer style={{width: "100vw", alignItems: "center"}}>
            <H1>Comments</H1>
            {reviews.map((review, index) => {
                if(review.enabled) {
                    return (
                        <CommentCard>
                            <FlexColumnContainer>
                                <Paragraph2>
                                    <FaUser/> {review.name}
                                    <br/>
                                    <br/>
                                    {!isEditingComment || editIndex !== index ?
                                        <div>
                                            {review.comment}
                                        </div> :
                                        <FlexContainer style={{alignItems: "flex-end"}}>
                                          <FlexColumnContainer>
                                              <Input placeholder={"Comment..."}
                                                     onChange={(e) => setEditComment(e.target.value)} type="text"
                                                     name="editComment"/>
                                              {commentErr && <XSmallText style={{color: "red"}}>{commentErr}</XSmallText>}
                                          </FlexColumnContainer>
                                            <Button style={{marginBottom: "0.5rem",transform: "scale(0.7)"}}
                                                    onClick={() => onEditSubmit(review.id)}>Edit</Button>
                                        </FlexContainer>

                                    }
                                </Paragraph2>
                            </FlexColumnContainer>
                            {(auth.user.email == review.email || auth.user.role == "ADMIN") &&
                                <FlexContainer>
                                    <EditIconContainer>
                                        <FaEdit onClick={() => {
                                            setIsEditingComment(true);
                                            setEditIndex(index);
                                        }} style={{fontSize: "2rem"}}/>
                                    </EditIconContainer>
                                    <EditIconContainer style={{marginLeft: "2.4rem"}}>
                                        <FaTrash  onClick={() => {
                                            props.onDelete(review.id)
                                        }} style={{fontSize: "2rem"}}/>
                                    </EditIconContainer>
                                </FlexContainer>

                            }

                        </CommentCard>
                    );
                }
            })}
            {auth.isAuthenticated &&
            !isCreatingComment ?
                <FlexContainer style={{justifyContent: "center"}}><Button onClick={() => setIsCreatingComment(true)}
                                                                          style={{marginBottom: "1.2rem"}}>Create
                    comment</Button></FlexContainer> :
                <FlexColumnContainer style={{alignItems: "center", justifyContent: "center"}}>
                    <Input placeholder={"Comment..."} onChange={(e) => setComment(e.target.value)} type="text"
                           name="comment"/>
                    {commentErr && <XSmallText style={{color: "red"}}>{commentErr}</XSmallText>}
                    <Button style={{marginTop: "1.2rem"}} onClick={() => onSubmit()}>Create</Button>
                </FlexColumnContainer>

            }

        </FlexColumnContainer>
    )


}


export default Comments
