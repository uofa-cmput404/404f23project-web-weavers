import React, { useState } from "react";
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
import "./Posting.css"

export default function Post(){
    // const userID= localStorage.getItem()
    // const postID = 1;                       
    const [IsLiked, SetIsLiked]= useState("");
    const [postTitle, setPostTitle]= useState("")
    const [postcontent, SetpostContent]= useState("")
    // const [postImage, SetpostImage]= useState(props.post.image);


    // TODO: figure out how to pull data from backends

    // if no content in post- just an image
    // const [showContent, setShowContent] = useState(() => {
    //     if (props.post.contentType.startsWith("image")) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    // });

    // user information- communicate with the backend
    // async and await
    // useEffect(() => {
    //     const getUserData = async() => {
    //         await api
    //         .get()              // get url from backend
    //         .then((response) => {
                
    //         })


    //         await api

    //     }


    //     const getPostImage = async() => {
    //         await api
    //         .get()
    //         .then((res) => {
    //             const data= ''
    //             SetpostImage(data)
    //         })

    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     }

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

    return(
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Richard' src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' />
                        <Box>
                            <Heading>Richard</Heading>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>

            <Divider/>

            <CardHeader>
                <Heading size="lg">Title</Heading>
            </CardHeader>
            <CardHeader>

            </CardHeader>
            <CardBody>
                
                <Divider />

                

                <Text>talking about stuff</Text>

            </CardBody>
        </Card>
    )
}

