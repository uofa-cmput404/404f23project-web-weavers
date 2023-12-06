import { Flex, Avatar, Text, IconButton } from "@chakra-ui/react"
import React, { useState } from "react";
import { AiOutlineSend, AiFillCheckCircle} from "react-icons/ai";


export default function SharingPost({user, ...props}){
    const [pressed, setPressed] = useState(false)

    try {
        console.log("mapping user" + JSON.stringify(user))
    }catch (e){console.log(e)}
    const handlePostClick = () => {
        //send the post
        setPressed(true)
    }

    return (
        <Flex style={styles.container} flexDir="row" align="right">

            <div flexDirection="column" align="left">
                <Text ml={5} mt={4} fontSize={16} fontWeight="bold" > {user.displayName} </Text>
            </div>
            <IconButton
                aria-label="Like"
                icon={pressed ? <AiFillCheckCircle /> : <AiOutlineSend />}
                ml="auto"
                alignSelf="center"
                onClick={handlePostClick}
                />
        </Flex>
    )
}

const styles = {
    container:{
        backgroundColor: "white",
        margin: "10px",
        padding: "2px",
        borderRadius: "10px",
    },
    likebutton:{
        color: "red"
    }
}