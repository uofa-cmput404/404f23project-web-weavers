import { recieveEvents } from "../api.js";
import React from "react";
import { Flex } from '@chakra-ui/react';
import json from 'json';
import axiosService from "../../utils/axios.js";

import { colors } from "../../utils/theme.js";

import GitEvent from "./GitEvent.js";
import { useState } from "react";

export default function GitActivity({props}){
    const user = localStorage.getItem("user");
    const [events, setEvents] = useState([]);
    const [gitUser, setGitUser] = useState("");
    
    const fetchdata = async () => {
        const res = await axiosService.get("authors/" + user)
        setGitUser(res.data.github)
    }

    const apiURL= "https://api.github.com/users/" + gitUser + "/events";

    const fetchEvents = async () => {
        const res = await fetch(apiURL);
        const data = await res.json();
        setEvents(data);
    }

    fetchdata();
    fetchEvents();
    console.log("gitUser " + gitUser);
    console.log("events " + events);

    return (
        <Flex flexDir="column" w="100%" alignItems="center" align="center">

        </Flex>
    );
}
