import React,{useState} from "react";
import {colors, spacing, sizes} from '../utils/theme.js'
import { Avatar, Divider, Flex, Text, Heading, IconButton } from "@chakra-ui/react";
import { FiMenu, FiHome, FiInbox, FiUser, FiSettings, FiUsers} from "react-icons/fi";
import NavItem from "./NavItem.js";
import Logo from "../assets/logo.png"


export default function NavBar({...props}) {
    // TODO: get username and pictureUrl from backend   -> remove hardcoded values
    //       get functionality for links -> set menu items
    //       remove menu placement or make it cute
    //       enable selecting menu items by dynamically changing active variable

   

    const username = "JohnDoeInfinity"
    const pictureUrl = "https://bit.ly/dan-abramov"
    // Note: limit amount of characters in username
    const [navSize, changeNavSize] = useState("large");

    return (
        <Flex style={styles.container} flexDir="column" pos="sticky" h="100vh" w={navSize == "small" ? "75px" : "300px"}>
            <Flex p="5%" flexDir="column" alignItems={navSize == "small" ? "center" : "flex-start"} >
                <IconButton background="none" mt={5} _hover={{background: "none"}} icon={<FiMenu />} 
                onClick={() => navSize === "small" ? changeNavSize("large") : changeNavSize("small")} color='white' />

                <NavItem navSize={navSize} icon={FiHome} title="Home" description="Home" active={true} />
                <NavItem navSize={navSize} icon={FiUser} title="Profile" />
                <NavItem navSize={navSize} icon={FiInbox} title="Inbox" />
                <NavItem navSize={navSize} icon={FiUsers} title="Authors" />
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
            </Flex>



            <Flex p="5%" flexDir="column" w="100%" alignItems="center" as="nav" align="center">
                <Avatar src= {Logo} />
                <Divider diplay={navSize  == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar src={pictureUrl} />
                        <Flex flexDir="column" ml={4} display={navSize=="small"?"none":"flex"}>
                            <Heading as="h3" size='sm'>{username}</Heading>
                        </Flex>     
                </Flex>
            </Flex>
        </Flex>
    );
}

const styles = {
    container:{
        boxShadow:"0 4px 12px 0",
        backgroundColor:colors.text.t1,
        justifyContent:"space-between",
        color:colors.text.t2,
    },
   
}