import React from "react";
import NavBar from "../../components/Bars/navbar.js";
import LogoBar from "../../components/Bars/logoBar.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";
import {colors, sizes, spacing} from "../../utils/theme";


import Post from "../../components/Posts/Posted";
import {getDisplayName} from "../../components/api";
import axiosService from "../../utils/axios";
import { useState, useEffect } from 'react';
import { Avatar, Collapse, Flex } from "@chakra-ui/react";
import GitActivity from "../../components/Github/GitActivity.js";
import Button from "../../components/Button.js";
import { checkIfFriend } from "../../utils/connectionFunctions.js";

export default function MyStream({props}){
    const user = localStorage.getItem("user")
    // need a list of all postIDS to show
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [profileImage, setProfileImage] = useState("");
    const [currentUserData, setCurrentUserData] = useState(null)
    const [friends, setFriends] = useState(0);
    const [displayName, setDisplayName] = useState("");
    const [showGit, setShowGit] = useState(false);

    const handleToggle = () => setShowGit(!showGit);

    //This queries the user for all personal posts
    const fetchdata = async () => {
        const res = await axiosService.get("authors/" + user + "/posts/")
        setPosts(res.data.items)

        const res3 = await axiosService.get("authors/" + user + "/followers/")
        setFollowers(res3.data.items)

        const res4 = await axiosService.get("authors/" + user)
        setProfileImage(res4.data.profileImage)
        setDisplayName(res4.data.displayName)
        setCurrentUserData(res4.data)

    };
    //for live updates
    useEffect(() => {
        let interval = setInterval(() => {
            fetchdata();
        }, 2000);
        return () => {
            clearInterval(interval);
        };
    }, []);

        //for initial setup
    useEffect(() => {
        fetchdata();
    }, [])

    const friendsNum = async () => {
        let friends = 0;
        for(let i=0; i < followers.length; i++){
            let is_friend= await checkIfFriend(followers[i], user);
            if(is_friend=== true){
                friends++;
            }
        }
        setFriends(friends);
    }
    useEffect(() => {
        friendsNum();
    }, [followers])


    return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='My Stream'/>
            <FriendsBar user={user} selectedServer = {"WebWeavers"} UserData = {currentUserData}/>
             <div style={{height: "5vh"}}></div> {/*Just to account for height of LogoBar */}
            <Flex flexDir="column" style={styles.profileHeader}>
                <Avatar marginTop='20px' size="2xl" name={displayName} src="https://bit.ly/tioluwani-kolawole" />
                <Flex fontSize={sizes.xl} color="black" flexDir="row">
                    <h1>Username: {displayName}</h1>
                </Flex>

                <Flex flexDir="row" justifyContent="stretch" alignItems="center" fontSize={sizes.sm} color="black">
                    <div style={{ marginRight: '20px' }}>Posts: {posts.length}</div>
                    <div style={{ marginRight: '20px' }}>Followers: {followers.length}</div>
                    <div>Friends: {friends} </div>
                </Flex>

                <Button onClick={handleToggle} style={{ marginTop: '10px' }}>
                    My Github Activity
                </Button>
                <Collapse in={showGit} animateOpacity>
                    <GitActivity/>
                </Collapse>

            </Flex>

            <div style={styles.content}>
                <div style={{ ...styles.postContainer }}>
                    {/* TODO: change this to be more dynamic when pulling list of posts */}
                    {posts.map((e)=>{
                        return <div style={styles.post}>
                        <Post postData={e} visibility = {"PERSONAL"} userUUID = {user} team={"WebWeavers"}/> </div>
                    })}
                </div>
            </div>
        </div>
    )
}

const styles = {
    container:{
        backgroundColor: colors.brand.c6,
        height: "100vh",
        paddingTop: spacing.md,
    },
    profileHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: colors.brand.c3,
        paddingBottom: spacing.md,
        overflow: "auto",
        paddingTop: spacing.lg + "5vh",
        marginBottom: spacing.md,
        width: '50%', // specify the width
        marginLeft: 'auto', // center the element
        marginRight: 'auto', // center the element
        borderRadius: '10px', // round the corners
    },
    postContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: colors.brand.c3,
        paddingBottom: spacing.md,
        overflow: "auto",
        paddingTop: spacing.md,
        height: "100%",
    },
    post: {
        width: "500px",
        alignItems: "center",
        marginTop: spacing.lg,
    },
}