import React, {useEffect, useState} from 'react';
import {sendApiRequest} from "../../utils/requests";
import {FlexColumnContainer, FlexContainer, MediumText} from "../../styles/CommonStyles";
import styled from "styled-components";
import {productsApiResponse} from "../../models/ProductsModel";
import ProductsAdminPageCard from "./ProductsAdminPageCard";

const InnerContainer = styled(FlexContainer)`
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 5rem;
`;

function ProductSectionAdminPage() {
    let [products, setProducts] = useState<Array<productsApiResponse>>([]);
    let [productToEdit, setProductToEdit] = useState<productsApiResponse>();

    let [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    useEffect(()=> {
        sendApiRequest("GET","/products/getAll",null, true).then((data: any) => {
            const productsTemp: any = [];
            data.forEach((product: productsApiResponse)=> {
                productsTemp.push({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                });
            });
            setProducts(productsTemp);
        }).catch((err: any) => {
            console.log(err);
        });
    }, []);

    function handleDeleteProduct(product: productsApiResponse) {
        if(window.confirm("Are you sure?")) {
            const newProductsList = products.filter((t) =>t.id != product.id);
            setProducts(newProductsList);
            const postData = {
                id: product.id,
            };
            // sendApiRequest("POST", "/products/remove",postData, false);
        }

    }
    function openPopup(product: productsApiResponse) {
        setProductToEdit(product);
        setIsPopupOpen(true);
    }
    function handleEditProduct(editedProduct: productsApiResponse) {
        const productToEdit = products.filter((t) => t.id == editedProduct.id);
        const newProductsList = products.filter((t) => t.id != editedProduct.id);
        productToEdit[0].title = editedProduct.title;
        productToEdit[0].description = editedProduct.description;
        newProductsList.push(productToEdit[0]);
        setProducts(newProductsList);

        // sendApiRequest("POST", "/users/update", editedUser, false);
        setIsPopupOpen(false);

    }

    return (
        <InnerContainer>
            <FlexColumnContainer style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
                <FlexContainer style={{width: "80rem",padding: "0 2rem", justifyContent: "space-between", marginBottom: "2rem"}}>
                    <FlexContainer style={{width: "2rem", justifyContent: "center"}}>
                        <MediumText>Id</MediumText>
                    </FlexContainer>
                    <FlexContainer style={{width: "20rem", justifyContent: "center"}}>
                        <MediumText>Title</MediumText>
                    </FlexContainer>
                    <FlexContainer style={{width: "30rem", justifyContent: "center"}}>
                        <MediumText>Description</MediumText>
                    </FlexContainer>
                    {/*<Popup   defaultOpen={false} open={isPopupOpen}>*/}
                    {/*    <EditUserForm user={productToEdit} onCancel={()=> setIsPopupOpen(false)} onSubmit={(user)=> handleEditProduct(user)} />*/}
                    {/*</Popup>*/}
                </FlexContainer>
                {products && products.map((data: productsApiResponse)=> {
                    return <ProductsAdminPageCard key={data.id} product={data} onEditClick={(product)=> openPopup(product)}
                                                  onDeleteClick={(product)=> handleDeleteProduct(product)}/>
                })}
            </FlexColumnContainer>
        </InnerContainer>
    )
}

export default ProductSectionAdminPage;
