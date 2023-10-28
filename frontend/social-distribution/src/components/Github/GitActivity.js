import {recieveEvents} from "../api.js";
import React from "react";
import { colors } from "../../utils/theme.js";
import GitEvent from "./GitEvent.js"

export default function GitActivity({props}){
    const username = localStorage.getItem("user");
    recieveEvents(username);

    return
        <Flex flexDir="column" w="100%" alignItems="center" align="center">
            {users.map((user) => (
                <GitEvent fullName={user.fullName} username={user.username} avatar={user.avatar} />
        ))}

    </Flex>
}