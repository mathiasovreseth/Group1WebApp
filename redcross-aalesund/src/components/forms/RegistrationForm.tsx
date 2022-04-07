import * as React from 'react';
import {
    FormikProps,
    Form,
    Field,
    FormikErrors, withFormik,
} from 'formik';
import {
    FlexColumnContainer, Input, LargeText, SmallText,
    XSmallText
} from "../../styles/CommonStyles";
import styled from "styled-components";
import {isValidEmail, isValidPassword, isValidUsername} from '../../utils/FormValidation';

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
  margin-bottom: 0.8rem;
`
const FormContainer = styled(FlexColumnContainer)`
  background-color: ${props => `${props.theme.palette.primary.background}`};
  border-radius: ${props => `${props.theme.borderRadius}`};
  box-shadow: 0 0 2rem 0 rgba(90, 90, 90);
  padding: 0 4.4rem 6.6rem 4.4rem;
`;
const Container = styled(FlexColumnContainer)`
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 90vh;

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
                <FormContainer>
                    <LargeText style={{marginTop: "2rem", marginBottom: "4rem"}}>Register</LargeText>
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
                    <Button type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
            </FormContainer>


            </Container>
        </Form>
    );
};

interface FormProps {
    initialUsername?: string;
    initialEmail?: string;
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

    // custom validation function
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
        let errors: FormikErrors<FormValues> = {};
        const request = new Request("http://localhost:8080/api/users/addUser", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
                role: "ADMIN",
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

export default RegistrationForm;

