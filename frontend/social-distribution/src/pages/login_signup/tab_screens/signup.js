import React, {useState, useContext} from 'react';
import { colors, sizes, spacing } from '../../../utils/theme';
import Button from '../../../components/Button';
import { useFormik, Formik,  Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";
import * as Yup from "yup";

import authSlice from "../../../store/slices/auth.ts";
import { useDispatch } from "react-redux";
import localStorage from 'redux-persist/es/storage';
import axiosService from "../../../utils/axios";

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

function Signup() {
  const dispatch = useDispatch();

  const handleSubmit = (displayName, password) => {
    axiosService.post("auth/register/", { displayName, password })
          .then((res) => {
            dispatch(
              authSlice.actions.setAccount({
                displayName: res.data.displayName,
                password: res.data.password,
              })
            );
            console.log(res.data)
            localStorage.setItem("user", res.data.uuid)
          })
          .catch((err) => {
            console.log(JSON.stringify(err));
          });


  }
  const formik = useFormik({
    initialValues: {username: '', password: ''},
        validate,
        onSubmit: values => {
          handleSubmit(values.username, values.password)
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
        <div>
          <Button btn_type="secondary" type="submit">Sign Up</Button>
        </div>
        </VStack>
      </form>
  );
}



export default Signup;