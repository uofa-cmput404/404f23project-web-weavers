import React, {useState, useContext} from 'react';
import { colors, sizes, spacing } from '../../../utils/theme';
import Signup from "./signup"
import Login from "./login"
import {
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";

function UserStart() {
  return (
  <div style ={styles.container}>
    <Box bg="white" p={50} rounded="md" w={500} h={500} float="left">
      <div style = {styles.secondary}>
        <h1 style = {styles.h1}> User Signup - TBD</h1>
        <Signup/>
      </div>
    </Box>

    <Box bg="white" p={50} rounded="md" w={500} h={500} float="right" >
      <div style = {styles.secondary}>
        <h1 style = {styles.h1}> User Login </h1>
        <Login/>
      </div>
    </Box>
  </div>
  );
}

const styles = {
  container: {
      display: 'block',
      padding: spacing.xxl},

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

export default UserStart;
