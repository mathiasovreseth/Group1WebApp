import React from 'react';
import styled from "styled-components";
import {getUserApiResponse} from "../../../models/UserModel";
import {FlexContainer, MediumText} from '../../../styles/CommonStyles';
import {FaPen, FaPenAlt, FaTrash} from 'react-icons/fa';

const UserCardContainer = styled.div`
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  width: 90rem;
  margin-bottom: 2rem;
  background-color: ${props => `${props.theme.palette.primary.background}`};
  border-radius: ${props => `${props.theme.borderRadius}`};
`;

const IconContainer = styled.div`
    :hover {
      cursor: pointer;
    }
`

interface orderCardProps {
    orderId: string;
    customerId: string;
    productId: string;
}

function OrderCardAdminCard(props: orderCardProps) {
    return (
        <UserCardContainer>
            <FlexContainer style={{width: "2rem", justifyContent: "center"}}>
                <MediumText >{props.orderId.toString()}</MediumText>
            </FlexContainer>
            <FlexContainer style={{width: "20rem", justifyContent: "center"}}>
                <MediumText>{props.customerId}</MediumText>
            </FlexContainer>
            <FlexContainer style={{width: "30rem", justifyContent: "center"}}>
                <MediumText>{props.customerId}</MediumText>
            </FlexContainer>
            {/*<IconContainer style={{marginLeft: "1.2rem"}}>*/}
            {/*    <FaPen onClick={() => props.onEditClick(props.user)} color={"grey"} style={{width: "2rem", height: "2rem"}}/>*/}
            {/*</IconContainer>*/}
            {/*<IconContainer style={{marginLeft: "1.2rem"}}>*/}
            {/*    <FaTrash onClick={() => props.onDeleteClick(props.user)} color={"red"} style={{width: "2rem", height: "2rem"}}/>*/}
            {/*</IconContainer>*/}
        </UserCardContainer>
    );
}

export default OrderCardAdminCard;