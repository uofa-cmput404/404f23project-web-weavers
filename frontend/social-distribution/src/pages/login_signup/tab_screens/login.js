import React, {useState, useContext} from 'react';
import Button from '../../../components/Button';
import { useFormik} from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";
import * as Yup from "yup";
import {API_URL} from "../../../components/api"

import authSlice from "../../../store/slices/auth";
import { useDispatch } from "react-redux";
import axios from "axios";
/*
const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username required';
  } else if (values.username.length > 200) {
    errors.username = 'Must be 200 characters or less';
  }


  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more';
  }

  return errors;
};
  */

function Login() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = (displayName, password) =>{
    axios.post(API_URL + "/auth/login/", { displayName, password })
          .then((res) => {
            dispatch(
              authSlice.actions.setAuthTokens({
                token: res.data.access,
                refreshToken: res.data.refresh,
              })
            );
            console.log("Got a successful request")
            dispatch(authSlice.actions.setAccount(res.data.user));
            setLoading(false);
            navigate("/home");
          })
          .catch((err) => {
            console.log(JSON.stringify(err));
          });
  }
  const formik = useFormik({
    initialValues: {username: '', password: ''},
        onSubmit: (values) => {
          setLoading(true)
          handleLogin(values.username, values.password)
        },
        validationSchema: Yup.object({
          username: Yup.string().trim().required("Username is required"),
          password: Yup.string().trim().required("password is required"),
        }),

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
