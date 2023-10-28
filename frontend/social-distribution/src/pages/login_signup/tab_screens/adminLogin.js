import React, {useState, useRef,useEffect,useContext} from 'react';
import AuthContext from '../../../context/AuthProvider';
import { colors, sizes, spacing, fonts } from '../../../utils/theme';
import {
    Box,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack
  } from "@chakra-ui/react";
import { Formik,  Field,  } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';


function AdminLogin() { 
    let navigate = useNavigate();
    // TODO: must connect to backend to verify the username and password
    const {setAuth} = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const moveToHome = (dest) => {
        navigate("/"+dest);
    }
    
    return(
        <div>
            <div className='container' style={styles.container}>
                <div className='Header' style = {styles.headers}>
                    <h1>Admin Login</h1>
                </div>
                <div className='form'>
                    <Box bg="white" p={100} rounded="md" w={500} height='60vh'>
                        <Formik
                            initialValues={{
                            username: "",
                            password: "",
                            rememberMe: false,
                        }}
                        onSubmit={(values) => {
                            // TODO: validate the values, if valid, setAuth and redirect to home page
                            // alert(JSON.stringify(values, null, 2));
                            console.log(values);
                            if(values.username === "admin" && values.password === "12345678"){
                                setSuccess(true);
                                setAuth(true);
                                moveToHome("home");
                            } else{
                                setError(true);
                                setSuccess(false);
                                alert("Wrong username or password")
                            }  
                        }}
                        >
                        {({ handleSubmit, errors, touched }) => (
                            <form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="flex-start">
                                <FormControl>
                                <FormLabel htmlFor="username">
                                    Username
                                </FormLabel>
                                <Field
                                    as={Input}
                                    id="username"
                                    name="username"
                                    type="username"
                                    variant="filled"
                                />
                                </FormControl>
                                <FormControl isInvalid={!!errors.password && touched.password}>
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <Field
                                    as={Input}
                                    id="password"
                                    name="password"
                                    type="password"
                                    variant="filled"
                                    validate={(value) => {
                                    if (value.length < 8) {
                                        return "Password should be over 8 characters.";
                                    }
                                    }}
                                />
                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>
                                <Field
                                    as={Checkbox}
                                    id="rememberMe"
                                    name="rememberMe"
                                    colorScheme="green"
                                >
                                    Remember me?
                                </Field>
                                <div style={styles.buttons}>
                                    <Button btn_type="primary" type='submit'>
                                    Login
                                    </Button>
                                </div>
                            </VStack>
                        </form>
                    )}
                    </Formik>
                </Box>
            </div>

        </div>
    </div>
    )

}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.brand.c6,
        height: '100vh',
        fontSize: sizes.md,
        fontFace: fonts.body,
    },
    buttons:{
        marginLeft: spacing.xl,
        marginTop: spacing.lg
    },
    headers:{
        marginBottom: spacing.xl,
        fontSize: sizes.xl,
        color: colors.brand.c1
    }

}

export default AdminLogin;