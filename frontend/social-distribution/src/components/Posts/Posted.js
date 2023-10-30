import React, { useState, useEffect } from "react";
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
    const [ comment, setComment ] = useState(""); 
    const [showCommentField, setShowCommentField] = useState(false);

    // Like handles
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


    // Comment handles
    const handleCommentClick = () => {
        setShowCommentField(!showCommentField);
    }
    const handleCommentChange = (event) => {
    // TBH, don't know if we need this
        setComment(event.target.value); 
    };
    
    const handleCommentPost = () => {
    // TODO: post comment to backend
    console.log(comment); 
        setComment(""); // Clear the comment field after posting
    };


    // User information- communicate with the backend
    // TODO: figure out how to pull data from backend
    // useEffect(() => {
    //     const getUserData = async() => {
    //         await api
    //         .get()              // get url from backend
    //         .then((response) => {
                
    //         })
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
                    <Flex justifyContent="center">
                        <img src="https://via.placeholder.com/350x150" alt="Image" />
                    </Flex>
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
                            <Input
                                placeholder="Add a comment"
                                value={comment} // Set the value of the input field to the state
                                onChange={handleCommentChange} // Update the state when the user types
                            />
                            <Button mt="2" backgroundColor={colors.brand.c2} onClick={handleCommentPost}>
                                Post
                            </Button>
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
    commentButton: {
        mt: "2",
        backgroundColor: colors.brand.c2,
        ":hover": {
            backgroundColor: colors.brand.c1,
        }
    },
    buttons: {
      marginTop: "10px",
    },
  };

