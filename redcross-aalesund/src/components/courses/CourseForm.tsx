import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: grid;
    
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 30px;

    padding-left: 10%;
    padding-right: 10%;
    padding-top: 2rem;
    @media  (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}){
    flex-direction: column;
    }
`;

const H3 = styled.h3`
    font-size: ${props => `${props.theme.fontSizes.xLarge}`};
    text-align: center;
`;

const H2 = styled.h2`
    font-size: ${props => `${props.theme.fontSizes.large}`};
    text-align: center;
`;

const BookingForm = styled.form`
    font-size: ${props => `${props.theme.fontSizes.large}`};
`;

const Paragraph = styled.p`
  font-size: ${props => `${props.theme.fontSizes.medium}`};
  margin: 2rem;
  @media screen and (max-width: 800px) {
    font-size: 1rem;
  }
`;

const FormRow = styled.div`
`;

const Input = styled.input.attrs({ type: 'text' })`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const Submit = styled.input.attrs({ type: 'submit' })`
    width: 100%;
    background-color: #b70f0c;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const InfoText = styled.div`
    padding-top: 2rem;
    background-color: #ededed;  
    text-align: center;
`;



// must take props form Courses so right information is shown
// must send value for course selected
export function CourseForm(props: {title: string; info: string;}) {
    const title = props.title
    const info = props.info
   
    return(
        <Container>
            <InfoText>
                <H2>About {title}</H2>
                <Paragraph>
                    {info}
                </Paragraph>
            </InfoText>
            <FormRow>
                <H3>Book {title} now</H3>
                <BookingForm action="" method="post">
                    <Input name='Name' placeholder='Name'/>
                    <Input name='Email' placeholder='Email'/>
                    <Input name='Date' placeholder='Date'/>
                    <Input name='Message' placeholder='Message'/>
                    <Submit type="submit" value="Book course"/>
                </BookingForm>
            </FormRow>
        
            
        </Container>
    )
    

}
