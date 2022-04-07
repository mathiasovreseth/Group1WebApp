import {
    FlexColumnContainer,
    FlexContainer,
    Input,
    LargeText,
    MediumText,
    SmallText,
    XSmallText
} from "../../styles/CommonStyles";
import React from "react";
import styled from "styled-components";
import {Field, Form, FormikErrors, FormikProps, withFormik} from "formik";
import {isValidEmail, isValidPassword, isValidUsername} from "../../utils/FormValidation";

const FormContainer = styled(FlexColumnContainer)`
  background-color: ${props => `${props.theme.palette.primary.background}`};
  border-radius: ${props => `${props.theme.borderRadius}`};
  box-shadow: 0 0 2rem 0 rgba(90, 90, 90);
  padding: 0 4.4rem 6.6rem 4.4rem;
  position: absolute;
  top: 30%;
`;


const Button = styled.button`
  border: 0;
  border-radius: ${props => `${props.theme.borderRadius}`};
  font-size: ${props => `${props.theme.fontSizes.large}`};
  padding: 1rem 0;
  margin-top: 2rem;
  background-color: ${props => `${props.theme.palette.primary.accentColor}`};
  box-shadow: 0 0 5rem 0 rgba(90, 90, 90);
  color: white;
  cursor: pointer;
  width: 26rem;
  height: 4.5rem;
  overflow-y: hidden;
`;


const Label = styled.label`
  font-size: ${props => `${props.theme.fontSizes.medium}`};;
  margin-bottom: 0.8rem;
`

const OuterContainer = styled(FlexColumnContainer)`
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;
  position: relative;
  
`


interface FormValues {
    email: string;
    password: string;
}


const InnerForm = (props: FormikProps<FormValues>) => {
    const {touched, errors, isSubmitting} = props;
    return (
        <Form>
            <OuterContainer>
                <FormContainer>
                    <LargeText style={{marginTop: "2rem", marginBottom: "4rem"}}>Login</LargeText>
                    <Label>E-mail</Label>
                    <Field  render={() => {
                        return <Input onChange={(e)=> props.values.email = e.target.value}  type="email" name="email"/>
                    }}/>
                    {touched.email && errors.email && <XSmallText style={{color: "red"}}>{errors.email}</XSmallText>}
                    <Label>Password</Label>
                    <Field render={() => {
                        return <Input onChange={(e)=> props.values.password = e.target.value} type="password" name="password"/>
                    }}/>
                    {touched.password && errors.password && <XSmallText style={{color: "red"}}>{errors.password}</XSmallText>}
                    <Button type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                </FormContainer>


            </OuterContainer>
        </Form>
    );
};
interface FormProps {
    initialEmail?: string;
}



const LoginForm = withFormik<FormProps, FormValues>({
    // Transform outer props into form values

    mapPropsToValues: props => {
        return {
            email: props?.initialEmail ?? '',
            password: '',
        };
    },

    // custom validation function
    validate: (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (!isValidEmail(values.email)) {
            errors.email = 'Invalid email address';
        }
        if(!values.password) {
            errors.password = 'Required';
        } else if(!isValidPassword(values.password)) {
            errors.password = 'Password must be 6 characters or more';
        }
        return errors;
    },
    // set is submitting also
    handleSubmit: values => {
        let errors: FormikErrors<FormValues> = {};
        const request = new Request("http://localhost:8080/auth/login", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            }),
        });
        fetch(request).then(response => {
            if (response.status === 401 || response.status === 403) {
                errors.password = "Failed to autorize";

            }
            return response.json();
        }).then((data) => {
            // set token in localstorage
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('role', data.roles[0]);

        }).catch((error) => {
            errors.password = "Invalid credentials";
        });
    },
})(InnerForm);

export default LoginForm;

