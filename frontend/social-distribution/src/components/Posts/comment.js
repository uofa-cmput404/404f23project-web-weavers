import { Flex, Avatar, Text, IconButton } from "@chakra-ui/react"
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


export default function Comment({user, comment, ...props}){
    const [liked, setLiked] = useState(false)

    const handleLikeClick = () => {
        setLiked(!liked);
    }

    console.log("user:  " + JSON.stringify(user)); 
    
    return (
        <Flex style={styles.container} flexDir="row" align="right">
            <Avatar name={user.displayName} src={user.profileImage} size="md" ml={2}/>
            <div flexDirection="column" align="left">
                <Text ml={5} mt={4} fontSize={16} fontWeight="bold" > {user.displayName} </Text>
                <Text ml={5} mt={2} fontSize={14}> {comment.comment} </Text>
            </div>
            <IconButton
                aria-label="Like"
                icon={liked ? <AiFillHeart /> : <AiOutlineHeart />}
                color={liked ? "red" : "black"}
                ml="auto"
                alignSelf="center"
                onClick={handleLikeClick}
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