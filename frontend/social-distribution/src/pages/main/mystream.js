import React from "react";
import NavBar from "../../components/Bars/navbar.js";
import LogoBar from "../../components/Bars/logoBar.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";
import {colors, sizes, spacing} from "../../utils/theme";


import Post from "../../components/Posts/Posted";
import {API_URL} from "../../components/api";
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function MyStream({props}){
    const user = localStorage.getItem("user")
    // need a list of all postIDS to show
    const [posts, setPosts] = useState([]);

    //This queries the user for all personal posts
    const fetchdata = async () => {
        const res = await axios.get(API_URL + "/authors/" + user + "/posts/")
        setPosts(res.data.items)
    };
    useEffect(() => {
        fetchdata();
    }, [])




    return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='My Stream'/>
            <FriendsBar/>
            <h1>My Stream</h1>
            <div style={styles.content}>
                <div style={{ ...styles.postContainer }}>
                    {/* TODO: change this to be more dynamic when pulling list of posts */}
                    {posts.map((e)=>{
                        return <div style={styles.post}> <Post postData={e} visibility = {"PERSONAL"}/> </div>
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
}