// Library Imports
import React, { useState, useEffect, } from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
  } from '@chakra-ui/react'
import {aTeamService} from "../../utils/axios";
import axiosService from "../../utils/axios";
import {ChevronDownIcon} from '@chakra-ui/icons';
// File Imports
import {colors, sizes, spacing} from "../../utils/theme";
// Component Imports
import NavBar from "../../components/Bars/navbar.js";
import LogoBar from "../../components/Bars/logoBar.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";
import Post from "../../components/Posts/Posted";
// OtherServers Component Imports
// import OSNavBar from "../../components/OtherServers/Bars/navbar";
// import OSLogoBar from "../../components/OtherServers/Bars/logoBar";
// import OSFriendsBar from "../../components/OtherServers/FriendsBar/friendsBar";
// import OSPost from "../../components/OtherServers/Posts/Posted";


export default function Explore({props}){
    const user = localStorage.getItem("user")
    const [open, setOpen] = useState(true)
    const [publicPosts, setPublicPosts] = useState([]);
    const[displayName, setDisplayName] = useState("")
    const [selectedServer, setSelectedServer] = useState("All")

    const handleOpen = () => {
        setOpen(!open);
      };

    const handleServerChange = (server) => {
        setSelectedServer(server);
    }

      const getPosts = async () => {
        try {
          const res = await aTeamService.get("getAllPublicPosts/");
          console.log("recieved response")
          console.log(res)
          setPublicPosts(res.data.results.items);
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        getPosts();
      }, []);

      axiosService.get("authors/" + user + "/").then((response) => {
          setDisplayName(response.data.displaName)
      })

      return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Explore' uuid={user}/>
            <FriendsBar user={user}/>
            <div style = {styles.dropdown}>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Teams
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => handleServerChange('All')}>All</MenuItem>
                    <MenuItem onClick={() => handleServerChange('A Team')}>A Team</MenuItem>
                    <MenuItem onClick={() => handleServerChange('Beeg Yoshi')}>Beeg Yoshi </MenuItem>
                </MenuList>
            </Menu>
            </div>
            <h1>Explore</h1>
            <h1 alignItems="center"> </h1>
            <div style={styles.content}>
            <div style={{ ...styles.postContainer }}>
                    {/* TODO: change this to be more dynamic when pulling list of posts */}
                    {publicPosts.map((e)=>{
                        return <div style={styles.post}>
                        <Post postData={e} visibility = {"PUBLIC"} userUUID = {user} displayName={displayName}/> </div>
                    })}
                </div>
            </div>
        </div>
    )
}

const navbarHeight = "50px"; // replace with actual height of NavBar
const styles = {
    container:{
        backgroundColor: colors.brand.c6,
        height: "100vh",

    },
    postContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: colors.brand.c3,
        paddingBottom: spacing.md,
        overflow: "auto",
        paddingTop: spacing.md,

    },
    post: {
        width: "500px",
        alignItems: "center",
        marginTop: spacing.lg,
    },
    content: {
        // padding: spacing.medium,
        width: sizes.contentWidth,
        paddingTop: '5rem',
        height: `calc(100vh - ${navbarHeight})`, // set height to remaining viewport height
        marginBottom: "20px",

    },
    dropdown: {
        paddingTop: "10vh"
    }
}