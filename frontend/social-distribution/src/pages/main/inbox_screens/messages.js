import {Flex, Text } from "@chakra-ui/react";
import React from "react";
import { colors } from "../../../utils/theme";
import ShadedClickableBox from "../../../components/shadedClickableBox";


export default function Messages() {

    const users = [
        {fullName: "Jane Doe", username: "janedoe", avatar: "https://bit.ly/tioluwani-kolawole"},
        {fullName: "Kent Dodds", username: "kentcdodds", avatar: "https://bit.ly/kent-c-dodds"},
        {fullName: "Ryan Florence", username: "ryanflorence", avatar: "https://bit.ly/ryan-florence"},
        {fullName: "Prosper Otemuyiwa", username: "unicodeveloper", avatar: "https://bit.ly/prosper-baba"},
        {fullName: "Christian Nwamba", username: "codebeast", avatar: "https://bit.ly/code-beast"},
        {fullName: "Segun Adebayo", username: "thesegunadebayo", avatar: "https://bit.ly/sage-adebayo"},
    ]

    return(
        <Flex flexDir="column" style={styles.container}>
            {users.map((user) => (
                <ShadedClickableBox username={user.username} avatar={user.avatar} variant_='msg' />
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