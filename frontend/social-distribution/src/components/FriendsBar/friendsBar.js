import { useState } from 'react';
import {colors} from "../../utils/theme.js";
import { Flex} from "@chakra-ui/react";
import { SearchBar } from "./searchBar.js";
import FriendIcon from "./friendIcon.js";
import { useEffect } from 'react';
import axiosService, {aTeamService, BeegYoshiService } from "../../utils/axios";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";


/* {
    TODO: Integrate with backend API to get list of friends and necessary data
} */

export default function FriendsBar({user, selectedServer, userDisplayName, ...props}) {
    // Note: only placeholder data for now
    // Only show 10 at a time each page or make it scrollable; Deal with the overflow
    // Add pages to the bottom of the friends bar
    const [search, setSearch] = useState("");
    const [users, setUsers]= useState([]);
    const [followers, setFollowers]= useState([]);
    const [selectedTab, setValue] = useState('All');
    const currentUser= user;
    const currentServer = selectedServer;

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                console.log("Finding users of " + selectedServer)
                if(selectedServer === "WebWeavers"){
                    // Web Weaver Server
                    const response = await axiosService.get("authors/");
                    setUsers(response.data.items.map(user => ({id: user.uuid, displayName: user.displayName, avatar: user.profileImage, host: user.host})));

                    // Just followers
                    const res= await axiosService.get("authors/" + currentUser + "/followers/");
                    setFollowers(res.data.items.map(user => ({id: user.uuid, displayName: user.displayName, avatar: user.profileImage, host: user.host})));
                } else if (selectedServer === "BeegYoshi"){
                    //Beeg Yoshi
                    const response = await BeegYoshiService.get("service/authors/");
                    console.log(JSON.stringify(response.data))
                    setUsers(response.data.map(user => ({id: user.id, displayName: user.displayName, avatar: user.profileImage, host: user.host})));

                    //Just followers
                    const res= await axiosService.get("authors/" + currentUser + "/followers/");
                    setFollowers(res.data.items.map(user => ({id: user.id, displayName: user.displayName, avatar: user.profileImage, host: user.host})));

                }else if (selectedServer === "ATeam"){
                    // A Team
                    const response = await aTeamService.get("authors/");
                    console.log(JSON.stringify(response.data.results.items))
                    setUsers(response.data.results.items.map(user => ({id: user.id, displayName: user.displayName, avatar: user.profileImage, host: user.host})));

                    //Just followers
                    const res= await axiosService.get("authors/" + currentUser + "/followers/");
                    setFollowers(res.data.items.map(user => ({id: user.uuid, displayName: user.displayName, avatar: user.profileImage, host: user.host})));

                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }
    , [currentUser, selectedServer])

    // Search bar functionality
    const filteredUsers = users.filter(user =>
        user.displayName.toLowerCase().includes(search.toLowerCase())
    );

    const followersFiltered = followers.filter(user =>
        user.displayName.toLowerCase().includes(search.toLowerCase())
    );

    const handleTabChange = (event, newvalue) => {
        setValue(newvalue);
    }

    return (
        <div >
            <Flex style={styles.container} flexDir="column" pos="sticky">
                <SearchBar onSearch={setSearch}/>
                <Tabs value={selectedTab} onChange={handleTabChange} variant="soft-rounded" isFitted m={6} mt={2} style={styles.tabs}>
                    <TabList>
                        <Tab _selected={{ color: "white", bg: colors.brand.c2 }} _focus={{boxShadow: "none"}}>All</Tab>
                        <Tab _selected={{ color: "white", bg: colors.brand.c2 }} _focus={{boxShadow: "none"}}>Followers</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Flex flexDir="column" w="100%" alignItems="center" align="start">
                                {filteredUsers.map(user => <FriendIcon
                                    key={user.displayName}
                                    user={user}
                                    currentUser={currentUser}
                                    userDisplayName = {userDisplayName}
                                    selectedServer = {currentServer}/>)}
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDir="column" w="100%" alignItems="center" align="center">
                                {followersFiltered.map(user => <FriendIcon
                                    key={user.displayName}
                                    user={user}
                                    currentUser={currentUser}
                                    isFollower = {true}
                                    userDisplayName = {userDisplayName}
                                    selectedServer = {currentServer}/>)}
                            </Flex>
                        </TabPanel>
                    </TabPanels>

                </Tabs>
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
        width: '100%',
        position: 'sticky',
        textAlign: 'center',
        fontSize: '1rem',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection:'column',
        padding: 0,
        margin: 0,
    }
}