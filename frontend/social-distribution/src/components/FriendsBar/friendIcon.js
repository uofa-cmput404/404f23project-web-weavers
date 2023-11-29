import {colors} from "../../utils/theme.js";
import { Avatar, Collapse, Flex, Link, Text, Button, useDisclosure, IconButton } from "@chakra-ui/react";
import {React, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineComment, AiFillProfile } from "react-icons/ai";
import { API_URL } from "../api.js";
import axiosService, { aTeamService } from "../../utils/axios";
import { current } from "@reduxjs/toolkit";
import Login from "../../pages/login_signup/tab_screens/login.js";
import { getPositionOfLineAndCharacter } from "typescript";



export default function FriendIcon({user, displayedUser, currentUser, selectedServer,...props}){
   const {displayName, profileImage} = user;
   const {isOpen, onToggle}= useDisclosure();
   const current= currentUser;
   const [buttonText, setButtonText] = useState('Follow');


    const handleFollow = () => {
        if(selectedServer == "WebWeavers"){
            handleWebWeaversFollow();
        } else if (selectedServer == "ATeam"){
            console.log("finding id " + JSON.stringify(user))
            //handleATeamFollow();
        }
        else if (selectedServer == "BeegYoshi"){
            //handleBeegYoshiFollow();
            console.log("finding id " + JSON.stringify(user))
        }
    }
    const handleWebWeaversFollow = async () => {
        const data= {
            "summary": displayName + " wants to follow you",
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
            "summary": displayName + " wants to follow you",
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
            "id": displayedUser.id,
            "fk": current,
            "server": "Web-Weavers"
        }
        const url= "remote/" + displayedUser.id + "/request/" + current;
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
                <Collapse in={isOpen} animateOpacity >
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