import {colors, sizes} from "../../utils/theme.js";
import { Avatar, Collapse, Flex, Link, Text, Button, useDisclosure, IconButton } from "@chakra-ui/react";
import {React, useState, useEffect} from "react";
import { AiOutlineComment, AiFillProfile } from "react-icons/ai";
import { API_URL } from "../api.js";
import axiosService, { aTeamService, BeegYoshiService, PacketPiratesServices } from "../../utils/axios";
import { current } from "@reduxjs/toolkit";
import Login from "../../pages/login_signup/tab_screens/login.js";



export default function FriendIcon({isFollower, user, displayedUser, currentUser, selectedServer, userDisplayName,...props}){
   const {displayName, profileImage} = user;
   const {isOpen, onToggle}= useDisclosure();
   const [isSent, setIsSent] = useState(false);
   const current= currentUser;
   const [buttonText, setButtonText] = useState('Follow');
   const [showFollowerDelete, setShowFollowerDelete] = useState(false);

   //add delete functionality if the user shown is a follower
   useEffect(()=>{
    if(isFollower){ setShowFollowerDelete(true); setButtonText("Remove Follower");}
    }, [isFollower])

   //Checking if a request has already been sent
    const handleFollow = () => {
        //Handle Sending Follows
        if(user.host === "https://web-weavers-backend-fb4af7963149.herokuapp.com/" && !isFollower){
            handleWebWeaversFollow();
        } else if (user.host  === "https://c404-5f70eb0b3255.herokuapp.com/"&& !isFollower){
            handleATeamFollow();
        }
        else if (user.host  === "https://beeg-yoshi-backend-858f363fca5e.herokuapp.com/"&& !isFollower){
            handleBeegYoshiFollow();
        }
        else if (user.host === "packet-pirates-backend-d3f5451fdee4.herokuapp.com/" && !isFollower){
            handlePacketPiratesFollow();
        }

        //Handle Unfollowing People
        if(user.host=== "https://web-weavers-backend-fb4af7963149.herokuapp.com/" && isFollower){
            setButtonText(buttonText === 'Remove Follower' ? 'Removed' : 'Remove Follower');
            deleteWebWeaversFollow();
        } else if (user.host === "https://c404-5f70eb0b3255.herokuapp.com/"&& isFollower){
            setButtonText(buttonText === 'Remove Follower' ? 'Removed' : 'Remove Follower');
            deleteATeamFollow();
        }
        else if (user.host === "https://beeg-yoshi-backend-858f363fca5e.herokuapp.com/"&& isFollower){
            setButtonText(buttonText === 'Remove Follower' ? 'Removed' : 'Remove Follower');
            deleteBeegYoshiFollow();
        }else if (user.host === "packet-pirates-backend-d3f5451fdee4.herokuapp.com/" && isFollower){
            setButtonText(buttonText === 'Remove Follower' ? 'Removed' : 'Remove Follower');
        }
    }
    const handleWebWeaversFollow = async () => {
        const data= {
            "summary": userDisplayName + " wants to follow you",
            "type": "Follow",
            "actor": API_URL + "authors/" + current,           // P2User    2b0144ac-e6a4-40c9-9c5e-b3eff71297bb
            "object": API_URL + "authors/" + user.id           // P2Test     e737be90-bb87-4dbd-8840-209d422e83e7
        }
        const url= "authors/" + user.id + "/inbox/";

        console.log("actor: " + current);
        console.log("object: " + user.id);

        try{
            const response = await axiosService.post(url, data);
            setButtonText(buttonText === 'Follow' ? 'Request Sent' : 'Follow');
            console.log(response);
        } catch (error) {
            console.error('Error message:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Config:', error.response.config)
            }
        }
    };

    const handleATeamFollow = async () => {
        const data= {
            "summary": userDisplayName + " wants to follow you",
            "actor":current        // P2User    2b0144ac-e6a4-40c9-9c5e-b3eff71297bb          // P2Test     e737be90-bb87-4dbd-8840-209d422e83e7
        }
        const url= "authors/" + user.id + "/followRequests/";
        console.log("sending to url: " + url)
        console.log("sending data: " + JSON.stringify(data))
        try{
            const response = await aTeamService.post(url, data);
            setButtonText(buttonText === 'Follow' ? 'Request Sent' : 'Follow');
            console.log(response);
        } catch (error) {
            console.error('Error message:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Config:', error.response.config)
            }
        }
    };

    const handleBeegYoshiFollow = async () => {
        const data= {
            "id": current,
            "fk": "" + user.id,
            "server": "Web Weavers",
            "displayName" : userDisplayName
        }
        let url= "service/remote/authors/" + current + "/request/" + user.id + "/";
        console.log("sending to url: " + url)
        console.log("sending data: " + JSON.stringify(data))
        try{
            const response = await BeegYoshiService.post(url, data);
            setButtonText(buttonText === 'Follow' ? 'Request Sent' : 'Follow');
            console.log(response);
        } catch (error) {
            console.error('Error message:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Config:', error.response.config)
            }
        }
    };

    const handlePacketPiratesFollow = async () => {
        const data= {
            "id": current,
            "fk": "" + user.id,
            "server": "Web Weavers",
            "displayName" : userDisplayName
        }
        let url= "authors/" + user.id + "/inbox/"
        console.log("sending to url: " + url)
        console.log("sending data: " + JSON.stringify(data))
        try{
            const response = await PacketPiratesServices.post(url, data);
            setButtonText(buttonText === 'Follow' ? 'Request Sent' : 'Follow');
            console.log(response);
        } catch (error) {
            console.error('Error message:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Config:', error.response.config)
            }
        }
    };

    const deleteWebWeaversFollow = async () => {
        let url = "authors/" + current + "/followers/" + user.id + "/";
        axiosService.delete(url).then((response) => {
            console.log("Removed " + displayName + " as a Follower")
        }).catch((err) => {console.log(err)})
    };

    const deleteATeamFollow = async () => {
        let url = "authors/" + current + "/followers/" + user.id + "/";
        axiosService.delete(url).then((response) => {
            console.log("Removed " + displayName + " as a Follower")
        }).catch((err) => {console.log(err)})

        aTeamService.delete(url).then((response) => {
            console.log("Deleted A Team Follower " + displayName)
        }).catch((err) => {console.log(err)})

    };

    const deleteBeegYoshiFollow = async () => {

        let url = "authors/" + current + "/followers/" + user.id + "/";
        axiosService.delete(url).then((response) => {
            console.log("Removed " + displayName + " as a Follower")
        }).catch((err) => {console.log(err)})


       console.log("displayed User" + JSON.stringify(displayedUser))
       console.log("user" + JSON.stringify(user))
        let url2 = "service/remote/authors/" + current + "/followers/" + user.id + "/";
        console.log("sending to url " + url2)

        BeegYoshiService.delete(url2).then((response) => {
            console.log("Deleted Beeg Yoshi Follower " + displayName)
        }).catch((err) => {console.log(err)})


    };
    return(
        <Flex align ="center">
            <Link
                _hover={{ textDecor: 'none',  color: colors.brand.c1, backgroundColor: 'transparent' }}
                alignItems="left"
            >
                <Flex style={styles.container} flexDir="row" align="right" onClick={onToggle}>
                    <Avatar name={displayName} src={profileImage} size="md" ml={2}/>
                    <Text ml={5} mt={4} fontSize={14}> {displayName}</Text>
                </Flex>
                <Collapse in={isOpen} animateOpacity padding={sizes.sm} >
                    <IconButton
                        aria-label="Profile"
                        icon={<AiFillProfile />}
                        // onClick={handleClick}
                    />
                    <IconButton
                        aria-label="Message"
                        icon={<AiOutlineComment />}
                        // onClick={handleClick}
                    />
                    <Button onClick= {() => handleFollow()}>{buttonText}</Button>
                </Collapse>
            </Link>
        </Flex>
    )
}

const styles = {
    container:{
        backgroundColor: colors.brand.c4,
        margin: "10px",
        padding: "2px",
        width: "200px",
        borderRadius: "10px",
    }
}