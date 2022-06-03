import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {FlexContainer, Label, MediumText, SmallText, XSmallText} from "../../styles/CommonStyles";
import {FaCross, FaCrosshairs, FaRegCheckCircle, FaStopCircle, FaTrash} from "react-icons/fa";
import CrossSymbol from '../../assets/cross.svg';
import {sendApiRequest} from "../../utils/requests";
import {useAuth} from "../../auth/Auth";

const OuterContainer = styled(FlexContainer)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10rem;
`

const Divider = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: #555555;
`;

const InnerContainer = styled(FlexContainer)`
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  @media (max-width: ${props => `${props.theme.breakPoints.laptop}`}) {
    width: 90vw;
  }
`;

const NoItemsTextContainer = styled(FlexContainer)`
  justify-content: center;
  width: 100%;
  margin-top: 5rem;
`;
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
  }
`

const ProductCard = styled(FlexContainer)`
  margin-top: 4rem;
  width: 100%;
  row-gap: 2rem;
  background-color: ${props => `${props.theme.palette.primary.background}`};
  border-radius: ${props => `${props.theme.borderRadius}`};
  padding: 2rem 2rem;

  @media (max-width: 46.5em) {
    flex-direction: column;
  }
`;
const RightSectionProductCard = styled(FlexContainer)`
  width: 100%;
  column-gap: 4rem;
  overflow: visible;
  justify-content: space-evenly;
  @media (max-width: 46.5em) {
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 2rem;
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
  width: 100%;
  height: 4.5rem;
  overflow-y: hidden;
`;


interface productShoppingCart {
    id: number;
    title: string;
    description: string;
    selectedStartTime: string;
    date: Date;
    attendees: string;
}

interface OrderBody {
    email: string;
    productId: number;
    startDate: number;
    endDate: number;
}

function ShoppingCartPage() {
    const [order, setOrder] = useState<productShoppingCart | null>();
    const auth = useAuth();
    useEffect(() => {
        const productString = localStorage.getItem("courseBooking");

        if (productString) {
            const productParsed: productShoppingCart = JSON.parse(productString);
            let fullDate: Date = new Date(productParsed.date);
            // const dateFormatted = new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate());
            setOrder({
                id: productParsed.id,
                description: productParsed.description,
                title: productParsed.title,
                attendees: productParsed.attendees,
                date: fullDate,
                selectedStartTime:productParsed.selectedStartTime,

            });

        } else {
            setOrder(null);
        }
    }, []);

    function onOrderSubmit() {
        const dateArray: Array<Date> | null = formatDate();
        if(dateArray && order) {
            const orderBody:OrderBody = {
                productId: order.id,
                email: auth.user.email,
                startDate: dateArray[0].getTime(),
                endDate: dateArray[1].getTime(),
            }
        }

        // sendApiRequest("POST", "/orders/add");
    }
    function formatDate(): Array<Date> | null {
        if(order) {
            const date: Date = order.date;
            const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const splittedTime = order.selectedStartTime.split(" ");
            const startTime = splittedTime[0];
            const endTime = splittedTime[2];
            const startTimeSplitted = startTime.split(":")
            const endTimeSplitted = endTime.split(":")
            startDate.setHours(parseInt(startTimeSplitted[0]),  0, 0, 0);
            endDate.setHours(parseInt(endTimeSplitted[0]),  0, 0, 0);
            return [startDate, endDate]
        } else {
            return null;
        }
    }
    return (
        <OuterContainer>
            <InnerContainer>
                <Label>Shopping cart</Label>
                <Divider/>
                {!order &&
                <NoItemsTextContainer>
                    <SmallText>No items in shopping cart</SmallText>
                </NoItemsTextContainer>
                }

                {order &&
                <div style={{width: "100%"}}>
                    <ProductCard>
                        <div style={{maxWidth: "40rem"}}>
                            <Label>{order.title}</Label>
                            <XSmallText>{order.description}</XSmallText>
                        </div>
                        <RightSectionProductCard>

                            <div>
                                <Label>Date</Label>
                                <XSmallText>{order.date.toDateString() + " at " +  order.selectedStartTime}</XSmallText>
                            </div>
                            <div>
                                <Label>Attendees</Label>
                                <XSmallText>{order.attendees}</XSmallText>
                            </div>
                            <IconContainer>
                                <img style={{width: "1.6rem", height: "1.6rem"}} src={CrossSymbol} alt="remove"
                                     onClick={() => {
                                         setOrder(null);
                                         localStorage.removeItem("courseBooking");
                                         window.dispatchEvent(new Event('storage'));
                                     }}/>
                            </IconContainer>
                        </RightSectionProductCard>
                    </ProductCard>
                    <Button onClick={()=> onOrderSubmit()}>Book</Button>
                </div>
                }
            </InnerContainer>

        </OuterContainer>
    )
}

export default ShoppingCartPage;