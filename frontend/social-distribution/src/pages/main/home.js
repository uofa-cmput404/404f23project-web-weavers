import React from "react";
import {colors, sizes, spacing} from "../../utils/theme";
import NavBar from "../../components/Bars/navbar";
import LogoBar from "../../components/Bars/logoBar";
import CreatePostCard from "../../components/Posts/createPostCard";
import FriendsBar from "../../components/FriendsBar/friendsBar";

import {API_URL} from "../../components/api";
import axios from 'axios';

export default function Home() {
    //This is where the uuid of the user is being stored for now
    console.log(localStorage.getItem("user"))

    //queries all available authors the database
    //queries all posts of every author
    //adds a post to the list if it's public TODO later



    return (
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Home'/>
            <FriendsBar style={styles.friendsBar}/>
            <div style={styles.content}>
                <CreatePostCard/>

                <div style={{ ...styles.postContainer }}>
                    {/* TODO: change this to be more dynamic when pulling list of posts */}
                </div>
            </div>
        </div>
    );
}
const navbarHeight = "50px"; // replace with actual height of NavBar

const styles = {
    container: {
        backgroundColor: colors.brand.c6,
        height: "100%",
    },
    content: {
        // padding: spacing.medium,
        width: sizes.contentWidth,
        paddingTop: '5rem',
        height: `calc(100vh - ${navbarHeight})`, // set height to remaining viewport height
        marginBottom: "20px",

    },
    createPostCard:{
        marginBottom: "20px"
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
};