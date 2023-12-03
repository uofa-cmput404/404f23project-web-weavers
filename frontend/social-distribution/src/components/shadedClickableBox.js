import { Avatar, Link, Flex, IconButton, Text, Button } from "@chakra-ui/react";
import { colors, spacing } from "../utils/theme";
import {FiBell, FiUserCheck, FiUserMinus} from 'react-icons/fi'
import {useState} from 'react';
import {API_URL, A_TEAM_URL, BEEG_YOSHI_URL} from "./api";
import axiosService, { BeegYoshiService, aTeamService } from '../utils/axios';

// TODO
// Render parent component from child component instead of re-rendering full page
export default function ShadedClickableBox({
        request, req_user, variant_,text,username,avatar,...props
    }) {
    const curr_user = localStorage.getItem("user")
    const [showButtons, setShowButtons] = useState(true);
    const [requestText, setRequestText] = useState(username + " would like to follow you" );

    const variant = {
        notif: variant_ === 'notif',
        msg: variant_ === 'msg',
        request: variant_ === 'request',
      }
      console.log("request is " + JSON.stringify(request))
    const handleClick = () => {
        console.log('clicked')
    }
    const handleAcceptFollower = () =>{
        console.log("accepting a new follower")
        axiosService.put("authors/" + curr_user + "/followers/" + req_user + "/")
        setShowButtons(false)
        setRequestText(username + "'s request was accepted")
        //Post as follower to self and other author
        //Remove from inbox
        const type = request.type;
        const summary = request.summary;
        const actor = request.actor.id;
        const object = request.object.id;
        //from our server
        const body = {
            'type': type,
            'summary' : summary,
            'actor' : actor,
            'object' : object
        }

        if(request.actor.host === API_URL){
            // Web Weavers
            axiosService.delete("follow-requests/", {data: body}).then((response) => {
                console.log("Deleting Follow Request")
            }).catch((err) => {
                console.log(err)
            })
        } else if(request.actor.host === A_TEAM_URL){
            // A Team
            axiosService.delete("follow-requests/", {data: body}).then((response) => {
                console.log("Deleting Follow Request")
            }).catch((err) => {
                console.log(err)
            })
        } else if(request.actor.host === BEEG_YOSHI_URL){
            // Beeg Yoshi
            let url = "service/remote/authors/" + request.actor.id.split("/").pop()+ "/request/" + request.object.uuid + "/";
            let server = {"server": "Web Weavers"}

            BeegYoshiService.put(url, server).then((response) => {
                console.log("Sending Acceptance to Beeg Yoshi")
                console.log(response)
            }).catch((err) => {
                console.log(err)
            })

            axiosService.delete("follow-requests/", {data: body}).then((response) => {
                console.log("Deleting Follow Request")
            }).catch((err) => {
                console.log(err)
            })
        }
        //Reload
    }
    const handleRejectFollower = () =>{
        console.log("rejecting a new follower")
        const type = request.type;
        const summary = request.summary;
        const actor = request.actor.id;
        const object = request.object.id;
        //from our server
        const body = {
            'type': type,
            'summary' : summary,
            'actor' : actor,
            'object' : object
        }
        if(request.actor.host === API_URL){
            axiosService.delete("follow-requests/", {data: body}).then((response) => {
                console.log("Deleting Follow Request")
                setShowButtons(false)
                setRequestText(username + "'s request was denied")
            }).catch((err) => {
                console.log(err)
            })
        } else if(request.actor.host === A_TEAM_URL){
            axiosService.delete("follow-requests/", {data: body}).then((response) => {
                console.log("Deleting Follow Request")
                setShowButtons(false)
                setRequestText(username + "'s request was denied")
            }).catch((err) => {
                console.log(err)
            })

        }else if(request.actor.host === BEEG_YOSHI_URL){
            // Beeg Yoshi
            let url = "service/remote/authors/" + request.actor.id.split("/").pop()+ "/request/" + request.object.uuid + "/";
            let server = {"server": "Web Weavers"}


            BeegYoshiService.delete(url, server).then((response) => {
                console.log("Sending Rejectance to Beeg Yoshi")
            }).catch((err) => {
                console.log(err)
            })


            axiosService.delete("follow-requests/", {data: body}).then((response) => {
                console.log("Deleting Follow Request")
            }).catch((err) => {
                console.log(err)
            })

        }
        //Remove from inbox
        //Reload
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
                            <Text ml={5} align={"left"}> {requestText}</Text>
                        </Flex>
                        { showButtons &&
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
                    }
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