import React, {useState, useContext} from 'react';
import Button from '../../../components/Button';
import validateUser from '../../../components/api';
import { useFormik} from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username required';
  } else if (values.username.length > 200) {
    errors.username = 'Must be 200 characters or less';
  }

  /*
  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more';
  }
  */
  return errors;
};

function Login() {
  let navigate = useNavigate();

  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {username: '', password: ''},
        validate,
        onSubmit: values => {
          validateUser(values.username).then((response) => {
            localStorage.setItem("user", values.username)
            navigate("/home")
         })
         .catch(function(error){
            if(error.response.status== 404){
              alert("Request to login failed, user " + values.username + " does not exist")
            } else {
              alert("Unknown Error occured. Login Failed code: " + error.response.status)
            }

            console.log(JSON.stringify(error))
         });
        },

  });
  return (
          <form onSubmit={formik.handleSubmit}>
          <VStack spacing={3} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                values = {formik.values.username}
                />
              {formik.touched.username && formik.errors.username ? (
                <div>{formik.errors.username}</div>
              ) : null}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password"> Password </FormLabel>
              <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  values = {formik.values.password}
                  />
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </FormControl>
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              colorScheme="green"
            >Remember me?
            </Checkbox>
            <div>
              <Button btn_type="secondary" type="submit">Login</Button>
            </div>
            </VStack>
          </form>
  );
}
export default Login;
