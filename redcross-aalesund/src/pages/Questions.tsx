
import React, {CSSProperties, useState} from "react";
import styled from "styled-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { FlexColumnContainer, H1, Input, LargeText, SmallText } from "../styles/CommonStyles";


const Form = styled.form`
  border-radius: ${props => `${props.theme.borderRadius}`};
  box-shadow: 0 0 1.5rem 0 rgba(90, 90, 90);
  display: inline-block;
  margin: 2rem;
  padding: 1rem;
`;

const FormContainer = styled.div`
   text-align: center;
   
`;


const Button = styled.button`
  border: 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
  font-size: ${props => `${props.theme.fontSizes.large}`};
  padding: 1rem 0;
  margin-top: 2rem;
  background-color: ${props => `${props.theme.palette.primary.accentColor}`};
  box-shadow: 0 0 2rem 0 rgba(90, 90, 90);
  color: white;
  cursor: pointer;
  width: 26rem;
  height: 4.5rem;
  overflow-y: hidden;
`;


const Label = styled.label`
  font-size: ${props => `${props.theme.fontSizes.medium}`};
  margin-bottom: 0.8rem;
`

const InputText = styled.input`
    font-size: ${props => `${props.theme.fontSizes.medium}`};
    padding: 1rem 2rem;
    margin: auto;
    display: block;
    border: 1px solid #ccc;
    box-sizing: border-box;
`
const InputMail = styled(InputText)`
    
`


function AskQuestion() {
    return(
        <>
        <H1></H1>
            <FormContainer>
            <Form>
                <LargeText>Fill out your question</LargeText>
                <Label>E-mail</Label>
                <InputMail type="email" name="email" placeholder="Your email.."/>
                <Label>Question</Label>
                <InputText type="text" name="Question" placeholder="Your question.."/>
                <Button type="submit">Book your training</Button>
            </Form>
            </FormContainer>   
        </>
    );
}

export default AskQuestion;
