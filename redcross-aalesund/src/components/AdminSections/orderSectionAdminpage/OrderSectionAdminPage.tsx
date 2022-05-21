import React, {useEffect, useState} from 'react';
import {sendApiRequest} from "../../../utils/requests";
import {FlexColumnContainer, FlexContainer, MediumText} from "../../../styles/CommonStyles";
import styled from "styled-components";
import {productsApiResponse} from "../../../models/ProductsModel";
import OrderCardAdminCard from "./OrderCardAdminPage";

const InnerContainer = styled(FlexContainer)`
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 5rem;
`;


function ProductSectionAdminPage() {
    let [orders, setOrders] = useState<Array<productsApiResponse>>([]);
    let [productToEdit, setProductToEdit] = useState<productsApiResponse>();

    useEffect(()=> {
        sendApiRequest("GET","/orders/getAll",null, true).then((data: any) => {
            //     const ordersTemp: any = [];
            //     data.forEach((product: productsApiResponse)=> {
            //         ordersTemp.push({
            //             id: product.id,
            //             title: product.title,
            //             description: product.description,
            //         });
            //     });
            //     setOrders(ordersTemp);
            // }).catch((err: any) => {
            //     console.log(err);
            // });
        });
    }, []);

    return (
        <InnerContainer>
            <FlexColumnContainer style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
                <FlexContainer style={{width: "80rem",padding: "0 2rem", justifyContent: "space-between", marginBottom: "2rem"}}>
                    <FlexContainer style={{width: "20rem", justifyContent: "center"}}>
                        <MediumText>Order Id</MediumText>
                    </FlexContainer>
                    <FlexContainer style={{width: "20rem", justifyContent: "center"}}>
                        <MediumText>Customer Id</MediumText>
                    </FlexContainer>
                    <FlexContainer style={{width: "20rem", justifyContent: "center"}}>
                        <MediumText>Product Id</MediumText>
                    </FlexContainer>
                </FlexContainer>
                {orders && orders.map((data: productsApiResponse)=> {
                    return <OrderCardAdminCard orderId={""} productId={""} customerId={""}/>
                })}
            </FlexColumnContainer>
        </InnerContainer>
    )
}

export default ProductSectionAdminPage;
