import {colors} from "../../utils/theme.js";
import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from 'react-router-dom';


export default function GitActivity({eventType, gitName, repo}){
    const username = localStorage.getItem("user");
    recieveEvents(username);
 return (
    <Flex align ="center">
        <Link
            _hover={{ textDecor: 'none',  color: colors.brand.c1, backgroundColor: 'transparent' }}
            alignItems="left"
            onClick={handleClick}
        >
            <Flex style={styles.container} flexDir="row" align="right">
                <Avatar name={username} src={avatar} size="md" ml={2}/>
                <Text ml={5} mt={4} fontSize={14}> {username} </Text>
            </Flex>
        </Link>
    </Flex>
)}