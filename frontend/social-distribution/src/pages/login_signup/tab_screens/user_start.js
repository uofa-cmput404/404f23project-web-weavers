import React from 'react';
import { colors, sizes, spacing } from '../../../utils/theme';
import Signup from "./signup"
import {Box} from "@chakra-ui/react";

function UserStart() {
  return (
  <div style ={styles.container}>
    <Box bg="white" p={50} rounded="md" w={500} h={500} float="left" style={styles.box}>
      <div style = {styles.secondary}>
        <h1 style = {styles.h1}> User Signup</h1>
        <Signup/>
      </div>
    </Box>
  </div>
  );
}

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

export default UserStart;
