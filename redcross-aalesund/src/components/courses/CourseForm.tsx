import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import DropdownMenu, {DropdownItem, DropdownItemGroup} from "@atlaskit/dropdown-menu";
import {SmallText, XSmallText} from '../../styles/CommonStyles';
import "react-datepicker/dist/react-datepicker.css";
import "../courses/datepicker.css";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { FaSquare} from "react-icons/fa";
import {isValidEmail, isValidPassword} from "../../utils/FormValidation";

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
    &:hover,
  &:focus {
    
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

const Radio = styled.input.attrs({type: 'radio'})`
  width: 10%;
`;


const Label = styled.label`
font-size: ${props => `${props.theme.fontSizes.xSmall}`};
`;

const InfoText = styled.div`
    padding-top: 2rem;
    background-color: #ededed;  
    text-align: center;
`;

const Li = styled.li`
  display: flex;
  list-style: square;
  align-items: center;
  margin-bottom: 1.2rem;
  white-space: nowrap;
  font-size: ${props => `${props.theme.fontSizes.small}`};
  @media (max-width:  560px) {
    white-space: normal;
    align-items: center;
    line-height: normal;
   
  }
`;


function splitString(string: string) {
    let sentences = string.split(". ");
    return sentences
}



// must send value for course selected
export function CourseForm(props: {title: string; info: string;}) {
   
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [attendees, setAttendees] = useState("");
    const [language, setLanguage] = useState("");
    const [selectedStartTime, setSelectedStartTime] = useState(1);
    const[courseBooking, setCourseBooking] = useState<Array<{
        name: string,
        email: string
        date: Date,
        attendees: string
        language: string
        selectedStartTime: number
        }>
        >([ ]);
    const[formError, setFormError] = useState<{
        nameErr?: string;
        emailErr?: string;
        attendees?: string;
    }>({
        nameErr: "",
        emailErr: "",
        attendees: "",
    });

    const title = props.title
    const info = props.info
    const infoArray: Array<String> = splitString(info);
    const navigate = useNavigate();
    function validateForm() {
        let isValid = true;
        if (name.length === 0) {
            setFormError((prev: any) => {
                if (prev) {
                    console.log("HELLO MADAGASKAR");
                    return {...prev, name:'Name is required'};
                }
            });
            isValid = false;

        }
        if (email.length === 0) {
            setFormError((prev: any) => {
                if (prev) {
                    return {...prev, emailErr:'Email is Required'};
                }
            });
            isValid = false;

        } else if (!isValidEmail(email)) {
            setFormError((prev: any) => {
                if (prev) {
                    return {...prev, emailErr:'Invalid email address'};
                }
            });
            isValid = false;
        }
        if(attendees.length == 0 || parseInt(attendees) <= 0 ) {
            setFormError((prev: any) => {
                if (prev) {
                    return {...prev, attendees:'Attendees is required'};
                }
            });
            isValid = false;
        }
        return isValid;
    }

    function onSubmit(e: any) {
        e.preventDefault();
        if(validateForm()) {
            setCourseBooking( [{name, email, date, attendees, language, selectedStartTime}])
            localStorage.setItem("courseBooking", JSON.stringify({
                name:name,
                email:email,
                date:date,
                attendees:attendees,
                language:language,
                title: props.title,
                description: props.info,
                selectedStartTime:selectedStartTime}));
            window.dispatchEvent( new Event('storage') );
            navigate("/shopping-cart", {
                replace: true
            });
        }
    }

    console.log(formError.nameErr);
    return(
        <Container>
            <InfoText>
                <H2>About {title}</H2>
                <Paragraph>
                    {
                    infoArray.map(function (value) {
                     return <Li><FaSquare style={{marginRight:".8rem"}}/>{value}</Li>})
                    }
                </Paragraph>
            </InfoText>
            <FormRow>
                <H3>Book {title} now</H3>
                <BookingForm action="" method="post">
                    <Input name='Name' onChange={(e) => setName(e.target.value)} placeholder='Name'/>
                    {formError.nameErr && <XSmallText style={{color: "red"}}>{formError.nameErr}</XSmallText>}
                    <Input name='Email' onChange={(e) => setEmail(e.target.value)}  placeholder='Email'/>
                    {formError.emailErr && <XSmallText style={{color: "red"}}>{formError.emailErr}</XSmallText>}
                    <DatePicker
                        className='date-picker'
                        placeholderText="Click to select a date"
                        selected={date}
                        onChange={(date:Date) => setDate(date)}
                        dateFormat={"dd-MM-yyyy"}
                        />
                    <Input  name='Course-attendees' onChange={(e) => setAttendees(e.target.value)} placeholder='Course Attendees'/>
                    {formError.attendees && <XSmallText style={{color: "red"}}>{formError.attendees}</XSmallText>}
                    <Label> <Radio onClick={() => setLanguage("English")} name='language' id='english' /> English</Label>
                    <Label> <Radio name='language' onClick={() => setLanguage("Norwegian")} id='norwegian' /> Norwegian</Label>
                    <br />
                    <Label>Choose start time: {selectedStartTime==1? "10:00 - 14:00 ": "17:00 - 21:00 "}</Label>
                    <DropdownMenu>
                        <DropdownItemGroup>
                            <DropdownItem onClick={() => setSelectedStartTime(1)}>
                                <SmallText >10:00 - 14:00</SmallText>
                            </DropdownItem>
                            <DropdownItem onClick={() => setSelectedStartTime(2)}>
                                <SmallText>17:00 - 21:00</SmallText>
                            </DropdownItem>
                        </DropdownItemGroup>
                    </DropdownMenu>



                    <Submit type="submit"
                    onClick={(e)=> onSubmit(e)}
                    value="Book course"/>

                </BookingForm>
            </FormRow>
        dsa
            
        </Container>
    )
    
}
