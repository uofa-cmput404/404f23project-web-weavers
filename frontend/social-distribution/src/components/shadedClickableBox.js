import { Avatar, Link, Flex, IconButton, Text, Button } from "@chakra-ui/react";
import { colors, spacing } from "../utils/theme";
import {FiBell, FiUserCheck, FiUserMinus} from 'react-icons/fi'
import { useState, useEffect } from 'react';
import {API_URL} from "./api";
import axios from 'axios';


export default function ShadedClickableBox({req_user, variant_,text,username,avatar,...props}) {
    const curr_user = localStorage.getItem("user")

    const variant = {
        notif: variant_ === 'notif',
        msg: variant_ === 'msg',
        request: variant_ == 'request',
      }

    const handleClick = () => {
        console.log('clicked')
    }
    const handleAcceptFollower = () =>{
        console.log("accepting a new follower")
        axios.put(API_URL + "authors/" + curr_user + "/followers/" + req_user + "/")
        window.location.reload(false);
        //Post as follower to self and other author
        //Remove from inbox
        //Reload
    }
    const handleRejectFollower = () =>{
        console.log("rejecting a new follower")
        //Remove from inbox
        //Reload
        window.location.reload(false);
    }


    return(
        <Link
                    onClick={handleClick}
                    _hover={{ textDecoration: "none", backgroundColor:colors.brand.c4}
                    }
                >
        <Flex p={spacing.lg} style={styles.square} flexDir='row'mb={1}>

            {variant.notif ?
                <Flex >
                    <IconButton mr={5} justifyItems={'left'} icon={<FiBell/>}>
                    </IconButton>
                    <Text align={"left"}>
                        {text}
                    </Text>
                </Flex>
            : variant.request ?

            <Flex >
                    <Flex style={styles.container} flexDir="column" align="right">

                        <Flex flexDir="row" align={"center"}>
                            <Avatar name={username} src={avatar} size="md" ml={2}/>
                            <Text ml={5} align={"left"}> {username} would like to follow you </Text>
                        </Flex>
                        <Flex flexDir="row" align={"center"}>
                            <Flex style={styles.buttons}>
                            <Button
                                aria-label="Request"
                                as="i"
                                leftIcon={<FiUserCheck />}
                                onClick={handleAcceptFollower}
                            >Accept </Button>
                            </Flex>

                            <Flex style={styles.buttons}>
                            <Button
                                aria-label="Request"
                                as="i"
                                leftIcon={<FiUserMinus />}
                                onClick={handleRejectFollower}
                            >Decline </Button>
                            </Flex>
                    </Flex>
                    </Flex>
                </Flex>
            :

            <Flex align ="center" style={styles.square} >

                    <Flex style={styles.container} flexDir="row" align="right">
                        <Avatar name={username} src={avatar} size="md" ml={2}/>
                        <Flex flexDir="column" align={"left"}>
                            <Text ml={5} fontWeight={3} color={"black"}> {username} </Text>
                            <Text ml={5} align={"left"}> Hi! </Text>
                        </Flex>
                    </Flex>

                </Flex>


            }
            </Flex>
            </Link>


    )
}

const styles = {
    square:{
        backgroundColor: "white",
        // overflow: "auto",
        borderRadius: "5px",
        // padding: spacing.lg,
    },
    buttons: {
        marginTop: "10px",
        marginRight: "10px",
      },
}