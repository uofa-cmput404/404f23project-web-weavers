import { recieveEvents } from "../api.js";
import React from "react";
import { Flex } from '@chakra-ui/react'
import { colors } from "../../utils/theme.js";
import GitEvent from "./GitEvent.js"

export default function GitActivity({props}){
    const username = localStorage.getItem("user");
    recieveEvents(username);

    return
        <Flex flexDir="column" w="100%" alignItems="center" align="center">

    </Flex>
}
