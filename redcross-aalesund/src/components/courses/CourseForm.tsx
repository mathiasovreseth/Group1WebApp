import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import DropdownMenu, {DropdownItem, DropdownItemGroup} from "@atlaskit/dropdown-menu";
import { SmallText } from '../../styles/CommonStyles';
import "react-datepicker/dist/react-datepicker.css";
import "../courses/datepicker.css"
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import { FaSquare} from "react-icons/fa";
>>>>>>> 7c8ec1773118d94c9bf147e79201852c3261d8f4

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
        >([    ]);
    const title = props.title
    const info = props.info
    const infoArray: Array<String> = splitString(info); 

   
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
                    <Input name='Name' onInput={() => setName(Input)} placeholder='Name'/>
                    <Input name='Email' onInput={() => setEmail(Input)}  placeholder='Email'/>
                    <DatePicker
                        className='date-picker'
                        placeholderText="Click to select a date"
                        selected={date}
                        onChange={(date:Date) => setDate(date)}
                        dateFormat={"dd-MM-yyyy"}
                        />
                    <Input name='Course-attendees' onInput={() => setAttendees(Input)} placeholder='Course Attendees'/>
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

                    <Link to='/shopping-cart'>

                    <Submit type="submit" 
                    onSubmit={() =>{
                        setCourseBooking( [{name, email, date, attendees, language, selectedStartTime}])
                        localStorage.setItem("courseBooking", JSON.stringify(courseBooking))
                    }}
                    value="Book course"/>
                    </Link>
                </BookingForm>
            </FormRow>
        
            
        </Container>
    )
    
}
