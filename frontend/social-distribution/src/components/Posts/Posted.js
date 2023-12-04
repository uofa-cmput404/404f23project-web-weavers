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
import axiosService, { PacketPiratesServices, aTeamService } from "../../utils/axios";
import Comment from "./comment.js";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import axios from "axios";

export default function Post({postData, visibility, userUUID, displayName, team}){
    const user = localStorage.getItem("user")      
    const [curr_user, setCurrUser]= useState("")    
    const loggedInUser= localStorage.getItem("user")    // the one logged in
    const postAuthor= postData.author.uuid              // the one who made the post
    let navigate = useNavigate();
    const [IsLiked, SetIsLiked]= useState(false);
    const [likes, setLikes] = useState([])
    const [ comment, setComment ] = useState("");
    const [showCommentField, setShowCommentField] = useState(false);
    const [comments, setComments] = useState([])
    const [ postComments, setPostComments ] = useState([]);
    const[showLikeField, setShowLikeField] = useState(false);
    const[showEditField, setShowEditField] = useState(false);
    const[showDeleteField, setShowDeleteField] = useState(false);
    const[showImageField, setShowImageField] = useState(false);
    const [OURuser, setOURuser] = useState(null)
    const[showEditPOST, setShowEditPOST] = useState(false)
    const [commentID, setCommentID]= useState(0);

    useEffect(() => {
        const getCurrentUser = async () => {
            try{
                const response = await axiosService.get("authors/" + loggedInUser + "/")
                //console.log("Current user is " + JSON.stringify(response.data))
                setCurrUser(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        getCurrentUser();
    }, [])

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

        if(postData.contentType === "text/markdown"){
            setShowImageField(false)
        } else if(postData.contentType === "image/png;base64"){
            setShowImageField(true)
        }

        let userUUID = localStorage.getItem("user")
        axiosService.get("authors/" + userUUID + "/").then((response) => {
        setOURuser(response.data)})

        getLikedPosts();
     }, []);

     useEffect(() => {
        const getPostComments = async () => {
            try{
                const response = await axiosService.get(postData.id + "/comments/");
                setPostComments(response.data.items.map(comment => ({id: comment.id, author: comment.author, comment: comment.comment})));
            } catch (error) {
                console.log(error);
            }
        };
        getPostComments();
    }, [])
    //Check for likes based on server
    const getLikedPosts = async() => {
        if(postData.author.host === "https://web-weavers-backend-fb4af7963149.herokuapp.com/"){
            //For Web Weaver Server
            let url = "authors/" + postData.id.split("/authors/")[1] + "/likes/"
            await axiosService.get(url).then( (response) => {
                for(let i = 0; i < response.data.items.length; i++){
                    if(response.data.items[i].author.uuid == userUUID){
                        console.log("User has liked this post "+ postData.id)
                        SetIsLiked(true);
                    }
                }
            })
        } else if (postData.author.host === "https://c404-5f70eb0b3255.herokuapp.com/"){
            // For A Team
            let url = "authors/" + postData.id.split("/authors/")[1] + "/likes/"
            await aTeamService.get(url).then( (response) => {
                for(let i = 0; i < response.data.results.items.length; i++){
                    if(response.data.results.items[i].author.id == userUUID){
                        console.log("User has liked this post "+ postData.id)
                        SetIsLiked(true);
                    }
                }
            })
        } else if (postData.author.host === "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com/"){
            // For A Team
            let url = "authors/" + postData.id.split("/authors/")[1] + "/likes"
            await PacketPiratesServices.get(url).then( (response) => {
                console.log("total response is " + JSON.stringify(response))
                for(let i = 0; i < response.data.length; i++){
                    console.log("Found " + JSON.stringify(response.data[i].author.id.split("/authors/")[1]))

                    if(response.data[i].author.id.split("/authors/")[1]== userUUID){
                        console.log("User has liked this post "+ postData.id)
                        SetIsLiked(true);
                    }
                }
            })
        }
    }

    // Like handles
    const handleLikeClick = async () => {
        if(IsLiked){
            return;
        }
        SetIsLiked(!IsLiked); // Toggle the liked state when the button is clicked

        if(postData.author.host === "https://web-weavers-backend-fb4af7963149.herokuapp.com/"){
        //our server
            let like_values = {
                'author': API_URL + "authors/" + userUUID,
                'type': "Like",
                'object': postData.id,
                'summary': "" + displayName + " liked your post"
            }
            console.log("Finding liked posts")
            await axiosService.post("authors/" + postData.author.uuid + "/inbox/", like_values).then(function(response){
                console.log(response)
            }).catch(function(error){
                console.log(error)
                console.log(like_values)
            })
        } else if (postData.author.host === "https://c404-5f70eb0b3255.herokuapp.com/"){
            // A Team's Server
            let like_values = {
                'author_id': userUUID,
                'post': postData.id,
                'summary': "" + displayName + " liked your post"
            }
            let url = "authors/" + postData.id.split("/authors/")[1] + "/likes/"
            await aTeamService.post(url, like_values).then(function(response){
                console.log(response)
            }).catch(function(error){
                console.log(error)
                console.log(like_values)
            })

        }else if (team == "BeegYoshi"){
            //NO IDEA HOW THIS WORKS OR IF THERE IS SUPPORT FOR REMOTE AUTHORS
            //CODING LATER
        } if(postData.author.host === "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com/"){
            //our server
                let like_values = {
                    'author': OURuser,
                    'type': "Like",
                    'object': postData.id,
                    'summary': "" + displayName + " liked your post"
                }
                let url = "authors/" + postData.author.id.split("/authors/")[1] + "/inbox"
                await PacketPiratesServices.post(url, like_values).then(function(response){
                    console.log(response)
                }).catch(function(error){
                    console.log(error)
                    console.log(like_values)
                })
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
        console.log("loggedInUser: " + loggedInUser)       
        console.log("postAuthor: " + postAuthor)
        
        let comment_values = {
            'author': API_URL + "authors/" + loggedInUser,
            'comment': comment,
            'contentType': "text/plain"
        }

        console.log("comment_values (displayname): " + JSON.stringify(comment_values))
        if (team == "WebWeavers"){ // Web Weavers Server
            let url = postData.id + "/comments/";
            console.log("url: " + url);
            axiosService.post(url, comment_values)        
            .then(function(response){
                console.log(response)   
            }).catch(function(error){
                console.log(error)
                console.log(comment_values)
            })
            // send comment to Post User's inbox
            axiosService.get(postData.id + "/comments").then((response) => {
                let comments = response.data.items;
                let latestComment = comments[0];
                setCommentID(latestComment.id);
            })
            let comment_inbox_values={
                "author": loggedInUser,
                "type": "comment",
                "id": commentID
            }
            let inboxURL= postData.author.url + "/inbox/"
            // console.log("Posting to URL: ", inboxURL);
            console.log("comment inbox: ", comment_inbox_values);
            axiosService.post(inboxURL, comment_inbox_values).then(function(response){
                console.log(response)
            }).catch(function(error){
                console.log(error)
                console.log(comment_values)
            })


        } else if (team == "ATeam"){ // A Team Server <-- maybe im right, maybe im wrong
            let url = postData.id + "/comments/";
            console.log("url: " + url);
            aTeamService.post(url, comment_values)        
            .then(function(response){
                console.log(response)   
            }).catch(function(error){
                console.log(error)
                console.log(comment_values)
            })
            // send comment to Post User's inbox <-- bro idk how it's structured
            // let inboxURL= "authors/" + postData.author.url + "/inbox/comments"
            // console.log("inboxURL: " + inboxURL)
            // aTeamService.post(inboxURL, comment_values).then(function(response){
            //     console.log(response)
            // }).catch(function(error){
            //     console.log(error)
            //     console.log(comment_values)
            // })


        } else if (team == "BeegYoshi"){ // Beeg Yoshi Server <-- I could be horribly wrong about this one
            let url = postData.id + "/comments/";
            console.log("url: " + url);
            axiosService.post(url, comment_values)        
            .then(function(response){
                console.log(response)   
            }).catch(function(error){
                console.log(error)
                console.log(comment_values)
            })

            // let inboxURL= "authors/" + postData.author.uuid + "/inbox/comments"
            // console.log("inboxURL: " + inboxURL)
            // axiosService.post(inboxURL, comment_values).then(function(response){
            //     console.log(response)
            // }).catch(function(error){
            //     console.log(error)
            //     console.log(comment_values)
            // })
        }


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
                        <Avatar name={postData.author.displayName} src={postData.author.profileImage} />
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
                            <img src={postData.content} alt="Image" />
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
                    <Flex flexDirection="column" mt= "2">
                        <Divider/>
                            <div overflowY="auto" maxheight="5px" alignItems="left">
                                {postComments.map((comment) => (
                                    <Comment
                                        user= {comment.author}
                                        comment={comment}/>
                                ))}
                            </div>
                        <Divider/>
                    </Flex>
                )}

                <Flex flexDirection="column" mt="2" >
                    <Input
                        placeholder="Add a comment"
                        value={comment} // Set the value of the input field to the state
                        onChange={handleCommentChange} // Update the state when the user types
                    />
                    <Button mt="2" backgroundColor={colors.brand.c2} onClick={handleCommentPost}>
                        Post
                    </Button>
                </Flex>
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
    // trying to make the comments show on the side- may give up on it (!sink cost fallacy)
    comments:{
        backgroundColor: "white",
        position: "absolute",
        right: 0,
        width: "300px",
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