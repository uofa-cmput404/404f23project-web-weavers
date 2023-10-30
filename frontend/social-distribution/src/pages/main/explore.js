import React, { useState, useEffect, } from "react";
import NavBar from "../../components/Bars/navbar.js";
import LogoBar from "../../components/Bars/logoBar.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";
import {API_URL} from "../../components/api";
import axios from 'axios';
import {colors, sizes, spacing} from "../../utils/theme";


import Post from "../../components/Posts/Posted";

export default function Explore({props}){
    const user = localStorage.getItem("user")

    return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Explore' uuid={user}/>
            <FriendsBar/>
            <h1>Explore</h1>
            <h1 alignItems="center"> </h1>
            <div style={styles.content}>
            <div style={{ ...styles.postContainer }}>
                    {/* TODO: change this to be more dynamic when pulling list of posts */}
                    {publicPosts.map((e)=>{
                        return <div style={styles.post}> <Post postData={e} visibility = {"PUBLIC"}/> </div>
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
}