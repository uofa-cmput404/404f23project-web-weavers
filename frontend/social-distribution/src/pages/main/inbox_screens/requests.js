import {Flex, Text } from "@chakra-ui/react";
import React from "react";
import { colors } from "../../../utils/theme";
import ShadedClickableBox from "../../../components/shadedClickableBox";
import { useState, useEffect, handleState } from 'react';
import axiosService from "../../../utils/axios";

// TODO
// replace mapped avatar to the user specific image
export default function Requests() {
    const user = localStorage.getItem("user")
    const [requests, setRequests] = useState([])

    const fetchdata = async () => {
        const res = await axiosService.get("authors/" + user+ "/inbox/follows/")
        console.log("Req Inbox is: ")
        console.log(res.data.items)
        setRequests(res.data.items)
    };
    useEffect(() => {
        fetchdata();
    }, [])

    return(
        <Flex flexDir="column" style={styles.container}>
            {requests.map((user) => (
                <ShadedClickableBox
                req_user = {user.actor.uuid}
                request = {user}
                username={user.actor.displayName}
                avatar={user.avatar}
                variant_='request'
                change = {handleState} />
            ))}

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