import { Flex, Avatar, Text, IconButton } from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import { AiOutlineSend, AiFillCheckCircle} from "react-icons/ai";
import { sendPostsToInboxes } from "../../utils/connectionFunctions";


export default function SharingPost({user, postData, ...props}){
    const [pressed, setPressed] = useState(false)
    const [selectedServer, setSelectedServer] = useState("")

    useEffect(() => {
        if(user.host === "https://web-weavers-backend-fb4af7963149.herokuapp.com/"){ setSelectedServer("Web Weavers")
        } else if (user.host === "https://packet-pirates-backend-d3f5451fdee4.herokuapp.com/"){
            setSelectedServer("Packet Pirates")
        } else if (user.host === "https://beeg-yoshi-backend-858f363fca5e.herokuapp.com/"){
            setSelectedServer("Beeg Yoshi")
        }

        console.log("postData")
    }, []);

    const handlePostClick = () => {
        //send the post
        let sending_post = {}
        sending_post["data"] = postData
        sendPostsToInboxes(user, sending_post)
        setPressed(true)
    }

    return (
        <Flex style={styles.container} flexDir="row" align="right">
            <Avatar name={user.displayName} src={user.profileImage} size="md" ml={2}/>
            <div flexDirection="column" align="left">
                <Text ml={5} mt={4} fontSize={16} fontWeight="bold" > {user.displayName} </Text>
                <Text ml={5} mt={2} fontSize={14}> {selectedServer} </Text>
            </div>
            <IconButton
                aria-label="Like"
                icon={pressed ? <AiFillCheckCircle /> : <AiOutlineSend />}
                ml="auto"
                alignSelf="center"
                onClick={handlePostClick}
                />
        </Flex>
    )
}

const styles = {
    container:{
        backgroundColor: "white",
        margin: "10px",
        padding: "2px",
        borderRadius: "10px",
    },
    likebutton:{
        color: "red"
    }
}