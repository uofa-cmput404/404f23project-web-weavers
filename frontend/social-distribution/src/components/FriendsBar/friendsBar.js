import { useState } from 'react';
import {colors} from "../../utils/theme.js";
import { Flex, Icon } from "@chakra-ui/react";
import { SearchBar } from "./searchBar.js";
import FriendIcon from "./friendIcon.js";

/* { 
    TODO: Integrate with backend API to get list of friends and necessary data
} */

export default function FriendsBar({props}) {
    // Note: only placeholder data for now
    // Only show 10 at a time each page or make it scrollable; Deal with the overflow
    // Add pages to the bottom of the friends bar
    const [search, setSearch] = useState("");

    const users = [
        {fullName: "Jane Doe", username: "janedoe", avatar: "https://bit.ly/tioluwani-kolawole"},
        {fullName: "Kent Dodds", username: "kentcdodds", avatar: "https://bit.ly/kent-c-dodds"},
        {fullName: "Ryan Florence", username: "ryanflorence", avatar: "https://bit.ly/ryan-florence"},
        {fullName: "Prosper Otemuyiwa", username: "unicodeveloper", avatar: "https://bit.ly/prosper-baba"}, 
        {fullName: "Christian Nwamba", username: "codebeast", avatar: "https://bit.ly/code-beast"}, 
        {fullName: "Segun Adebayo", username: "thesegunadebayo", avatar: "https://bit.ly/sage-adebayo"},   
        {fullName: "Ryan Florence", username: "ryanflorence", avatar: "https://bit.ly/ryan-florence"},
        {fullName: "Prosper Otemuyiwa", username: "unicodeveloper", avatar: "https://bit.ly/prosper-baba"}, 
        {fullName: "Christian Nwamba", username: "codebeast", avatar: "https://bit.ly/code-beast"}, 
        {fullName: "Segun Adebayo", username: "thesegunadebayo", avatar: "https://bit.ly/sage-adebayo"},  
    ]

    // Search bar functionality
    const filteredUsers = users.filter(user => 
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div >
            <Flex style={styles.container} flexDir="column" pos="sticky" h="95vh" w="20px" left={'84vw'} top={'5vh'}>
                <SearchBar onSearch={setSearch}/>
                <Flex flexDir="column" w="100%" alignItems="center" align="center">
                    {filteredUsers.map(user => <FriendIcon key={user.username} user={user}/>)}          
                </Flex> 
            </Flex>
        </div>
    )
}

const styles = {
    container:{
        boxShadow:"0 4px 12px 0 rgba(0,0,0,0.5)",
        backgroundColor:colors.text.t1,
        zIndex:1,
        position:"fixed",
        paddingTop:'1rem',
//        padding:'1rem',
        overflow:'scroll',
        overflowX:'hidden',
        width:'230px',
        height: '100vh',
    },
   
}