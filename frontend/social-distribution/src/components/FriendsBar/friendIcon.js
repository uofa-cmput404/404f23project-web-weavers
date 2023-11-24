import {colors} from "../../utils/theme.js";
import { Avatar, Collapse, Flex, Link, Text, Button, useDisclosure, IconButton } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineComment } from "react-icons/ai";


export default function FriendIcon({user, ...props}){
   const {fullName, username, avatar} = user;
   const {isOpen, onToggle}= useDisclosure();
   
    let navigate = useNavigate();
    const handleClick = () => {
        navigate("/profile/"+username)
    }

    return(
        <Flex align ="center">
            <Link
                _hover={{ textDecor: 'none',  color: colors.brand.c1, backgroundColor: 'transparent' }}
                alignItems="left"
                // onClick={handleClick}
            >
                <Flex style={styles.container} flexDir="row" align="right" onClick={onToggle}>
                    <Avatar name={username} src={avatar} size="md" ml={2}/>
                    <Text ml={5} mt={4} fontSize={14}> {username} </Text>
                </Flex>
                <Collapse in={isOpen} animateOpacity> 
                    <IconButton
                        aria-label="Profile"
                        icon={<AiOutlineComment />}
                        onClick={handleClick}   
                    />
                    <Button>Follow</Button>
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