import React,{useState} from "react";
import {colors} from '../../utils/theme.js'
import { Avatar, Divider, Flex, Text, Heading, IconButton } from "@chakra-ui/react";
import { FiMenu, FiHome, FiInbox, FiUser, FiSettings, FiLogOut, FiSquare} from "react-icons/fi";
import NavItem from "./NavItem.js";
import Logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';

// TODO: get username and pictureUrl from backend   -> remove hardcoded values
//       OPTIMIZE TOO SLOW

export default function NavBar({...props}) {  
    let navigate = useNavigate();
    const current = props.current
    const username = "JohnDoeInfinity"
    const pictureUrl = "https://bit.ly/dan-abramov"
    // Note: limit amount of characters in username

    const [navSize, changeNavSize] = useState("large");
    const [activeNav, setActive] = useState({current});
    console.log(activeNav)


    const handleClick = (e) => {
        if(e== "Sign out"){
            // clear auth token
            e = "" // back to home page
        }
        setActive(e);
        navigate("/"+e)
    }

    return (
        <Flex style={styles.container} flexDir="column" pos="sticky" w={navSize === "small" ? "75px" : "300px"}>
            <Flex p="5%" flexDir="column" alignItems={navSize == "small" ? "center" : "flex-start"} >
                <IconButton background="none" mt={5} _hover={{background: "none"}} icon={<FiMenu />} 
                onClick={() => navSize === "small" ? changeNavSize("large") : changeNavSize("small")} color='white' />

                <NavItem navSize={navSize} icon={FiHome} title="Home" description="Home" active={current === 'Home' ? true : false } onClick={()=>{handleClick('Home')}}/>
                <NavItem navSize={navSize} icon={FiSquare} title="Explore" active={current === 'Explore' ? true : false } onClick={()=>{handleClick('Explore')}} />
                <NavItem navSize={navSize} icon={FiUser} title="Profile" active={current === 'Profile' ? true : false } onClick={()=>{handleClick('Profile')}} />
                <NavItem navSize={navSize} icon={FiInbox} title="Inbox" active={current === 'Inbox' ? true : false } onClick={()=>{handleClick('Inbox')}} />
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" active={current === 'Settings' ? true : false } onClick={()=>{handleClick('Settings')}} />
                <NavItem navSize={navSize} icon={FiLogOut} title="Sign out" active={activeNav === 'Sign out' ? true : false } onClick={()=>{handleClick('Sign out')}} />
            </Flex>



            <Flex p="5%" flexDir="column" w="100%" alignItems="center" as="nav" align="center">
                <Avatar src= {Logo} />
                <Divider diplay={navSize  === "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar src={pictureUrl} />
                        <Flex flexDir="column" ml={4} display={navSize==="small"?"none":"flex"}>
                            <Heading as="h3" size='sm'>{username}</Heading>
                        </Flex>     
                </Flex>
            </Flex>
        </Flex>
    );
}

const styles = {
    container:{
        boxShadow:"0 4px 12px 0 rgba(0,0,0,0.5)",
        backgroundColor:colors.text.t1,      
        justifyContent:"space-between",
        color:colors.text.t2,
        zIndex:1,
        position:"fixed",
        height: "100vh",
        overflow:'scroll',
    },
   
}