import {colors} from "../../utils/theme.js";
import { Avatar, Collapse, Flex, Link, Text, Button, useDisclosure, IconButton } from "@chakra-ui/react";
import React, {useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineComment } from "react-icons/ai";
import { API_URL } from "../api.js";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
import Login from "../../pages/login_signup/tab_screens/login.js";



export default function FollowerIcon({user, displayedUser, currentUser, ...props}){
   const {displayName, profileImage} = user;
   const {isOpen, onToggle}= useDisclosure();
   const current= currentUser;


    return(
        <Flex align ="center">
            <Link
                _hover={{ textDecor: 'none',  color: colors.brand.c1, backgroundColor: 'transparent' }}
                alignItems="left"
            >
                <Flex style={styles.container} flexDir="row" align="right" onClick={onToggle}>
                    <Avatar name={displayName} src={profileImage} size="md" ml={2}/>
                    <Text ml={5} mt={4} fontSize={14}> {displayName} </Text>
                </Flex>
                <Collapse in={isOpen} animateOpacity> 
                    {/* <IconButton
                        aria-label="Profile"
                        icon={<AiOutlineComment />}
                        onClick={handleClick}   
                    /> */}
                </Collapse>
            </Link>
        </Flex>
    )
}

const styles = {
    container:{
        backgroundColor: colors.brand.c4,
        margin: "10px",
        padding: "2px",
        width: "200px",
        borderRadius: "10px",
    }
}