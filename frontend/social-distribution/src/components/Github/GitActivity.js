import React, { useEffect } from "react";
import { Flex } from '@chakra-ui/react';
import { colors } from "../../utils/theme.js";
import { useState } from "react";
import axiosService from "../../utils/axios.ts";

export default function GitActivity({props}){
    const user = localStorage.getItem("user");
    const [events, setEvents] = useState([]);
    const [gitUser, setGitUser] = useState("");

    console.log("user " + user);

    const fetchdata = async () => {
        const res1= await axiosService.get("authors/" + user)
        const gitURL= res1.data.github
        const gUser= gitURL.split("/").pop();
        setGitUser(gUser);

        

        const apiURL= "https://api.github.com/users/" + gUser + "/events"
        const res2 = await fetch(apiURL)
        const data = await res2.json()
        setEvents(data)
    }

    console.log("gitUser " + gitUser)
    console.log("events " + JSON.stringify(events))

    useEffect(() => {
        fetchdata();
    }, [])

    return (
        <Flex flexDir="column" w="100%" alignItems="flex-start" align="center">
            { gitUser === "" ? (
                <h1 style={{color: colors.white}}>add github username to see github activity!</h1>
            ) : (
                <div>
                    <h1 style={{color: colors.white}}>Github Activity for {gitUser}</h1>
                    {Array.isArray(events) && events.map((event) => (
                        <div style={{flex: '1 0 20%', margin: '10px'}}>
                            <h1 style={{color: colors.white}}>Event Type: {event.type}</h1>
                            <h2 style={{color: colors.white}}>Repo: {event.repo.name}</h2>
                            <h2 style={{color: colors.white}}>{event.created_at}</h2>
                            {event.payload.commits && event.payload.commits.length > 0 && 
                                <h2 style={{color: colors.white}}>Commits: {event.payload.commits[0].message}</h2>
                            }
                        </div>
                    ))}

                </div>
            )}
        </Flex>
    );

}

