import {Flex, Text } from "@chakra-ui/react";
import React from "react";
import { colors } from "../../../utils/theme";
import ShadedClickableBox from "../../../components/shadedClickableBox";
import { useEffect } from "react";
import axiosService from "../../../utils/axios";

export default function Messages() {
    const user = localStorage.getItem("user")
    const [messageNotifs, setMessageNotifs] = React.useState([])

    const fetchdata = async () => {
        const res = await axiosService.get("authors/" + user + "/inbox/comments/")
        console.log("Querying inbox comments")
        setMessageNotifs(res.data.items)
    };

    //live updates
    useEffect(() => {
        let interval = setInterval(() => {
            fetchdata();
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    // initial setup
    useEffect(() => {
        fetchdata();
    }, [])


    return(
        <Flex flexDir="column" style={styles.container}>
            {messageNotifs.map((user) => (
                <ShadedClickableBox
                    variant_='notif'
                    text={user.author.displayName + " commented '" + user.comment + "'"}/>
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