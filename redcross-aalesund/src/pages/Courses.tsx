import React,{ useState, useEffect }  from "react";
import { useLocation } from 'react-router-dom'
import { FaSquare } from "react-icons/fa";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Course} from "../components/courses/Course";
import {CourseForm} from "../components/courses/CourseForm";
import {sendApiRequest} from "../../src/utils/requests"
import { getCommentsApiResponse, getCoursesApiResponse } from "../models/CourseModel";
import Popup from "reactjs-popup";
import LoginForm from "../components/forms/LoginForm";
import authHelper from "../auth/AuthProvider";
import { useAuth } from "../auth/Auth";
import { FlexColumnContainer } from "../styles/CommonStyles";
import { H1 } from "../styles/CommonStyles";
import Comments from "../components/comments/comments";
import {toast, ToastContainer} from "react-toastify";
import {getUserApiResponse} from "../models/UserModel";
import {sortById} from "../utils/Sorting";

const CoursesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 10%;
  padding-right: 10%;
  @media  (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}){
    flex-direction: column;
  }
`;

const Container = styled.div`
  padding-bottom: 5rem;
`;

const Section = styled.div`
  min-height: 25rem;
  min-width: 30rem;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 5rem 1rem 1rem 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
  background: #ededed;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;
   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media  (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}){
    margin: 2rem 0 2rem 0;
  }
  &:hover,
  &:focus {
    cursor: pointer;
    transform: scale(1.02);
  }
`;
const SectionForm = styled.div`
  min-height: 25rem;
  display: flex;
  flex-direction: column;
  margin: 5rem 1rem 1rem 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
  background: #ededed;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media  (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}){
    margin: 2rem 0 2rem 0;
  }
`;

const SelectedCourseDiv = styled.div`
  
`;



function LoadCourses() {
  const [product, setProduct] = useState<Array<getCoursesApiResponse>>([]);
  const [selectedProduct, setSelectedProduct] = useState<getCoursesApiResponse>();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const[review, setReview] = useState<any>();
  const auth = useAuth();

  useEffect(()=> {
      sendApiRequest("GET","/products/getAll",null, true).then((data: any) => {
          const productTemp: any = [];
          data.forEach((product: getCoursesApiResponse)=> {
              productTemp.push({
                  id: product.id,
                  title: product.title,
                  description: product.description,
                  reviews: product.reviews
              });
          });
          setProduct(productTemp);
      }).catch((err: any) => {
          console.log(err);
      });
  }, []);

  useEffect(()=> {
    sendApiRequest("GET","/reviews/getReviewByUser",null, true).then((data: any) => {
        const reviewTemp: any = [];
        data.forEach((review: any)=> {
            reviewTemp.push({
                id: review[0],
                name: review[2],
                comment: review[3]
            });
        });
        console.log(reviewTemp);
        setReview(reviewTemp);
    }).catch((err: any) => {
        console.log(err);
    });
}, [setSelectedProduct]);


  function openPopup() {
    if(!auth.isAuthenticated){
      setIsPopupOpen(true);
    }
    
}

 function handleCreateComment(comment: string) {
      const body = {
        productId: selectedProduct?.id ?? null,
        email: auth.user.email,
        comment: comment,

      }
      sendApiRequest("POST", "/reviews/add", body, false).then(()=> {
          toast.success('Account created!', {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              bodyStyle: {fontSize: "3.2rem"},
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
      }).catch(()=> {
          toast.success('Failed to create comment', {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              bodyStyle: {fontSize: "3.2rem"},
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
      });
 }
 function handleEditComment(reviewId: number, comment: string) {
      const body = {
        reviewId: reviewId,
        comment: comment,

      }
      sendApiRequest("PUT", "/reviews/update", body, false).then(()=> {
          toast.success('Review updated', {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              bodyStyle: {fontSize: "3.2rem"},
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
      }).catch(()=> {
          toast.success('Failed to update review', {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              bodyStyle: {fontSize: "3.2rem"},
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
      });
 }

    function onDelete(reviewId: number) {
        if(window.confirm("Are you sure?")) {
            const postData = {
                reviewId: reviewId,
            };
            sendApiRequest("PUT", "/reviews/delete",postData, false).then((res: any)=> {
                toast.success(res, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    bodyStyle: {fontSize: "3.2rem"},
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                });
            }).catch((e: any)=> {
                toast.error(e, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    bodyStyle: {fontSize: "3.2rem"},
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        }

    }


    return(
      <>
      <Container>
      <H1> Our courses</H1>
      <CoursesContainer>
        {product && product.map((data: getCoursesApiResponse) => {
          return <Section> <Course key={data.id} product={data} onSubmit={(data) => {
            data.reviews.forEach((rev) => {
              review.forEach((element: any ) => {
                if(rev.id === element.id){
                  rev.name = element.name
                }
              });
            })
              if(!auth.isAuthenticated) {
                  openPopup();
              } else{
                  setSelectedProduct(data);
              }
          } } /> </Section>;
        })}
      </CoursesContainer>
      <Popup overlayStyle={{}} contentStyle={{ height: '100%', width: '100%', overflow: 'hidden', backgroundColor: 'inherit', border: 'none' }} defaultOpen={false} open={isPopupOpen}>
        <LoginForm onLoginSuccess={() => setIsPopupOpen(false)} shouldRedirect={false} style={{ position: 'absolute', left: '40%' }} />
      </Popup>
      {selectedProduct &&
        <SectionForm> <CourseForm key={selectedProduct?.id} title={selectedProduct?.title ?? ""} info={selectedProduct?.description ?? ""} id={selectedProduct?.id ?? ""} /></SectionForm>}
    </Container>
    {selectedProduct && 
    <Comments onDelete={(reviewId)=> onDelete(reviewId)} onEditSubmit={(comment, reviewId)=> handleEditComment(reviewId, comment)} onSubmit={(comment)=> handleCreateComment( comment)} reviews={selectedProduct?.reviews} />}
          <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              style={{overflowY: "hidden"}}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
    </>

  )


}


export {LoadCourses}


