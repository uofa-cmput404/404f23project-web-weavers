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
import {colors, sizes, spacing } from '../../../utils/theme';
import authSlice from "../../../store/slices/auth.ts";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Box } from '@chakra-ui/react';

function Login() {
  let navigate = useNavigate();
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
            localStorage.setItem("user", res.data.user.uuid)
            dispatch(authSlice.actions.setAccount(res.data.user));
            navigate("/home");
          })
          .catch((err) => {
            console.log(JSON.stringify(err));
          });
  }
  const formik = useFormik({
    initialValues: {username: '', password: ''},
        onSubmit: (values) => {
          handleLogin(values.username, values.password)
        },
        validationSchema: Yup.object({
          username: Yup.string().trim().required("Username is required"),
          password: Yup.string().trim().required("password is required"),
        }),

  });
  return (
  <div style={styles.container}>
  <Box bg="white" rounded="md" w={500} h={500} style={styles.box} >
  <div style = {styles.secondary}>
    <h1 style = {styles.h1}> User Login </h1>
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
          </div>
        </Box>
        </div>
  );
}
export default Login;

const styles = {
  container: {
    backgroundColor: colors.brand.c6,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
    },

  secondary: {
    display: 'flex',
    textAlign: "left",
    flexDirection: "column",
    fontSize: sizes.sm,},

  h1: {
    float: 'left',
    fontSize: sizes.lg,
    marginBottom: spacing.lg,
    marginTop: '0'}
}
