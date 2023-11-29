import {Flex, Text } from "@chakra-ui/react";
import React from "react";
import { colors } from "../../../utils/theme";
import Post from "../../../components/Posts/Posted";
import { useState, useEffect } from 'react';
import axiosService from "../../../utils/axios";
import axios from 'axios';

// TODO
// replace mapped avatar to the user specific image
export default function Posts() {
    const userUUID = localStorage.getItem("user")
    const [posts, setPosts] = useState([])

    const [displayn, setDisplayn] = useState("")
    axiosService.get("authors/")
        .then((res) => {
            const authors = res.data
            for (let i = 0; i < authors.items.length; i++) {
                if (authors.items[i].uuid === userUUID) {
                    // localStorage.setItem("username", authors.items[i].uuid)
                    setDisplayn(authors.items[i].displayName)
                }
            }
        })

    const fetchdata = async () => {
        const res = await axiosService.get("authors/" + userUUID+ "/inbox/")
        console.log("Inbox is: ")
        console.log(res.data.items)
        setPosts(res.data.items)
    };
    useEffect(() => {
        fetchdata();
    }, [])

    return(
        <Flex flexDir="column" style={styles.container}>
            {/* TODO: change this to be more dynamic when pulling list of posts */}
            {posts.map((e)=>{
                return <div style={styles.post}>
                <Post postData={e} visibility = {"PUBLIC"} userUUID = {userUUID} displayName={displayn}/> </div>
            })}

        </Flex>
    )

}

const styles = {
    container:{
        padding: "20px",
        width: "450px",
        // overflow: "auto",
        // backgroundColor: "white",
        height: "600px",
        color: colors.text.t1,
        marginBottom: "20px",
        // border: "2px solid ",
        // borderColor: colors.brand.c4,
    }
}