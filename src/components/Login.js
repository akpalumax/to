import React, { useState } from 'react';
import axios from 'axios'
import  {Redirect} from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import './style.css';

 //import * as Yup from 'yup';

 

 const Login = () => {

  const [redirectOnSignin, setRedirectOnSignin] = useState(false)

   return (

     <Formik

       initialValues={{ firstName: '', lastName: '', email: '' }}


       onSubmit={(values, { setSubmitting }) => {
        
         axios.post("http://localhost:7000/login", values)
         .then(res => setRedirectOnSignin(true))
       }}

     >
       <>
       {redirectOnSignin && <Redirect to="/"/>  }
       <h1 style={{ textAlign: "center", fontFamily: 'Roboto',  }}> login Page </h1>
       <Form>

         <label htmlFor="email"></label>

         <Field name="email" type="email" placeholder ="Email Address" />

         <ErrorMessage name="email" />

         <br/>

         <label htmlFor="password"></label>

         <Field name="password" type="password" placeholder ="password" />

         <ErrorMessage name="password" />

         <br/>

         <button type="submit">Submit</button>

       </Form>
</>
     </Formik>

   );

 };
 export default Login;