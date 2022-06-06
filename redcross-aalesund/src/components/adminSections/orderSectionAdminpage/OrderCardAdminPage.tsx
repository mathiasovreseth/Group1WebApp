import React from 'react';
import styled, {useTheme} from "styled-components";
import {getUserApiResponse} from "../../../models/UserModel";
import {FlexColumnContainer, FlexContainer, MediumText, SmallText} from '../../../styles/CommonStyles';
import {FaCheck, FaCheckCircle, FaCircleNotch, FaPen, FaPenAlt, FaTrash} from 'react-icons/fa';
import {getAllOrders} from "../../../models/OrderModel";

const UserCardContainer = styled(FlexColumnContainer)`
  padding: 2rem 2rem;
  justify-content: space-between;
  margin-right: 2rem;
  height: 40rem;
  background-color: ${props => `${props.theme.palette.primary.background}`};
  border-radius: ${props => `${props.theme.borderRadius}`};
`;

const Button = styled.button`
  border: 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
  font-size: ${props => `${props.theme.fontSizes.small}`};
  padding: 1rem 1rem;
  background-color: ${props => `${props.theme.palette.primary.accentColor}`};
  color: white;
  margin-left: 4rem;
  cursor: pointer;
`;

const SmallTextBold = styled(SmallText) `
  font-weight: 700;
`;


const IconContainer = styled.div`
    display: flex;
    margin: 1.6rem 0 0 1.2rem;
  :hover {
    cursor: pointer;
  }
`

interface orderCardProps {
    order: getAllOrders
    onClickProcessed: (id: number) => void;
}
function formatDate(date: Date): string {
    const firstPart = date.toDateString();
    const secondPart = date.toTimeString().split(" ");
    const timeSplitted = date.toTimeString().split(":");
    return firstPart + " - " +  timeSplitted[0] + ":" +  timeSplitted[1];
}
function OrderCardAdminCard(props: orderCardProps) {
    return (
        <UserCardContainer>
            <FlexContainer style={{padding: "1rem", justifyContent: "space-evenly", borderBottom: "1px solid #333"}}>
                <SmallText>OID: {props.order.id.toString()}</SmallText>
                <SmallText>PID: {props.order.product.id.toString()}</SmallText>
                <SmallText>CID: {props.order.costumer.id.toString()}</SmallText>
            </FlexContainer>
            <div>
                <MediumText style={{marginBottom: "1.2rem"}}>Customer email: {props.order.costumer.email}</MediumText>
                <MediumText>Product title: {props.order.product.title}</MediumText>
            </div>
            <div>
                <MediumText style={{marginBottom: "1.2rem"}}>Order date: {formatDate(props.order.orderDate)}</MediumText>
                <MediumText style={{marginBottom: "1.2rem"}}>Start date: {formatDate(props.order.startDate)}</MediumText>
                <MediumText style={{marginBottom: "1.2rem"}}>End date: {formatDate(props.order.endDate)}</MediumText>
            </div>
            <FlexContainer style={{alignItems: "center"}}>
                <MediumText>Processed:  {props.order.processed.toString()}</MediumText>
                {!props.order.processed &&
                <Button onClick={()=> props.onClickProcessed(props.order.id)}>Mark as processed</Button>
                }
            </FlexContainer>
        </UserCardContainer>

    );
}

export default OrderCardAdminCard;

// <FlexContainer>
//
//     <UserCardContainer>
//         <FlexContainer style={{alignItems: "center"}}>
//             <FlexContainer style={{justifyContent: "flex-start"}}>
//                 <MediumText>{props.order.id.toString()}</MediumText>
//             </FlexContainer>
//             <FlexContainer style={{justifyContent: "flex-start", margin: "0 6rem"}}>
//                 <MediumText>{props.order.costumer.id.toString()}</MediumText>
//             </FlexContainer>
//             <FlexContainer style={{justifyContent: "flex-start"}}>
//                 <MediumText>{props.order.product.id.toString()}</MediumText>
//             </FlexContainer>
//         </FlexContainer>
//         <FlexContainer>
//
//             <FlexContainer style={{width: "20rem", justifyContent: "flex-end"}}>
//                 <MediumText>{props.order.product.title}</MediumText>
//             </FlexContainer>
//             <FlexContainer style={{width: "30rem", justifyContent: "center"}}>
//                 <MediumText>{props.order.costumer.email}</MediumText>
//             </FlexContainer>
//
//             <FlexContainer style={{width: "10rem", justifyContent: "center"}}>
//                 <MediumText>{props.order.processed.toString()}</MediumText>
//             </FlexContainer>
//         </FlexContainer>
//     </UserCardContainer>
//     {!props.order.processed &&
//     <IconContainer>
//         <FaCheckCircle onClick={()=> props.onClickProcessed(props.order.id)} style={{fontSize: "2.6rem", color: theme.palette.primary.accentColor}}/>
//     </IconContainer>
//     }
// </FlexContainer>