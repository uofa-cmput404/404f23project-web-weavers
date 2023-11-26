import {colors} from "../../utils/theme.js";
import { Avatar, Collapse, Flex, Link, Text, Button, useDisclosure, IconButton } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineComment } from "react-icons/ai";
import { API_URL } from "../api.js";
import axios from "axios";


export default function FriendIcon({user, ...props}){
   const {id, displayName, profileImage} = user;
   const {isOpen, onToggle}= useDisclosure();
   
    let navigate = useNavigate();
    const handleClick = () => {
        navigate("/profile/"+displayName)
    }

    const handleFollow = async () => {
        const sender= JSON.parse(localStorage.getItem("user"));
        const data= {
            "summary": displayName + " wants to follow you",
            "type": "Follow",
            "actor": sender.uuid,           // P2User    2b0144ac-e6a4-40c9-9c5e-b3eff71297bb 
            "object": user.uuid           // P2Test     e737be90-bb87-4dbd-8840-209d422e83e7
        }
        const url= "http://127.0.0.1:8000/authors/e737be90-bb87-4dbd-8840-209d422e83e7/inbox/follows";

        try{
            const response = await axios.post(url, data);
        } catch (error) {
            console.log(error);
        }
    };

    // const handleFollow = () => {
    //     // send request to P2Test's inbox
    //     try{
    //         // grab P2User's uuid
    //         const sender= JSON.parse(localStorage.getItem("user"));

    //         const url= API_URL + "authors/" + user.uuid + "/inbox/follows/";

    //         const fields= {
    //             "summary": sender.displayName + " wants to follow " + displayName,
    //             "type": "Follow",
    //             "actor": sender.uuid,           // P2User     
    //             "object": user.uuid           // P2Test
    //         }

    //         axios.post(url, fields)
    //         .then((response) => {
    //             if (response.status === 200){
    //                 console.log("success");
    //             } else{
    //                 console.log("failed to send follow request to inbox");
    //             }
    //             return response;
    //         })
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    return(
        <Flex align ="center">
            <Link
                _hover={{ textDecor: 'none',  color: colors.brand.c1, backgroundColor: 'transparent' }}
                alignItems="left"
                // onClick={handleClick}
            >
                <Flex style={styles.container} flexDir="row" align="right" onClick={onToggle}>
                    <Avatar name={displayName} src={profileImage} size="md" ml={2}/>
                    <Text ml={5} mt={4} fontSize={14}> {displayName} </Text>
                </Flex>
                <Collapse in={isOpen} animateOpacity> 
                    {/* <IconButton
                        aria-label="Profile"
                        icon={<AiOutlineComment />}
                        onClick={handleClick}   
                    /> */}
                    <Button onCkick= {handleFollow}>Follow</Button>
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