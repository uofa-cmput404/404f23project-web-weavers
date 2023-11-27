import React, { useState, useEffect, } from "react";
import NavBar from "../../components/Bars/navbar.js";
import LogoBar from "../../components/Bars/logoBar.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";
import {colors, sizes, spacing} from "../../utils/theme";
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

import {aTeamService, BeegYoshiService} from "../../utils/axios";
import axiosService from "../../utils/axios";
import Post from "../../components/Posts/Posted";
import {ChevronDownIcon} from '@chakra-ui/icons';

export default function Explore({props}){
    const user = localStorage.getItem("user")
    const [open, setOpen] = useState(true)
    const [publicPosts, setPublicPosts] = useState([])
    const [publicUsers, setPublicUsers] = useState([])
    const[displayName, setDisplayName] = useState("")
    const [currServer, setCurrServer] = useState("A Team")
    const handleOpen = () => {
        setOpen(!open);
      };

      const switchServer = (newServer) => {
        //switch server and call the list to reload
        setCurrServer(newServer);
        if(newServer == "Beeg Yoshi"){
            getBEEGPosts();
        } else if (newServer == "A Team"){
            getATeamPosts();
        }
      }
      const getPublicBEEGUsers = async () => {
        try {
            const res = await BeegYoshiService.get("service/authors/");
          setPublicUsers(res.data)
          console.log(res.data)
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };

      const getBEEGPosts = async () => {
        try {
          const currentPosts = [];
            const postUsers= await getPublicBEEGUsers();
            for (let i = 0; i < postUsers.length; i++){
                const res = await BeegYoshiService.get("service/authors/" + postUsers[i].id + "/posts/" )
            for(let i = 0; i < postUsers.length; i++){
                let postPush = res.data[i];
                postPush.author = postUsers[i];
                currentPosts.push(postPush);
            }
            }
          setPublicPosts(currentPosts);
        } catch (err) {
          console.log(err);
        }
      };

      //Getting Beeg Yoshi's Posts




    const getATeamPosts = async () => {
        try {
        const res = await aTeamService.get("getAllPublicPosts/");
        console.log("recieved response")
        console.log(res)
        setPublicPosts(res.data.results.items);
        } catch (err) {
        console.log(err);
        }
        };


      axiosService.get("authors/" + user + "/").then((response) => {
          setDisplayName(response.data.displaName)
      })
    return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Explore' uuid={user}/>
            <div style = {styles.dropdown}>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Teams
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => switchServer("A Team")}>A Team</MenuItem>
                    <MenuItem onClick={() => switchServer("Beeg Yoshi")}>Beeg Yoshi</MenuItem>
                </MenuList>
            </Menu>
            </div>
            <h1 style = {styles.header}>Now Exploring {currServer}</h1>
            <h1 alignItems="center"> </h1>
            <div style={styles.content}>
            <div style={{ ...styles.postContainer }}>
                    {/* TODO: change this to be more dynamic when pulling list of posts */}
                    {publicPosts.map((e)=>{
                        return <div style={styles.post}>
                        <Post postData={e} visibility = {"PUBLIC"} userUUID = {user} displayName={displayName} team = {currServer}/> </div>
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

    },
    dropdown: {
        paddingTop: "10vh"
    },
    header: {
        fontSize: sizes.lg,
    }
}