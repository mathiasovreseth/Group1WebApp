import {
    FlexColumnContainer,

    FlexContainer,

    Input, Label,
    LargeText, MediumText, SmallText,

    XSmallText
} from "../../../styles/CommonStyles";
import React, {useState} from "react";
import styled from "styled-components";
import {isValidEmail, isValidPassword, isValidUsername} from "../../../utils/FormValidation";
import {getUserApiResponse} from "../../../models/UserModel";
import {getCoursesApiResponse} from "../../../models/CourseModel";
import {productsApiResponse} from "../../../models/ProductsModel";

const FormContainer = styled(FlexColumnContainer)`
  background-color: ${props => `${props.theme.palette.primary.background}`};
  border-radius: ${props => `${props.theme.borderRadius}`};
  box-shadow: 0 0 2rem 0 rgba(90, 90, 90);
  padding: 0 4.4rem 6.6rem 4.4rem;
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




export interface editedProductFields {
    id?: string | null;
    title: string;
    description: string;
}

interface EditProductFormProps {
    onSubmit: (product: editedProductFields) => void;
    onCancel: () => void;
    product: productsApiResponse | null;
}
function EditProductForm(props: EditProductFormProps) {
    const [title, setTitle] = useState(props.product?.title ?? "");
    const [description, setDescription] = useState(props.product?.description ?? "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [titleErr, setTitleErr] = useState('');
    const [descriptionErr, setDescriptionErr] = useState('');


    function handleSubmit() {
        const editedUserValues: editedProductFields = {
            id: props.product?.id ?? null,
            title: title,
            description: description,
        }
        props.onSubmit(editedUserValues);
    }
    function validateForm() {
        let isValid = true;
        if (title.length === 0) {
            setTitleErr('title is required');
            isValid = false;

        }
        if (description.length === 0) {
            setDescriptionErr('Description is required');
            isValid = false;

        }
        return isValid;
    }

    return (
        <form  onSubmit={(e)=> {
            if(validateForm()) {
                handleSubmit();
            }
            e.preventDefault();
        }}>
            <FormContainer>
                <LargeText style={{marginTop: "2rem", marginBottom: "4rem", fontWeight: 700}}>Edit product</LargeText>
                <Label>Title</Label>
                <Input defaultValue={props?.product?.title ?? ""} onChange={(e)=> setTitle(e.target.value)}  type="text" name="title"/>
                {titleErr && <XSmallText style={{color: "red"}}>{titleErr}</XSmallText>}
                <Label>Description</Label>
                <Input defaultValue={props?.product?.description ?? ""}  onChange={(e)=> setDescription(e.target.value)}  type="text" name="description"/>
                {descriptionErr && <XSmallText style={{color: "red"}}>{descriptionErr}</XSmallText>}
                <FlexContainer style={{ justifyContent: "space-between", marginTop: "2rem"}}>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting  ? 'Submitting': 'Submit'}
                    </Button>
                    <Button style={{backgroundColor: "black", boxShadow: "unset"}}  disabled={isSubmitting} onClick={props.onCancel}>
                        Cancel
                    </Button>
                </FlexContainer>
            </FormContainer>
        </form>
    )
}



export default EditProductForm;

