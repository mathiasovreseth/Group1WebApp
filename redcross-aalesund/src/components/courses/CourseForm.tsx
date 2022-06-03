import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import DropdownMenu, {DropdownItem, DropdownItemGroup} from "@atlaskit/dropdown-menu";
import {SmallText, XSmallText} from '../../styles/CommonStyles';
import "react-datepicker/dist/react-datepicker.css";
import "../courses/datepicker.css";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { FaSquare} from "react-icons/fa";

import "../courses/datepicker.css"
import {isValidEmail} from "../../utils/FormValidation";
import {useAuth} from "../../auth/Auth";



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
   
  @media (max-width:  56.25em) {
    justify-items: center;
    grid-template-columns: 1fr;
    align-items: center;
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

const Input = styled.input`
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
  @media (max-width:  56.25em) {
    display: none;
  }
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
export function CourseForm(props: {title: string; info: string; id: number;}) {
   
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [attendees, setAttendees] = useState(1);
    const [language, setLanguage] = useState("English");
    const [selectedStartTime, setSelectedStartTime] = useState("10:00 - 14:00");
    const[courseBooking, setCourseBooking] = useState<Array<{
        email: string
        date: Date,
        attendees: number
        language: string
        selectedStartTime: string
        }>
        >([ ]);
    const[formError, setFormError] = useState<{
        emailErr?: string;
        attendees?: string;
    }>({
        emailErr: "",
        attendees: "",
    });

    const title = props.title
    const info = props.info
    const id = props.id
    const infoArray: Array<String> = splitString(info);
    const auth = useAuth();
    const navigate = useNavigate();

    function onSubmit(e: any) {
        e.preventDefault();
            setCourseBooking( [{email, date, attendees, language, selectedStartTime}])
            localStorage.setItem("courseBooking", JSON.stringify({
                email:email,
                date:date,
                attendees:attendees,
                language:language,
                id: props.id,
                title: props.title,
                description: props.info,
                selectedStartTime:selectedStartTime}));
            window.dispatchEvent( new Event('storage') );
            navigate("/shopping-cart", {
                replace: true
            });
    }

    function getCourseSelected(id: number){
        switch(id){
            //Two day course
            case 1:
                return <Label>Choose start time: {selectedStartTime ? "10:00 - 14:00 ": "17:00 - 21:00 "}</Label>
            //One day course
            case 2:
                return <Label>Choose start time: {selectedStartTime ? "10:00 - 16:00 ": "14:00 - 20:00 "}</Label>
            //Short Consulation
            case 3:
                return <Label>Choose start time: {selectedStartTime ? "13:00 - 14:00 ": "17:00 - 18:00 "}</Label>
        }
    }

    function getStartTimes(id: number){
        switch(id){
            //Two day course
            case 1:
                return <><DropdownItem onClick={() => setSelectedStartTime("10:00 - 14:00")}>
                            <SmallText>10:00 - 14:00</SmallText>
                         </DropdownItem>
                        <DropdownItem onClick={() => setSelectedStartTime("17:00 - 21:00")}>
                            <SmallText>17:00 - 21:00</SmallText>
                        </DropdownItem></>
            //One day course
            case 2:
                return <><DropdownItem onClick={() => setSelectedStartTime("10:00 - 16:00")}>
                            <SmallText>10:00 - 16:00</SmallText>
                        </DropdownItem>
                        <DropdownItem onClick={() => setSelectedStartTime("14:00 - 20:00")}>
                            <SmallText>14:00 - 20:00</SmallText>
                         </DropdownItem></>
            //Short Consulation
            case 3:
                return <><DropdownItem onClick={() => setSelectedStartTime("13:00 - 14:00")}>
                            <SmallText>13:00 - 14:00</SmallText>
                        </DropdownItem>
                        <DropdownItem onClick={() => setSelectedStartTime("17:00 - 18:00")}>
                            <SmallText>17:00 - 18:00</SmallText>
                        </DropdownItem></>
        }

    }


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
                    <Input defaultValue={auth.user.email} disabled={true} type={"text"} name='Email' onChange={(e) => e.preventDefault()}  placeholder='Email'/>
                    <DatePicker
                        className='date-picker'
                        placeholderText="Click to select a date"
                        selected={date}
                        onChange={(date:Date) => setDate(date)}
                        dateFormat={"dd-MM-yyyy"}
                        />
                        <Label> <Radio defaultChecked={true}  onClick={() => setAttendees(1)} name='attendees' id='single-group' /> Single group</Label>
                    <Label> <Radio  name='attendees' onClick={() => setAttendees(5)} id='five-person-group' /> Five person group</Label>
                    <br />
                        <Label> <Radio defaultChecked={true} onClick={() => setLanguage("English")} name='language' id='english' /> English</Label>
                    <Label> <Radio name='language' onClick={() => setLanguage("Norwegian")} id='norwegian' /> Norwegian</Label>
                    <br />
                    <div>
                    {getCourseSelected(id)}
                    <DropdownMenu>
                        <DropdownItemGroup>
                            {getStartTimes(id)}
                        </DropdownItemGroup>
                    </DropdownMenu>
                    </div>


                    <Submit type="submit"
                    onClick={(e)=> onSubmit(e)}
                    value="Book course"/>

                </BookingForm>
            </FormRow>
        </Container>
    )
    
}
