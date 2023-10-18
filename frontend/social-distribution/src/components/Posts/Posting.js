import React, { useContext, useState, Component, View } from "react";
import { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import "./Posting.css"

export default function Post(props){
    const userID= localStorage.getItem()
    const postID = 1;                       // figure out how to get ID later
    const [IsLiked, SetIsLiked]= useState(false);
    const [postTitle, setPostTitle]= useState(false)
    const [postcontent, SetpostContent]= useState(false)
    const [postImage, SetpostImage]= useState(props.post.image);

    // if no content in post- just an image
    const [showContent, setShowContent] = useState(() => {
        if (props.post.contentType.startsWith("image")) {
          return false;
        } else {
          return true;
        }
    });

    // user information- communicate with the backend
    // async and await
    useEffect(() => {
        const getUserData = async() => {
            await api
            .get()              // get url from backend
            .then((response) => {
                
            })


            await api

        }


        const getPostImage = async() => {
            await api
            .get()
            .then((res) => {
                const data= ''
                SetpostImage(data)
            })

            .catch((err) => {
                console.log(err)
            })
        }

        const getPostTitle = async() => {
            await api
            .get()
            .then((res) => {
                const title=''
                setPostTitle(title)
            })
        }
    })

    getUserData()

    return(
        <Card>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Richard' src='https://bit.ly/sage-adebayo' />
                        <Box>
                            <Heading size='sm'>Richard</Heading>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>

            <Divider/>

            <CardHeader>
                <Heading size="lg">{postTitle}</Heading>
            </CardHeader>
            <CardHeader>
                <div className="card-content">

                </div>
            </CardHeader>
            <CardBody>
                <Image
                
                />
                
                <Diver />

                <div className="like-comment-area">

                    
                </div>

                <Text>{postcontent}</Text>

            </CardBody>
        </Card>
    )
}

