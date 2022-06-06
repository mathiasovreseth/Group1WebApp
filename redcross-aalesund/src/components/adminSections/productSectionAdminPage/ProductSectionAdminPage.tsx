import React, {useEffect, useState} from 'react';
import {sendApiRequest} from "../../../utils/requests";
import {FlexColumnContainer, FlexContainer, MediumText} from "../../../styles/CommonStyles";
import styled from "styled-components";
import {productsApiResponse} from "../../../models/ProductsModel";
import ProductsAdminPageCard from "./ProductsAdminPageCard";
import EditProductForm, {editedProductFields} from "./EdiitProductForm";
import Popup from "reactjs-popup";
import {sortById} from "../../../utils/Sorting";
import {toast, ToastContainer} from "react-toastify";

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
    let [productToEdit, setProductToEdit] = useState<productsApiResponse | null>();

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
            setProducts(sortById(productsTemp));
        }).catch((err: any) => {
            console.log(err);
        });
    }, []);

    function handleDeleteProduct(product: productsApiResponse) {
        if(window.confirm("Are you sure?")) {
            const newProductsList = products.filter((t) =>t.id != product.id);
            setProducts(sortById(newProductsList));

            const postData = {
                id: product.id,
            };
            sendApiRequest("DELETE", "/products/remove",postData, false).then((res: any)=> {
                toast.success(res, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    bodyStyle: {fontSize: "3.2rem"},
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                });
            }).catch((err: any)=> {
                toast.error(err, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    bodyStyle: {fontSize: "3.2rem"},
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        }

    }
    function openPopup(product: productsApiResponse) {
        setProductToEdit(product);
        setIsPopupOpen(true);
    }
    function handleEditProduct(editedProduct: editedProductFields) {
        // if id is null the user has created a product
        if(!editedProduct.id) {
            sendApiRequest("POST", "/products/add", editedProduct, false).then(()=> {
                toast.success('Product added', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    bodyStyle: {fontSize: "3.2rem"},
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                const productToAdd:productsApiResponse = {
                    id: "Refresh to set",
                    title: editedProduct.title,
                    description: editedProduct.description,
                }
                setProducts([...products, productToAdd]);
            }).catch(()=> {
                toast.error('Failed to add product', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    bodyStyle: {fontSize: "3.2rem"},
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                });
            });
        } else {
            sendApiRequest("POST", "/products/update", editedProduct, false).then(()=> {
                toast.success('Product edited', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    bodyStyle: {fontSize: "3.2rem"},
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                const productToEditList = products.filter((t) => t.id == editedProduct.id);
                const newProductList = products.filter((t) => t.id != editedProduct.id);
                productToEditList[0].title = editedProduct.title;
                productToEditList[0].description = editedProduct.description;
                newProductList.push(productToEditList[0]);
                setProducts(sortById(newProductList));
            }).catch(() => {
                toast.error('Failed to edit product', {
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
                        <EditProductForm product={productToEdit ?? null} onCancel={()=> setIsPopupOpen(false)} onSubmit={(product)=> handleEditProduct(product)} />
                    </Popup>
                </FlexContainer>
                {products && products.map((data: productsApiResponse)=> {
                    return <ProductsAdminPageCard key={data.id} product={data} onEditClick={(product)=> openPopup(product)}
                                                  onDeleteClick={(product)=> handleDeleteProduct(product)}/>
                })}
                <Button onClick={()=> {
                    setProductToEdit(null);
                    setIsPopupOpen(true);
                }} style={{width: "100%", boxShadow: "unset"}} disabled={false}>ADD product</Button>
            </FlexColumnContainer>
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
        </InnerContainer>
    )
}

export default ProductSectionAdminPage;
