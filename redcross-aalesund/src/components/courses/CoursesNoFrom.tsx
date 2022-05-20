import React,{ useState, useEffect }  from "react";
import { useLocation } from 'react-router-dom'
import { FaSquare } from "react-icons/fa";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Course} from "./Course";
import {CourseForm} from "./CourseForm";
import { sendApiRequest } from "../../utils/requests";
import { getCoursesApiResponse } from "../../models/CourseModel";

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
  padding-bottom: 2rem;
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
    transform: scale(1.02);
  }
`;

const SelectedCourseDiv = styled.div`
  
`;

function CourseNoForm() {
  let [product, setProduct] = useState<Array<getCoursesApiResponse>>([]);
  let [selectedProduct, setSelectedProduct] = useState<getCoursesApiResponse>();

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

  return(
    <div>
      <Container>
        <H1> Our courses</H1>
        <CoursesContainer>
          {product && product.map((data: getCoursesApiResponse) => {
          return <Section> <Course key={data.id} product={data} onSubmit={setSelectedProduct}/> </Section>
        })}
        </CoursesContainer>
      </Container>
    </div>
  )
}


export {CourseNoForm};
