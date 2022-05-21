import React, {CSSProperties} from 'react';
import styled from "styled-components";
import {getUserApiResponse} from "../../../models/UserModel";
import {FlexContainer, MediumText} from '../../../styles/CommonStyles';
import {FaPen, FaPenAlt, FaTrash} from 'react-icons/fa';
import {productsApiResponse} from "../../../models/ProductsModel";

const ProductCardContainer = styled.div`
  height: 20rem;
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

interface UserCardProps {
    product: productsApiResponse;
    onDeleteClick: (product: productsApiResponse) => void;
    onEditClick: (product: productsApiResponse) => void;
}

function ProductsAdminPageCard(props: UserCardProps) {
    return (
        <ProductCardContainer>
            <FlexContainer>
                <FlexContainer style={{width: "22rem",justifyContent: "flex-start"}}>
                <MediumText >{props.product.id.toString()}</MediumText>
            </FlexContainer>
            <FlexContainer style={{width: "20rem", justifyContent: "flex-start"}}>
                <MediumText>{props.product.title}</MediumText>
            </FlexContainer>
            </FlexContainer>
            <FlexContainer style={{alignItems: "center"}}>

            <FlexContainer style={{width: "30rem", justifyContent: "flex-start"}}>
                <MediumText>{props.product.description}</MediumText>
            </FlexContainer>
            <IconContainer style={{marginLeft: "1.2rem"}}>
                <FaPen onClick={() => props.onEditClick(props.product)} color={"grey"} style={{width: "2rem", height: "2rem"}}/>
            </IconContainer>
            <IconContainer style={{marginLeft: "1.2rem"}}>
                <FaTrash onClick={() => props.onDeleteClick(props.product)} color={"red"} style={{width: "2rem", height: "2rem"}}/>
            </IconContainer>
            </FlexContainer>
        </ProductCardContainer>
    );
}

export default ProductsAdminPageCard;