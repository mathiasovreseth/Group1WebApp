import React from "react";
import {productsApiResponse} from "./ProductsModel";


export interface getAllOrders {
    id: number
    attendees: number;
    endDate: Date;
    startDate: Date;
    orderDate: Date;
    costumer: {
        id: number;
        email: string;
    }
    product: productsApiResponse
    processed: boolean;

}