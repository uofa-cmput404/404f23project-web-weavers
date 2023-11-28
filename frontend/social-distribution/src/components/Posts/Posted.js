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
import {API_URL} from "../api";
import { useNavigate } from 'react-router-dom';
import axiosService, { aTeamService } from "../../utils/axios";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";


export default function Post({postData, visibility, userUUID, displayName, team}){
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
        } else if(visibility == "INBOX"){
            setShowLikeField(false)
            setShowDeleteField(false)
            setShowEditField(false)
            setShowCommentField(false)
        }

        if(postData.contentType == "text/markdown"){
            setShowImageField(false)
        }
     }, []);

    //Check for likes based on server
    if(!team){
        //For Web Weaver Server
        let url = "authors/" + postData.id.split("/authors/")[1] + "/likes/"
        axiosService.get(url).then( (response) => {
            for(let i = 0; i < response.data.items.length; i++){
                if(response.data.items[i].author.uuid == userUUID){
                    console.log("User has liked this post "+ postData.id)
                    SetIsLiked(true);
                }
            }
        })
    } else if (team == "A Team"){
        // For A Team
        /*
        let url = "authors/" + postData.id.split("/authors/")[1]
        console.log("sending to url " + url)
        aTeamService.get(url).then( (response) => {
            console.log(JSON.stringify(response.data))
        })
        */
    }

    // Like handles
    const handleLikeClick =() => {
        if(IsLiked){
            return;
        }
        SetIsLiked(!IsLiked); // Toggle the liked state when the button is clicked

        if(!team){
        //our server
            let like_values = {
                'author': API_URL + "authors/" + userUUID,
                'type': "Like",
                'object': postData.id,
                'summary': "" + displayName + " liked your post"
            }

            axiosService.post("authors/" + postData.author.uuid + "/inbox/", like_values).then(function(response){
                console.log(response)
            }).catch(function(error){
                console.log(error)
                console.log(like_values)
            })
        } else if (team == "A Team"){
            // A Team's Server
            let like_values = {
                'author': API_URL + "authors/" + userUUID,
                'post': postData.id,
                'summary': "" + displayName + " liked your post"
            }
            let url = "authors/" + postData.id.split("/authors/")[1] + "/likes/"
            aTeamService.post(url, like_values).then(function(response){
                console.log(response)
            }).catch(function(error){
                console.log(error)
                console.log(like_values)
            })

        }else if (team == "Beeg Yoshi"){
            //NO IDEA HOW THIS WORKS OR IF THERE IS SUPPORT FOR REMOTE AUTHORS
            //CODING LATER
        }


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
        axiosService.delete(postData.id + "/")
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
                            <Heading size={sizes.md}>{team}</Heading>
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