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

import {aTeamService, BeegYoshiService, PacketPiratesServices} from "../../utils/axios";
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
    const [publicPosts, setPublicPosts] = useState([])
    const [publicUsers, setPublicUsers] = useState([])
    const[displayName, setDisplayName] = useState("")
    const [selectedServer, setSelectedServer] = useState("ATeam")

    const setInitialServer = async () => {
      try {
        handleServerChange("ATeam")
      } catch (err) {
        console.log(err);
      }
    };

     useEffect(() => {
        setInitialServer();
      }, []);



    const handleServerChange = (newServer) => {
        //switch server and call the list to reload
        setSelectedServer(newServer);
        if(newServer === "BeegYoshi"){
          setPublicPosts([])
          getBEEGPosts();
        } else if (newServer === "ATeam"){
          setPublicPosts([])
          getATeamPosts();
          console.log("all posts are " + JSON.stringify(publicPosts))
        }else if (newServer === "PacketPirates"){
          setPublicPosts([])
          getPacketPiratesPosts();
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
        // try {
        //   const res = await BeegYoshiService.get("service/public/posts/");
        //   console.log("big yoshi recieved response")
        //   console.log(res)
        //   setPublicPosts(res.data.results.items);
        // } catch (err) {
        //   console.log("big yoshi error");
        //   console.log(err);
        //   }
        // };
        try {
          const currentPosts = [];
            let postUsers= await getPublicBEEGUsers();
            for (let i = 0; i < postUsers.length; i++){
                const res = await BeegYoshiService.get("service/authors/" + postUsers[i].id + "/posts/" )
                for(let i = 0; i < res.data.length; i++){
                    let postPush = res.data[i];
                    postPush["author"] = postUsers[i];
                    currentPosts.push(postPush);
                }
            }
          setPublicPosts(currentPosts);
        } catch (err) {
          console.log(err);
        }
      };

      const getPublicPacketPirateUsers = async () => {
        try {
            const res = await PacketPiratesServices.get("authors");
          setPublicUsers(res.data.items)
          console.log(res.data.items)
          return res.data.items;
        } catch (err) {
          console.log(err);
        }
      };

      const getPacketPiratesPosts = async () => {
        try {
          const currentPosts = [];
            let postUsers= await getPublicPacketPirateUsers();
            for (let i = 0; i < postUsers.length; i++){
              let custom_id = postUsers[i].id.split("/authors/")[1]
                const res = await PacketPiratesServices.get("authors/" + custom_id + "/posts" )
                for(let i = 0; i < res.data.length; i++){
                    let postPush = res.data[i];
                    postPush["author"] = postUsers[i];
                    console.log("post push is " + JSON.stringify(postPush.visibility))
                    if(postPush.visibility === "PUBLIC" && postPush.unlisted === false){
                    currentPosts.push(postPush);
                  }
                }
            }
          console.log("current posts are " + JSON.stringify(currentPosts))
          setPublicPosts(currentPosts);
        } catch (err) {
          console.log(err);
        }
      };

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
          setDisplayName(response.data.displayName)
      })

      return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Explore' uuid={user}/>
            {/* <FriendsBar user={user}/> */}
            {selectedServer === "PacketPirates" && <FriendsBar user={user} selectedServer={selectedServer} userDisplayName= {displayName}/> }
            {selectedServer === "ATeam" && <FriendsBar user={user} selectedServer={selectedServer} userDisplayName= {displayName}/> }
            {selectedServer === "BeegYoshi" && <FriendsBar user={user} selectedServer={selectedServer} userDisplayName= {displayName}/> }
            <div style = {styles.dropdown}>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Teams
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => handleServerChange('PacketPirates')}>Packet Pirates</MenuItem>
                    <MenuItem onClick={() => handleServerChange('ATeam')}>A Team</MenuItem>
                    <MenuItem onClick={() => handleServerChange('BeegYoshi')}>Beeg Yoshi </MenuItem>
                </MenuList>
            </Menu>
            </div>
            <h1 style = {styles.header}>Now Exploring {selectedServer}</h1>
            <h1 alignItems="center"> </h1>
            <div style={styles.content}>
            <div style={{ ...styles.postContainer }}>
                    {/* TODO: change this to be more dynamic when pulling list of posts */}
                    {publicPosts.map((e)=>{
                        return <div style={styles.post}>
                        <Post postData={e} visibility = {"PUBLIC"} userUUID = {user} displayName={displayName} team = {selectedServer}/> </div>
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