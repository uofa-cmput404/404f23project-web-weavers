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
    Button,
    Textarea
} from '@chakra-ui/react'
import {
    AiOutlineHeart,
    AiOutlineComment,
    AiFillHeart,
    AiOutlineEdit,
    AiFillDelete,
} from "react-icons/ai";
import "./Posting.css"
import { sizes, colors } from "../../utils/theme";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {API_URL} from "../api"
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";


export default function Post({postData, visibility, userUUID, displayName}){
    // const userID= localStorage.getItem()
    // const postID = 1;
    let navigate = useNavigate();
    const [IsLiked, SetIsLiked]= useState(false);
    const [likes, setLikes] = useState([])
    // const [postcontent, SetpostContent]= useState("")
    // const [postImage, SetpostImage]= useState(props.post.image);
    const [ comment, setComment ] = useState("");
    const [showCommentField, setShowCommentField] = useState(false);
    const[showLikeField, setShowLikeField] = useState(false);
    const[showEditField, setShowEditField] = useState(false);
    const[showDeleteField, setShowDeleteField] = useState(false);
    const[showImageField, setShowImageField] = useState(false);

    const[showEditPOST, setShowEditPOST] = useState(false)

    // Check likes of the post (THIS WILL BE MODULARIZED LATER)
    /*
    const fetchLikes= async () => {
        const res = await axios.get(postData.id + "/likes/")
        setLikes(res.data.items)
        for(let i = 0; i < likes.length; i++){
            console.log(JSON.stringify(likes))
        }
    };
    useEffect(() => {
        fetchLikes();
    }, [])
    */

    useEffect(() => {
        //This always get set to false initially
        setShowEditPOST(false)
        if (visibility == "PERSONAL"){
            setShowLikeField(false)
            setShowEditField(true)
            setShowDeleteField(true)
        } else if (visibility == "PUBLIC"){
            setShowLikeField(true)
            setShowEditField(false)
            setShowDeleteField(false)
        }

        if(postData.contentType == "text/markdown"){
            setShowImageField(false)
        }
     }, []);

    // Like handles
    const handleLikeClick =() => {
        SetIsLiked(!IsLiked); // Toggle the liked state when the button is clicked

        let like_values = {
            'author': userUUID,
            'type': "Like",
            'object': postData.id,
            'summary': "" + displayName + " liked your post"
        }

        axios.post(API_URL + "authors/" + postData.author.uuid + "/inbox/", like_values).then(function(response){
            console.log(response)
        }).catch(function(error){
            console.log(error)
            console.log(like_values)
        })


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


    // Edit Handles
    const handleEditClick = () => {
        // Add the ability to edit a post by adding a make a post feature
        // Send the actual POST
        // re-render the page
        navigate('/editPost', {
            state: {
                postData: postData
            }
    });
    };

    // Delete Handles
    const handleDeleteClick = () => {
        axios.delete(postData.id + "/")
        window.location.reload(false);
    };

    return(
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={postData.author.displayName} src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' />
                        <Box>
                            <Heading size={sizes.md}>{postData.author.displayName}</Heading>
                        </Box>
                        {showEditField && (
                            <Flex style={styles.buttons}>
                            <IconButton
                                aria-label="Edit"
                                icon={<AiOutlineEdit />}
                                onClick={handleEditClick}
                            />

                            </Flex>
                        )}
                        {showDeleteField && (
                            <Flex style={styles.buttons}>
                            <IconButton
                                aria-label="Delete"
                                icon={<AiFillDelete />}
                                onClick={handleDeleteClick}
                            />

                            </Flex>
                        )}
                    </Flex>
                </Flex>
            </CardHeader>

            <Divider/>

            <CardBody>
                <Box textAlign= "left" padding= "0.5rem" fontSize="2.0rem">
                    <Text>{postData.title}</Text>
                </Box>
                <Box textAlign= "left" padding= "0.5rem" fontStyle="italic">
                    <Text>{postData.description}</Text>
                </Box>

                {showImageField && (
                    <Box mx="auto" textAlign="center">
                        <Flex justifyContent="center">
                            <img src="https://via.placeholder.com/350x150" alt="Image" />
                        </Flex>
                    </Box>
                )}

                {!showImageField && (
                    <Box mx="auto" textAlign="center">
                        <Flex justifyContent="center">
                        <Textarea isDisabled
                            value = {postData.content}
                        />
                        </Flex>
                    </Box>
                )}

                {showLikeField && (
                    <Flex style={styles.buttons}>
                        {likeButton}
                        <IconButton
                        aria-label="Comment"
                        icon={<AiOutlineComment />}
                        onClick={handleCommentClick}
                        />
                    </Flex>
                )}
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

