import { useState } from 'react';
import {colors, sizes} from "../../utils/theme.js";
import { Flex, Icon } from "@chakra-ui/react";
import { SearchBar } from "./searchBar.js";
import FriendIcon from "./friendIcon.js";
import { useEffect } from 'react';
import axios, { formToJSON } from 'axios';
import { API_URL } from '../api.js';
import { Tabs, Tab } from "@chakra-ui/react";

/* { 
    TODO: Integrate with backend API to get list of friends and necessary data
} */

export default function FriendsBar({user, ...props}) {
    // Note: only placeholder data for now
    // Only show 10 at a time each page or make it scrollable; Deal with the overflow
    // Add pages to the bottom of the friends bar
    const [search, setSearch] = useState("");
    const [users, setUsers]= useState([]);
    const [followers, setFollowers]= useState([]);
    const [selectedTab, setValue] = useState('All');
    const currentUser= user;

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                // All users
                const response = await axios.get(API_URL + "authors/");
                setUsers(response.data.items.map(user => ({id: user.uuid, displayName: user.displayName, avatar: user.profileImage})));
            
                // Just followers
                const res= await axios.get(API_URL + "authors/" + currentUser + "/followers/");
                setFollowers(res.data.items.map(user => ({id: user.uuid, displayName: user.displayName, avatar: user.profileImage})));

            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }
    , [])

    // Search bar functionality
    const filteredUsers = users.filter(user => 
        user.displayName.toLowerCase().includes(search.toLowerCase())
        );
    
    const handleTabChange = (event, newvalue) => {
        setValue(newvalue);
    }

    return (
        <div >
            <Flex style={styles.container} flexDir="column" pos="sticky">
                <SearchBar onSearch={setSearch}/>
                <Tabs value={selectedTab} onChange={handleTabChange} variant="soft-rounded" isFitted m={6} style={styles.tabs}>
                    <Tab label='All' value='All' style={{color: 'white'}}/>
                    <Tab label='Followers' value='Followers' style={{color: 'white'}}/>
                </Tabs>


                <Flex flexDir="column" w="100%" alignItems="center" align="center">
                    {filteredUsers.map(user => <FriendIcon 
                        key={user.displayName} 
                        user={user} 
                        currentUser={currentUser}/>)}          
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
        right: 0,
        paddingTop:'1rem',
        overflow:'scroll',
        overflowX:'hidden',
        width:'230px',
        height: '100vh',
        scrollbarWidth: 'none',
    },
    tabs: {
        color: 'green',
        textAlign: 'center',
        fontSize: '1rem',
        display: 'flex',
        justifyContent: 'space-around',
    }
}