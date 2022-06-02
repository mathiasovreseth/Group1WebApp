import React from 'react';
import styled from "styled-components";
import {FlexContainer, Label, MediumText, SmallText} from "../../styles/CommonStyles";

interface ShoppingCartPageProps {
    product: any;
}

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

const InnterContainer = styled(FlexContainer)`
    width: 50vw;
    display: flex;
   flex-direction: column;
    justify-content: start;
    align-items: start;  
`;

const NoItemsTextContainer = styled(FlexContainer) `
  justify-content: center;
  width: 100%;
  margin-top: 5rem;
`;


function ShoppingCartPage(props: ShoppingCartPageProps) {
    return (
        <OuterContainer>
            <InnterContainer>
                <Label>Shopping cart</Label>
                <Divider/>
                {!props.product &&
                    <NoItemsTextContainer>
                        <SmallText>No items in shopping cart</SmallText>
                    </NoItemsTextContainer>
                }
            </InnterContainer>

        </OuterContainer>
    )
}

export default ShoppingCartPage;