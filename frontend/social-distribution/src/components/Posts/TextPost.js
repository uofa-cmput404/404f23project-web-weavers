import React, { useEffect, useState } from "react";
import { 
    Card, 
    CardHeader, 
    CardBody, 
    Flex, 
    Avatar, 
    Box, 
    Heading,
    Divider,
    Text
} from '@chakra-ui/react'


export default function TextPost(props){
    // const userID= localStorage.getItem()
    // const postID = 1;                       
    const [IsLiked, SetIsLiked]= useState("");
    const [postTitle, setPostTitle]= useState("")
    const [postcontent, SetpostContent]= useState("")

    // TODO: figure out how to put data into backend

    // if no content in post- just an image
    // const [showContent, setShowContent] = useState(() => {
    //     if (props.post.contentType.startsWith("image")) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    // });

    // // user information- communicate with the backend
    // // to know which post to connect to which user
    // useEffect(() => {
    //     const getUserData = async() => {
    //         await api
    //         .get()              // get url from backend
    //         .then((response) => {
                
    //         })

    //     }
    // })

    // useEffect(() => {
    //     const getPostTitle = async() => {
    //         await api
    //         .get()
    //         .then((res) => {
    //             const title=''
    //             setPostTitle(title)
    //         })
        

    //     }
    // })

    // getUserData()
    // setPostTitle()

    return(
        <Card maxW='lg'>
            <textarea
            style={styles.contentField}
            placeholder="Write something..."
            />
        </Card>
    )
}

const styles = {
    contentField: {
        width: "90%",
        maxWidth: "100%",
        height: "50px",
        resize: "none",
    }
}
