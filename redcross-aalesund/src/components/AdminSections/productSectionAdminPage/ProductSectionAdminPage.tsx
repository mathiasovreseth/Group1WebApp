import React, {useEffect, useState} from 'react';
import {sendApiRequest} from "../../../utils/requests";
import {FlexColumnContainer, FlexContainer, MediumText} from "../../../styles/CommonStyles";
import styled from "styled-components";
import {productsApiResponse} from "../../../models/ProductsModel";
import ProductsAdminPageCard from "./ProductsAdminPageCard";
import EditProductForm, {editedProductFields} from "./EdiitProductForm";
import Popup from "reactjs-popup";

const InnerContainer = styled(FlexContainer)`
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 5rem;
`;

const Button = styled.button`
  border: 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
  font-size: ${props => `${props.theme.fontSizes.large}`};
  padding: 1rem 0;
  background-color: ${props => `${props.theme.palette.primary.accentColor}`};
  box-shadow: 0 0 5rem 0 rgba(90, 90, 90);
  color: white;
  cursor: pointer;
  width: 26rem;
  height: 4.5rem;
  overflow-y: hidden;
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
            sendApiRequest("POST", "/products/remove",postData, false);
        }

    }
    function openPopup(product: productsApiResponse) {
        setProductToEdit(product);
        setIsPopupOpen(true);
    }
    function handleEditProduct(editedProduct: editedProductFields) {
        // if id is null the user has created a product
        if(!editedProduct.id) {
            sendApiRequest("POST", "/products/add", editedProduct, false);
            const productToAdd:productsApiResponse = {
                id: "refresh to set",
                title: editedProduct.title,
                description: editedProduct.description,
            }
            setProducts([...products, productToAdd]);
        } else {

            sendApiRequest("POST", "/products/update", editedProduct, false);

            const productToEditList = products.filter((t) => t.id == editedProduct.id);
            const newProductList = products.filter((t) => t.id != editedProduct.id);
            productToEditList[0].title = editedProduct.title;
            productToEditList[0].description = editedProduct.description;
            newProductList.push(productToEditList[0]);
            setProducts(newProductList);
        }


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
                    <Popup   defaultOpen={false} open={isPopupOpen}>
                        <EditProductForm product={productToEdit} onCancel={()=> setIsPopupOpen(false)} onSubmit={(product)=> handleEditProduct(product)} />
                    </Popup>
                </FlexContainer>
                {products && products.map((data: productsApiResponse)=> {
                    return <ProductsAdminPageCard key={data.id} product={data} onEditClick={(product)=> openPopup(product)}
                                                  onDeleteClick={(product)=> handleDeleteProduct(product)}/>
                })}
                <Button onClick={()=> setIsPopupOpen(true)} style={{width: "100%"}} disabled={false}>ADD product</Button>
            </FlexColumnContainer>
        </InnerContainer>
    )
}

export default ProductSectionAdminPage;
