import React,{ useState, useEffect }  from "react";
import { useLocation } from 'react-router-dom'
import { FaSquare } from "react-icons/fa";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Course} from "../components/courses/Course";
import {CourseForm} from "../components/courses/CourseForm";
import { CommentSection } from "./CommentSection";
import {sendApiRequest} from "../../src/utils/requests"
import { getCoursesApiResponse } from "../models/CourseModel";
import Popup from "reactjs-popup";
import LoginForm from "../components/forms/LoginForm";
import authHelper from "../auth/AuthProvider";
import { useAuth } from "../auth/Auth";
import { FlexColumnContainer } from "../styles/CommonStyles";

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
  margin: 5rem 0 1rem 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
  background: #ededed;
  justify-content: center;
  align-items: center;
  transform: scale(1);
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

const SelectedCourseDiv = styled.div`
  
`;



function LoadCourses() {
  const [product, setProduct] = useState<Array<getCoursesApiResponse>>([]);
  const [selectedProduct, setSelectedProduct] = useState<getCoursesApiResponse>();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
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
          console.log(productTemp);
      }).catch((err: any) => {
          console.log(err);
      });
  }, []);


  function openPopup() {
    if(!auth.isAuthenticated){
      setIsPopupOpen(true);
    }
    
}
  console.log(selectedProduct);
  
  return(
      <Container>
        <H1> Our courses</H1>
        <CoursesContainer>
          {product && product.map((data: getCoursesApiResponse) => {
          return <Section  > <Course key={data.id} product={data} onSubmit={(data) => {
            openPopup(); setSelectedProduct(data);
          }}/> </Section>
        })}
        </CoursesContainer>
        <Popup  overlayStyle={{}} contentStyle={{height: '100%', width: '100%', overflow: 'hidden', backgroundColor: 'inherit',  border: 'none'}} defaultOpen={false} open={isPopupOpen}>
          <LoginForm style={{position: 'absolute',left: '40%'}} />
        </Popup>
        {selectedProduct&&
         <Section> <CourseForm key={selectedProduct?.id} title={selectedProduct?.title??""} info={selectedProduct?.description??""}/></Section>
        }
         
      </Container>
  

  )
}





export {LoadCourses}


