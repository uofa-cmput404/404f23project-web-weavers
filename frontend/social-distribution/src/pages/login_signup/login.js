import React, {useState, useContext} from 'react';
import { colors, sizes, spacing } from '../../utils/theme';
import Button from '../../components/Button';
import AuthContext from '../../context/AuthProvider';
import NavBarH from '../../components/NavbarH';
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

function Login() {
  let navigate = useNavigate();

  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {username: '', password: ''},
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
          navigate("/home")
        },

  });
  return (<div> <NavBarH/>
  <div className = {"mainContainer"} style ={styles.container}>
      <div class = "header" style = {styles.header}>
          <h1>User Login</h1>
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
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              colorScheme="green"
            >Remember me?
            </Checkbox>
            <div style={styles.button}>
              <Button btn_type="secondary" type="submit">Login</Button>
            </div>
            </VStack>
          </form>
          </Box>
      </div>
    </div>
  </div>
  );
}
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand.c1,
    height: '100vh',
    width: '100vw',
    fontSize: sizes.sm,
  },
  buttons: {
    padding: spacing.xl,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  loginStyle: {
    fontSize: sizes.sm,
    color: colors.text.c4,
    display: "block",
  },
  header: {
    fontSize: sizes.xl,
    padding: spacing.lg,
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",

  }
}
export default Login;
