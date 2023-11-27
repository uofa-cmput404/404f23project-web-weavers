import React, { useEffect, useState } from "react";
import { 
    Card, 
    Flex,
    Input,
} from '@chakra-ui/react'


export default function TextPost(props){
    // const userID= localStorage.getItem()
    // const postID = 1;                       

    // TODO: user information- communicate with the backend
    // to know which post to connect to which user
    // useEffect(() => {
    //     const getUserData = async() => {
    //         await api
    //         .get()              // get url from backend
    //         .then((response) => {
                
    //         })

    //     }
    // })

    // getUserData()

    return(
        <Flex style={styles.flexContainer}>
            <Input placeholder="Write something..." />
        </Flex>
    )
}

const styles = {
    flexContainer: {
        backgroundColor: "lightgray",
        flexDirection: "column",
        mt: "2",
        maxW: "2xl",
    },
    contentField: {
        width: "100%",
        height: "60px",
        padding: "10px",
        fontSize: "16px",
        border: "1px solid gray",
        borderRadius: "10px",
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        resize: "none",
        marginBottom: "20px",
        overflowX: "hidden",
      },
}
