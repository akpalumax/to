import React, { useState } from 'react';
import axios from 'axios'
import  {Redirect} from 'react-router-dom'
import styled from 'styled-components'

 import { Formik, Field, Form, ErrorMessage } from 'formik';

 //import * as Yup from 'yup';

 

 const Signup = () => {

  const [redirectOnSignup, setRedirectOnSignup] = useState(false)

   return (

     <Formik

       initialValues={{ firstName: '', lastName: '', email: '' }}

      /* validationSchema={Yup.object({

         firstName: Yup.string()

           .max(15, 'Must be 15 characters or less')

           .required('Required'),

         lastName: Yup.string()

           .max(20, 'Must be 20 characters or less')

           .required('Required'),

         email: Yup.string().email('Invalid email address').required('Required'),

       })} */

       onSubmit={(values, { setSubmitting }) => {
        
         axios.post("http://localhost:7000/", values)
         .then(res => setRedirectOnSignup(true))
       }}

     >
       <div>
       {redirectOnSignup && <Redirect to="/"/>  }

        <h1 style={{ textAlign: "center", fontFamily: 'Roboto' }}> Signup Page </h1>


       <Form style={{ textAlign: "center"}}>


         <label htmlFor="firstName">First Name</label>

         <Field name="firstName" type="text" />

         <ErrorMessage name="firstName" />

         <br/>

         
         <label htmlFor="lastName">Last Name</label>

         <Field name="lastName" type="text" />

         <ErrorMessage name="lastName" />

         <br/>


         <label htmlFor="email" ></label>

         <Field name="email" type="email" placeholder ="Email Address"/>

         <ErrorMessage name="email" />

         <br/>

         <label htmlFor="password"></label>

         <Field name="password" type="password" placeholder ="password" />

         <ErrorMessage name="password" />

         <br/>

         <label htmlFor="passwordConfirmation"></label>

         <Field name="passwordConfirmation" type="password" placeholder ="passwordConfirmation" />

         <ErrorMessage name="passwordConfirmation" />

         <br/>



         <button type="submit">Submit</button>

       </Form>
</div>
     </Formik>

   );

 };
 export default Signup;


 /*const EqualDivider = styled.div`
  display: flex;
  margin: 0.5rem;
  padding: 1rem;
  background: papayawhip;
  ${props => props.vertical && "flex-direction: column;"}

  > * {
    flex: 1;

    &:not(:first-child) {
      ${props => props.vertical ? "margin-top" : "margin-left"}: 1rem;
    }
  }
`;

const Child = styled.div`
  padding: 0.25rem 0.5rem;
  background: palevioletred;
`; */