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

const validate = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username required';
    } else if (values.username.length > 15) {
      errors.username = 'Must be 15 characters or less';
    }

    if (!values.password) {
      errors.password = 'Password required';
    } else if (values.password.length < 8) {
      errors.password = 'Must be 8 characters or more';
    }

    return errors;
  };

function Signup() {
    let navigate = useNavigate();

  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {username: '', password: ''},
        validate,
        onSubmit: values => {
          navigate("/login")
          alert(JSON.stringify("Please Login"));
        },

  });
  return (
  <div className = {"mainContainer"} style ={styles.container}>
      <div class = "header" style = {styles.header}>
          <h1>User Signup</h1>
      </div>
      <div className = {"loginStyle"} style = {styles.loginStyle}>
        <Box bg="white" p={50} rounded="md" w={500}>
          <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
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
            <div style={styles.button}>
              <Button btn_type="secondary" type="submit">Sign Up</Button>
            </div>
            </VStack>
          </form>
          </Box>
      </div>
    </div>
  );
}
const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.brand.c1,
        height: '100vh',

    },
    loginStyle: {
        fontSize: sizes.xxl,
        color: colors.text.c4,
        backgroundColor: colors.brand.c4,
        padding: spacing.lg,
        borderStyle: 'solid',
        borderRadius: '5px',
        borderWidth: '2px',
      },
      loginContainer: {
        padding: spacing.sm,
        fontSize: sizes.xs
      }

  }


export default Signup;