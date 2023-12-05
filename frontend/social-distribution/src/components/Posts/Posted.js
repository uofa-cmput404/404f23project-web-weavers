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
import axiosService, { PacketPiratesServices, aTeamService, BeegYoshiService } from "../../utils/axios";
import Comment from "./comment.js";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export default function Post({postData, visibility, userUUID, displayName, team}){
    // const userID= localStorage.getItem()
    // const postID = 1;
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
    const [showTextContent, setShowTextContent] = useState(false)
    const [contentImageSrc, setContentImageSrc] = useState("")

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
            setShowTextContent(true)
        } else if(postData.contentType === "image/png;base64"){
            setShowImageField(true)
            setShowTextContent(false)
            try {
                setContentImageSrc()
            }catch (e) { console.log(e)}

        }

        let userUUID = localStorage.getItem("user")
        axiosService.get("authors/" + userUUID + "/").then((response) => {
        setOURuser(response.data)})

        getLikedPosts();
        handleRemoteImages();
     }, []);

     const handleRemoteImages = async () => {
        if(postData.author.host === "https://web-weavers-backend-fb4af7963149.herokuapp.com/"){
            setContentImageSrc("data:" + postData.contentType + "," + postData.content)

        } else if (postData.author.host === "https://c404-5f70eb0b3255.herokuapp.com/"){
            // For A Team
            if(postData.image){
                setContentImageSrc(postData.image)
                setShowImageField(true)
            }
        } else if (postData.author.host === "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com/"){
            axiosService.get(postData.id + "/image").then((response) => {
                setContentImageSrc(response.data)
                setShowImageField(true)
            })
        }
     }
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
            let temp = postData.id
            let url = "authors/" + temp.split("/authors/")[1] + "/likes/"
            await aTeamService.post(url, like_values).then(function(response){
                console.log(response)
            }).catch(function(error){
                console.log(error)
                console.log(like_values)
            })

        }else if (team == "BeegYoshi"){
            console.log("post Data " + JSON.stringify(postData))
            let temp = postData.source
            let temp2 = temp.split("/posts/")[1]
            let like_values =
            {
                "author": userUUID,
                "displayName":displayName ,
                "object_id": temp2.split("/")[0],
                "server": "Web Weavers"
            }

            let url = "service/remote/authors/like/" + temp2.split("/")[0] + "/"
            BeegYoshiService.post(url, like_values).then(function(response){
                console.log(response)
            }).catch(function(error){
                console.log(error)
                console.log(like_values)
            })

            console.log("like values are " + JSON.stringify(like_values) + "at url " + url)
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
        let comment_values = {
            'author': API_URL + "authors/" + userUUID,
            'comment': comment,
            'contentType': "text/plain"
        }

        console.log("author.uuid: " + postData.author.uuid);
        console.log("postID: " + postData.id);
        console.log("comment_values: " + JSON.stringify(comment_values));

        let url = postData.id + "/comments/";

        console.log("url: " + url);

        axiosService.post(url, comment_values)
        .then(function(response){
            console.log(response)
        }).catch(function(error){
            console.log(error)
            console.log(comment_values)
        })


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
                            <img src={contentImageSrc} />
                        </Flex>
                    </Box>
                )}

                {showTextContent && (
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
