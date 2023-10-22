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
    Text,
    IconButton,
    Input,
    Button
} from '@chakra-ui/react'
import { 
    AiOutlineHeart, 
    AiOutlineComment,
    AiFillHeart,
} from "react-icons/ai";
import "./Posting.css"
import { sizes, colors } from "../../utils/theme";

export default function Post(){
    // const userID= localStorage.getItem()
    // const postID = 1;                       
    const [IsLiked, SetIsLiked]= useState(false);
    // const [postcontent, SetpostContent]= useState("")
    // const [postImage, SetpostImage]= useState(props.post.image);
    const [showCommentField, setShowCommentField] = useState(false);

        const handleCommentClick = () => {
            setShowCommentField(!showCommentField);
        }

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
    // })

    // getUserData()
    const handleLikeClick = () => {
        SetIsLiked(!IsLiked); // Toggle the liked state when the button is clicked
      };

    const likeButton = IsLiked ? (
        <IconButton
          aria-label="Liked"
          icon={<AiFillHeart />}
          style={styles.likeButton} // Apply the likedButton style when the button is clicked
          mr="2"
          onClick={handleLikeClick}
        />
      ) : (
        <IconButton
          aria-label="Like"
          icon={<AiOutlineHeart />}
          mr="2"
          onClick={handleLikeClick}
        />
      );

    return(
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='JohnDoeInfinity' src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' />
                        <Box>
                            <Heading size={sizes.md}>JohnDoeInfinity</Heading>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>

            <Divider/>

            <CardBody>
                <Box textAlign= "left" padding= "0.5rem">
                    <Text>a really good caption</Text>
                </Box>

                <Box mx="auto" textAlign="center">
                    <img src="https://via.placeholder.com/350x150" alt="Image" />
                </Box>

                <Flex style={styles.buttons}>
                    {likeButton}
                    <IconButton
                    aria-label="Comment"
                    icon={<AiOutlineComment />}
                    onClick={handleCommentClick}
                    />
                </Flex>
                {showCommentField && (
                        <Flex flexDirection="column" mt="2">
                            <Input placeholder="Add a comment" />
                            <Button mt="2">Post</Button>
                        </Flex>
                    )}

            </CardBody>
        </Card>
    )
}

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxWidth: "600px",
      marginTop: "20px",
    },
    postImage: {
      width: "100%",
      height: "auto",
      marginBottom: "10px",
    },
    likeButton: {
        color: "red",
    },
    buttons: {
      marginTop: "10px",
    },
  };

