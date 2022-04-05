import * as React from 'react';
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps, FormikErrors, withFormik,
} from 'formik';
import {
    FlexColumnContainer, Input,
    XSmallText
} from "../../styles/commonStyles";
import styled from "styled-components";

const Button = styled.button`
  border: 0;
  margin-top: 2rem;
  border-radius: ${props => `${props.theme.borderRadius}`};
  font-size: ${props => `${props.theme.fontSizes.large}`};
  padding: 1rem 0;
  background-color: ${props => `${props.theme.palette.primary.accentColor}`};
  box-shadow: 0 0 5rem 0 rgba(90, 90, 90);
  color: white;
  cursor: pointer;
  width: 26rem;
`;


const Label = styled.label`
  font-size: ${props => `${props.theme.fontSizes.medium}`};;
`

const Container = styled(FlexColumnContainer)`
  justify-content: center;
  align-items: center;
  width: 100vw;

`

interface FormValues {
    username: string;
    email: string;
    password: string;
}


const InnerForm = (props: FormikProps<FormValues>) => {
    const {touched, errors, isSubmitting} = props;
    return (
        <Form>
            <Container>
                <FlexColumnContainer>
                    <Label>Username</Label>
                <Field render={() => {
                    return <Input onChange={(e)=> props.values.username = e.target.value} type="text" name="username"/>
                }}/>
                {touched.username && errors.username && <XSmallText style={{color: "red"}}>{errors.username}</XSmallText>}
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
            </FlexColumnContainer>

            <Button type="submit" disabled={isSubmitting}>
                Submit
            </Button>
            </Container>
        </Form>
    );
};

interface FormProps {
    initialUsername?: string;
    initialEmail?: string;
}

function isValidUsername(username: string): boolean {
    return  /^[a-z]+$/.test(username);
}

function isValidEmail(email: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
function isValidPassword(password: string): boolean {
    return password.length > 6;
}

const RegistrationForm = withFormik<FormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: props => {
        return {
            username: props?.initialUsername ?? '',
            email: props?.initialEmail ?? '',
            password: '',
        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};
        if (!values.username) {
            errors.username = 'Username is required';
        } else if (!isValidUsername(values.username)) {
            errors.username = 'Username must be lowercase and contain only letters';
        }
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

    handleSubmit: values => {
        console.error(values);
    },
})(InnerForm);

export default RegistrationForm;

