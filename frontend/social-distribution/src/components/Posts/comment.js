import { Flex, Avatar, Text } from "@chakra-ui/react"
import { colors } from "../../utils/theme.js";
import React from "react";


export default function Comment({user, comment, ...props}){
    
    return (
        <Flex style={styles.container} flexDir="row" align="right">
            <Avatar name={user.displayName} src={user.profileImage} size="md" ml={2}/>
            <div flexDirection="column" align="left">
                <Text ml={5} mt={4} fontSize={16} fontWeight="bold" > {user.displayName} </Text>
                <Text ml={5} mt={2} fontSize={14}> {comment.comment} </Text>
            </div>
        </Flex>
    )
}

const styles = {
    container:{
        backgroundColor: "white",
        margin: "10px",
        padding: "2px",
        borderRadius: "10px",
    }
}