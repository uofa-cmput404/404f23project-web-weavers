import {React, useState} from "react";
import NavBar from "../../components/Bars/navbar.js";
import { colors, spacing, sizes, fonts} from "../../utils/theme.js";
import LogoBar from "../../components/Bars/logoBar.js";
import FriendsBar from "../../components/FriendsBar/friendsBar.js";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Button} from '@chakra-ui/react'
import Messages from "./inbox_screens/messages.js";
import Likes from "./inbox_screens/likes.js";
import Requests from "./inbox_screens/requests.js";
import Posts from "./inbox_screens/posts.js"

import axiosService from "../../utils/axios";

export default function Inbox({props}){

    //grab userUUID and displayName for mapping purposes
    const userUUID = localStorage.getItem("user")

    const handleDeleteClick = () => {
        axiosService.delete("authors/" + userUUID  + "/inbox/")
        window.location.reload(false);
    };
    return(
        <div style={styles.container}>
            <LogoBar/>
            <NavBar current='Inbox' uuid={userUUID}/>
            <FriendsBar user={userUUID} selectedServer = {"WebWeavers"}/>

            <div className='tab-container' style={styles.tabContainer}>

                <div className='title-container' style={styles.titleContainer}>
                <Text marginLeft="0px"> Inbox</Text>
                <Button marginRight = "0px" onClick = {handleDeleteClick}> Clear</Button>
                </div>

                <Tabs variant='soft-rounded' isFitted m={6} colorScheme="blackAlpha"  >
                    <TabList>
                        <Tab>Comments</Tab>
                        <Tab>Likes</Tab>
                        <Tab>Posts</Tab>
                        <Tab>Requests</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Messages />
                        </TabPanel>
                        <TabPanel>
                            <Likes />
                        </TabPanel>
                        <TabPanel>
                            <Posts />
                        </TabPanel>
                        <TabPanel>
                            <Requests />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    )
}
const styles = {
    container:{
        backgroundColor: colors.brand.c6,
        height: "100vh",
        color: colors.text.t2
    },

    tabContainer:{
        width: '60%',
        padding: spacing.xl,
        height: '100vh',
        boxShadow:"4px 4px 12px 0 rgba(0,0,0,0.50)",
        border: '1px solid',
        borderColor: colors.brand.c4,
        margin: 'auto',
        marginTop: "5vh",
        backgroundColor: colors.brand.c8,
        overflow: "auto",
    },
    titleContainer: {
        color: colors.brand.c6,
        fontSize: sizes.lg,
        fontStyle: fonts.title,
        display: "flex",
        justifyContent: "space-between"

    }
}