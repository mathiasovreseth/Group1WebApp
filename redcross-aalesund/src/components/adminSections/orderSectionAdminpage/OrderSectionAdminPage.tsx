import React, {useEffect, useState} from 'react';
import {sendApiRequest} from "../../../utils/requests";
import {FlexColumnContainer, FlexContainer, MediumText} from "../../../styles/CommonStyles";
import styled from "styled-components";
import {productsApiResponse} from "../../../models/ProductsModel";
import OrderCardAdminCard from "./OrderCardAdminPage";
import {getAllOrders} from "../../../models/OrderModel";
import {toast, ToastContainer} from "react-toastify";
import {sortById} from "../../../utils/Sorting";

const InnerContainer = styled(FlexContainer)`
  justify-content: center;
  margin-top: 5rem;
`;


function ProductSectionAdminPage() {
    let [orders, setOrders] = useState<Array<getAllOrders>>([]);
    // let [productToEdit, setProductToEdit] = useState<productsApiResponse>();

    useEffect(() => {
        sendApiRequest("GET", "/orders/getAll", null, true).then((data: any) => {
            const ordersTemp: Array<getAllOrders> = [];
            data.forEach((order: getAllOrders) => {
                ordersTemp.push({
                    id: order.id,
                    attendees: order.attendees,
                    startDate: new Date(order.startDate),
                    endDate: new Date(order.endDate),
                    orderDate: new Date(order.orderDate),
                    processed: order.processed,
                    costumer: {
                        id: order.costumer.id,
                        email: order.costumer.email,
                    },
                    product: {
                        id: order.product.id,
                        title: order.product.title,
                        description: order.product.description,
                    }
                });
            });
            setOrders(sortById(ordersTemp));
        });
    }, []);



    function onClickProcessed(id: number) {
        sendApiRequest("PUT", "/orders/process-order", {id: id}, false).then(()=> {
            toast.success('Order processed', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                bodyStyle: {fontSize: "3.2rem"},
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            let orderToEdit: Array<getAllOrders> = orders.filter((order)=> order.id == id);
            const newOrderList = orders.filter((t) => t.id != id);
            orderToEdit[0].processed = true;
            newOrderList.push(orderToEdit[0]);
            setOrders(newOrderList);

        }).catch(()=> {
            toast.error('Error processing order', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                bodyStyle: {fontSize: "3.2rem"},
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        })
    }
    return (
        <InnerContainer>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={true}
                style={{overflowY: "hidden"}}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <FlexContainer style={{justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap", rowGap: "1.2rem"}}>
                {orders && orders.map((data: getAllOrders) => {
                    return <OrderCardAdminCard onClickProcessed={onClickProcessed} key={data.id} order={data}/>
                })}
            </FlexContainer>
        </InnerContainer>
    )
}

export default ProductSectionAdminPage;
